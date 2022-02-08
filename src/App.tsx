import * as React from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Heading,
  Container,
  Divider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Memo } from "./Logic/Game";
import { Response } from "./Logic/Helpers";
import { Display } from "./Components/Display";
export interface IState {
  colors: number[];
  projectedEntropy: number;
  projectedReduction: number;
  realCount: number;
}

export const App = () => {
  let guess, entropy;

  let [count, setCount] = React.useState(0);
  let [lucky, setLucky] = React.useState(1.0);
  let [luckyArr, setLuckyArr] = React.useState<number[]>([]);
  let [game, _] = React.useState<Memo>(new Memo());
  let [stateHistory, setStateHistory] = React.useState<IState[]>([]);
  let [stateCount, setStateCount] = React.useState<number>(0);
  let [bestMove, setBestMove] = React.useState<number[]>([]);

  const cb = (b: number, w: number) => {
    if (b + w > 4 || b < 0 || w < 0) {
      alert("Invalid input");
      return;
    }
    setCount(count + 1);

    const [guess1, entropy1] = game.bestMove();
    const prevLen = game.possibleStates.length;
    game.updateState(guess1, new Response(b, w));
    setStateCount(game.possibleStates.length);

    [guess, entropy] = game.bestMove();
    setBestMove(guess);

    const hist: IState = {
      colors: guess1,
      projectedEntropy: entropy,
      projectedReduction: Math.round(prevLen / Math.pow(2, entropy)),
      realCount: game.possibleStates.length,
    };
    const luckyFactor = (hist.projectedReduction + 4) / (hist.realCount + 4);
    const arr = luckyArr.concat([luckyFactor]);
    setLuckyArr(arr);
    setLucky(
      arr.reduce((prev, curr) => {
        return prev + curr;
      }) / arr.length
    );
    console.table(game.possibleStates);
    setStateHistory(stateHistory.concat([hist]));
  };

  React.useEffect(() => {
    setStateCount(game.possibleStates.length);
    [guess, entropy] = game.bestMove();
    setBestMove(guess);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Grid>
        <ColorModeSwitcher p={4} m={4} justifySelf="flex-end" />
      </Grid>
      <VStack minH="100vh" flexDir="column">
        <Container maxW="container.lg">
          <Heading textAlign={"left"} as="h1" size="3xl">
            MemoBrain
          </Heading>

          <Box textAlign={"left"}>Memo analysis bot</Box>

          <Divider />

          <Display
            cb={cb}
            stateCount={stateCount}
            stateHistory={stateHistory}
            suggestedMove={bestMove}
            count={count}
            lucky={lucky}
          />
        </Container>
      </VStack>
    </ChakraProvider>
  );
};
