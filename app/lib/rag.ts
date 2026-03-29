import { KnowledgeChunk } from './knowledge';
import { buildVocabulary, embedTexts } from './embeddings';
import { cosineSimilarity, rankChunks } from './similarity';
import { knowledgeBase } from './knowledge';

let vocabulary: string[] = [];

export function initRAG() {
  vocabulary = buildVocabulary(knowledgeBase.map(chunk => chunk.content.toLowerCase()));
}


export function queryRAG(userQuery: string): string {
  if (!userQuery || !userQuery.trim()) {
    return "🧠 Hi! Ask about my skills, projects, experience, education, or contact info!";
  }

  if (vocabulary.length === 0) {
    initRAG();
  }

  // Query expansion for better matching
  const expandedQuery = expandQuery(userQuery.toLowerCase());
  const queryVector = embedTexts([expandedQuery], vocabulary)[0];
  const chunkVectors = embedTexts(knowledgeBase.map(chunk => chunk.content.toLowerCase()), vocabulary);
  
  const ranked = rankChunks(queryVector, chunkVectors, knowledgeBase);
  const topChunks = ranked.slice(0, 5).filter(r => r.score > 0.03); // More chunks, lower threshold

  if (topChunks.length === 0) {
    return fallbackResponse(userQuery.toLowerCase());
  }

  return generateResponse(topChunks, userQuery.toLowerCase());
}

function expandQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    skill: ['skills', 'technologies', 'know', 'expertise', 'programming', 'language', 'framework'],
    project: ['projects', 'built', 'developed', 'app', 'system', 'work'],
    experience: ['internship', 'job', 'work', 'career'],
    education: ['education', 'college', 'diploma', 'study'],
    contact: ['email', 'phone', 'linkedin', 'github']
  };

  for (const [key, synonyms] of Object.entries(expansions)) {
    if (query.includes(key)) {
      return query + ' ' + synonyms.slice(0, 3).join(' ');
    }
  }
  return query;
}

function fallbackResponse(query: string): string {
  const fallbacks: Record<string, string> = {
    skill: "Core skills: Python, ML (Scikit-learn, Pandas), Streamlit, Django, SQL, Cybersecurity. See SkillsMatrix!",
    project: "Featured: AI NIDS, Resume Analyzer, Recipe Predictor, AQI Dashboard, Learning Dashboard.",
    experience: "Roles: Cybersecurity Intern (Edunet/VOIS), LMS Admin (KJSAC), Hardware Intern (KJSIT).",
    education: "Diploma Computer Engineering, KJ Somaiya Polytechnic (95.5% Sem 5).",
    contact: "nikhileshchavdawork@gmail.com | 8928027482 | LinkedIn/ GitHub in footer.",
    default: "Try: skills, projects, experience, education, contact!"
  };

  for (const [key, resp] of Object.entries(fallbacks)) {
    if (query.includes(key)) return resp;
  }
  return fallbacks.default;
}

function generateResponse(topChunks: Array<{chunk: any, score: number}>, query: string): string {
  // Group by category
  const categories = groupBySection(topChunks);
  
  const lowerQuery = query;
  let response = '';

  // Intent detection
  if (lowerQuery.match(/skill|tech|language|know|expert/i)) {
    response = formatSkills(categories);
  } else if (lowerQuery.match(/project|build|app|work|portfolio/i)) {
    response = formatProjects(topChunks);
  } else if (lowerQuery.match(/experience|intern|job|work|career/i)) {
    response = formatExperience(topChunks);
  } else if (lowerQuery.match(/education|college|study|diploma/i)) {
    response = formatEducation(topChunks);
  } else if (lowerQuery.match(/contact|email|phone|linkedin|github/i)) {
    response = formatContact(topChunks);
  } else if (lowerQuery.match(/cert|achieve|award|hack/i)) {
    response = formatCertAchieve(topChunks);
  } else {
    // General summary
    response = formatSummary(topChunks);
  }

  // Ensure comprehensive
  if (topChunks.some(r => r.score > 0.4)) {
    response += `\\n\\n💡 Strong match (${Math.round(topChunks[0].score * 100)}%): ${topChunks[0].chunk.content.slice(0, 100)}...`;
  }

  return response.slice(0, 800);
}

function groupBySection(chunks: Array<{chunk: any, score: number}>): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const {chunk, score} of chunks) {
    if (!groups[chunk.section]) groups[chunk.section] = [];
    groups[chunk.section].push(`${chunk.content.slice(0, 150)} (sim: ${Math.round(score*100)}%)`);
  }
  return groups;
}

function formatSkills(categories: Record<string, string[]>): string {
  const skillsList = Object.entries(categories)
    .filter(([cat]) => cat.match(/skill|language|ml|framework|database/i))
    .map(([cat, items]) => `**${cat}:** ${items.join('; ')}`)
    .join('\\n');
  return skillsList || 'Comprehensive Python/ML/Full-stack skills. Check SkillsMatrix section!';
}

function formatProjects(topChunks: Array<{chunk: any, score: number}>): string {
  return topChunks.filter(c => c.chunk.section.includes('projects'))
    .map(c => `• ${c.chunk.content}`)
    .join('\\n') || 'AI/ML projects: NIDS, Resume Analyzer, Recipe Predictor, AQI, Learning Dashboard.';
}

function formatExperience(topChunks: Array<{chunk: any, score: number}>): string {
  return topChunks.filter(c => c.chunk.section.includes('experience'))
    .map(c => `**${c.chunk.section}:** ${c.chunk.content}`)
    .join('\\n');
}

function formatEducation(topChunks: Array<{chunk: any, score: number}>): string {
  return topChunks.find(c => c.chunk.section.includes('education'))?.chunk.content || 
    'Diploma Computer Engineering @ KJ Somaiya Polytechnic (95.5% Sem 5).';
}

function formatContact(topChunks: Array<{chunk: any, score: number}>): string {
  return topChunks.find(c => c.chunk.section.includes('contact'))?.chunk.content || 
    'nikhileshchavdawork@gmail.com | 8928027482 | LinkedIn & GitHub linked.';
}

function formatCertAchieve(topChunks: Array<{chunk: any, score: number}>): string {
  return `Certifications & Achievements: ${topChunks.map(c => c.chunk.content).join(', ')}`;
}

function formatSummary(topChunks: Array<{chunk: any, score: number}>): string {
  return `Nikhilesh Chavda - AI/ML Engineer: ${topChunks.map(c => c.chunk.content.slice(0, 100)).join('. ')}`;
}

