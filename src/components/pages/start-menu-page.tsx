import React, { FunctionComponent } from 'react';
import { Row, Col, Typography, Button, Icon } from 'antd';
import companyLogo from '../ui/images/logo.png';
import { Link } from 'react-router-dom';


const { Title} = Typography;

interface IStartMenuPage {}

export const StartMenuPage:FunctionComponent<IStartMenuPage> = (props) => {

  return (
    <Row className='row--moving-background' type='flex' justify='center' align='middle'>
      <Col xs={20} md={10}>
        <div className='card--transluscent'>
          <div className='company-logo' style={{ backgroundImage: `url(${companyLogo})`}}/>
          <Title level={2} style={{ textAlign: 'center', color: 'rgb(98, 114, 123)' , fontWeight: 100, marginBottom: 25 }}>Public Goods Game</Title>
          <Link to='player-name'>
            <Button type="primary" size="large" block>
                <Icon type="heart" />
                Game Start
              </Button>
          </Link> 
        </div>
      </Col>
    </Row>
  );
};