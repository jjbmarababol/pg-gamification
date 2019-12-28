import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Icon, PageHeader, Typography, Row, Col } from 'antd';

const { Text } = Typography;
interface INavbar {}

const MatchHeader = styled(PageHeader)`
	padding: 30px 50px;
	background: #3F6844;
	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	
	.ant-page-header-heading-title {
		font-size: 26px;
		font-weight: lighter;
		color: #FFF;
	}
	
	@media only screen and (min-width: 577px) {
		.ant-page-header-heading-extra {
			width: 300px;
		}
	}
`;

const NavbarClearfix = styled.div`
	height: 40px;
`;

const TextStatus = styled(Text)`
	font-size: 20px;
	color: #FFF;
	text-shadow: 0 3px 6px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.3);
`;

export const Navbar:FunctionComponent<INavbar> = (props) => {
	return (<>
		<MatchHeader
			title="Jig James"
			avatar={{ icon: 'user', size: 'large', style: { backgroundColor: '#5DAA68'}}}
			extra={
				<Row justify='center' align='middle'>
					<Col xs={24} sm={10}>
						<TextStatus className="status--round">Round: <span>1</span> <Icon type='trophy' theme='outlined'/></TextStatus>,
					</Col>
					<Col xs={24} sm={14}>
						<TextStatus className="status--money">Money: <span>10,000</span> <Icon type='gold' theme='outlined'/></TextStatus>,
					</Col>
				</Row>
			}
		/>
		<NavbarClearfix/>
	</>);
};