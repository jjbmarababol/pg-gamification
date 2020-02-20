import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { defaultChannels } from "../constants";
import * as admin from "firebase/app";

export interface RawChannel {
  name: string;
  hasStarted: boolean;
  players: string[];
}
export interface Channel extends RawChannel {
  docId: string;
}

export const useChannels = () => {
  const [channels, setChannels] = useState<Channel[]>();
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("channels")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        const allChannels = snapshot.docs.map((channel) => {
          const { name, hasStarted = false, players = [] } = channel.data();
          return {
            name,
            hasStarted,
            players,
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
    const docRef = db.collection("channels").doc(docId);
    batch.set(docRef, { name }, { merge: true });
  });

  return await batch.commit();
};

const joinChannel = async (channelId: string, playerId: string) => {
  const db = firebase.firestore();
  const channelRef = db.collection("channels").doc(channelId);
  const playerRef = db.collection("players").doc(playerId);

  await playerRef.update({
    channelId,
  });

  return await channelRef.update({
    players: admin.firestore.FieldValue.arrayUnion(playerId),
  });
};

const leaveChannel = async (channelId: string, playerId: string) => {
  const db = firebase.firestore();
  const channelRef = db.collection("channels").doc(channelId);
  const playerRef = db.collection("players").doc(playerId);

  await playerRef.update({
    channelId: "",
  });

  return await channelRef.update({
    players: admin.firestore.FieldValue.arrayRemove(playerId),
  });
};

export const channelAPI = {
  addChannels,
  leaveChannel,
  joinChannel,
};
