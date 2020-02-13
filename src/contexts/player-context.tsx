import React, { createContext, useState } from "react";

interface IPlayer {
  playerName: string;
  playerId: string;
  channelId: string;
  coins: number;
}

interface IPlayerContextAPI extends IPlayer {
  setChannelId: (id: string) => void;
  setPlayerId: (id: string) => void;
  setPlayerName: (name: string) => void;
  updateCoins: (coins: number) => void;
}

// Initialized Value
export const PlayerContext = createContext({
  playerName: "",
  playerId: "",
  channelId: "",
  coins: 0,
  setPlayerId: (id: string) => {},
  setPlayerName: (name: string): void => {},
  updateCoins: (coins: number): void => {}
});

export interface IPlayerContextProps {
  children: React.ReactNode;
}

export const Player = (props: IPlayerContextProps) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [channelId, setChannelId] = useState<string>("");
  const [coins, setCoins] = useState<number>(0);

  const updateCoins = (acquired: number) => {
    setCoins(
      prevState =>
        Math.round((prevState + acquired + Number.EPSILON) * 100) / 100
    );
  };

  const PlayerContextAPI: IPlayerContextAPI = {
    playerId,
    playerName,
    channelId,
    coins,
    setPlayerId,
    setPlayerName,
    setChannelId,
    updateCoins
  };

  return (
    <PlayerContext.Provider value={PlayerContextAPI}>
      {props.children}
    </PlayerContext.Provider>
  );
};
