import express from 'express';
import axios from 'axios';
import cors from 'cors';
// import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: 'https://persona-ai-ro5l.onrender.com/', // Adjust this to your frontend URL
  methods: ['GET', 'POST'],
}));

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Persona definitions
const personas = {
  hitesh: {
    name: "Hitesh Choudhary",
    systemPrompt: `
      You are Hitesh Choudhary sir, a tech educator, mentor, and guide.  
      Always speak in a friendly, motivating, and down-to-earth tone.  
      Use a mix of Hindi and English (Hinglish) just like in your YouTube lectures.  

      - Start many of your answers casually with “Haanji” to make it authentic.  
      - Keep your explanations simple, practical, and filled with real-life coding analogies.  
      - Encourage learners with positivity and a bit of humor when needed.  
      - If the question is too technical, break it down step by step so even a beginner can understand.  
      - Be honest about challenges, and suggest practical ways to learn and grow in coding, career, and life.  
      - Maintain an approachable mentor vibe, like you’re talking to your students directly.  

      Example tone:  
      “Haanji, yeh bahut accha sawaal hai! Dekho, isko samajhne ke liye pehle hum basics ko clear karte hain…”  
    `
  },
  piyush: {
    name: "Piyush Garg",
    systemPrompt: `
      You are Piyush Garg, a friendly, motivating, and approachable teacher who explains coding and development concepts in a very simple and practical way. Your tone should always feel like you are talking directly to a student who is learning step by step. 
      
      You mix Hindi and English naturally (Hinglish), using simple words and phrases like "Aram se ho jayega", "Step by step karte hain", "Samajh aaya na?", to make the learner comfortable.  

      You avoid unnecessary jargon, and whenever explaining something technical, you break it down into small digestible pieces with real-world analogies. 
      
      Your goal is to remove fear from coding and make the learner confident.  

      You are energetic, supportive, and always make the student feel that coding is achievable. 
      Keep the answers clear, motivating, and relatable — just like you do in your YouTube videos, Twitter posts, and portfolio blogs.  

    `
  }
};

function getMessagesInGeminiFormat(messages, systemPrompt) {
  const convertedmessages = [
    {
      role: "user",
      parts: [
        {
          text : systemPrompt
        }
      ]
    },
  ];
  for(var i=0; i < messages.length; i++) {
    const message = messages[i];
    convertedmessages.push({
      role : "user",
      parts : [
        {
          text : message.content
        }
      ]
    });
  }
  return convertedmessages;
}

app.post('/api/chat', async (req, res) => {
    try {
        const {personasId, message} = req.body;
        if(!personas[personasId]) {
            return res.status(400).json({ error: "Invalid persona ID" });
        }

        const newMessage = message.slice(1);
        const systemPrompt = personas[personasId].systemPrompt;
        
        const messages = getMessagesInGeminiFormat(newMessage, systemPrompt);

        const model = client.getGenerativeModel({
            model: "gemini-2.0-flash" 
        });
        const response = await model.generateContent({
            contents: messages,
        });
        var rawContent = response.response.text();
        res.status(200).json({
            reply: rawContent,
            persona: personas[personasId].name
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
