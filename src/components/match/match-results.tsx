import React, { FunctionComponent, useContext } from 'react';
import { List, Card, Typography } from 'antd';
import { MatchContext, IContribution } from '../../contexts';

const { Text } = Typography;

interface IMatchResults {}

export const MatchResults: FunctionComponent<IMatchResults> = (props) => {
  const { ranking } = useContext(MatchContext);

  const player = (object: IContribution) => {
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
              <Text style={{ fontWeight: 'bolder' }}>{player(rank)}</Text>,
            ]}
          >
            <List.Item.Meta title={<span>{rank[player(rank)]}</span>} />
          </List.Item>
        )}
      />
    </Card>
  );
};
