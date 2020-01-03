import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button, Icon, Row, Col } from 'antd';

interface IMatchActionButtons {}

const ActionButton = styled(Button)`
  height: 50px;
  font-size: 18px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

export const MatchActionButtons:FunctionComponent<IMatchActionButtons> = (props) => {

  return (
    <Row gutter={[20, 24]} justify='center' align='middle'>
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