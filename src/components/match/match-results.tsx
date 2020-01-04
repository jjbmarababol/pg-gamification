import React, { FunctionComponent} from 'react';
import { List, Card, Typography } from 'antd';

const { Text } = Typography;
interface IMatchResults {}

const data = [

  {
    description: 'Round',
    value: '1',
  },
  {
    description: 'Pool Amount',
    value: '70',
  },
  {
    description: 'Total Amount',
    value: '140',
  },
  {
    description: 'You received',
    value: '20',
  },

];

export const MatchResults: FunctionComponent<IMatchResults> = (prop) => {
  
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