import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Icon, PageHeader, Typography, Row, Col } from 'antd';
import './navbar.css';

const { Text } = Typography;

interface INavbar {}

export const Navbar:FunctionComponent<INavbar> = (props) => {
	return (<>
		<PageHeader
			title="Jig James"
			className='header--match'
			avatar={{ icon: 'user', size: 'large', style: { backgroundColor: 'rgba(37, 107, 203, 1)'}}}
			extra={
				<Row justify='center' align='middle'>
					<Col xs={24} sm={10}>
						<Text className="text--status">Round: <span>1</span> <Icon type='trophy' theme='outlined'/></Text>,
					</Col>
					<Col xs={24} sm={14}>
						<Text className="text--status">Money: <span>10,000</span> <Icon type='gold' theme='outlined'/></Text>,
					</Col>
				</Row>
			}
		/>
		<div className='navbar--clearfix' />
	</>);
};