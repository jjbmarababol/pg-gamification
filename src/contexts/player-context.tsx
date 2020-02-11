import React, { Component, createContext } from 'react';

interface IPlayer {
  playerName: string;
  playerId: string;
  coins: number,
}

interface IPlayerContext extends IPlayer {
  setPlayerId: (id: string) => void;
  setPlayerName: (name: string) => void;
  setCoins: (coins: number) => void;
}

// Initialized Value
export const PlayerContext = createContext({
  playerName: '',
  playerId: '',
  coins: 0,
  setPlayerId: (id: string) => {},
  setPlayerName: (name: string): void => {},
  setCoins: (coins: number): void => {},
});

export class Player extends Component<{}, IPlayer> {

  constructor(props: IPlayerContext){
    super(props);
    this.state = {
      playerName: 'Jigs',
      playerId: '0km6agVzHnVXnkuy1PDN',
      coins: 0,
    }
  }

  public render() {
    const setPlayerName = (playerName: string) => {
      this.setState({
        playerName
      })
    };

    const setPlayerId = (playerId: string) => {
      this.setState({
        playerId
      })
    };

    const setCoins = (roundReward: number) => {
      this.setState({
        coins: Math.round( ( (this.state.coins + roundReward) + Number.EPSILON ) * 100 ) / 100,
      })
    };

    const PlayerContextAPI: IPlayerContext = {
      playerName: this.state.playerName,
      playerId: this.state.playerId,
      coins: this.state.coins,
      setPlayerName,
      setPlayerId,
      setCoins,
    };

    return (
      <PlayerContext.Provider value={PlayerContextAPI}>
        {this.props.children}
      </PlayerContext.Provider>
    );
  }
}