import React, { Component, createContext } from 'react';

interface IPlayer {
  playerName: string;
  money: number,
}

interface IPlayerContext extends IPlayer {
  setPlayerName: (name: string) => void;
  setMoney: (money: number) => void;
}

// Initialized Value
export const PlayerContext = createContext({
  playerName: '',
  money: 0,
  setPlayerName: (name: string): void => {},
  setMoney: (money: number): void => {},
});

export class Player extends Component<{}, IPlayer> {

  constructor(props: IPlayerContext){
    super(props);
    this.state = {
      playerName: '',
      money: 0,
    }
  }

  public render() {
    const setPlayerName = (playerName: string) => {
      return this.setState({
        playerName
      })
    };

    const setMoney = (money: number) => {
      return this.setState({
        money
      })
    };

    const PlayerContextAPI: IPlayerContext = {
      playerName: this.state.playerName,
      money: this.state.money,
      setPlayerName,
      setMoney,
    };

    return (
      <PlayerContext.Provider value={PlayerContextAPI}>
        {this.props.children}
      </PlayerContext.Provider>
    );
  }
}