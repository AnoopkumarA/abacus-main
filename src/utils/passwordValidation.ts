const ANSWER_PASSWORD = 'abacus2024'; // You can change this password

export const validateAnswerPassword = (password: string): boolean => {
  return password === ANSWER_PASSWORD;
};
