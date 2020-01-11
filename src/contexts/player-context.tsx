import React, { Component, createContext } from 'react';

interface IPlayer {
  playerName: string;
  coins: number,
}

interface IPlayerContext extends IPlayer {
  setPlayerName: (name: string) => void;
  setCoins: (coins: number) => void;
}

// Initialized Value
export const PlayerContext = createContext({
  playerName: '',
  coins: 0,
  setPlayerName: (name: string): void => {},
  setCoins: (coins: number): void => {},
});

export class Player extends Component<{}, IPlayer> {

  constructor(props: IPlayerContext){
    super(props);
    this.state = {
      playerName: 'Player',
      coins: 0,
    }
  }

  public render() {
    const setPlayerName = (playerName: string) => {
      this.setState({
        playerName
      })
    };

    const setCoins = (roundReward: number) => {
      this.setState({
        coins: Math.round( ( (this.state.coins + roundReward) + Number.EPSILON ) * 100 ) / 100,
      })
    };

    const PlayerContextAPI: IPlayerContext = {
      playerName: this.state.playerName,
      coins: this.state.coins,
      setPlayerName,
      setCoins,
    };

    return (
      <PlayerContext.Provider value={PlayerContextAPI}>
        {this.props.children}
      </PlayerContext.Provider>
    );
  }
}