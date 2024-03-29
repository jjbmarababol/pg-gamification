import admin from 'firebase/app';
import { useEffect, useState } from 'react';

import { defaultChannels } from '../constants';
import { firebase } from '../firebase';

interface PooledAmount {
  round: number;
  amount: number;
}
export interface RawChannel {
  name: string;
  currentRound: number;
  hasStarted: boolean;
  totalPooledAmount: PooledAmount[];
  players: string[];
}

export interface Channel extends RawChannel {
  docId: string;
}

const defaultChannelValues: RawChannel = {
  name: '',
  currentRound: 1,
  hasStarted: false,
  totalPooledAmount: [],
  players: [],
};

const useChannels = () => {
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
            currentRound,
            hasStarted,
            players,
            totalPooledAmount,
          } = channel.data();
          return {
            ...defaultChannelValues,
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
    const { name, docId, hasStarted, currentRound } = channel;
    const docRef = db.collection('channels').doc(docId);
    batch.set(docRef, { name, hasStarted, currentRound }, { merge: true });
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

const getChannel = async (channelId: string) => {
  const channelRef = firebase
    .firestore()
    .collection('channels')
    .doc(channelId);

  return (await channelRef.get()).data();
};

const updateChannel = async ({ ...data }) => {
  const db = firebase.firestore();
  const channelRef = db.collection('channels').doc(data.docId);
  const channel = (await channelRef.get()).data();

  if (!channel) {
    return;
  }

  const { currentRound, hasStarted, totalPooledAmount } = {
    ...defaultChannelValues,
    ...channel,
    ...data,
  };

  return await channelRef.update({
    currentRound,
    hasStarted,
    totalPooledAmount,
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
  useChannels,
  getChannel,
  addChannels,
  updateChannel,
  leaveChannel,
  joinChannel,
};
