import React, { FunctionComponent } from 'react';
import { Navbar } from '../navbar';
import { MatchPage } from '../match';
interface IBasePage {}

export const BasePage:FunctionComponent<IBasePage> = (props) => {
	return (<>
		<Navbar />
		<MatchPage/>
	</>);
};