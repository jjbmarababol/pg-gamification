import React, { FunctionComponent } from 'react';
import { Button, Icon, Row, Col } from 'antd';

interface IMatchActionButtons {}

export const MatchActionButtons:FunctionComponent<IMatchActionButtons> = (props) => {

  return (
    <Row gutter={[20, 0]} justify='center' align='middle' style={{marginTop: '15px'}}>
      <Col xs={24} sm={12}>
        <Button className='button--match-action' type='primary' size="large" block>
          <Icon type="check"/> Yes, I will.
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button className='button--match-action' type='danger' size="large" block>
          <Icon type="close"/> No, I won't.
        </Button>
      </Col>  
    </Row>
  );
};