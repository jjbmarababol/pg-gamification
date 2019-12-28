import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import { MatchActionButtons } from '../buttons';

interface IMatchPage{}

export const MatchPage: FunctionComponent<IMatchPage> = (props) => {
  return (
    <Row justify='center' align='middle'>
      <Col offset={1} span={22}>
        <MatchActionButtons />
      </Col>
    </Row>
  );
};