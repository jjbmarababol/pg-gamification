import { Card, List, Typography } from 'antd';
import _ from 'lodash';
import React, { FunctionComponent, useContext } from 'react';

import { MatchContext, PlayerContext } from '../../contexts';

const { Text } = Typography;

export const RoundResults: FunctionComponent = () => {
  const { coins } = useContext(PlayerContext);
  const { round, totalAmount, roundReward } = useContext(MatchContext);

  const data = [
    {
      description: 'Round #',
      value: round,
    },
    {
      description: 'Pool Amount (Total contributions x 2)',
      value: totalAmount,
    },
    {
      description: 'Share-out Received (Pool amount  / # of players)',
      value: _.round(roundReward, 2),
    },
    {
      description: 'Total Earnings',
      value: _.round(roundReward + coins, 2),
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
