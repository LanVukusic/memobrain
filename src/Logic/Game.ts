import _ from "lodash";
import { Combination } from "js-combinatorics";
import {
  entropyOfGuess,
  filterState,
  filterStatesArray,
  generatePermutations,
  Response,
} from "./Helpers";
import { useState } from "react";
import React from "react";
import { FaSleigh } from "react-icons/fa";

export const PLAY_NUGGETS = [0, 1, 2, 3, 4, 5]; // playable nuggets
export const QUESTION_NUGGETS = [-1, 0, 1, 2, 3, 4, 5]; // playable nuggets

// colors for the nuggets
export const NUGGET_COLOURS = {
  "-1": "#00000000",
  "0": "red.600",
  "1": "blue.500",
  "2": "orange.500",
  "3": "green.500",
  "4": "gray.500",
  "5": "purple.500",
};

export class Memo {
  possibleStates: number[][] = [];
  setPossibleStates = null;

  questionOptions: number[][] = [];
  setQuestionOptions = null;

  constructor() {
    // generate all possible game states
    this.possibleStates = generatePermutations(PLAY_NUGGETS, 4);

    // generate all possible
    this.questionOptions = generatePermutations(QUESTION_NUGGETS, 4);
  }

  bestMove(): [number[], number] {
    let highestEntropy = -1;
    let bestQuestion: number[][] = [];

    for (let s of this.questionOptions) {
      let entropy = entropyOfGuess(s, this.possibleStates);

      if (entropy > highestEntropy) {
        highestEntropy = entropy;
        bestQuestion = [s];
      } else {
        if (entropy == highestEntropy) {
          bestQuestion.push(s);
        }
      }
    }

    const b = _.intersectionWith<number[]>(
      this.possibleStates,
      bestQuestion,
      (a, b) => {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }
    );

    if (b.length != 0) {
      return [b[0], highestEntropy];
    }
    return [bestQuestion[0], highestEntropy];
  }

  updateState(guess: number[], response: Response) {
    this.possibleStates = filterStatesArray(
      guess,
      response,
      this.possibleStates
    );
  }
}
