import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconProps,
  Input,
  InputGroup,
  OmitCommonProps,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
} from "@chakra-ui/react";
import { Icon, createIcon } from "@chakra-ui/react";
import { SVGProps, useState } from "react";
import { NUGGET_COLOURS } from "../Logic/Game";

const CircleIcon = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<SVGProps<SVGSVGElement>, keyof IconProps> &
    IconProps & { as?: "svg" | undefined }
) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        stroke="#CCCCCC"
        strokeWidth="8px"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
};

interface IParams {
  inputs: boolean;
  size: number;
  submitCb: (black: number, white: number) => void;
  projectedEntropy: number;
  projectedReduction: number;
  actual: number;
  nuggets: number[];
}

export const MemoRow = ({
  inputs,
  size,
  submitCb,
  projectedEntropy,
  projectedReduction,
  actual,
  nuggets,
}: IParams) => {
  const { colorMode, toggleColorMode } = useColorMode();
  let [black, setBlack] = useState(0);
  let [white, setWhite] = useState(0);
  const a = Math.abs(projectedReduction - actual);

  return (
    <Box m={3}>
      <Flex
        flexDirection="column"
        borderWidth="3px"
        borderColor={
          colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
        }
        borderRadius="5px"
      >
        <Flex p={4} alignItems="center">
          <Flex flex="1" justifyContent="space-evenly">
            {nuggets
              .map((val) => {
                // @ts-ignore
                return NUGGET_COLOURS[val];
              })
              .map((color, i) => {
                return (
                  <CircleIcon boxSize={size} m={1} color={color} key={i} />
                );
              })}
          </Flex>

          <StatGroup display={!inputs ? "flex" : "none"} p={3}>
            <Stat mx={4}>
              <StatLabel>Projected</StatLabel>
              <StatNumber>{projectedReduction}</StatNumber>
              <StatHelpText>{projectedEntropy.toPrecision(3)} Bit</StatHelpText>
            </Stat>

            <Stat mx={4}>
              <StatLabel>Remained</StatLabel>
              <StatNumber>{actual}</StatNumber>
              <StatHelpText display={a ? "block" : "none"}>
                <StatArrow
                  type={projectedReduction > actual ? "increase" : "decrease"}
                />
                {a}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>

        <Flex display={inputs ? "block" : "none"} m={4}>
          <Flex>
            <InputGroup size="md">
              <Input
                placeholder="Black nuggets"
                type="number"
                m={3}
                value={black ? black : ""}
                min={0}
                max={4}
                onChange={(e) => {
                  setBlack(parseInt(e.target.value));
                }}
              />
              <Input
                placeholder="White nuggets"
                type="number"
                m={3}
                min={0}
                max={4}
                value={white ? white : ""}
                onChange={(e) => {
                  setWhite(parseInt(e.target.value));
                }}
              />
            </InputGroup>
            <ButtonGroup variant="outline" spacing="6" m={3}>
              <Button
                variant="solid"
                onClick={() => {
                  submitCb(black, white);
                }}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
