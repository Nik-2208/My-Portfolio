/**
 * Safe cosine similarity for number[] vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const magnitudeA = Math.sqrt(normA);
  const magnitudeB = Math.sqrt(normB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Rank chunks safely
 */
export function rankChunks(
  queryEmbedding: number[],
  chunkEmbeddings: number[][],
  chunks: any[]
): Array<{ chunk: any; score: number }> {
  if (!queryEmbedding || !chunkEmbeddings || chunkEmbeddings.length === 0) {
    return [];
  }

  const scores: Array<{ chunk: any; score: number }> = chunkEmbeddings.map((embedding, i) => ({
    chunk: chunks[i],
    score: cosineSimilarity(queryEmbedding, embedding)
  }));

  return scores.sort((a, b) => b.score - a.score);
}


