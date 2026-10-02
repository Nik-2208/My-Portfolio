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
    content: "Hi! I'm Nikhilesh Chavda — a Full-Stack AI Engineer and Computer Engineering student at Sardar Patel Institute of Technology (SPIT), Mumbai. My mindset operates as an intelligent neural matrix: connecting human curiosity with disciplined machine execution. I build distributed networking systems, neural typing engines, life gamification RPG platforms (ASCENDRA), and predictive ML applications that solve real-world problems."
  },
  {
    id: "profile-goals",
    section: "Career Goals & Ambitions",
    category: "profile",
    content: "My career goal is to become an award-winning AI Engineer and Systems Architect, building impactful generative AI agents, distributed protocols, and intelligent human-computer interfaces. I am actively seeking AI/ML engineering opportunities, internships, and collaborative research projects."
  },
  {
    id: "education-current",
    section: "Current Education — SPIT Mumbai",
    category: "education",
    content: "Current Education: Sardar Patel Institute of Technology (SPIT), Mumbai — one of Mumbai's leading engineering institutes. Currently pursuing: SY B.Tech (Second Year) in Computer Engineering through the Direct Second Year pathway (2026 – 2029). Core Focus: Advanced Computer Architecture, Operating Systems, Machine Learning, and Distributed Systems."
  },
  {
    id: "education-diploma",
    section: "Completed Education — Diploma Distinction",
    category: "education",
    content: "Completed Education: Diploma in Computer Engineering at K. J. Somaiya Polytechnic, Mumbai. Completed: 2026. Final Diploma Percentage: 97.03%. 🏆 Academic Merit Rank: Ranked 132nd in the All India / Maharashtra State Diploma Merit List among approximately 70,000+ candidates across the state."
  },
  {
    id: "education-school",
    section: "Completed Education — Secondary School",
    category: "education",
    content: "Completed Secondary Education: P. G. Garodia School, Mumbai (ICSE Board). Final Board Percentage: 93.4% with distinction."
  },

  // Major Flagship Projects
  {
    id: "project-antwire",
    section: "Major Project 01 — ANTWIRE",
    category: "projects",
    content: "Project 01: ANTWIRE — Extensible Computational Ant-Brain & Superorganism Platform. Concept: An extensible computational ant-brain, individual-ant organism, and colony/superorganism simulation platform combining computational neurobiology with multi-agent reinforcement learning. Architecture: Canonical ~55K-neuron computational ant-brain topology, isolated per-ant runtime, Gym-style MDP API, 14-dimensional observation system, 6-channel pheromone diffusion stigmergy, emergent division of labor, and real-time causal tracing. Pipeline: Ant Brain Model → Isolated Ant Runtime → Sensory/Motor System → Task Environment → Learning → Pheromones → Colony Behavior → World → Neural Inspection. Tech Stack: TypeScript, React, Node.js, Computational Neuroscience, LIF Spiking Neural Models, Multi-Agent RL, Pheromone Simulation, Gym MDPs. Live Demo: https://antwire.vercel.app | Repository: https://github.com/Nik-2208/AntWire"
  },
  {
    id: "project-ant-brain-keyboard",
    section: "Major Project 02 — ANT BRAIN KEYBOARD",
    category: "projects",
    content: "Project 02: ANT BRAIN KEYBOARD — Biologically Inspired Multi-Agent Learning. Concept: A biologically informed ant-brain simulation that takes a real-life-inspired ant brain model as its computational substrate, trains individual ants or colonies to operate a keyboard, and demonstrates how biologically inspired neural architectures can learn and coordinate control tasks. Architecture: Ant-6DCT model with 128 LIF spiking neurons, 256 directed synapses, 14 sensory channels, 12 neuropil regions, spatial memory, reward-modulated plasticity, and 4 motor actions. Stored as a compact ~38 KiB .antbrain package. Tech Stack: Python, Spiking Neural Networks (LIF), Multi-Agent RL, Neuropil Circuits, Pheromone Dynamics. Live Demo: https://ant-brain-keyboard.vercel.app"
  },
  {
    id: "project-ascendra",
    section: "Major Project 03 — ASCENDRA (Flagship Major Project)",
    category: "projects",
    content: "Project 03: ASCENDRA — \"Life, turned into an RPG.\" Concept: A web-based Life RPG transforming real-world self-improvement into RPG character progression. Real activities (studying, coding, fitness, focus, habits, meditation, brain training, productivity) contribute to an evolving RPG hero. Systems: XP Engine, Skills & Attributes, Quests & Boss Battles, World Progression, Brain Lab, Streaks & Resilience, Campaigns, Inventory, Chronicles, Ascension. Tech Stack: Next.js 16, React 19, TypeScript, Prisma ORM, PostgreSQL, Auth.js, Server Actions, Event-Driven Gameplay. Live Demo: https://ascendra-game.vercel.app"
  },

  // Experience
  {
    id: "experience-fin-maverick",
    section: "Fin Maverick - AI Video Generation Intern",
    category: "experience",
    content: "Role: AI Video Generation Intern at Fin Maverick (Pravesio Consulting Private Limited). Duration: 1 July 2026 – Present. Mode: Remote. Contributions: Generated instructional/promotional videos using company-approved AI tools and workflows, performed quality checks (QC) on outputs, delivered target volumes, coordinated with content/marketing teams. Documents: View Certificate (https://drive.google.com/file/d/13X4dQ-44cNy8SjpOA-LdyqYvJs9MxGH4/view?usp=sharing), View Letter of Recommendation by Reporting Manager Niyati Arora (https://drive.google.com/file/d/1yVU29gpxrdeMrcDB85R6Ka3HvoW6hdgp/view?usp=drive_link)."
  },
  {
    id: "experience-edujr-content",
    section: "EduJR - Content Writing Intern",
    category: "experience",
    content: "Role: Content Writing Intern at EduJR (https://edujr.com/). Duration: 28 April 2026 – 25 June 2026. Career Progression Note: Earned this content-writing role after appreciable performance as an Email Marketing Intern. Contributions: Wrote 40+ blog posts over approximately two months according to publishing standards. Documents: View Certificate (https://drive.google.com/file/d/1NsVepnJgnFrQxaP_fzDiKn9NMBCGwQYx/view?usp=sharing), Company Website (https://edujr.com/)."
  },
  {
    id: "experience-edujr-email",
    section: "EduJR - Email Marketing Intern",
    category: "experience",
    content: "Role: Email Marketing Intern at EduJR (https://edujr.com/). Duration: 04 April 2026 – 30 May 2026. Contributions: Sent approximately 100 client emails daily, managing campaigns and client communications. Documents: View Certificate (https://drive.google.com/file/d/1GDQvgmwXCb8VRLJzHByxzljd-GDLBn2Y/view?usp=sharing), Company Website (https://edujr.com/)."
  },
  {
    id: "experience-aicte-cyber",
    section: "AICTE - Edunet Foundation (Vodafone Idea)",
    category: "experience",
    content: "Role: Cybersecurity Intern at AICTE - Edunet Foundation (Vodafone Idea Foundation). Period: Dec 2025 – Jan 2026. Responsibilities: Built keylogger threat simulation projects, executed network packet inspection with Wireshark, integrated AI models for vulnerability assessment."
  },
  {
    id: "experience-aicte-azure",
    section: "AICTE - Edunet Foundation (Microsoft)",
    category: "experience",
    content: "Role: Azure AI Intern at AICTE - Edunet Foundation (Microsoft). Period: 2025. Responsibilities: Deployed machine learning models on Azure Cognitive Services, configured Azure cloud computing resources."
  },
  {
    id: "experience-kjsac-lms",
    section: "KJSAC - LMS Administrator & E-Content Developer",
    category: "experience",
    content: "Role: LMS Administrator & Content Creator at K. J. Somaiya Arts & Commerce (KJSAC). Period: Jul 2025 – Sep 2025. Responsibilities: Administered Moodle LMS platform, produced and edited 50+ lecture videos, received Letter of Appreciation. Documents: View Internship Certificate (https://drive.google.com/file/d/1BvNUjNFwQWGdzMOgByMfM4w5dBot6Vu8/view?usp=sharing), View Letter of Recommendation (https://drive.google.com/file/d/1pDMxJxq0iay_v-DrX9b9o5DDTqNUOlHC/view?usp=sharing)."
  },
  {
    id: "experience-kjsiti-hardware",
    section: "KJSITI - Computer Hardware Engineer Intern",
    category: "experience",
    content: "Role: Hardware Engineer Intern at K. J. Somaiya Private Industrial Training Institute (VTI). Period: Jun 2025 – Sep 2025. Responsibilities: Assembled high-performance PC workstations, diagnosed hardware failures and network bottlenecks. Documents: View Internship Certificate (https://drive.google.com/file/d/131jqY3wDWYNYaGTmDodgSuVxEnTbj7tO/view?usp=sharing)."
  },

  // Additional Spatial AI Modules
  {
    id: "project-smarthire-ai",
    section: "SmartHire AI",
    category: "projects",
    content: "Project Name: SmartHire AI. Purpose: AI-powered hiring assistant for resume parsing, candidate scoring, and automated interview screening. Tech Stack: Python, NLP, Machine Learning, Streamlit. Features: TF-IDF candidate matching, skill gap analysis. Live Demo: https://hire-smart-ai.streamlit.app/"
  },
  {
    id: "project-netsec-ai",
    section: "NetSec AI",
    category: "projects",
    content: "Project Name: NetSec AI. Purpose: Network Intrusion Detection System using machine learning for detecting malicious packet anomalies. Tech Stack: Python, Cybersecurity, Scikit-learn, Wireshark, Streamlit. Features: 20% detection boost, real-time alert logs. Live Demo: https://netsec-ai.streamlit.app/"
  },
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
    id: "project-smart-aqi-predictor",
    section: "Smart AQI Predictor",
    category: "projects",
    content: "Project Name: Smart AQI Predictor. Purpose: Forecasts Air Quality Index using environmental telemetry data. Tech Stack: Python, ML, Pandas, NumPy, Streamlit. Features: Real-time AQI breakdown, health warnings. Live Demo: https://smart-aqi-predictor.streamlit.app/"
  },
  {
    id: "project-recipe-predictor",
    section: "Recipe Predictor",
    category: "projects",
    content: "Project Name: Recipe Predictor. Purpose: Recommends gourmet recipes based on available kitchen ingredients using TF-IDF vectorization. Tech Stack: Python, NLP, TF-IDF, Logistic Regression, Streamlit. Features: Dietary filtering, ingredient matching. Live Demo: https://recipro.streamlit.app/"
  },
  {
    id: "project-digit-identifier",
    section: "Digit Identifier",
    category: "projects",
    content: "Project Name: Digit Identifier. Purpose: Real-time handwritten digit recognition using neural networks. Tech Stack: Python, Neural Networks, OpenCV, Streamlit. Features: Canvas drawing interface, real-time prediction confidence. Live Demo: https://digit-identifier.streamlit.app/"
  },
  {
    id: "project-creativity-predictor",
    section: "Creativity Predictor",
    category: "projects",
    content: "Project Name: Creativity Predictor. Purpose: Evaluates creative writing and problem-solving metrics using text analytics. Tech Stack: Python, NLP, ML, Streamlit. Features: Semantic scoring, text sentiment analysis. Live Demo: https://creativity-predictor.streamlit.app/"
  },
  {
    id: "project-ai-energy-predictor",
    section: "AI Energy Predictor",
    category: "projects",
    content: "Project Name: AI Energy Predictor. Purpose: Predicts household energy consumption based on weather data and historical usage. Tech Stack: Python, ML, Regression Models, Streamlit. Features: Load forecasting, energy efficiency tips. Live Demo: https://ai-energy-predictor.streamlit.app/"
  },
  {
    id: "project-sleep-insight-engine",
    section: "Sleep Insight Engine",
    category: "projects",
    content: "Project Name: Sleep Insight Engine. Purpose: Analyzes sleep metrics to provide personalized circadian health insights. Tech Stack: Python, Data Science, Matplotlib, Pandas, Streamlit. Features: Sleep stage visualization, fatigue prevention tips. Live Demo: https://sleep-insight-engine.streamlit.app/"
  },

  // Skills
  {
    id: "skills-programming",
    section: "Programming Languages",
    category: "skills",
    content: "Languages: Python, Java, C, C++, SQL, TypeScript, JavaScript, HTML5, CSS3, Dart, Flutter."
  },
  {
    id: "skills-aiml",
    section: "AI & Machine Learning",
    category: "skills",
    content: "AI/ML Stack: Scikit-learn, Pandas, NumPy, Matplotlib, TF-IDF, Natural Language Processing (NLP), KNN, Logistic Regression, Naive Bayes, Neural Networks, Recommendation Systems, Gemini API, Claude, Prompt Engineering, Azure Cognitive Services."
  },
  {
    id: "skills-databases-cloud",
    section: "Databases & Full-Stack Cloud",
    category: "skills",
    content: "Databases & Full-Stack Cloud: PostgreSQL, Prisma ORM, MySQL, Firebase Firestore, Supabase, Auth.js, Microsoft Azure, Vercel, Streamlit Cloud."
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
    content: "🏆 1st Place – AICons Competition (TechXpression 2025, KJSIT). 🥇 1st Place – Tech Trivia & Tech Stake (Renaissance 2024, KJSIT). 🎯 Top 45 – GDG Figma UI/UX Hackathon (PixelVerse 2026, SIES GST). 🎖️ Rank 132nd in All India / Maharashtra Diploma Merit List (out of ~70,000 candidates with 97.03% score)."
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
    section: "Contact Information, Social Links & Resume",
    category: "contact",
    content: "Email: nikhileshchavdawork@gmail.com | Phone: +91 8928027482 | Location: Mumbai, Maharashtra, India. Resume: https://drive.google.com/file/d/1bMLgf8vuixWyW-fTRGxj06Ev_FtU1KjF/view?usp=sharing | LinkedIn: https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/ | GitHub: https://github.com/Nik-2208 | Portfolio: https://nikhileshchavda.com"
  },

  // FAQs
  {
    id: "faq-hire",
    section: "Why Hire Nik?",
    category: "faq",
    content: "Why Hire Nik? I am currently pursuing SY B.Tech in Computer Engineering at SPIT Mumbai after securing Rank 132 (out of 70,000+ candidates, 97.03% score) in my Diploma. I combine elite academic rigor with proven engineering execution: 3 Major Flagship Projects (01 ANTWIRE, 02 ANT BRAIN KEYBOARD, 03 ASCENDRA Life RPG) alongside 10+ deployed AI/ML systems and multiple industry internships."
  }
];
