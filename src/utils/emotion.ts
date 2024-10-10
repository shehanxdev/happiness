type Emotion = 'Happy' | 'Neutral' | 'Sad' | 'Angry';

export const getEmotion = (answers: string[]): Emotion => {
  let score = 0;

  const scoreMap: { [key: string]: number } = {
    'Strongly Agree': 2,
    Agree: 1,
    Neutral: 0,
    Disagree: -1,
    'Strongly Disagree': -2
  };

  const questionImpact = [1, -1, 1, -1, 1, -1];
  answers.forEach((answer, index) => {
    const impact = questionImpact[index];
    score += scoreMap[answer] * impact;
  });

  if (score > 3) {
    return 'Happy';
  } else if (score >= 0 && score <= 3) {
    return 'Neutral';
  } else if (score < 0 && score >= -3) {
    return 'Sad';
  } else {
    return 'Angry';
  }
};
