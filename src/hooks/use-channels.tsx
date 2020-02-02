import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

interface Channel {
  name: string;
  docId: string;
  hasStarted: boolean;
  players: string[];
}

export const useChannels = () => {

  const [ channels, setChannels ] = useState<Channel[]>();
  useEffect(()=> {
    firebase
      .firestore()
      .collection('channels')
      .where('hasStarted', '==', false)
      .orderBy('name')
      .get()
      .then( snapshot => {
        const allChannels = snapshot.docs.map(channel=> {
          const { name, hasStarted, players } = channel.data();
          return ({
            name,
            hasStarted,
            players,
            docId: channel.id,
          });
        });
      
        if(JSON.stringify(allChannels) !== JSON.stringify(channels)){
          setChannels(allChannels);
        }
      });
  });

  return { channels, setChannels };
};