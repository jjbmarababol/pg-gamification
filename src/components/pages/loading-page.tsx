import { Col, Icon, Row } from 'antd';
import React, { FunctionComponent } from 'react';

export const LoadingPage: FunctionComponent = () => {
  return (
    <Row
      className="row--moving-background"
      type="flex"
      justify="center"
      align="middle"
    >
      <Col xs={20} md={10}>
        <div className="loading__icon">
          <Icon type="loading" theme="outlined" />
        </div>
      </Col>
    </Row>
  );
};
