import React, { FunctionComponent } from 'react';
import { Row, Col, Typography, Button, Icon, Input } from 'antd';
import homeBackground from '../ui/images/bg.jpg';
import { Link } from 'react-router-dom';


const { Title} = Typography;

interface IPlayerNamePage {}

export const PlayerNamePage:FunctionComponent<IPlayerNamePage> = (props) => {

  return (
    <Row className='row--moving-background' style={{ backgroundImage: `url(${homeBackground})` }} type='flex' justify='center' align='middle'>
      <Col xs={20} md={10}>
        <div className='card--transluscent'>
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
              <Link to='/match'>
                <Button type="primary" size="large" block>
                  <Icon type="save" />
                  Save
                </Button>
              </Link>
            </Col>
            <Col xs={24}>
              <Link to='/'>
                <Button type="danger" size="large" block>
                  <Icon type="close" />
                  Exit
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};