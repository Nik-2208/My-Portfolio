import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { knowledgeBase } from '../../../lib/knowledge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    const context = knowledgeBase.map(chunk => `${chunk.section}: ${chunk.content}`).join('\\n\\n');
    
    const prompt = `You are Nik AI, a portfolio assistant for Nikhilesh Chavda. Answer ONLY using the context below. Be concise, confident, professional.

CONTEXT:
${context}

User: ${message}

Response:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Nik AI - specialized in Nikhilesh Chavda's portfolio only. Use ONLY provided context. No hallucination. Concise answers." },
        { role: "user", content: prompt }
      ],
      max_tokens: 250,
      temperature: 0.1,
    });

    const response = completion.choices[0]?.message?.content || "I focus on Nik's portfolio. Try asking about skills, projects, or experience.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      response: "AI core active but experiencing high load. Fallback: Nik specializes in AI/ML (Python/Streamlit), cybersecurity, and full-stack development." 
    });
  }
