import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const API_KEY = 'YOUR_API_KEY';
const genAI = new GoogleGenerativeAI(API_KEY);

const sendMessage = async function* (prompt: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        yield chunkText
    }
};

type ResponseData = {
    message: string
};



export async function GET(req : Request) {
    const url = new URL(req.url);
    const prompt = url.searchParams.get('prompt');
    if (!prompt) {
        return new Response('Prompt is required', { status: 400 });
    }
    // Start streaming chunks
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of sendMessage(prompt)) {
                const data = `data: ${JSON.stringify({ message: chunk })}\n\n`;
                controller.enqueue(encoder.encode(data));
            }
            controller.close();
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream' }
    });
}