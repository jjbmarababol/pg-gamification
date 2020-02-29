import admin from 'firebase/app';
import { useEffect, useState } from 'react';

import { defaultChannels } from '../constants';
import { firebase } from '../firebase';

interface PooledAmount {
  round: number;
  amount: number;
}
export interface RawChannel {
  name?: string;
  currentRound?: number;
  hasStarted?: boolean;
  totalPooledAmount?: PooledAmount[];
  players?: string[];
}

export interface Channel extends RawChannel {
  docId: string;
}

export const useChannels = () => {
  const [channels, setChannels] = useState<Channel[]>();
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('channels')
      .orderBy('name')
      .onSnapshot((snapshot) => {
        const allChannels = snapshot.docs.map((channel) => {
          const {
            name,
            currentRound = 1,
            hasStarted = false,
            players = [],
            totalPooledAmount = [],
          } = channel.data();
          return {
            name,
            currentRound,
            hasStarted,
            players,
            totalPooledAmount,
            docId: channel.id,
          };
        });
        if (JSON.stringify(allChannels) !== JSON.stringify(channels)) {
          setChannels(allChannels);
        }
      });

    return () => {
      unsubscribe();
    };
  });

  return { channels, setChannels };
};

const addChannels = async () => {
  const db = firebase.firestore();
  const batch = db.batch();

  defaultChannels.forEach((channel) => {
    const { name, docId } = channel;
    const docRef = db.collection('channels').doc(docId);
    batch.set(docRef, { name }, { merge: true });
  });

  return await batch.commit();
};

const joinChannel = async (channelId: string, playerId: string) => {
  const db = firebase.firestore();
  const channelRef = db.collection('channels').doc(channelId);
  const playerRef = db.collection('players').doc(playerId);

  await playerRef.update({
    channelId,
  });

  return await channelRef.update({
    players: admin.firestore.FieldValue.arrayUnion(playerId),
  });
};

const updateChannel = async (data: Channel) => {
  const { docId: channelId, currentRound = 1, hasStarted = false } = data;
  const db = firebase.firestore();
  const channelRef = db.collection('channels').doc(channelId);

  const channel = (await channelRef.get()).data();

  return await channelRef.update({
    ...channel,
    currentRound,
    hasStarted,
  });
};

const leaveChannel = async (channelId: string, playerId: string) => {
  const db = firebase.firestore();
  const channelRef = db.collection('channels').doc(channelId);
  const playerRef = db.collection('players').doc(playerId);

  await playerRef.update({
    channelId: '',
  });

  return await channelRef.update({
    players: admin.firestore.FieldValue.arrayRemove(playerId),
  });
};

export const channelAPI = {
  addChannels,
  updateChannel,
  leaveChannel,
  joinChannel,
};
