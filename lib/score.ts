export const POINTS_PER_CORRECT_ANSWER = 10;

const SCORE_KEY = 'learning_app_score';

export function getScore(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(SCORE_KEY) || '0', 10);
}

export function updateScore(points: number): void {
  if (typeof window === 'undefined') return;
  const currentScore = getScore();
  const newScore = currentScore + points;
  localStorage.setItem(SCORE_KEY, newScore.toString());
}
