/**
 * Calculates the entropy of the probability array
 * @param probs array of probabilities
 * @returns entropy of the whole array as a number
 */
export const entropy = (probs: number[]) => {
  const weightedInformationGain = probs.map((prob) => {
    return prob * informationGain(prob);
  });
  return weightedInformationGain.reduce(
    (prev: number, curr: number) => prev + curr
  );
};

/**
 * calculate the information gain in bits, for the provided probability
 * @param prob probability of the event. [0,1)
 * @returns information gain in bits
 */
export const informationGain = (prob: number) => {
  return -Math.log2(prob);
};
