import React, { createContext, useState } from 'react';

interface PlayerState {
  playerName: string;
  playerId: string;
  channelId: string;
  profileImage: string;
  coins: number;
}

interface PlayerContextAPI extends PlayerState {
  setPlayerId: (id: string) => void;
  setChannelId: (id: string) => void;
  setProfileImage: (image: string) => void;
  setPlayerName: (name: string) => void;
  updateCoins: (coins: number) => void;
}

// Initialized Value
export const PlayerContext = createContext<PlayerContextAPI>({
  playerName: '',
  playerId: '',
  channelId: '',
  profileImage: '',
  coins: 0,
  setPlayerId: (id: string) => ({ id }),
  setChannelId: (id: string) => ({ id }),
  setProfileImage: (image: string) => ({ image }),
  setPlayerName: (name: string) => ({ name }),
  updateCoins: (coins: number) => ({ coins }),
});

export interface PlayerContextProps {
  children: React.ReactNode;
}

export const Player = (props: PlayerContextProps) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [channelId, setChannelId] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('fish-1.svg');
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
    setPlayerId,
    setPlayerName,
    setChannelId,
    setProfileImage,
    updateCoins,
  };

  return (
    <PlayerContext.Provider value={PlayerContextAPI}>
      {props.children}
    </PlayerContext.Provider>
  );
};
