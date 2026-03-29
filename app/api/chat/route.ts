import { NextRequest, NextResponse } from 'next/server';

const keywordResponses: Record<string, string> = {
  // Skills
  'skill': 'Core skills: Python, Java, C/C++, SQL, ML (Scikit-learn, Pandas, NumPy), Streamlit, Django, Firebase, MySQL.',
  'skills': 'Programming: Python, Java, C/C++, JS. ML: Scikit-learn, Pandas, NLP, TF-IDF. Deployment: Streamlit, Docker. See SkillsMatrix section!',
  'python': 'Python expert - ML models, Streamlit apps, NLP, data analysis, automation.',
  'ml': 'Machine Learning: KNN, Logistic Regression, Naive Bayes, recommendation systems, AQI prediction.',
  'ai': 'AI/ML specialist - predictive models, NIDS, resume analyzer, recipe predictor.',
  'machine learning': 'Built NIDS, Resume Analyzer, Recipe Predictor, AQI Dashboard using Scikit-learn & Streamlit.',

  // Experience
  'experience': 'Cybersecurity Intern (Edunet/VOIS), LMS Admin (KJSAC), Hardware Intern (KJSIT).',
  'worked': 'Current: Cybersecurity AI Intern. Past: LMS Admin & E-Content (50+ videos), Hardware Engineer.',
  'intern': '1. Cybersecurity with GenAI (Edunet/VOIS) 2. LMS Admin (KJSAC) 3. Hardware Engineer (KJSIT).',
  'cybersecurity': 'Edunet/VOIS Intern: Wireshark analysis, keylogger project, AI monitoring workflows.',

  // Projects
  'project': 'AI NIDS, Resume Analyzer, Recipe Predictor, Smart AQI, Learning Dashboard - all Python/Streamlit.',
  'nids': 'AI Network Intrusion Detection - ML models detect suspicious traffic (20% accuracy boost).',
  'resume': 'AI Resume Analyzer - parses PDF/images, extracts skills, predicts roles.',
  'recipe': 'Recipe Predictor - TF-IDF + Naive Bayes predicts cuisine from ingredients.',
  'aqi': 'Smart AQI Predictor - forecasts pollution levels, interactive dashboard.',

  // Education/Certs
  'education': 'Diploma Computer Engineering, KJ Somaiya Polytechnic (95.5% Sem 5).',
  'cert': 'IBM ML Python, Coursera Data Analysis, Microsoft AI-900, Deloitte/BCG/Tata GenAI certs.',
  'college': 'KJ Somaiya Polytechnic - Diploma Computer Engineering.',

  // Contact
  'contact': 'nikhileshchavdawork@gmail.com | +91 8928027482 | LinkedIn & GitHub in footer.',
  'email': 'nikhileshchavdawork@gmail.com',
  'phone': '+91 8928027482',

  // Default
  default: "🧠 Nik AI active. Try: skills, projects, experience, education, contact, certifications!"
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ response: 'Send a message about my portfolio!' }, { status: 400 });
    }

    const lowerMessage = message.toLowerCase().trim();
    
    // Keyword matching (first match wins)
    let matchedKey = 'default';
    for (const [key, response] of Object.entries(keywordResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        matchedKey = key;
        break;
      }
    }

    const response = keywordResponses[matchedKey];

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      response: 'Neural network operational. Try keywords like skills, projects, experience.' 
    });
  }
}
