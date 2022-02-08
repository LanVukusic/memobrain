import { Combination, Permutation } from "js-combinatorics";
import _ from "lodash";
import { entropy } from "./Entropy";

export class Response {
  black = 0;
  white = 0;

  constructor(black: number, white: number) {
    this.white = white;
    this.black = black;
  }

  hash() {
    return 89 * this.black + 7 * this.white;
  }
}

/**
 * evaluates the state with black and white nuggets.
 * State and Guess must be equal in length
 * @param guess array of numbers represeting a guess
 * @param state array of numbers representing a state
 * @returns {IEval} evaluation of the states
 */
export const evaluateState = (guess: number[], state: number[]): Response => {
  let white = 0;
  let black = 0;

  // loop over state
  for (let i = 0; i < state.length; i++) {
    if (guess[i] === state[i]) {
      black++;
    }
  }

  white = _.intersection(guess, state).length;
  return new Response(black, white - black);
};

/**
 * returns if a state is valid based on a previous guess
 * @param guess array of nuggets, representing a guess. can be non uniqe or empty (-1)
 * @param {IEval} response number of black and white nuggets
 * @param state state whose validity is to be checked
 * @returns {boolean} is state valid
 */
export const filterState = (
  guess: number[],
  response: Response,
  state: number[]
) => {
  const s = evaluateState(guess, state);
  return s.black == response.black && s.white == response.white;
};

/**
 * Filteres array of possible game states, so only the valid remain.
 * @param guess array of nuggets, representing a guess. can be non uniqe or empty (-1)
 * @param {IEval} response number of black and white nuggets
 * @param stateSpace array of all states
 * @returns {number[][]} all valid states
 */
export const filterStatesArray = (
  guess: number[],
  response: Response,
  stateSpace: number[][]
): number[][] => {
  return stateSpace.filter((val) => {
    return filterState(guess, response, val);
  });
};

export const entropyOfGuess = (guess: number[], states: number[][]) => {
  const startLen = states.length;
  const probs: number[] = [];
  const a: any = {};

  if (states.length == 0) {
    return -1;
  }

  // calculate probability of all responses
  for (let s of states) {
    let ea = evaluateState(guess, s);
    let ev = ea.hash();
    if (Object.keys(a).includes(ev.toString())) {
      a[ev.toString()]++;
    } else {
      a[ev.toString()] = 1;
    }
  }

  for (const num in a) {
    if (Object.prototype.hasOwnProperty.call(a, num)) {
      const count = a[num];
      probs.push(count / startLen);
    }
  }

  return entropy(probs);
};

export const generatePermutations = (options: number[], len: number) => {
  let all: number[][] = [];
  let c = new Combination(options, len).toArray();

  for (let comb of c) {
    let p = new Permutation(comb);
    all = all.concat(p.toArray());
  }
  return all;
};
