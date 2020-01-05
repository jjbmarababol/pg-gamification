import React, { FunctionComponent, useState } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { MatchActionButtons } from '../buttons';
import { MatchTimer, MatchResults } from '../match';
import { Navbar } from '../navbar';

interface IMatchPage{}

const { Text } = Typography;
export const MatchPage: FunctionComponent<IMatchPage> = (props) => {

  const [hasStarted, setHasStarted] = useState<boolean>(false);

  return (
    <div className='row--moving-background'>
      <Navbar />
      <Row style={{minHeight: '50vh'}} type='flex' justify='center' align='middle'>
        { !hasStarted && <Col span={20} lg={12}>
            <Row type='flex' justify='center' align='middle'>
              <Col xs={22} md={16}>
                <Text className='text--timer' style={{ color: 'rgba(255, 255, 255, 1)' }}>Round 1</Text>
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