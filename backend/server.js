import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

const client = new OpenAI();
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  methods: ['GET', 'POST'],
}));

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
