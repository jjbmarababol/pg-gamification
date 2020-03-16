import React, { createContext, useEffect, useState } from 'react';

import { defaultMaxPlayers } from '../constants';

export interface MatchState {
  round: number;
  hasStarted: boolean;
  isFinished: boolean;
  players: number;
  poolAmount: number;
  totalAmount: number;
  roundReward: number;
  contributions: Contribution[];
  matchContributions: Contribution[];
}

export interface Contribution {
  [key: string]: number;
}

interface MatchContextAPI extends MatchState {
  setRound: (round: number) => void;
  setHasStarted: (hasStarted: boolean) => void;
  setIsFinished: (isFinished: boolean) => void;
  setPoolAmount: (amount: number) => void;
  setRoundReward: (amount: number) => void;
  setTotalAmount: (amount: number) => void;
  setContributions: (contributions: Contribution[]) => void;
  setMatchContributions: (contributions: Contribution[]) => void;
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
  totalAmount: 0,
  roundReward: 0,
  contributions: [],
  matchContributions: [],

  setRound: (round) => ({ round }),
  setHasStarted: (hasStarted) => ({ hasStarted }),
  setIsFinished: (isFinished) => ({ isFinished }),
  setPoolAmount: (poolAmount) => ({ poolAmount }),
  setRoundReward: (roundReward) => ({ roundReward }),
  setTotalAmount: (totalAmount) => ({ totalAmount }),
  setContributions: (contributions) => ({ contributions }),
  setMatchContributions: (matchContributions) => ({ matchContributions }),
});

export const Match = (props: MatchContextProps) => {
  const [round, setRound] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [poolAmount, setPoolAmount] = useState<number>(0);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [matchContributions, setMatchContributions] = useState<Contribution[]>(
    [],
  );
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [roundReward, setRoundReward] = useState<number>(0);
  const [players] = useState<number>(defaultMaxPlayers);

  useEffect(() => {
    setPoolAmount(0);
    setTotalAmount(0);
    setRoundReward(0);
  }, [round]);

  const MatchContextAPI: MatchContextAPI = {
    round,
    hasStarted,
    isFinished,
    players,
    poolAmount,
    totalAmount,
    roundReward,
    contributions,
    matchContributions,
    setRound,
    setHasStarted,
    setIsFinished,
    setPoolAmount,
    setTotalAmount,
    setContributions,
    setRoundReward,
    setMatchContributions,
  };

  return (
    <MatchContext.Provider value={MatchContextAPI}>
      {props.children}
    </MatchContext.Provider>
  );
};
