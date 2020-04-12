import { Card, Col, Row } from 'antd';
import React, { FunctionComponent } from 'react';

export const AdminPage: FunctionComponent = () => {
  return (
    <Row
      className="row--moving-background"
      type="flex"
      justify="center"
      align="middle"
    >
      <Col xs={20} md={10}>
        <Card style={{ margin: '35px 0 15px' }}>
          <div>Admin Page</div>
        </Card>
      </Col>
    </Row>
  );
};
