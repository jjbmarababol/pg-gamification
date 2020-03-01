import _ from 'lodash';
import React, { createContext, useEffect, useState } from 'react';

import { defaultMaxPlayers } from '../constants';

export interface MatchState {
  round: number;
  hasStarted: boolean;
  isFinished: boolean;
  players: number;
  poolAmount: number;
  poolMultiplier: number;
  totalAmount: number;
  roundReward: number;
  contributions: Contribution[];
  matchContributions: Contribution[];
  ranking: Contribution[];
}

export interface Contribution {
  [key: string]: number;
}

interface MatchContextAPI extends MatchState {
  setRound: (round: number) => void;
  setHasStarted: (hasStarted: boolean) => void;
  setIsFinished: (isFinished: boolean) => void;
  setPlayers: (players: number) => void;
  setPoolAmount: (amount: number) => void;
  setContributions: (contributions: Contribution[]) => void;
  setMatchContributions: (contributions: Contribution[]) => void;
  randomizeContribution: () => void;
}

interface MatchContextProps {
  children: React.ReactNode;
}

export const MatchContext = createContext<MatchContextAPI>({
  round: 0,
  hasStarted: false,
  isFinished: false,
  players: defaultMaxPlayers,
  poolAmount: 0,
  poolMultiplier: 0,
  totalAmount: 0,
  roundReward: 0,
  contributions: [],
  matchContributions: [],
  ranking: [],
  setRound: () => null,
  setHasStarted: () => null,
  setIsFinished: () => null,
  setPlayers: () => null,
  setPoolAmount: () => null,
  setContributions: () => null,
  setMatchContributions: () => null,
  randomizeContribution: () => null,
});

export const Match = (props: MatchContextProps) => {
  const [round, setRound] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [poolAmount, setPoolAmount] = useState<number>(0);
  const [poolMultiplier] = useState<number>(2);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [matchContributions, setMatchContributions] = useState<Contribution[]>(
    [],
  );
  const [ranking, setRanking] = useState<Contribution[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [roundReward, setRoundReward] = useState<number>(0);
  const [players, setPlayers] = useState<number>(defaultMaxPlayers);

  const opponents = ['Clyffa', 'Nathalie', 'Rosie', 'Joshua', 'Steve'];

  const getPlayerName = (object: Contribution) => {
    return Object.keys(object)[0];
  };

  const randomizeContribution = () => {
    const opponentContributions: Contribution[] = [];
    const contributionOptions = [0, 10];

    opponents.forEach((opponent) => {
      opponentContributions.push({
        [opponent]: Number(_.sample(contributionOptions)),
      });
    });

    setContributions([...contributions, ...opponentContributions]);
  };

  useEffect(() => {
    const totalContributions = (contributions: Contribution[]) => {
      let totalContributions = 0;
      contributions.forEach((contribution) => {
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
    const matchRanking = (contributions: Contribution[]) => {
      const summation = _(contributions)
        .groupBy(function(arr) {
          return getPlayerName(arr);
        })
        .map((obj) => {
          let value = 0;
          let player = '';
          obj.forEach((ob) => {
            player = getPlayerName(ob);
            value += ob[player];
          });
          return { [player]: value };
        })
        .value();
      setRanking(summation);
    };
    matchRanking(matchContributions);
  }, [matchContributions]);

  useEffect(() => {
    const calcRoundRewards = () => {
      const totalAmount = poolAmount * poolMultiplier;
      const roundReward = _.round(totalAmount / defaultMaxPlayers, 2);
      setTotalAmount(totalAmount);
      setRoundReward(roundReward);
    };

    calcRoundRewards();
  }, [poolAmount, poolMultiplier, players]);

  const MatchContextAPI: MatchContextAPI = {
    round,
    hasStarted,
    isFinished,
    players,
    poolAmount,
    poolMultiplier,
    totalAmount,
    roundReward,
    contributions,
    matchContributions,
    ranking,
    setRound,
    setHasStarted,
    setIsFinished,
    setPlayers,
    setPoolAmount,
    setContributions,
    setMatchContributions,
    randomizeContribution,
  };

  return (
    <MatchContext.Provider value={MatchContextAPI}>
      {props.children}
    </MatchContext.Provider>
  );
};
