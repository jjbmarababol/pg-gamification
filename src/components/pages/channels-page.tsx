import React, { FunctionComponent} from 'react';
import { List, Card, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useChannels, usePlayers } from '../../hooks';

interface IMatchResults {}

export const ChannelsPage: FunctionComponent<IMatchResults> = (props) => {
  
  const { channels } = useChannels();
  const { players } = usePlayers();

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
                  <span>{channel.players.length} / 6</span>,
                  <Link to='/match'><Button type='primary'>Enter</Button></Link>,
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