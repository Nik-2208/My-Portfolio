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
  'experience': 'AI Video Gen Intern (Fin Maverick), Content Writer (EduJR), Email Marketer (EduJR), Cybersecurity (Edunet/VOIS), LMS Admin (KJSAC), Hardware Intern (VTI).',
  'worked': 'AI Video Gen Intern at Fin Maverick. Content Writer & Email Marketer at EduJR. Cybersecurity, LMS Admin, Hardware Intern.',
  'intern': 'AI Video Gen (Fin Maverick), Content Writer (EduJR), Email Marketer (EduJR), Cybersecurity (Edunet/VOIS), LMS Admin (KJSAC), Hardware Engineer (VTI).',
  'cybersecurity': 'Edunet/VOIS Intern: Wireshark analysis, keylogger project, AI monitoring workflows.',

  // Projects
  'project': 'Major Flagship Projects: 01 ANTWIRE (Extensible Computational Ant-Brain Platform), 02 ANT BRAIN KEYBOARD (Biologically Inspired Multi-Agent Simulation), 03 ASCENDRA (Life RPG Platform). Plus 10 ML spatial systems.',
  'ascendra': 'ASCENDRA: "Life, turned into an RPG." A web-based Life RPG platform converting real-world habits, workouts, study, and focus into XP, quests, boss battles, skill trees, and ascension (Live Demo: https://ascendra-game.vercel.app).',
  'antwire': 'ANTWIRE: Extensible computational ant-brain & superorganism simulation platform combining spiking neural models (~55K neurons), multi-agent RL, 6-channel pheromone stigmergy, and real-time neural causal tracing (Live Demo: https://antwire.vercel.app | GitHub: https://github.com/Nik-2208/AntWire).',
  'ant brain': 'ANT BRAIN KEYBOARD: Biologically informed ant-brain simulation training individual ants & colonies to operate a keyboard using LIF spiking neurons, spatial memory, reward-based learning, and pheromone communication (Live Demo: https://ant-brain-keyboard.vercel.app).',
  'keyboard': 'ANT BRAIN KEYBOARD: Biologically informed ant-brain simulation training individual ants & colonies to operate a keyboard using LIF spiking neurons, spatial memory, reward-based learning, and pheromone communication (Live Demo: https://ant-brain-keyboard.vercel.app).',
  'nids': 'AI Network Intrusion Detection - ML models detect suspicious traffic (20% accuracy boost).',
  'resume': 'AI Resume Analyzer & Verified Resume: Download Nik\'s verified PDF resume from the header/contact section or via Google Drive link.',
  'recipe': 'Recipe Predictor - TF-IDF + Naive Bayes predicts cuisine from ingredients.',
  'aqi': 'Smart AQI Predictor - forecasts pollution levels, interactive dashboard.',

  // Education/Certs
  'education': 'CURRENT: Sardar Patel Institute of Technology (SPIT), Mumbai - SY B.Tech in Computer Engineering (Direct Second Year). COMPLETED: K. J. Somaiya Polytechnic - Diploma in CE (97.03%, Rank 132/70k+).',
  'spit': 'Sardar Patel Institute of Technology (SPIT), Mumbai: Currently pursuing SY B.Tech in Computer Engineering through Direct Second Year.',
  'somaiya': 'K. J. Somaiya Polytechnic, Mumbai: Completed Diploma in Computer Engineering with 97.03% and All India Merit Rank 132 / 70,000+.',
  'cert': 'IBM ML Python, Coursera Data Analysis, Microsoft AI-900, Deloitte/BCG/Tata GenAI certs.',
  'college': 'Currently at Sardar Patel Institute of Technology (SPIT) for SY B.Tech Computer Engineering. Previously completed Diploma at K. J. Somaiya Polytechnic (97.03%, Rank 132).',

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
