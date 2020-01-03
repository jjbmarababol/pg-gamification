import React, { FunctionComponent, useState } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { MatchActionButtons } from '../buttons';
import { MatchTimer } from '../match';
import { Navbar } from '../navbar';
import MatchBackground from '../ui/images/bg-home.jpg';
import '../match/match.css';
interface IMatchPage{}

const { Text } = Typography;
export const MatchPage: FunctionComponent<IMatchPage> = (props) => {

  const [hasStarted, setHasStarted] = useState<boolean>(false);

  return (
    <div className='row--moving-background' style={{ backgroundImage: `url(${MatchBackground})`}}>
      <Navbar />
      <Row gutter={[24, 24]} style={{minHeight: '50vh'}} type='flex' justify='center' align='middle'>
        { !hasStarted && <Col span={20} lg={12} className='col--match-action-question'>
            <Text className='text--timer' style={{padding: '20px 0'}}>Round 1</Text>
            <Button className='button--match-action' type='primary' icon='heart' size='large' onClick={()=>setHasStarted(true)} block>Start</Button>
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