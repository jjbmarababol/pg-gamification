import { Card, Col, Collapse, Row } from 'antd';
import React, { FunctionComponent } from 'react';

import { channelAPI } from '../../hooks';
import { ChannelForm } from '../admin';

const { Panel } = Collapse;

export const AdminPage: FunctionComponent = () => {
  const { useChannels } = channelAPI;
  const { channels } = useChannels();

  return (
    <Row
      className="row--moving-background"
      type="flex"
      justify="center"
      align="middle"
    >
      <Col xs={20} md={10}>
        <Card bordered={false} title="Admin Page" className="no-padding">
          <Collapse
            accordion
            bordered={false}
            style={{ backgroundColor: 'transparent' }}
          >
            {channels?.map((channel, idx) => (
              <Panel header={channel.name} key={idx}>
                <ChannelForm channel={channel} />
              </Panel>
            ))}
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
};
