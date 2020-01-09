import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { MatchActionButtons } from '../buttons';
import { MatchTimer, MatchResults } from '../match';
import { Navbar } from '../navbar';
import { MatchContext } from '../../contexts';

interface IMatchPage{}

const { Text } = Typography;
export const MatchPage: FunctionComponent<IMatchPage> = (props) => {

  const { setHasStarted, hasStarted, round } = useContext(MatchContext);
  return (
    <div className='row--moving-background'>
      <Navbar />
      <Row style={{minHeight: '80vh'}} type='flex' justify='center' align='middle'>
        { !hasStarted && <Col span={20} lg={12}>
            <Row type='flex' justify='center' align='middle'>
              <Col xs={22} md={16}>
                <Text className='text--timer' style={{ color: 'rgba(255, 255, 255, 1)' }}>Round { round }</Text>
                <Button className='button--match-action' type='primary' icon='heart' size='large' onClick={()=>setHasStarted(true)} block>Ready</Button>
                <MatchResults/>
              </Col>
            </Row>
          </Col> 
        }
        {
          hasStarted && <Col span={20} lg={12}>
            <MatchTimer/>
            <MatchActionButtons />
          </Col>
        }
      </Row>
    </div>
  );
}