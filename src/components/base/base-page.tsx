import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import { Navbar } from '../navbar';
import { MatchActionButtons } from '../buttons';

interface IBasePage {}

export const BasePage:FunctionComponent<IBasePage> = (props) => {
	return (<>
		<Navbar />
		<Row justify='center' align='middle'>
			<Col offset={2}>
				<MatchActionButtons />
			</Col>
		</Row>
	</>);
};