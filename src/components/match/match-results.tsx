import { Card, List, Typography } from 'antd';
import React, { FunctionComponent, useContext } from 'react';

import { Contribution, MatchContext } from '../../contexts';

const { Text } = Typography;

export const MatchResults: FunctionComponent = () => {
  const { ranking } = useContext(MatchContext);

  const player = (object: Contribution) => {
    return Object.keys(object)[0];
  };

  return (
    <Card
      bordered={false}
      title="Total Contributions"
      style={{ marginBottom: '15px' }}
      className="card--transluscent"
    >
      <List
        itemLayout="horizontal"
        dataSource={ranking}
        renderItem={(rank) => (
          <List.Item
            actions={[
              <Text key={rank.docId} style={{ fontWeight: 'bolder' }}>
                {player(rank)}
              </Text>,
            ]}
          >
            <List.Item.Meta title={<span>{rank[player(rank)]}</span>} />
          </List.Item>
        )}
      />
    </Card>
  );
};
