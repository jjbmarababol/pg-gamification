import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  AdminPage,
  ChannelsPage,
  ConcludingPage,
  MatchPage,
  PlayerNamePage,
  StartMenuPage,
  WaitingPage,
} from '../pages';
import homeBackground from '../ui/images/bg.jpg';

export const BasePage: FunctionComponent = () => {
  return (
    <div
      className="row--moving-background"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <Switch>
        <Route exact path="/" component={StartMenuPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/player-name" component={PlayerNamePage} />
        <Route exact path="/channels" component={ChannelsPage} />
        <Route exact path="/lesson" component={ConcludingPage} />
        <Route path="/match/:channelId" component={MatchPage} />
        <Route path="/room/:channelId" component={WaitingPage} />
      </Switch>
    </div>
  );
};
