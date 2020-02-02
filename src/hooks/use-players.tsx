import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

interface Player {
  name: string;
  docId: string;
  isPlaying: boolean;
  coins: number;
}

export const usePlayers = () => {

  const [ players, setPlayers ] = useState<Player[]>();
  useEffect(()=> {
    firebase
      .firestore()
      .collection('players')
      .where('isPlaying', '==', false)
      .orderBy('name')
      .get()
      .then( snapshot => {
        const allPlayers = snapshot.docs.map(channel=> {
          const { name, isPlaying, coins } = channel.data();
          return ({
            name,
            isPlaying,
            coins,
            docId: channel.id,
          });
        });
      
        if(JSON.stringify(allPlayers) !== JSON.stringify(players)){
          setPlayers(allPlayers);
        }
      });
  });

  return { players, setPlayers };
};