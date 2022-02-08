import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
} from "@chakra-ui/react";
import { IState } from "../App";
import { MemoRow } from "./Row";

interface IProps {
  stateCount: number;
  stateHistory: IState[];
  cb: (b: number, w: number) => void;
  suggestedMove: number[];
  count: number;
  lucky: number;
}

export const Display = ({
  stateCount,
  stateHistory,
  cb,
  suggestedMove,
  count,
  lucky,
}: IProps) => {
  return (
    <Box>
      <StatGroup width={"100%"} py={6} textAlign="center">
        <Stat>
          <StatLabel>Steps</StatLabel>
          <StatNumber>{count}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Available states</StatLabel>
          <StatNumber>{stateCount.toPrecision(3)}</StatNumber>
          <StatHelpText>
            {Math.log2(stateCount).toPrecision(3)} Bit
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Luck</StatLabel>
          <StatNumber>{(lucky * 100).toFixed()}%</StatNumber>
        </Stat>
      </StatGroup>
      {stateHistory.map((state, i) => {
        return (
          <MemoRow
            key={i}
            nuggets={state.colors}
            inputs={false}
            size={6}
            submitCb={cb}
            actual={state.realCount}
            projectedEntropy={state.projectedEntropy}
            projectedReduction={state.projectedReduction}
          />
        );
      })}
      <MemoRow
        nuggets={suggestedMove}
        inputs={stateCount < 2 ? false : true}
        size={10}
        submitCb={cb}
        actual={0}
        projectedReduction={0}
        projectedEntropy={0}
      />
    </Box>
  );
};
