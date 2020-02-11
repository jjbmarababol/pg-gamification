import React, { FunctionComponent, useContext, useState, ChangeEvent, useEffect } from 'react';
import { Row, Col, Typography, Button, Icon, Input, notification } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PlayerContext } from '../../contexts';
import { addPlayer, usePlayers } from '../../hooks';

const { Title } = Typography;

interface IPlayerNamePage extends RouteComponentProps {}

export const PlayerNamePage:FunctionComponent<IPlayerNamePage> = (props) => {

  const { history } = props;
  const { playerName, setPlayerName } = useContext(PlayerContext);
  const { players } = usePlayers();
  const [ player, setPlayer ] = useState<string>('');

  useEffect(()=> {
    if(playerName){
      setPlayer(playerName);
    }
  },[playerName]);

  const onPlayerNameFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  const savePlayer = (playerName: string) => {
      
      if(!players || !playerName.length) {
        return;
      }
      
      const existingPlayers = players.map(player=>player.name);
        
      if(existingPlayers.includes(playerName)) {
        return notification.error({
          message: 'Player Creation Failed',
          description: 'Name already exists, please try another name instead.',
        });
      }

      setPlayerName(playerName);
      addPlayer(playerName).then(()=>{
        history.push('/channels');
      });
  };

  return (
    <Row className='row--moving-background' type='flex' justify='center' align='middle'>
      <Col xs={20} md={10}>
        <div className='card--transluscent'>
          <Title level={3} className='centered text--transluscent-slim'>Player Name</Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Input
                size='large'
                placeholder="Player name here"
                value={player}
                prefix={<Icon type="user" />}
                onChange={onPlayerNameFieldChange}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Button type="primary" icon='save' loading={!players} size="large" block onClick={ ()=> players ? savePlayer(player) : null}>
                Save
              </Button>
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