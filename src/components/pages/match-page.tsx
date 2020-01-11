import React, { FunctionComponent, useContext } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { MatchTimer } from '../match';
import { Navbar } from '../navbar';
import { MatchContext, PlayerContext } from '../../contexts';

interface IMatchPage{}

const { Text } = Typography;
export const MatchPage: FunctionComponent<IMatchPage> = (props) => {

  const { setHasStarted, hasStarted, round, randomizeContribution } = useContext(MatchContext);

  const { setCoins } = useContext(PlayerContext);
  const readyAndStarted = () => {
    setCoins(10);
    randomizeContribution();
    setHasStarted(true);
  }

  return (
    <div className='row--moving-background'>
      <Navbar />
      <Row style={{minHeight: '80vh'}} type='flex' justify='center' align='middle'>
        {   !hasStarted && <Col span={20} lg={12}>
            <Row type='flex' justify='center' align='middle'>
              <Col xs={22} md={16}>
                <Text className='text--timer' style={{ color: 'rgba(255, 255, 255, 1)' }}>Round { round }</Text>
                <Button className='button--match-action' type='primary' icon='heart' size='large' onClick={()=>readyAndStarted()} block>Ready</Button>
              </Col>
            </Row>
          </Col> 
        }
        {
          hasStarted && <Col span={20} lg={12}>
            <MatchTimer/>
          </Col>
        }
      </Row>
    </div>
  );
}