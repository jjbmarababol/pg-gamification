import { Typography } from 'antd';
import _ from 'lodash';
import React, { FunctionComponent } from 'react';

const { Text } = Typography;

interface RoundRewards {
  reward: number;
}

export const RoundReward: FunctionComponent<RoundRewards> = (props) => {
  const { reward } = props;
  return (
    <>
      <Text className="text--timer text--round-timers-up">Time is up!</Text>
      <Text className="text--timer text--question text--round-reward-desc">
        You earned
      </Text>
      <Text className="text--timer text--round-reward-value">
        {_.round(reward, 2)}
      </Text>
      <Text className="text--timer text--question text--round-reward-desc">
        coins
      </Text>
    </>
  );
};
