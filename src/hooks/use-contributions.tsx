import { useState, useEffect } from "react";
import { firebase } from "../firebase";

export interface ContributionCore {
  round: number;
  amount: number;
  channelId: string;
  playerId: string;
  contributedAt: string;
}

export interface Contribution extends ContributionCore {
  docId: string;
}

export const useContributions = (id?: string) => {
  const channelId = id ? id : "";
  const [contributions, setContributions] = useState<Contribution[]>();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("contributions")
      .where("channelId", "==", channelId)
      .orderBy("round")
      .onSnapshot((snapshot) => {
        const allContributions = snapshot.docs.map((contribution) => {
          const { round, channelId, playerId, amount, contributedAt } = contribution.data();
          return {
            round,
            amount,
            channelId,
            playerId,
            contributedAt,
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

export const getContributionsByPlayer = async (playerId: string) => {
  let allContributions;

  firebase
    .firestore()
    .collection("contributions")
    .where("playerId", "==", playerId)
    .orderBy("round")
    .onSnapshot((snapshot) => {
      allContributions = snapshot.docs.map((contribution) => {
        const { name } = contribution.data();
        return {
          name,
          docId: contribution.id,
        };
      });
    });
  return allContributions;
};

export const addContribution = async (contributionObject: ContributionCore) => {
  const { playerId, channelId, amount, round } = contributionObject;
  return await firebase
    .firestore()
    .collection("contributions")
    .add({
      playerId,
      amount,
      channelId,
      round,
    });
};

export const deleteContribution = async (contributionId: string) => {
  return await firebase
    .firestore()
    .collection("contributions")
    .doc(contributionId)
    .delete()
    .then(() => {
      console.log("Deleted Successfully");
    })
    .catch((e) => {
      console.error("Error: ", e);
    });
};
