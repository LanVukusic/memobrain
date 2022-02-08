import {
  evaluateState,
  filterState,
  filterStatesArray,
  Response,
} from "./Logic/Helpers";

test("Game states guesses get evaluated correctly", () => {
  let s1 = evaluateState([2, 2, 3, 3], [0, 1, 2, 3]);
  expect(s1).toStrictEqual({ black: 1, white: 1 });

  let s2 = evaluateState([0, 0, 1, 1], [0, 1, 3, 4]);
  expect(s2).toStrictEqual({ black: 1, white: 1 });
});

test("States array get filtered", () => {
  const a = [
    [0, 1, 2, 3],
    [3, 2, 1, 0],
    [4, 3, 0, 1],
  ];
  const b = [
    [4, 3, 1, 1],
    [4, 3, 2, 0],
    [1, 2, 3, 4],
  ];

  let s = filterStatesArray([0, 0, 1, 1], new Response(1, 1), a.concat(b));
  expect(s).toStrictEqual(a);
});

test("Filtering single state", () => {
  let s = filterState([0, 0, 1, 1], new Response(1, 1), [0, 1, 3, 4]);
  expect(s).toStrictEqual(true);
});

test("Functionality of entropyOfGuess function", () => {
  // let s = entropyOfGuess();
});
