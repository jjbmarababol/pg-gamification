import { useEffect, useState } from 'react';

import { firebase } from '../firebase';

export interface RawContribution {
  round: number;
  amount: number;
  channelId: string;
  playerId: string;
}

export interface Contribution extends RawContribution {
  docId: string;
}

const defaultContributionValues: RawContribution = {
  round: 0,
  amount: 0,
  channelId: '',
  playerId: '',
};

const useContributions = (id?: string, round?: number) => {
  const channelId = id ? id : '';
  const [contributions, setContributions] = useState<Contribution[]>();

  useEffect(() => {
    const base = firebase
      .firestore()
      .collection('contributions')
      .where('channelId', '==', channelId);

    const unsubscribe = (round
      ? base.where('round', '==', round)
      : base
    ).onSnapshot((snapshot) => {
      const allContributions = snapshot.docs.map((contribution) => {
        const { round, channelId, playerId, amount } = contribution.data();
        return {
          ...defaultContributionValues,
          round,
          amount,
          channelId,
          playerId,
          docId: contribution.id,
        };
      });

      if (JSON.stringify(allContributions) !== JSON.stringify(contributions)) {
        setContributions(allContributions);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return { contributions, setContributions };
};

const getContributionsByPlayer = async (playerId: string) => {
  let allContributions;
  firebase
    .firestore()
    .collection('contributions')
    .where('playerId', '==', playerId)
    .orderBy('round')
    .onSnapshot((snapshot) => {
      allContributions = snapshot.docs.map((contribution) => {
        const { round = 1, channelId, amount = 0 } = contribution.data();
        return {
          ...defaultContributionValues,
          round,
          amount,
          channelId,
          docId: contribution.id,
        };
      });
    });
  return allContributions;
};

const addContribution = async (contributionObject: RawContribution) => {
  const { playerId, channelId, amount, round } = contributionObject;
  return await firebase
    .firestore()
    .collection('contributions')
    .add({
      playerId,
      amount,
      channelId,
      round,
    });
};

const deleteContribution = async (contributionId: string) => {
  return await firebase
    .firestore()
    .collection('contributions')
    .doc(contributionId)
    .delete()
    .then(() => {
      console.log('Deleted Successfully');
    })
    .catch((e) => {
      console.error('Error: ', e);
    });
};

export const contributionAPI = {
  useContributions,
  addContribution,
  getContributionsByPlayer,
  deleteContribution,
};
