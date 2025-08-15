import 'dotenv/config';
import { OpenAI } from 'openai';

const client = new OpenAI();

async function main() {
    const response = await client.chat.completions.create({
        model: "HuggingFaceH4/zephyr-7b-beta",
        messages: [
            { 
                role: "system", 
                content: "You are a helpful AI assistant for persona building." 
            },
            {
                role: 'user',
                content: 'Hey GPT, my name is Abhijit.',
            },
        ],
    });
    console.log(response.choices[0].message.content);
}

main();