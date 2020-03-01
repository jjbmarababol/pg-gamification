import React, { createContext, useState } from 'react';

interface PlayerState {
  playerName: string;
  playerId: string;
  channelId: string;
  isReady: boolean;
  profileImage: string;
  coins: number;
}

interface PlayerContextAPI extends PlayerState {
  setPlayerId: (id: string) => void;
  setChannelId: (id: string) => void;
  setProfileImage: (image: string) => void;
  setPlayerName: (name: string) => void;
  setIsReady: (isReady: boolean) => void;
  setCoins: (coins: number) => void;
  updateCoins: (coins: number) => void;
}

// Initialized Value
export const PlayerContext = createContext<PlayerContextAPI>({
  playerName: '',
  playerId: '',
  channelId: '',
  profileImage: '',
  isReady: false,
  coins: 0,
  setPlayerId: (id: string) => ({ id }),
  setChannelId: (id: string) => ({ id }),
  setProfileImage: (image: string) => ({ image }),
  setIsReady: (isReady: boolean) => ({ isReady }),
  setPlayerName: (name: string) => ({ name }),
  setCoins: (coins: number) => ({ coins }),
  updateCoins: (coins: number) => ({ coins }),
});

export interface PlayerContextProps {
  children: React.ReactNode;
}

export const Player = (props: PlayerContextProps) => {
  const [playerName, setPlayerName] = useState<string>('Nathaniel');
  const [playerId, setPlayerId] = useState<string>('zpkxxPkBFwoPesnmDnJi');
  const [channelId, setChannelId] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('fish-4.svg');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(0);

  const updateCoins = (acquired: number) => {
    setCoins(
      (prevState) =>
        Math.round((prevState + acquired + Number.EPSILON) * 100) / 100,
    );
  };

  const PlayerContextAPI = {
    playerId,
    playerName,
    channelId,
    profileImage,
    coins,
    isReady,
    setPlayerId,
    setPlayerName,
    setChannelId,
    setProfileImage,
    updateCoins,
    setCoins,
    setIsReady,
  };

  return (
    <PlayerContext.Provider value={PlayerContextAPI}>
      {props.children}
    </PlayerContext.Provider>
  );
};
