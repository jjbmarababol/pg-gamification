import { Card, List, Typography } from 'antd';
import _ from 'lodash';
import React, { FunctionComponent, useContext } from 'react';

import { MatchContext } from '../../contexts';

const { Text } = Typography;

export const RoundResults: FunctionComponent = () => {
  const { round, poolAmount, totalAmount, roundReward } = useContext(
    MatchContext,
  );

  const data = [
    {
      description: 'Round',
      value: round,
    },
    {
      description: 'Pool Amount',
      value: poolAmount,
    },
    {
      description: 'Total Amount',
      value: totalAmount,
    },
    {
      description: 'You received',
      value: roundReward,
    },
  ];

  return (
    <Card bordered={false} className="card--transluscent">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={_.toInteger(item.value + item.description)}
            actions={[
              <Text key={_.toInteger(item.value + item.description)}>
                {item.value}
              </Text>,
            ]}
          >
            <List.Item.Meta
              title={
                <span style={{ fontWeight: 'bolder' }}>{item.description}</span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
