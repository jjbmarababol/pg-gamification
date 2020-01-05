import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
	StartMenuPage,
	PlayerNamePage,
	MatchPage
} from '../pages';
import homeBackground from '../ui/images/bg.jpg';

interface IBasePage {}

export const BasePage:FunctionComponent<IBasePage> = (props) => {
	return (<div className='row--moving-background' style={{ backgroundImage: `url(${homeBackground})`}}>
		<Switch>
			<Route exact path='/' component={StartMenuPage}/>
			<Route exact path='/player-name' component={PlayerNamePage}/>
			<Route exact path='/match' component={MatchPage}/>
		</Switch>
	</div>);
};