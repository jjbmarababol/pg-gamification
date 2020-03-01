import { useEffect, useState } from 'react';

import { firebase } from '../firebase';

export interface RawPlayer {
  name: string;
  channelId: string;
  coins: number;
  isReady: boolean;
  profileImage: string;
}
export interface Player extends RawPlayer {
  docId: string;
}

const defaultPlayerValues: RawPlayer = {
  name: '',
  channelId: '',
  isReady: false,
  coins: 0,
  profileImage: 'fish-1.svg',
};

const usePlayers = (id?: string) => {
  const channelId = id ? id : '';
  const [players, setPlayers] = useState<Player[]>();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('players')
      .where('channelId', '==', channelId)
      .orderBy('name')
      .onSnapshot((snapshot) => {
        const allPlayers = snapshot.docs.map((player) => {
          const {
            name,
            channelId,
            coins,
            isReady,
            profileImage,
          } = player.data();
          return {
            ...defaultPlayerValues,
            name,
            channelId,
            coins,
            isReady,
            profileImage,
            docId: player.id,
          };
        });

        if (JSON.stringify(allPlayers) !== JSON.stringify(players)) {
          setPlayers(allPlayers);
        }
      });

    return () => {
      unsubscribe();
    };
  });

  return { players, setPlayers };
};

const getPlayer = async (playerId: string) => {
  const playerRef = firebase
    .firestore()
    .collection('players')
    .doc(playerId);

  return (await playerRef.get()).data();
};

const addPlayer = async (playerName: string, profileImage: string) => {
  return await firebase
    .firestore()
    .collection('players')
    .add({
      ...defaultPlayerValues,
      name: playerName,
      profileImage,
    });
};

const deletePlayer = async (playerId: string) => {
  return await firebase
    .firestore()
    .collection('players')
    .doc(playerId)
    .delete()
    .then(() => {
      console.log('Deleted Successfully');
    })
    .catch((e) => {
      console.error('Error: ', e);
    });
};

const updatePlayer = async ({ ...data }) => {
  const db = firebase.firestore();
  const playerRef = db.collection('players').doc(data.docId);
  const player = (await playerRef.get()).data();

  if (!player) {
    return;
  }

  const { coins, isReady } = {
    ...defaultPlayerValues,
    ...player,
    ...data,
  };

  return await playerRef.update({
    coins,
    isReady,
  });
};

export const playerAPI = {
  usePlayers,
  deletePlayer,
  updatePlayer,
  addPlayer,
  getPlayer,
};
