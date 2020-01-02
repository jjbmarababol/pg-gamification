import React, { FunctionComponent } from 'react';
import { Button, Icon, Row, Col, Typography, Input } from 'antd';

const { Title } = Typography;

interface IPlayerNameForm {}

export const PlayerNameForm:FunctionComponent<IPlayerNameForm> = (props) => {

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>Player Name</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            size='large'
            placeholder="Enter your name here"
            prefix={<Icon type="user" />}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Button type="primary" size="large" block>
            <Icon type="save" />
            Save
          </Button>
        </Col>
        <Col xs={24}>
          <Button type="danger" size="large" block>
            <Icon type="close" />
            Exit
          </Button>
        </Col>
      </Row>
    </div>
  );
};