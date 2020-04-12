import { List, Typography } from 'antd';
import React, { FunctionComponent } from 'react';

export interface SummaryListProps {
  header?: string;
  items: React.ReactNode[];
}

const { Title } = Typography;
export const SummaryList: FunctionComponent<SummaryListProps> = (props) => {
  const { header, items } = props;

  return (
    <List
      header={<Title level={4}>{header}</Title>}
      size={'large'}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item} className="summaryListItem" />
        </List.Item>
      )}
    />
  );
};
