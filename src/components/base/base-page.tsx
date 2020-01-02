import React, { FunctionComponent } from 'react';
import { MatchPage } from '../match';
import { GameStartPage } from '../start';
interface IBasePage {}

export const BasePage:FunctionComponent<IBasePage> = (props) => {
	return (<>
		
		<GameStartPage/>
		{/* <MatchPage/> */}
	</>);
};