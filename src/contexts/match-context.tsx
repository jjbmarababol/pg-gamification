import React, { createContext, useState, useEffect } from 'react';
import _ from 'lodash';

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
  setRound: (round: number) => void;
  setHasStarted: (hasStarted: boolean) => void;
  setPlayers: (players: number) => void;
  setPoolAmount: (amount: number) => void;
  setContributions: (contributions: IContribution[]) => void;
  randomizeContribution:() => void;
}

interface IMatchContextProps {
  children: any;
}

export const MatchContext = createContext<IMatchContextAPI>({
  round: 1,
  hasStarted: false,
  players: 0,
  poolAmount: 0,
  poolMultiplier: 0,
  totalAmount: 0,
  roundReward: 0,
  contributions: [],
  setRound: (round: number) => {},
  setHasStarted: (hasStarted: boolean) => {},
  setPlayers: (players: number) => {},
  setPoolAmount: (amount: number) => {},
  setContributions: (contributions: IContribution[]) => {},
  randomizeContribution:() => {},
});

export const Match = (props: IMatchContextProps) => {

  const [ round, setRound ] = useState<number>(1);
  const [ hasStarted, setHasStarted ] = useState<boolean>(false);
  const [ poolAmount, setPoolAmount ] = useState<number>(0);
  const [ poolMultiplier ] = useState<number>(2);
  const [ contributions, setContributions ] = useState<IContribution[]>([]);
  const [ totalAmount, setTotalAmount ] = useState<number>(0);
  const [ roundReward, setRoundReward ] = useState<number>(0);
  const [ players, setPlayers ] = useState<number>(6);
  
  const opponents = [
    'John',
    'Nathaniel',
    'Kleve',
    'Joshua',
    'Steve',
  ];

  const randomizeContribution = () => {
    let opponentContributions: IContribution[] = [];
    const contributionOptions = [0, 10];

    opponents.forEach(opponent => {
      opponentContributions.push({[opponent]: Number(_.sample(contributionOptions))})
    });

    setContributions([
      ...contributions,
      ...opponentContributions,
    ]);
  };

  useEffect(() => {
    const totalContributions = (contributions: IContribution[]) => {
      let totalContributions: number = 0;
      contributions.forEach(contribution => {
        totalContributions += contribution[Object.keys(contribution)[0]];
      });
      setPoolAmount(totalContributions);
    };

    totalContributions(contributions);
  }, [contributions]);

  useEffect(() => {
    setPoolAmount(0);
    setTotalAmount(0);
    setRoundReward(0);
    setContributions([]);
  }, [round]);
  
  useEffect(() => {
    const calcRoundRewards = () => {
      const totalAmount = poolAmount*poolMultiplier;
      const roundReward = totalAmount / players;
      setTotalAmount(totalAmount);
      setRoundReward(Math.round( ( roundReward + Number.EPSILON ) * 100 ) / 100)
    };

    calcRoundRewards();
  }, [poolAmount, poolMultiplier, players]);
  
 

  const MatchContextAPI:IMatchContextAPI = {
    round,
    hasStarted,
    players,
    poolAmount,
    poolMultiplier,
    totalAmount,
    roundReward,
    contributions,
    setRound,
    setHasStarted,
    setPlayers,
    setPoolAmount,
    setContributions,
    randomizeContribution,
  };

  return (
    <MatchContext.Provider value={MatchContextAPI}>
      {props.children}
    </MatchContext.Provider>
  );
};