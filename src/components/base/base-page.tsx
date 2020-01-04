import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
	StartMenuPage,
	PlayerNamePage,
	MatchPage
} from '../pages';

interface IBasePage {}

export const BasePage:FunctionComponent<IBasePage> = (props) => {
	return (<>
		<Switch>
			<Route exact path='/' component={StartMenuPage}/>
			<Route exact path='/player-name' component={PlayerNamePage}/>
			<Route exact path='/match' component={MatchPage}/>
		</Switch>
	</>);
};