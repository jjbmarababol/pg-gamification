import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export interface Channel {
  name: string;
  hasStarted: boolean;
  players: string;
}

export const useChannels = () => {

  const [ channels, setChannels ] = useState<any>([]);
  
  useEffect(()=> {
    let channels = firebase
      .firestore()
      .collection('channels')
      .where('hasStarted', '==', false)
      .orderBy('name')
      .get()
      .then( snapshot => {
        const allChannels = snapshot.docs.map(channel =>({
          ...channel.data(),
          docId: channel.id,
        }));

        if(JSON.stringify(allChannels) !== JSON.stringify(channels)){
          setChannels(allChannels);
        }
      });
    
  }, [channels]);

  return { channels, setChannels };
};