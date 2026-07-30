export type KnowledgeChunk = {
  id: string;
  section: string;
  category: "profile" | "education" | "experience" | "projects" | "skills" | "achievements" | "certifications" | "contact" | "faq";
  content: string;
  metadata?: Record<string, unknown>;
};

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "profile-main",
    section: "Identity Profile",
    category: "profile",
    content: "Hi! I'm Nikhilesh Chavda — a Full-Stack AI Engineer, fast learner, and disciplined thinker based in Mumbai, India. My mindset operates as an intelligent neural matrix: connecting human curiosity with disciplined machine execution. I build predictive ML models, NLP pipelines, and AI applications that solve real-world problems. I am passionate about AI engineering, high-performance UI design, and continuous learning."
  },
  {
    id: "profile-goals",
    section: "Career Goals & Ambitions",
    category: "profile",
    content: "My career goal is to become an award-winning AI Engineer and Frontend Architect, building impactful generative AI agents, predictive systems, and intelligent human-computer interfaces. I am actively seeking AI/ML engineering opportunities, internships, and collaborative research projects."
  },
  {
    id: "education-diploma",
    section: "Education & Academic Distinction",
    category: "education",
    content: "Diploma in Computer Engineering at K. J. Somaiya Polytechnic, Mumbai. Completed: 2026. Final Diploma Percentage: 97.03%. 🏆 Academic Merit Rank: Ranked 134th in the Maharashtra State Diploma Merit List among approximately 68,800 candidates across the state."
  },
  {
    id: "experience-edujr-content",
    section: "EduJR - Content Writing Intern",
    category: "experience",
    content: "Role: Content Writing Intern at EduJR (https://edujr.com/). Duration: 28 April 2026 – 25 June 2026. Career Progression Note: Hired initially as an Email Marketing Intern and promoted to Content Writing due to outstanding outreach performance. Responsibilities & Achievements: Authored 40+ SEO-friendly technological and educational blog articles, conducted deep topic research, improved domain authority and search visibility, collaborating with cross-functional marketing teams."
  },
  {
    id: "experience-edujr-email",
    section: "EduJR - Email Marketing Intern",
    category: "experience",
    content: "Role: Email Marketing Intern at EduJR (https://edujr.com/). Duration: 04 April 2026 – 30 May 2026. Responsibilities & Achievements: Managed high-volume B2B outreach sending ~100 personalized professional emails daily to prospective institutional partners, maintaining brand tone, client communication, and conversion consistency."
  },
  {
    id: "experience-aicte-cyber",
    section: "AICTE - Edunet Foundation (Vodafone Idea)",
    category: "experience",
    content: "Role: Cybersecurity Intern at AICTE - Edunet Foundation (Vodafone Idea Foundation). Period: Dec 2025 – Jan 2026. Responsibilities: Built keylogger threat simulation projects, executed network packet inspection with Wireshark, integrated AI models for vulnerability assessment and automated threat monitoring."
  },
  {
    id: "experience-aicte-azure",
    section: "AICTE - Edunet Foundation (Microsoft)",
    category: "experience",
    content: "Role: Azure AI Intern at AICTE - Edunet Foundation (Microsoft). Period: 2025. Responsibilities: Deployed machine learning models on Azure Cognitive Services, configured Azure cloud computing resources, and built intelligent data processing pipelines."
  },
  {
    id: "experience-kjsac-lms",
    section: "KJSAC - LMS Administrator & E-Content Developer",
    category: "experience",
    content: "Role: LMS Administrator & Content Creator at KJSAC. Period: Jul 2025 – Sep 2025. Responsibilities: Administered Moodle LMS platform, produced and edited 50+ lecture videos using OBS Studio and Canva, mentored student interns, received Letter of Appreciation."
  },
  {
    id: "experience-kjsiti-hardware",
    section: "KJSITI - Computer Hardware Engineer Intern",
    category: "experience",
    content: "Role: Hardware Engineer Intern at K. J. Somaiya ITI. Period: Jun 2025 – Sep 2025. Responsibilities: Assembled high-performance PC workstations, diagnosed hardware bottlenecks, maintained campus network infrastructure."
  },

  // Projects
  {
    id: "project-personalized-learner",
    section: "Personalized Learning Dashboard",
    category: "projects",
    content: "Project Name: Personalized Learning Dashboard. Purpose: Predicts student academic performance and delivers tailored learning recommendations. Tech Stack: Python, Streamlit, Machine Learning, Scikit-learn, Data Science. Features: Interactive grade forecasting, study habit analysis, gamified UI. Live Demo: https://personalized-learner.streamlit.app/"
  },
  {
    id: "project-ai-event-planner",
    section: "AI Event Planner",
    category: "projects",
    content: "Project Name: AI Event Planner. Purpose: Intelligent system for automated event scheduling, budget allocation, and vendor selection. Tech Stack: Python, NLP, Streamlit, Scikit-learn. Features: Natural language event input, automated agenda generation. Live Demo: https://aieventplanner.streamlit.app/"
  },
  {
    id: "project-smarthire-ai",
    section: "SmartHire AI",
    category: "projects",
    content: "Project Name: SmartHire AI. Purpose: AI-powered hiring assistant for resume parsing, candidate scoring, and automated interview screening. Tech Stack: Python, NLP, Machine Learning, Streamlit. Features: TF-IDF candidate matching, skill gap analysis. Live Demo: https://hire-smart-ai.streamlit.app/"
  },
  {
    id: "project-creativity-predictor",
    section: "Creativity Predictor",
    category: "projects",
    content: "Project Name: Creativity Predictor. Purpose: Evaluates creative writing and problem-solving metrics using text analytics. Tech Stack: Python, NLP, ML, Streamlit. Features: Semantic scoring, text sentiment analysis. Live Demo: https://creativity-predictor.streamlit.app/"
  },
  {
    id: "project-digit-identifier",
    section: "Digit Identifier",
    category: "projects",
    content: "Project Name: Digit Identifier. Purpose: Real-time handwritten digit recognition using neural networks. Tech Stack: Python, Neural Networks, OpenCV, Streamlit. Features: Canvas drawing interface, real-time prediction confidence. Live Demo: https://digit-identifier.streamlit.app/"
  },
  {
    id: "project-ai-energy-predictor",
    section: "AI Energy Predictor",
    category: "projects",
    content: "Project Name: AI Energy Predictor. Purpose: Predicts household energy consumption based on weather data and historical usage. Tech Stack: Python, ML, Regression Models, Streamlit. Features: Load forecasting, energy efficiency tips. Live Demo: https://ai-energy-predictor.streamlit.app/"
  },
  {
    id: "project-netsec-ai",
    section: "NetSec AI",
    category: "projects",
    content: "Project Name: NetSec AI. Purpose: Network Intrusion Detection System using machine learning for detecting malicious packet anomalies. Tech Stack: Python, Cybersecurity, Scikit-learn, Wireshark, Streamlit. Features: 20% detection boost, real-time alert logs. Live Demo: https://netsec-ai.streamlit.app/"
  },
  {
    id: "project-recipe-predictor",
    section: "Recipe Predictor",
    category: "projects",
    content: "Project Name: Recipe Predictor. Purpose: Recommends gourmet recipes based on available kitchen ingredients using TF-IDF vectorization. Tech Stack: Python, NLP, TF-IDF, Logistic Regression, Streamlit. Features: Dietary filtering, ingredient matching. Live Demo: https://recipro.streamlit.app/"
  },
  {
    id: "project-sleep-insight-engine",
    section: "Sleep Insight Engine",
    category: "projects",
    content: "Project Name: Sleep Insight Engine. Purpose: Analyzes sleep metrics to provide personalized circadian health insights. Tech Stack: Python, Data Science, Matplotlib, Pandas, Streamlit. Features: Sleep stage visualization, fatigue prevention tips. Live Demo: https://sleep-insight-engine.streamlit.app/"
  },
  {
    id: "project-smart-aqi-predictor",
    section: "Smart AQI Predictor",
    category: "projects",
    content: "Project Name: Smart AQI Predictor. Purpose: Forecasts Air Quality Index using environmental telemetry data. Tech Stack: Python, ML, Pandas, NumPy, Streamlit. Features: Real-time AQI breakdown, health warnings. Live Demo: https://smart-aqi-predictor.streamlit.app/"
  },

  // Skills
  {
    id: "skills-programming",
    section: "Programming Languages",
    category: "skills",
    content: "Languages: Python, Java, C, C++, SQL, JavaScript, HTML5, CSS3, Dart, Flutter."
  },
  {
    id: "skills-aiml",
    section: "AI & Machine Learning",
    category: "skills",
    content: "AI/ML Stack: Scikit-learn, Pandas, NumPy, Matplotlib, TF-IDF, Natural Language Processing (NLP), KNN, Logistic Regression, Naive Bayes, Neural Networks, Recommendation Systems, Gemini API, Claude, Prompt Engineering, Azure Cognitive Services."
  },
  {
    id: "skills-databases-cloud",
    section: "Databases & Cloud Infrastructure",
    category: "skills",
    content: "Databases & Cloud: MySQL, Firebase Firestore, Supabase, Microsoft Azure, Vercel, Streamlit Cloud."
  },
  {
    id: "skills-devtools-design",
    section: "Developer Tools & Design",
    category: "skills",
    content: "Tools & Design: Git, GitHub, Docker, n8n Automation, Figma, Canva, OBS Studio, Kdenlive, Cursor, Windsurf."
  },

  // Achievements & Certifications
  {
    id: "achievements-list",
    section: "Achievements & Awards",
    category: "achievements",
    content: "🏆 1st Place – AICons Competition (TechXpression 2025, KJSIT). 🥇 1st Place – Tech Trivia & Tech Stake (Renaissance 2024, KJSIT). 🎯 Top 45 – GDG Figma UI/UX Hackathon (PixelVerse 2026, SIES GST). 🎖️ Rank 134th in Maharashtra Diploma Merit List (out of ~68,800 candidates)."
  },
  {
    id: "certifications-list",
    section: "Certifications",
    category: "certifications",
    content: "Certifications: Machine Learning with Python (IBM), Python for Data Analysis (Coursera), Web Apps with Django (Skillsoft), AI-900 Azure Fundamentals (Microsoft), Tata GenAI Data Analytics, Deloitte Data Analytics, BCG GenAI Simulation."
  },

  // Contact & Social
  {
    id: "contact-info",
    section: "Contact Information & Social Links",
    category: "contact",
    content: "Email: nikhileshchavdawork@gmail.com | Phone: 8928027482 | Location: Mumbai, Maharashtra, India. LinkedIn: https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/ | GitHub: https://github.com/Nik-2208 | Portfolio: https://nikhileshchavda.com"
  },

  // FAQs
  {
    id: "faq-hire",
    section: "Why Hire Nik?",
    category: "faq",
    content: "Why Hire Nik? I combine a top 0.2% academic rank (97.03% diploma, 134th state rank) with proven practical execution across 10+ deployed AI/ML Streamlit applications, industry internship experience (Content Writing, Email Marketing, Cybersecurity, Azure AI), and relentless problem-solving discipline."
  }
];
