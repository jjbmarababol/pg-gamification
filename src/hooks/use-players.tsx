import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export interface Player {
  name: string;
  docId: string;
  isPlaying: boolean;
  coins: number;
  contributions: number;
}

export const usePlayers = () => {

  const [ players, setPlayers ] = useState<Player[]>();

  useEffect(()=> {
    
    firebase
      .firestore()
      .collection('players')
      .where('isPlaying', '==', false)
      .orderBy('name')
      .onSnapshot(snapshot => {
        const allPlayers = snapshot.docs.map(channel=> {
          const { name, isPlaying, coins, contributions } = channel.data();
          return ({
            name,
            isPlaying,
            coins,
            contributions,
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

export const addPlayer = (playerName: string) => {

  return firebase
    .firestore()
    .collection('players')
    .add({
      name: playerName,
      coins: 0,
      contributions: 0,
      isPlaying: false,
    });
};

export const deletePlayer = (playerId: string) => {

  return firebase
    .firestore()
    .collection('players')
    .doc(playerId)
    .delete()
    .then(()=>{
      console.log('Deleted Successfully');
    }).catch(e=>{
      console.error('Error: ', e);
    });
};