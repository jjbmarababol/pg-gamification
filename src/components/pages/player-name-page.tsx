import React, { FunctionComponent, useContext, useState, ChangeEvent, useEffect } from 'react';
import { Row, Col, Typography, Button, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../../contexts';


const { Title } = Typography;

interface IPlayerNamePage {}

export const PlayerNamePage:FunctionComponent<IPlayerNamePage> = (props) => {

  const { playerName, setPlayerName } = useContext(PlayerContext);
  const [ player, setPlayer ] = useState<string>('Player');

  const onPlayerNameFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  useEffect(()=> {
    setPlayer(playerName);
  },[playerName]);

  return (
    <Row className='row--moving-background' type='flex' justify='center' align='middle'>
      <Col xs={20} md={10}>
        <div className='card--transluscent'>
          <Title level={3} className='centered text--transluscent-slim'>Player Name</Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Input
                size='large'
                placeholder="Enter your name here"
                value={player}
                prefix={<Icon type="user" />}
                onChange={onPlayerNameFieldChange}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Link to='/match'>
                <Button type="primary" size="large" block onClick={()=>setPlayerName(player)}>
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