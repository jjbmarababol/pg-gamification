import React, { Component, createContext } from 'react';

interface IMatch {
  round: number;
  hasStarted: boolean;
  players: number;
  poolAmount: number;
  poolMultiplier: number;
  totalAmount: number;
  roundReward: number;
  contributions: IContribution[];
}

interface IContribution {
  [key:string]: string;
}

interface IMatchContext extends IMatch {
  setRound: () => void;
  setHasStarted: (hasStarted: boolean) => void;
  setPlayers: (players: number) => void;
  setPoolAmount: (amount: number) => void;
  setContributions: (contributions: IContribution[]) => void;
}

export const MatchContext = createContext({
  round: 1,
  hasStarted: false,
  players: 0,
  poolAmount: 0,
  poolMultiplier: 0,
  totalAmount: 0,
  roundReward: 0,
  contributions: Array(),
  setRound: () => {},
  setHasStarted: (hasStarted: boolean) => {},
  setPlayers: (players: number) => {},
  setPoolAmount: (amount: number) => {},
  setContributions: (contributions: IContribution[]) => {},
});

export class Match extends Component<{}, IMatch> {

  constructor(props: IMatchContext) {
    super(props);
  }

  render() {

    const setRound = () => {
      let {round} = this.state;
      round = round < 6 ? round++: round;
      return this.setState({
        round,
      });
    };

    const setHasStarted = (hasStarted: boolean) => {
      return this.setState({
        hasStarted
      });
    };

    const setPlayers = (players: number) => {
      return this.setState({
        players
      });
    };

    const setPoolAmount = (poolAmount: number) => {
      this.setState({
        poolAmount
      });
      return calcRoundRewards();
    };

    const setContributions = (contributions: IContribution[]) => {
      return this.setState({
        contributions: [
          ...this.state.contributions,
          ...contributions,
        ]
      })
    };

    const calcRoundRewards = () => {
      const { poolAmount, poolMultiplier, players } = this.state;
      const totalAmount = poolAmount*poolMultiplier;
      const roundReward = totalAmount / players;
      this.setState({
        totalAmount,
        roundReward,
      });
    };

    const MatchContextAPI:IMatchContext = {
      round: 1,
      hasStarted: false,
      players: 6,
      poolAmount: 0,
      poolMultiplier: 2,
      totalAmount: 0,
      roundReward: 0,
      contributions: [],
      setRound,
      setHasStarted,
      setPlayers,
      setPoolAmount,
      setContributions,
    };

    return <MatchContext.Provider value={MatchContextAPI}>
      {this.props.children}
    </MatchContext.Provider>;
  };
}