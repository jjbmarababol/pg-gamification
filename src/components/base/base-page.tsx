import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import {
  ChannelsPage,
  StartMenuPage,
  PlayerNamePage,
  MatchPage,
} from "../pages";
import homeBackground from "../ui/images/bg.jpg";

interface IBasePage {}

export const BasePage: FunctionComponent<IBasePage> = (props) => {
  return (
    <div
      className="row--moving-background"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      {/* return (<div className='row--moving-background'> */}
      <Switch>
        <Route exact path="/" component={StartMenuPage} />
        <Route exact path="/player-name" component={PlayerNamePage} />
        <Route exact path="/channels" component={ChannelsPage} />
        <Route exact path="/match" component={MatchPage} />
      </Switch>
    </div>
  );
};
