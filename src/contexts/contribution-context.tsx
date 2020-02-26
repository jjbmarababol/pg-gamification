import React, { createContext, useState } from "react";

interface IContributionState {
  round: number;
  playerId: string;
  channelId: string;
  amount: number;
  contributedAt?: string;
}

interface IContributionContextAPI extends IContributionState {
  setRound: (round: number) => void;
  setChannelId: (id: string) => void;
  setPlayerId: (id: string) => void;
  setContributions: (amount: number) => void;
}

// Initialized Value
export const ContributionContext = createContext({
  round: 0,
  amount: 0,
  playerId: "",
  channelId: "",
  setRound: (round: number) => {},
  setChannelId: (id: string) => {},
  setPlayerId: (id: string) => {},
  setContributions: (amount: number) => {},
});

export interface IContributionContextProps {
  children: React.ReactNode;
}

export const Contribution = (props: IContributionContextProps) => {
  const [round, setRound] = useState<number>(0);
  const [playerId, setPlayerId] = useState<string>("Z1saX25Py2kskFKyMUaj");
  const [channelId, setChannelId] = useState<string>("blue-shark");
  const [amount, setContributions] = useState<number>(0);

  const ContributionContextAPI: IContributionContextAPI = {
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
