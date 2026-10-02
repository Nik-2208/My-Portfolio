import { KnowledgeChunk, knowledgeBase } from './knowledge';
import { buildVocabulary, embedTexts } from './embeddings';
import { rankChunks } from './similarity';

// --- 1. Intent Categories ---
export type IntentType =
  | 'PROFILE'
  | 'EDUCATION'
  | 'EXPERIENCE'
  | 'PROJECTS'
  | 'SKILLS'
  | 'ACHIEVEMENTS'
  | 'CERTIFICATIONS'
  | 'CONTACT'
  | 'CAREER_GOALS'
  | 'GENERAL';

// --- 2. Typo & Synonym Normalization ---
const TYPO_MAP: Record<string, string> = {
  pyhton: 'python',
  pythn: 'python',
  mchine: 'machine learning',
  machin: 'machine learning',
  ml: 'machine learning',
  ai: 'artificial intelligence',
  stremit: 'streamlit',
  'stream lit': 'streamlit',
  scikit: 'scikit-learn',
  sklearn: 'scikit-learn',
  firebasee: 'firebase',
  supabas: 'supabase',
  reactjs: 'react',
  nxt: 'next.js',
  nextjs: 'next.js',
  framer: 'framer motion',
  cpp: 'c++',
  cplusplus: 'c++',
  diplma: 'diploma',
  deploma: 'diploma',
  projct: 'projects',
  projets: 'projects',
  intern: 'internship',
  workplace: 'experience',
  employers: 'company',
  employer: 'company',
  ascedra: 'ascendra',
  ascend: 'ascendra',
  antwiree: 'antwire',
  wire: 'antwire',
  rpg: 'ascendra',
};

// --- 3. Knowledge Graph Entity Relationships ---
const KNOWLEDGE_GRAPH: Record<string, {
  type: IntentType;
  title: string;
  summary: string;
  details: string[];
}> = {
  spit: {
    type: 'EDUCATION',
    title: 'Sardar Patel Institute of Technology (SPIT) — Current Education',
    summary: 'SY B.Tech in Computer Engineering | Direct Second Year Pathway (2026 – 2029)',
    details: [
      '🏛️ **Institution**: Sardar Patel Institute of Technology (SPIT), Mumbai — one of Mumbai\'s leading engineering institutes.',
      '🎓 **Current Status**: Enrolled in Second Year (SY) B.Tech in Computer Engineering via Direct Second Year.',
      '📚 **Focus Areas**: Advanced Computer Architecture, Operating Systems, Distributed Systems, Machine Learning & Algorithms.',
      '📜 **Prior Academic Foundation**: Completed Diploma in Computer Engineering at K. J. Somaiya Polytechnic (Final Score: 97.03%, Rank 132 in Maharashtra).'
    ]
  },
  sardar: {
    type: 'EDUCATION',
    title: 'Sardar Patel Institute of Technology (SPIT) — Current Education',
    summary: 'SY B.Tech in Computer Engineering | Direct Second Year Pathway (2026 – 2029)',
    details: [
      '🏛️ **Institution**: Sardar Patel Institute of Technology (SPIT), Mumbai — one of Mumbai\'s leading engineering institutes.',
      '🎓 **Current Status**: Enrolled in Second Year (SY) B.Tech in Computer Engineering via Direct Second Year.',
      '📚 **Focus Areas**: Advanced Computer Architecture, Operating Systems, Distributed Systems, Machine Learning & Algorithms.',
      '📜 **Prior Academic Foundation**: Completed Diploma in Computer Engineering at K. J. Somaiya Polytechnic (Final Score: 97.03%, Rank 132 in Maharashtra).'
    ]
  },
  ascendra: {
    type: 'PROJECTS',
    title: '03 — ASCENDRA: Life, turned into an RPG',
    summary: 'Flagship Major Project | Web-based Life RPG Platform',
    details: [
      '⚔️ **Core Concept**: Transforms real-world self-improvement (studying, coding, fitness, focus, habits, meditation, brain training, productivity, goal completion) into RPG character progression.',
      '🎮 **Game Systems**: Centralized XP & Level Engine, Skill Tree & Hero Attributes (Intelligence, Strength, Focus, Creativity), Quests & Boss Battles, World & Villages Progression, Brain Lab, Streaks & Resilience, Campaigns, Inventory & Virtual Economy, Chronicles, Ascension / Prestige.',
      '🛠️ **Technical Engineering**: Built on Next.js 16 (App Router), React 19, TypeScript, Prisma ORM, PostgreSQL, Auth.js, Server Actions, Event-Driven Gameplay, and Database-Authoritative State Management.',
      '🔗 **Live Demo**: [ascendra-game.vercel.app](https://ascendra-game.vercel.app) | **Repository**: [GitHub](https://github.com/Nik-2208)'
    ]
  },
  antwire: {
    type: 'PROJECTS',
    title: '01 — ANTWIRE',
    summary: 'Extensible Computational Ant-Brain & Superorganism Platform',
    details: [
      '🧠 **Computational Neurobiology**: Canonical ~55K-neuron computational ant-brain topology with isolated per-ant runtime (private synapses, activation states, plasticity & memory).',
      '🎯 **Task Environment API**: Gym-style `observe → act → reward → next observation → done` MDP loop with 14-dimensional sensory observation system and motor steering/grasping.',
      '🧬 **Stigmergy & Superorganism**: 6-channel pheromone diffusion/decay dynamics and emergent colony division of labor (foraging, excavation, nursing, patrolling, living bridges).',
      '🔍 **Neural Inspection & Causal Tracing**: Real-time \'Why did the ant do that?\' diagnostics with 3D neuropil atlas and neural-spike raster plots.',
      '💻 **Tech Stack**: TypeScript, React, Node.js, Computational Neuroscience, LIF Spiking Neurons, Multi-Agent RL, Pheromone Simulation, Gym MDPs.',
      '🔗 **Live Demo**: [antwire.vercel.app](https://antwire.vercel.app) | **Repository**: [AntWire on GitHub](https://github.com/Nik-2208/AntWire)'
    ]
  },
  antbrain: {
    type: 'PROJECTS',
    title: '02 — ANT BRAIN KEYBOARD',
    summary: 'Biologically Inspired Multi-Agent Learning & Spiking Neural Simulation',
    details: [
      '🧠 **Biologically Informed Model**: Simulates an Ant-6DCT brain architecture with 128 LIF spiking neurons, 256 directed synapses, 14 sensory channels, and 12 neuropil-inspired regions.',
      '🐜 **Multi-Agent Keyboard Control**: Trains individual ants and colonies to operate a keyboard via 4 motor actions (FORWARD, TURN_LEFT, TURN_RIGHT, INTERACT/PRESS).',
      '🧬 **Colony Coordination**: Features pheromone-based communication, spatial/path memory, and reward-modulated synaptic plasticity.',
      '⚙️ **Compact Computational Package**: ~38 KiB reproducible .antbrain model package structurally audited for synthetic RL experiments.',
      '💻 **Tech Stack**: Python, Spiking Neural Networks (LIF), Multi-Agent RL, Neuropil Circuits, Pheromone Dynamics.',
      '🔗 **Live Demo**: [ant-brain-keyboard.vercel.app](https://ant-brain-keyboard.vercel.app) | **Repository**: [GitHub](https://github.com/Nik-2208)'
    ]
  },
  keyboard: {
    type: 'PROJECTS',
    title: '02 — ANT BRAIN KEYBOARD',
    summary: 'Biologically Inspired Multi-Agent Learning & Spiking Neural Simulation',
    details: [
      '🧠 **Biologically Informed Model**: Simulates an Ant-6DCT brain architecture with 128 LIF spiking neurons, 256 directed synapses, 14 sensory channels, and 12 neuropil-inspired regions.',
      '🐜 **Multi-Agent Keyboard Control**: Trains individual ants and colonies to operate a keyboard via 4 motor actions (FORWARD, TURN_LEFT, TURN_RIGHT, INTERACT/PRESS).',
      '🧬 **Colony Coordination**: Features pheromone-based communication, spatial/path memory, and reward-modulated synaptic plasticity.',
      '⚙️ **Compact Computational Package**: ~38 KiB reproducible .antbrain model package structurally audited for synthetic RL experiments.',
      '💻 **Tech Stack**: Python, Spiking Neural Networks (LIF), Multi-Agent RL, Neuropil Circuits, Pheromone Dynamics.',
      '🔗 **Live Demo**: [ant-brain-keyboard.vercel.app](https://ant-brain-keyboard.vercel.app) | **Repository**: [GitHub](https://github.com/Nik-2208)'
    ]
  },
  finmaverick: {
    type: 'EXPERIENCE',
    title: 'Fin Maverick — AI Video Generation Intern',
    summary: 'Duration: 1 July 2026 – Present | Brand Operated by Pravesio Consulting Private Limited (Remote)',
    details: [
      '**Video Generation**: Generated instructional and promotional videos using company approved AI video tools.',
      '**Quality Control**: Performed quality checks (QC) on video outputs to revise errors and align with brand standards.',
      '**Documents**: View Certificate (https://drive.google.com/file/d/13X4dQ-44cNy8SjpOA-LdyqYvJs9MxGH4/view?usp=sharing), View Letter of Recommendation by Reporting Manager Niyati Arora (https://drive.google.com/file/d/1yVU29gpxrdeMrcDB85R6Ka3HvoW6hdgp/view?usp=drive_link).'
    ]
  },
  maverick: {
    type: 'EXPERIENCE',
    title: 'Fin Maverick — AI Video Generation Intern',
    summary: 'Duration: 1 July 2026 – Present | Brand Operated by Pravesio Consulting Private Limited (Remote)',
    details: [
      '**Video Generation**: Generated instructional and promotional videos using company approved AI video tools.',
      '**Quality Control**: Performed quality checks (QC) on video outputs to revise errors and align with brand standards.',
      '**Documents**: View Certificate (https://drive.google.com/file/d/13X4dQ-44cNy8SjpOA-LdyqYvJs9MxGH4/view?usp=sharing), View Letter of Recommendation by Reporting Manager Niyati Arora (https://drive.google.com/file/d/1yVU29gpxrdeMrcDB85R6Ka3HvoW6hdgp/view?usp=drive_link).'
    ]
  },
  edujr: {
    type: 'EXPERIENCE',
    title: 'EduJR — Content Writing & Email Marketing Intern',
    summary: 'Duration: April 2026 – June 2026 | Company: EduJR (edujr.com)',
    details: [
      '**Promoted Role**: Initially hired for Email Marketing and promoted to Content Writing Intern following exceptional outreach performance.',
      '**Email Marketing (4 Apr – 30 May)**: Sent ~100 daily client emails. View Certificate (https://drive.google.com/file/d/1GDQvgmwXCb8VRLJzHByxzljd-GDLBn2Y/view?usp=sharing).',
      '**Content Writing (28 Apr – 25 Jun)**: Authored 40+ blog posts. View Certificate (https://drive.google.com/file/d/1NsVepnJgnFrQxaP_fzDiKn9NMBCGwQYx/view?usp=sharing).'
    ]
  },
  vois: {
    type: 'EXPERIENCE',
    title: 'AICTE - Edunet Foundation (Vodafone Idea Foundation) — Cybersecurity Intern',
    summary: 'Period: Dec 2025 – Jan 2026 | Organization: Vodafone Idea Foundation & AICTE',
    details: [
      '**Threat Simulation**: Built educational keylogger projects and threat detection workflows.',
      '**Packet Analysis**: Inspected network traffic and analyzed data packets using Wireshark.',
      '**AI Integration**: Integrated machine learning models for automated threat and anomaly monitoring.'
    ]
  },
  vodafone: {
    type: 'EXPERIENCE',
    title: 'AICTE - Edunet Foundation (Vodafone Idea Foundation) — Cybersecurity Intern',
    summary: 'Period: Dec 2025 – Jan 2026 | Organization: Vodafone Idea Foundation & AICTE',
    details: [
      '**Threat Simulation**: Built educational keylogger projects and threat detection workflows.',
      '**Packet Analysis**: Inspected network traffic and analyzed data packets using Wireshark.',
      '**AI Integration**: Integrated machine learning models for automated threat and anomaly monitoring.'
    ]
  },
  azure: {
    type: 'EXPERIENCE',
    title: 'AICTE - Edunet Foundation (Microsoft) — Azure AI Intern',
    summary: 'Period: 2025 | Organization: Microsoft & AICTE',
    details: [
      '**Cloud Deployment**: Configured Azure cloud resources and Cognitive Services for model execution.',
      '**Intelligent Data Pipelines**: Deployed machine learning models to cloud endpoints.'
    ]
  },
  kjsac: {
    type: 'EXPERIENCE',
    title: 'KJSAC — LMS Administrator & E-Content Developer',
    summary: 'Period: Jul 2025 – Sep 2025 | Institution: K. J. Somaiya College of Arts & Commerce',
    details: [
      '**LMS Administration**: Administered Moodle LMS platform for faculty and students.',
      '**Video Production**: Produced and edited 50+ lecture videos using OBS Studio and Canva.',
      '**Documents**: View Internship Certificate (https://drive.google.com/file/d/1BvNUjNFwQWGdzMOgByMfM4w5dBot6Vu8/view?usp=sharing), View Letter of Recommendation (https://drive.google.com/file/d/1pDMxJxq0iay_v-DrX9b9o5DDTqNUOlHC/view?usp=sharing).'
    ]
  },
  kjsiti: {
    type: 'EXPERIENCE',
    title: 'KJSITI — Computer Hardware Engineer Intern',
    summary: 'Period: Jun 2025 – Sep 2025 | Organization: K. J. Somaiya Private ITI (VTI)',
    details: [
      '**Hardware Diagnostics**: Assembled and upgraded high-performance PC workstations.',
      '**Infrastructure**: Maintained campus network hardware and diagnosed system bottlenecks.',
      '**Documents**: View Internship Certificate (https://drive.google.com/file/d/131jqY3wDWYNYaGTmDodgSuVxEnTbj7tO/view?usp=sharing).'
    ]
  },
  smarthire: {
    type: 'PROJECTS',
    title: 'SmartHire AI — Candidate Screening System',
    summary: 'Tech Stack: Python, NLP, TF-IDF, Streamlit, Scikit-learn',
    details: [
      '**Purpose**: AI hiring assistant that parses resumes, scores candidates, and analyzes skill gaps.',
      '**Features**: TF-IDF cosine similarity matching, automated scoring dashboard.',
      '**Live Demo**: https://hire-smart-ai.streamlit.app/'
    ]
  },
  netsec: {
    type: 'PROJECTS',
    title: 'NetSec AI — Network Intrusion Detection System',
    summary: 'Tech Stack: Python, Cybersecurity, Wireshark, Scikit-learn, Streamlit',
    details: [
      '**Purpose**: ML-powered network intrusion detection system classifying suspicious traffic.',
      '**Impact**: Optimized feature extraction pipeline improving anomaly detection accuracy by 20%.',
      '**Live Demo**: https://netsec-ai.streamlit.app/'
    ]
  },
  rank: {
    type: 'EDUCATION',
    title: 'Academic Merit Distinction — Rank 132nd in Maharashtra',
    summary: 'K. J. Somaiya Polytechnic | Computer Engineering Diploma 2026',
    details: [
      '🏆 **State Merit Rank**: **Ranked 132nd** in the Maharashtra State Diploma Merit List among ~70,000+ candidates.',
      '📊 **Final Diploma Percentage**: **97.03%**',
      '📚 **Core Mastery**: Data Structures, OOP (Java/C++), SQL, Machine Learning, Web Engineering.'
    ]
  },
  resume: {
    type: 'CONTACT',
    title: 'Official Resume & Credentials',
    summary: 'Nikhilesh H. Chavda — Full-Stack AI Engineer',
    details: [
      '📄 **Download Official Resume**: [Google Drive Resume PDF](https://drive.google.com/file/d/1bMLgf8vuixWyW-fTRGxj06Ev_FtU1KjF/view?usp=sharing)',
      '📬 **Email**: nikhileshchavdawork@gmail.com',
      '💼 **LinkedIn**: https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/',
      '🐙 **GitHub**: https://github.com/Nik-2208'
    ]
  }
};

let vocabulary: string[] = [];

export function initRAG() {
  vocabulary = buildVocabulary(knowledgeBase.map(chunk => chunk.content.toLowerCase()));
}

export function queryRAG(userQuery: string): string {
  if (!userQuery || !userQuery.trim()) {
    return "👋 Hi! I'm **Nik** (Nikhilesh Chavda). Ask me about my **SPIT B.Tech studies**, **major projects (ANTWIRE, ANT BRAIN, ASCENDRA)**, **work experience**, **diploma score & 132nd rank**, or **technical skills**!";
  }

  if (vocabulary.length === 0) {
    initRAG();
  }

  const normalized = normalizeQuery(userQuery);

  // Step 1: Entity Extraction & Knowledge Graph Lookup
  const entityMatch = extractEntity(normalized);

  // Step 2: Intent Classification
  const intent = classifyIntent(normalized, entityMatch?.type);

  // Step 3: Route based on Intent
  if (entityMatch && (intent === entityMatch.type || intent === 'GENERAL')) {
    return formatEntityResponse(entityMatch);
  }

  switch (intent) {
    case 'EXPERIENCE':
      return formatExperienceIntent(normalized);
    case 'PROJECTS':
      return formatProjectsIntent(normalized);
    case 'EDUCATION':
      return formatEducationIntent();
    case 'SKILLS':
      return formatSkillsIntent(normalized);
    case 'ACHIEVEMENTS':
    case 'CERTIFICATIONS':
      return formatAchievementsIntent();
    case 'CONTACT':
      return formatContactIntent();
    case 'CAREER_GOALS':
      return formatGoalsIntent();
    case 'PROFILE':
      return formatProfileIntent();
    default:
      return formatVectorSearchFallback(normalized, userQuery);
  }
}

// Normalize user query
function normalizeQuery(raw: string): string {
  let cleaned = raw.toLowerCase().trim();
  for (const [typo, replacement] of Object.entries(TYPO_MAP)) {
    const regex = new RegExp(`\\b${typo}\\b`, 'g');
    cleaned = cleaned.replace(regex, replacement);
  }
  return cleaned;
}

// Step 1: Named Entity Extraction
function extractEntity(query: string) {
  for (const [key, entity] of Object.entries(KNOWLEDGE_GRAPH)) {
    if (query.includes(key)) {
      return entity;
    }
  }
  return null;
}

// Step 2: Intent Classification Engine
function classifyIntent(query: string, entityIntent?: IntentType): IntentType {
  // Experience Intent (Strict Priority)
  if (query.match(/\b(work|worked|company|companies|employer|employers|organization|organizations|office|job|jobs|career|experience|intern|internship|internships|placement|training|hired|employment|workplace|role|roles|position|positions|history)\b/i) || query.includes("where did you work") || query.includes("previous company")) {
    return 'EXPERIENCE';
  }

  // Projects Intent
  if (query.match(/\b(project|projects|built|developed|created|app|apps|application|applications|repo|repository|github|system|systems|portfolio|ascendra|antwire|antbrain|keyboard)\b/i)) {
    return 'PROJECTS';
  }

  // Education Intent
  if (query.match(/\b(education|study|studied|studying|degree|btech|b\.tech|current education|spit|sardar patel|college|polytechnic|diploma|score|marks|rank|merit|percentage|gpa|cgpa|somaiya|school|97\.03%)\b/i)) {
    return 'EDUCATION';
  }

  // Skills Intent
  if (query.match(/\b(skill|skills|know|expertise|tech stack|language|languages|framework|frameworks|library|libraries|tool|tools|technology|technologies|programming|python|java|sql|c\+\+|typescript|prisma|postgres|react|next|docker|figma)\b/i)) {
    return 'SKILLS';
  }

  // Achievements & Hackathons
  if (query.match(/\b(achievement|achievements|award|awards|hackathon|hackathons|contest|win|won|place|trophy|cert|certification|certifications)\b/i)) {
    return 'ACHIEVEMENTS';
  }

  // Contact / Resume Info
  if (query.match(/\b(contact|email|phone|reach|linkedin|social|connect|location|address|resume|cv|download resume)\b/i)) {
    return 'CONTACT';
  }

  // Profile / About
  if (query.match(/\b(who|about|nik|biography|identity|myself|yourself)\b/i)) {
    return 'PROFILE';
  }

  return entityIntent || 'GENERAL';
}

// Entity Format Output
function formatEntityResponse(entity: typeof KNOWLEDGE_GRAPH[string]): string {
  return `🏢 **${entity.title}**\n\n` +
    `*${entity.summary}*\n\n` +
    entity.details.map(d => `• ${d}`).join('\n');
}

// Intent 1: Strict Experience Response
function formatExperienceIntent(query: string): string {
  return "💼 **Professional Experience & Internships**\n\n" +
    "• **Fin Maverick — AI Video Generation Intern** (1 Jul 2026 – Present)\n" +
    "  *Generated instructional/promotional videos using company-approved AI tools and workflows, performed quality checks (QC), delivered output targets, and coordinated with marketing. [View Certificate](https://drive.google.com/file/d/13X4dQ-44cNy8SjpOA-LdyqYvJs9MxGH4/view?usp=sharing) | [View LOR](https://drive.google.com/file/d/1yVU29gpxrdeMrcDB85R6Ka3HvoW6hdgp/view?usp=drive_link).*\n\n" +
    "• **EduJR — Content Writing Intern** (28 Apr 2026 – 25 Jun 2026)\n" +
    "  *Earned this content-writing role after outstanding performance as an Email Marketing Intern. Authored 40+ blog posts over two months. [View Certificate](https://drive.google.com/file/d/1NsVepnJgnFrQxaP_fzDiKn9NMBCGwQYx/view?usp=sharing).*\n\n" +
    "• **EduJR — Email Marketing Intern** (04 Apr 2026 – 30 May 2026)\n" +
    "  *Sent ~100 daily client emails, managed campaigns and B2B communications. [View Certificate](https://drive.google.com/file/d/1GDQvgmwXCb8VRLJzHByxzljd-GDLBn2Y/view?usp=sharing).*\n\n" +
    "• **AICTE - Edunet Foundation (Vodafone Idea) — Cybersecurity Intern** (Dec 2025 – Jan 2026)\n" +
    "  *Built keylogger threat simulations, executed network packet inspection with Wireshark, integrated AI monitoring.*\n\n" +
    "• **KJSAC — LMS Administrator & E-Content Developer** (Jul 2025 – Sep 2025)\n" +
    "  *Administered Moodle LMS platform, produced 50+ lecture videos with OBS & Canva. [View Certificate](https://drive.google.com/file/d/1BvNUjNFwQWGdzMOgByMfM4w5dBot6Vu8/view?usp=sharing) | [View LOR](https://drive.google.com/file/d/1pDMxJxq0iay_v-DrX9b9o5DDTqNUOlHC/view?usp=sharing).*\n\n" +
    "• **VTI (K. J. Somaiya Private ITI) — Computer Hardware Engineer Intern** (Jun 2025 – Sep 2025)\n" +
    "  *Assembled PC workstations, diagnosed hardware bottlenecks and network connectivity failures. [View Certificate](https://drive.google.com/file/d/131jqY3wDWYNYaGTmDodgSuVxEnTbj7tO/view?usp=sharing).*\n\n" +
    "• **AICTE - Edunet Foundation (Microsoft) — Azure AI Intern** (2025)\n" +
    "  *Deployed machine learning models on Microsoft Azure Cognitive Services and configured cloud infrastructure.*";
}

// Intent 2: Strict Projects Response (Sequence: 01 ANTWIRE -> 02 ANT BRAIN -> 03 ASCENDRA)
function formatProjectsIntent(query: string): string {
  return "🚀 **Major Projects Sequence & Engineering Systems**\n\n" +
    "My primary projects follow an intentional sequence of increasingly ambitious engineering:\n\n" +
    "• **01 — ANTWIRE**: Extensible computational ant-brain and superorganism simulation platform combining spiking neural models (~55K neurons), multi-agent RL, 6-channel pheromone stigmergy, and real-time neural causal tracing ([Live Demo](https://antwire.vercel.app) | [GitHub](https://github.com/Nik-2208/AntWire); TypeScript, React, Node.js, LIF SNNs, Gym MDPs).\n\n" +
    "• **02 — ANT BRAIN KEYBOARD**: Biologically inspired ant-brain simulation training individual & collaborative ants to operate a keyboard using spiking neural dynamics (128 LIF neurons, 256 synapses), spatial memory, reward-based learning, and pheromone coordination ([Live Demo](https://ant-brain-keyboard.vercel.app) | [GitHub](https://github.com/Nik-2208); Python, LIF SNNs, Multi-Agent RL).\n\n" +
    "• **03 — ASCENDRA (Flagship Major Project)**: *\"Life, turned into an RPG.\"* A web-based Life RPG transforming real-world self-improvement into character progression (XP engine, skill trees, quests, boss battles, world progression, brain lab, chronicles, ascension) ([Live Demo](https://ascendra-game.vercel.app) | [GitHub](https://github.com/Nik-2208); Next.js 16, React 19, TypeScript, Prisma, PostgreSQL, Auth.js, Server Actions).\n\n" +
    "**Additional Spatial AI Modules**:\n" +
    "• **SmartHire AI** (Resume parsing & screening), **NetSec AI** (Network intrusion detection), **Personalized Learning Dashboard**, **AI Event Planner**, **Smart AQI Predictor**, **Recipe Predictor** & **Digit Identifier**.";
}

// Intent 3: Strict Education Response (SPIT Current + Somaiya Completed)
function formatEducationIntent(): string {
  return "🎓 **Education Hierarchy & Academic Distinction**\n\n" +
    "• **CURRENT EDUCATION**: **Sardar Patel Institute of Technology (SPIT)**, Mumbai\n" +
    "  *Degree: **SY B.Tech in Computer Engineering** (Direct Second Year Pathway, 2026 – 2029). One of Mumbai's leading engineering institutes.*\n\n" +
    "• **COMPLETED EDUCATION**: **K. J. Somaiya Polytechnic**, Mumbai (Completed: 2026)\n" +
    "  *Degree: Diploma in Computer Engineering — Final Score: **97.03%** | 🏆 **All India / State Merit Rank: 132 among 70,000+ candidates**.*\n\n" +
    "• **COMPLETED SCHOOLING**: **P. G. Garodia School** (ICSE Board — **93.4%** Distinction).";
}

// Intent 4: Skills Response
function formatSkillsIntent(query: string): string {
  return "🛠️ **Technical Skill Matrix**\n\n" +
    "• **Languages**: TypeScript, JavaScript, Python (Primary), Java, C, C++, SQL, HTML5, CSS3, Dart\n" +
    "• **Full-Stack & Systems**: Next.js 16, React 19, Prisma ORM, PostgreSQL, Auth.js, Server Actions, WebRTC, WebSockets, TailwindCSS, Framer Motion\n" +
    "• **AI & ML**: Scikit-Learn, Pandas, NumPy, Matplotlib, NLP, TF-IDF, Gemini API, Claude, Azure Cognitive Services\n" +
    "• **Databases & Cloud**: PostgreSQL, MySQL, Firebase Firestore, Supabase, Microsoft Azure, Vercel, Streamlit Cloud\n" +
    "• **Developer Tools**: Git, GitHub, Docker, n8n Automation, Figma, Canva, OBS Studio.";
}

// Intent 5: Achievements & Certifications Response
function formatAchievementsIntent(): string {
  return "🏆 **Achievements & Certifications**\n\n" +
    "• **1st Place** – AICons Competition (TechXpression 2025, KJSIT)\n" +
    "• **1st Place** – Tech Trivia & Tech Stake (Renaissance 2024, KJSIT)\n" +
    "• **Top 45** – GDG Figma UI/UX Hackathon (PixelVerse 2026, SIES GST)\n" +
    "• **All India Merit Rank 132** – Maharashtra Diploma Merit List (out of ~70,000 candidates with 97.03% score)\n" +
    "• **Certifications**: IBM Machine Learning with Python, Coursera Python Data Analysis, Microsoft Azure AI-900, Deloitte & Tata GenAI Analytics.";
}

// Intent 6: Contact & Resume Response
function formatContactIntent(): string {
  return "📬 **Get In Touch & Candidate Dossier**\n\n" +
    "• 📄 **Resume PDF**: [Download Official Resume](https://drive.google.com/file/d/1bMLgf8vuixWyW-fTRGxj06Ev_FtU1KjF/view?usp=sharing)\n" +
    "• 📧 **Email**: [nikhileshchavdawork@gmail.com](mailto:nikhileshchavdawork@gmail.com)\n" +
    "• 📞 **Phone**: +91 8928027482\n" +
    "• 📍 **Location**: Mumbai, Maharashtra, India\n" +
    "• 💼 **LinkedIn**: [Nikhilesh Chavda on LinkedIn](https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/)\n" +
    "• 🐙 **GitHub**: [Nik-2208 on GitHub](https://github.com/Nik-2208)";
}

// Intent 7: Career Goals
function formatGoalsIntent(): string {
  return "🎯 **Career Ambitions & Vision**\n\n" +
    "My goal is becoming a world-class AI Engineer and Systems Architect, building impactful generative AI agents, distributed protocols, and life-gamification ecosystems like ASCENDRA. I am actively seeking high-impact software engineering opportunities and research collaborations.";
}

// Intent 8: Profile / About
function formatProfileIntent(): string {
  return "👤 **About Nikhilesh H. Chavda**\n\n" +
    "I'm a Full-Stack AI Engineer and Computer Engineering student at **Sardar Patel Institute of Technology (SPIT)**, Mumbai (Direct Second Year). Previously, I achieved **Rank 132 out of 70,000+ candidates (97.03%)** in my Computer Engineering Diploma at K. J. Somaiya Polytechnic.\n\n" +
    "I build ambitious systems including **01 ANTWIRE** (Distributed P2P Protocol), **02 ANT BRAIN KEYBOARD** (Biologically Inspired Multi-Agent Ant Simulation), and **03 ASCENDRA** (Life RPG Platform).";
}

// Vector Search Fallback (Only used if no explicit intent matched)
function formatVectorSearchFallback(normalized: string, rawQuery: string): string {
  const queryVector = embedTexts([normalized], vocabulary)[0];
  const chunkVectors = embedTexts(knowledgeBase.map(chunk => chunk.content.toLowerCase()), vocabulary);
  const ranked = rankChunks(queryVector, chunkVectors, knowledgeBase);
  const topChunks = ranked.filter(r => r.score > 0.02).slice(0, 3);

  if (topChunks.length > 0) {
    return "🧠 **Nik's Portfolio Perspective**\n\n" +
      topChunks.map(c => `• **${c.chunk.section}**: ${c.chunk.content}`).join('\n\n');
  }

  return formatProfileIntent();
}
