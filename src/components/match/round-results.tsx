import React, { FunctionComponent, useContext } from "react";
import { List, Card, Typography } from "antd";
import { MatchContext } from "../../contexts";

const { Text } = Typography;

interface IRoundResults {}

export const RoundResults: FunctionComponent<IRoundResults> = (props) => {
  const { round, poolAmount, totalAmount, roundReward } = useContext(
    MatchContext,
  );

  const data = [
    {
      description: "Round",
      value: round,
    },
    {
      description: "Pool Amount",
      value: poolAmount,
    },
    {
      description: "Total Amount",
      value: totalAmount,
    },
    {
      description: "You received",
      value: roundReward,
    },
  ];

  return (
    <Card bordered={false} className="card--transluscent">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={[<Text>{item.value}</Text>]}>
            <List.Item.Meta
              title={
                <span style={{ fontWeight: "bolder" }}>{item.description}</span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
