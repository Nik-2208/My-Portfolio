// Lightweight TF-IDF style bag-of-words embedding
// Converts text to sparse numeric vector (word frequencies)

interface WordVector {
  [word: string]: number;
}

export function textToVector(text: string): WordVector {
  if (!text || typeof text !== 'string') return {};
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 2); // Short words ignored

  const vector: WordVector = {};
  for (const word of words) {
    vector[word] = (vector[word] || 0) + 1;
  }
  return vector;
}

export function vectorToArray(vector: WordVector, allWords: string[]): number[] {
  return allWords.map(word => vector[word] || 0);
}

// Precompute global vocabulary from knowledge base
const globalVocabulary: string[] = [];

export function buildVocabulary(texts: string[]): string[] {
  const allWords = new Set<string>();
  for (const text of texts) {
    const vec = textToVector(text);
    Object.keys(vec).forEach(word => allWords.add(word));
  }
  const result = Array.from(allWords).sort();
  globalVocabulary.length = 0;
  globalVocabulary.push(...result);
  return result;
}

export function embedTexts(texts: string[], vocabulary?: string[]): number[][] {
  const targetVocab = vocabulary || globalVocabulary;
  return texts.map(text => vectorToArray(textToVector(text), targetVocab));
}

export function embedText(text: string, vocabulary?: string[]): number[] {
  return embedTexts([text], vocabulary)[0];
}
