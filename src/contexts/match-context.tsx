import React, { Component, createContext } from 'react';

export interface IMatchState {
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
  [key: string]: number;
}

interface IMatchContextAPI extends IMatchState {
  setRound: () => void;
  setHasStarted: (hasStarted: boolean) => void;
  setPlayers: (players: number) => void;
  setPoolAmount: (amount: number) => void;
  setContributions: (contributions: IContribution[]) => void;
  clearRoundResults:() => void;
}

interface IMatchContextProps {}

export const MatchContext = createContext({
  round: 1,
  hasStarted: false,
  players: 0,
  poolAmount: 0,
  poolMultiplier: 0,
  totalAmount: 0,
  roundReward: 0,
  contributions: {},
  setRound: () => {},
  setHasStarted: (hasStarted: boolean) => {},
  setPlayers: (players: number) => {},
  setPoolAmount: (amount: number) => {},
  setContributions: (contributions: IContribution[]) => {},
  clearRoundResults:() => {},
});

export class Match extends Component<{}, IMatchState> {

  constructor(props: IMatchContextProps) {
    super(props);
    this.state = {
      round: 1,
      hasStarted: false,
      players: 6,
      poolAmount: 0,
      poolMultiplier: 2,
      totalAmount: 0,
      roundReward: 0,
      contributions: [{}],
    }
  }

  render() {

    const calcRoundRewards = () => {
      const { poolAmount, poolMultiplier, players } = this.state;
      const totalAmount = poolAmount*poolMultiplier;
      const roundReward = totalAmount / players;
      this.setState({
        totalAmount,
        roundReward,
      });
    };

    const MatchContextAPI:IMatchContextAPI = {

      ...this.state,

      clearRoundResults: () => {
        this.setState({
          poolAmount: 0,
          totalAmount: 0,
          roundReward: 0,
          contributions: [{}]
        })
      },

      setRound: () => {
        let {round} = this.state;
        round = round < 6 ? round++: round;
        this.setState({
          round,
        });
      },

      setContributions: (contributions: IContribution[]) => {
        this.setState({
          contributions: [
            ...[...this.state.contributions],
            ...contributions,
          ]
        })
      },

      setPoolAmount: (poolAmount: number) => {
        this.setState({
          poolAmount
        });
        calcRoundRewards();
      },

      setPlayers: (players: number) => {
        this.setState({
          players
        });
      },

      setHasStarted: (hasStarted: boolean) => {
        this.setState({
          hasStarted
        });
      },
    };

    

    return <MatchContext.Provider value={MatchContextAPI}>
      {this.props.children}
    </MatchContext.Provider>;
  };
}