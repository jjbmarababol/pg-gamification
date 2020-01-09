import React, { FunctionComponent, useContext } from 'react';
import { Icon, Typography, Avatar, Row, Col } from 'antd';
import { PlayerContext, MatchContext } from '../../contexts';

const { Text } = Typography;
interface INavbar {}

export const Navbar:FunctionComponent<INavbar> = (props) => {

	const { playerName, coins } = useContext(PlayerContext);
	const { round } = useContext(MatchContext);
	
	return (<>
		<nav>
			<Row className='navbar--match' type='flex' align='middle' justify='center'>
				<Col span={12}>
					<Avatar icon='user' size='large'/>
					<Text className='navbar--player-name'>{playerName}</Text>
				</Col>
				<Col span={12}>
					<Row type='flex' justify='center' align='middle'>
						<Col xs={24} sm={10}>
							<Text className="navbar--text-status"><Icon type='trophy' className='navbar--icon-left' theme='outlined'/> Round: <span>{ round }</span></Text>,
						</Col>
						<Col xs={24} sm={14}>
							<Text className="navbar--text-status"><Icon type='dollar' className='navbar--icon-left' theme='outlined'/> Coins: <span>{ coins }</span></Text>,
						</Col>
					</Row>
				</Col>
			</Row>
		</nav>
		<div className='navbar--clearfix'/>
	</>);
};