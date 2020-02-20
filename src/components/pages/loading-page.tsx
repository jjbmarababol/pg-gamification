import React, { FunctionComponent } from "react";
import { Row, Col, Icon } from "antd";

interface ILoadingPage {}

export const LoadingPage: FunctionComponent<ILoadingPage> = (props) => {
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
