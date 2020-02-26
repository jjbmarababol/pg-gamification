import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export interface Player {
  name: string;
  docId: string;
  channelId: string;
  coins: number;
  profileImage: string;
}

export const usePlayers = (id?: string) => {
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
          const { name, channelId, coins, profileImage } = player.data();
          return {
            name,
            channelId,
            coins,
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

export const getPlayersByChannel = async (channelId: string) => {
  let allPlayers;

  firebase
    .firestore()
    .collection('players')
    .where('channelId', '==', channelId)
    .orderBy('name')
    .onSnapshot((snapshot) => {
      allPlayers = snapshot.docs.map((player) => {
        const { name } = player.data();
        return {
          name,
          docId: player.id,
        };
      });
    });
  return allPlayers;
};

export const addPlayer = async (playerName: string) => {
  return await firebase
    .firestore()
    .collection('players')
    .add({
      name: playerName,
      coins: 0,
      contributions: 0,
      channelId: '',
    });
};

export const deletePlayer = async (playerId: string) => {
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
