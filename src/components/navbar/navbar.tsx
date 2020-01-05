import React, { FunctionComponent, useContext } from 'react';
import { Icon, PageHeader, Typography, Row, Col } from 'antd';
import { PlayerContext } from '../../contexts';

const { Text } = Typography;

interface INavbar {}

export const Navbar:FunctionComponent<INavbar> = (props) => {

	const { playerName, money } = useContext(PlayerContext);

	return (<>
		<PageHeader
			title={playerName}
			className='header--match'
			avatar={{ icon: 'user', size: 'large', style: { backgroundColor: 'rgba(37, 107, 203, 1)'}}}
			extra={
				<Row justify='center' align='middle'>
					<Col xs={24} sm={10}>
						<Text className="text--status">Round: <span>1</span> <Icon type='trophy' theme='outlined'/></Text>,
					</Col>
					<Col xs={24} sm={14}>
						<Text className="text--status">Money: <span>{ money }</span> <Icon type='gold' theme='outlined'/></Text>,
					</Col>
				</Row>
			}
		/>
		<div className='navbar--clearfix' />
	</>);
};