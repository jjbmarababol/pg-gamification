import React, { createContext, useState } from 'react';

interface ContributionState {
  round: number;
  playerId: string;
  channelId: string;
  amount: number;
  contributedAt?: string;
}

interface ContributionContextAPI extends ContributionState {
  setRound: (round: number) => void;
  setChannelId: (id: string) => void;
  setPlayerId: (id: string) => void;
  setContributions: (amount: number) => void;
}

// Initialized Value
export const ContributionContext = createContext<ContributionContextAPI>({
  round: 0,
  amount: 0,
  playerId: '',
  channelId: '',
  setRound: (round: number) => ({ round }),
  setChannelId: (id: string) => ({ id }),
  setPlayerId: (id: string) => ({ id }),
  setContributions: (amount: number) => ({ amount }),
});

export interface ContributionContextProps {
  children: React.ReactNode;
}

export const Contribution = (props: ContributionContextProps) => {
  const [round, setRound] = useState<number>(0);
  const [playerId, setPlayerId] = useState<string>('Z1saX25Py2kskFKyMUaj');
  const [channelId, setChannelId] = useState<string>('blue-shark');
  const [amount, setContributions] = useState<number>(0);

  const ContributionContextAPI = {
    round,
    playerId,
    channelId,
    amount,
    setRound,
    setChannelId,
    setPlayerId,
    setContributions,
  };

  return (
    <ContributionContext.Provider value={ContributionContextAPI}>
      {props.children}
    </ContributionContext.Provider>
  );
};
