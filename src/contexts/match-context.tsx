import React, { createContext, useState, useEffect } from "react";
import _ from "lodash";

export interface IMatchState {
  round: number;
  hasStarted: boolean;
  isFinished: boolean;
  players: number;
  poolAmount: number;
  poolMultiplier: number;
  totalAmount: number;
  roundReward: number;
  contributions: IContribution[];
  matchContributions: IContribution[];
  ranking: IContribution[];
}

export interface IContribution {
  [key: string]: number;
}

interface IMatchContextAPI extends IMatchState {
  setRound: (round: number) => void;
  setHasStarted: (hasStarted: boolean) => void;
  setIsFinished: (isFinished: boolean) => void;
  setPlayers: (players: number) => void;
  setPoolAmount: (amount: number) => void;
  setContributions: (contributions: IContribution[]) => void;
  setMatchContributions: (contributions: IContribution[]) => void;
  randomizeContribution: () => void;
}

interface IMatchContextProps {
  children: any;
}

export const MatchContext = createContext<IMatchContextAPI>({
  round: 1,
  hasStarted: false,
  isFinished: false,
  players: 0,
  poolAmount: 0,
  poolMultiplier: 0,
  totalAmount: 0,
  roundReward: 0,
  contributions: [],
  matchContributions: [],
  ranking: [],
  setRound: (round: number) => {},
  setHasStarted: (hasStarted: boolean) => {},
  setIsFinished: (isFinished: boolean) => {},
  setPlayers: (players: number) => {},
  setPoolAmount: (amount: number) => {},
  setContributions: (contributions: IContribution[]) => {},
  setMatchContributions: (contributions: IContribution[]) => {},
  randomizeContribution: () => {}
});

export const Match = (props: IMatchContextProps) => {
  const [round, setRound] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [poolAmount, setPoolAmount] = useState<number>(0);
  const [poolMultiplier] = useState<number>(2);
  const [contributions, setContributions] = useState<IContribution[]>([]);
  const [matchContributions, setMatchContributions] = useState<IContribution[]>(
    []
  );
  const [ranking, setRanking] = useState<IContribution[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [roundReward, setRoundReward] = useState<number>(0);
  const [players, setPlayers] = useState<number>(6);

  const opponents = ["Clyffa", "Nathalie", "Rosie", "Joshua", "Steve"];

  const getPlayerName = (object: IContribution) => {
    return Object.keys(object)[0];
  };

  const randomizeContribution = () => {
    let opponentContributions: IContribution[] = [];
    const contributionOptions = [0, 10];

    opponents.forEach(opponent => {
      opponentContributions.push({
        [opponent]: Number(_.sample(contributionOptions))
      });
    });

    setContributions([...contributions, ...opponentContributions]);
  };

  useEffect(() => {
    const totalContributions = (contributions: IContribution[]) => {
      let totalContributions: number = 0;
      contributions.forEach(contribution => {
        totalContributions += contribution[Object.keys(contribution)[0]];
      });
      setPoolAmount(totalContributions);
    };

    totalContributions(contributions);
  }, [contributions]);

  useEffect(() => {
    setPoolAmount(0);
    setTotalAmount(0);
    setRoundReward(0);
    setContributions([]);
  }, [round]);

  useEffect(() => {
    const matchRanking = (contributions: IContribution[]) => {
      const summation = _(contributions)
        .groupBy(function(arr) {
          return getPlayerName(arr);
        })
        .map(obj => {
          let value = 0;
          let player = "";
          obj.forEach(ob => {
            player = getPlayerName(ob);
            value += ob[player];
          });
          return { [player]: value };
        })
        .value();
      setRanking(summation);
    };
    matchRanking(matchContributions);
  }, [matchContributions]);

  useEffect(() => {
    const calcRoundRewards = () => {
      const totalAmount = poolAmount * poolMultiplier;
      const roundReward = totalAmount / players;
      setTotalAmount(totalAmount);
      setRoundReward(Math.round((roundReward + Number.EPSILON) * 100) / 100);
    };

    calcRoundRewards();
  }, [poolAmount, poolMultiplier, players]);

  const MatchContextAPI: IMatchContextAPI = {
    round,
    hasStarted,
    isFinished,
    players,
    poolAmount,
    poolMultiplier,
    totalAmount,
    roundReward,
    contributions,
    matchContributions,
    ranking,
    setRound,
    setHasStarted,
    setIsFinished,
    setPlayers,
    setPoolAmount,
    setContributions,
    setMatchContributions,
    randomizeContribution
  };

  return (
    <MatchContext.Provider value={MatchContextAPI}>
      {props.children}
    </MatchContext.Provider>
  );
};
