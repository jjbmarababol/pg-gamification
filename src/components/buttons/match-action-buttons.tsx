import React, { FunctionComponent } from 'react';
import { Button, Row, Col } from 'antd';

interface IMatchActionButtons {}

export const MatchActionButtons:FunctionComponent<IMatchActionButtons> = (props) => {

  return (<Row justify='center' align='middle'>
    <Col xs={24} sm={12}>
      <Button type='primary'>Yes</Button>
    </Col>
  </Row>);
};