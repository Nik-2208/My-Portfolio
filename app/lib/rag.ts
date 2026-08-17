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
};

// --- 3. Knowledge Graph Entity Relationships ---
const KNOWLEDGE_GRAPH: Record<string, {
  type: IntentType;
  title: string;
  summary: string;
  details: string[];
}> = {
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
  }
};

let vocabulary: string[] = [];

export function initRAG() {
  vocabulary = buildVocabulary(knowledgeBase.map(chunk => chunk.content.toLowerCase()));
}

export function queryRAG(userQuery: string): string {
  if (!userQuery || !userQuery.trim()) {
    return "👋 Hi! I'm **Nik** (Nikhilesh Chavda). Ask me about my **work experience**, **AI projects**, **diploma score & 132nd rank**, or **technical skills**!";
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
  if (query.match(/\b(project|projects|built|developed|created|app|apps|application|applications|repo|repository|github|system|systems|portfolio)\b/i)) {
    return 'PROJECTS';
  }

  // Education Intent
  if (query.match(/\b(education|study|studied|college|polytechnic|diploma|score|marks|rank|merit|percentage|gpa|cgpa|somaiya|school|97\.03%)\b/i)) {
    return 'EDUCATION';
  }

  // Skills Intent
  if (query.match(/\b(skill|skills|know|expertise|tech stack|language|languages|framework|frameworks|library|libraries|tool|tools|technology|technologies|programming|python|java|sql|c\+\+|streamlit|scikit|pandas|numpy|react|next|docker|figma)\b/i)) {
    return 'SKILLS';
  }

  // Achievements & Hackathons
  if (query.match(/\b(achievement|achievements|award|awards|hackathon|hackathons|contest|win|won|place|trophy|cert|certification|certifications)\b/i)) {
    return 'ACHIEVEMENTS';
  }

  // Contact Info
  if (query.match(/\b(contact|email|phone|reach|linkedin|social|connect|location|address)\b/i)) {
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

// Intent 1: Strict Experience Response (NO PROJECTS unless asked)
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

// Intent 2: Strict Projects Response
function formatProjectsIntent(query: string): string {
  return "🚀 **Featured AI Projects & Systems**\n\n" +
    "I have engineered and deployed 10+ spatial AI modules on Streamlit Cloud:\n\n" +
    "• **SmartHire AI**: AI resume matching & candidate screening system (Python, TF-IDF, Streamlit)\n" +
    "• **NetSec AI**: Machine learning network intrusion detection system (20% detection boost, Wireshark)\n" +
    "• **Personalized Learning Dashboard**: Predictive student performance analytics (Scikit-Learn, Streamlit)\n" +
    "• **AI Event Planner**: Automated event scheduling & vendor management (NLP, Python)\n" +
    "• **Smart AQI Predictor**: Environmental air quality forecasting dashboard (ML, Pandas)\n" +
    "• **Recipe Predictor** & **Digit Identifier**: Computer vision & ingredient recommendation systems.";
}

// Intent 3: Strict Education Response
function formatEducationIntent(): string {
  return "🎓 **Education & Academic Distinction**\n\n" +
    "• **Diploma in Computer Engineering** @ K. J. Somaiya Polytechnic, Mumbai (Completed 2026)\n" +
    "• **Final Diploma Score**: **97.03%**\n" +
    "• 🏆 **State Merit Rank**: **Ranked 132nd** in the Maharashtra State Diploma Merit List among ~70,000+ candidates!\n" +
    "• **Key Coursework**: Data Structures & Algorithms, OOP (Java/C++), Relational Databases (SQL), Web Technologies, Machine Learning.";
}

// Intent 4: Skills Response
function formatSkillsIntent(query: string): string {
  return "🛠️ **Technical Skill Matrix**\n\n" +
    "• **Programming Languages**: Python (Primary), Java, C, C++, SQL, JavaScript, HTML5, CSS3, Dart\n" +
    "• **AI & ML**: Scikit-Learn, Pandas, NumPy, Matplotlib, NLP, TF-IDF, Gemini API, Claude, Azure Cognitive Services\n" +
    "• **Databases & Cloud**: MySQL, Firebase Firestore, Supabase, Microsoft Azure, Vercel\n" +
    "• **Developer Tools & Design**: Git, GitHub, Docker, n8n Automation, Figma (Top 45 Rank), Canva, OBS Studio\n" +
    "• **Frontend Engines**: Next.js 16, React 19, TailwindCSS, Framer Motion, GSAP.";
}

// Intent 5: Achievements & Certifications Response
function formatAchievementsIntent(): string {
  return "🏆 **Achievements & Certifications**\n\n" +
    "• **1st Place** – AICons Competition (TechXpression 2025, KJSIT)\n" +
    "• **1st Place** – Tech Trivia & Tech Stake (Renaissance 2024, KJSIT)\n" +
    "• **Top 45** – GDG Figma UI/UX Hackathon (PixelVerse 2026, SIES GST)\n" +
    "• **State Rank 132nd** – Maharashtra Diploma Merit List (out of ~70,000 candidates, 97.03% score)\n" +
    "• **Certifications**: IBM Machine Learning with Python, Coursera Python Data Analysis, Microsoft Azure AI-900, Deloitte & Tata GenAI Analytics.";
}

// Intent 6: Contact Response
function formatContactIntent(): string {
  return "📬 **Get In Touch With Nik**\n\n" +
    "• **Email**: [nikhileshchavdawork@gmail.com](mailto:nikhileshchavdawork@gmail.com)\n" +
    "• **Phone**: +91 8928027482\n" +
    "• **Location**: Mumbai, Maharashtra, India\n" +
    "• **LinkedIn**: [Nikhilesh Chavda on LinkedIn](https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/)\n" +
    "• **GitHub**: [Nik-2208 on GitHub](https://github.com/Nik-2208)";
}

// Intent 7: Career Goals
function formatGoalsIntent(): string {
  return "🎯 **Career Ambitions & Vision**\n\n" +
    "My goal is becoming a world-class AI Engineer and Frontend Architect, building impactful generative AI agents, predictive ML systems, and high-performance human-computer interfaces. I am actively seeking AI/ML engineering opportunities and research projects.";
}

// Intent 8: Profile / About
function formatProfileIntent(): string {
  return "👤 **About Nikhilesh Chavda**\n\n" +
    "I'm a Full-Stack AI Engineer based in Mumbai, India. I scored **97.03%** in my Computer Engineering Diploma (Ranked **132nd** in Maharashtra out of ~70,000 candidates).\n\n" +
    "My mind operates as an intelligent neural matrix: combining relentless curiosity with disciplined engineering logic. I build predictive ML models, NLP pipelines, and interactive full-stack AI web applications.";
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
