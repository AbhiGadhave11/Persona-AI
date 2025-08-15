import 'dotenv/config';
import { OpenAI } from 'openai';

// const client = new OpenAI({
//   baseURL: "https://api-inference.huggingface.co/v1", // HF's OpenAI-compatible endpoint
// });

// async function main() {
//     const response = await client.chat.completions.create({
//         model: "HuggingFaceH4/zephyr-7b-beta",
//         messages: [
//             { 
//                 role: "system", 
//                 content: "You are a helpful AI assistant for persona building." 
//             },
//             {
//                 role: 'user',
//                 content: 'Hey GPT, my name is Abhijit.',
//             },
//         ],
//     });
//     console.log(response.choices[0].message.content);
// }

// main();

import fetch from "node-fetch";

const HF_API_KEY = process.env.OPENAI_API_KEY;

async function main() {

    const response = await fetch(
    "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        inputs: "Hello! How are you?"
        })
    }
    );

    const data = await response.json();
    console.log(data);
}

main();