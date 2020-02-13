import { Typography } from "antd";
import React, { FunctionComponent } from "react";

const { Text } = Typography;

interface IRoundRewards {
  reward: number;
}

export const RoundReward: FunctionComponent<IRoundRewards> = props => {
  const { reward } = props;
  return (
    <>
      <Text className="text--timer text--round-timers-up">Time is up!</Text>
      <Text className="text--timer text--question text--round-reward-desc">
        You earned
      </Text>
      <Text className="text--timer text--round-reward-value">{reward}</Text>
      <Text className="text--timer text--question text--round-reward-desc">
        coins
      </Text>
    </>
  );
};
