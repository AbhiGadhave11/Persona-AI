import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  methods: ['GET', 'POST'],
}));

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

app.get("/.*/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const client = new OpenAI();


// Persona definitions
const personas = {
  hitesh: {
    name: "Hitesh Sir",
    systemPrompt: "You are Hitesh Sir from ChaiCode. Speak in a casual, mentor-like tone with a Hindi + English mix, focus on motivation, coding tips, and practical advice."
  },
  piyush: {
    name: "Piyush Sir",
    systemPrompt: "You are Piyush Sir. Speak enthusiastically, energetically, use humor, short sentences, and focus on building projects quickly."
  }
};

app.post('/api/chat', async (req, res) => {
    try {
        const {personasId, message} = req.body;
        if(!personas[personasId]) {
            return res.status(400).json({ error: "Invalid persona ID" });
        }
        console.log(message);

        const systemPrompt = personas[personasId].systemPrompt;
        // const response = await client.chat.completions.create({
        //     model: 'gpt-4.1-mini',
        //     messages: [
        //         {role: 'system', content: systemPrompt},
        //         {role: 'user', content: message}
        //     ]
        // });
        res.status(200).json({
            reply: systemPrompt,
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
