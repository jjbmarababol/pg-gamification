import React, { FunctionComponent, useContext} from 'react';
import { List, Card, Typography } from 'antd';
import { MatchContext } from '../../contexts';

const { Text } = Typography;
interface IMatchResults {}



export const MatchResults: FunctionComponent<IMatchResults> = (prop) => {
  
  const { round, poolAmount, totalAmount, roundReward } = useContext(MatchContext);
  
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
    <Card bordered={false}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[<Text>{item.value}</Text>]}
          >
            <List.Item.Meta
              title={<span style={{ fontWeight: 'lighter'}}>{item.description}</span>}
            />
          </List.Item>
        )}
      />
    </Card>);
};