import React, { FunctionComponent, useEffect, useContext} from 'react';
import { List, Card, Col, Row, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { useChannels, channelAPI } from '../../hooks';
import { PlayerContext } from '../../contexts';

interface IMatchResults extends RouteComponentProps {}

export const ChannelsPage: FunctionComponent<IMatchResults> = (props) => {
  
  const { history } = props;
  const { addChannels, joinChannel } = channelAPI;
  const { channels } = useChannels();
  const { playerId } = useContext(PlayerContext);

  useEffect(() => {
    if(!channels?.length) {
      addChannels();
    }
  },[addChannels, channels]);
  
  const selectChannel = async (channelId: string) => {
    await joinChannel(channelId, playerId).then(() =>{
      history.push('/match');
    });

  };

  return (
    <Row className='row--moving-background' type='flex' justify='center' align='middle'>
      <Col xs={20} md={10}>
        <Card bordered={false} title="Select Channel" style={{marginBottom: '15px'}} className='card--transluscent'>
        <List
            itemLayout="horizontal"
            dataSource={channels}
            renderItem={channel => (
              <List.Item
                actions={[
                  <span>{channel.players?.length} / 6</span>,
                  <Button type='primary' onClick={()=>selectChannel(channel.docId)}>Enter</Button>,
                ]}
              >
                <List.Item.Meta
                  title={<span style={{ fontWeight: 'bolder'}}>{channel.name}</span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>);
};