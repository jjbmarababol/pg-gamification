import { Table } from 'antd';
import _ from 'lodash';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { PlayerContext } from '../../contexts';
import { Contribution, contributionAPI, Player, playerAPI } from '../../hooks';
import { LoadingPage } from '../pages';

interface MatchResult {
  key: string;
  name: string;
  contribution: number;
  coins: number;
}
export const MatchResults: FunctionComponent = () => {
  const { useContributions } = contributionAPI;
  const { usePlayers } = playerAPI;
  const { channelId } = useContext(PlayerContext);
  const { contributions } = useContributions(channelId);
  const { players } = usePlayers(channelId);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Coins',
      dataIndex: 'coins',
      key: 'coins',
      ellipsis: true,
    },
    {
      title: 'Contrib.',
      dataIndex: 'contribution',
      key: 'contribution',
      ellipsis: true,
    },
  ];

  function fetchResult(contributions: Contribution[], matchPlayers: Player[]) {
    const total = _(contributions)
      .groupBy('playerId')
      .map((objs, key) => {
        const playerDetails = _.find(matchPlayers, function(player) {
          return player.docId === objs[0].playerId;
        });
        return {
          key,
          name: playerDetails?.name || key,
          coins: _.round(playerDetails?.coins || 0, 2),
          contribution: _.sumBy(objs, 'amount'),
        };
      })
      .orderBy('coins', 'desc')
      .value();
    return total;
  }

  useEffect(() => {
    if (!contributions || !players) {
      return;
    }
    setMatchResults(fetchResult(contributions, players));
    setIsLoading(false);
  }, [contributions, players]);

  let Page = <LoadingPage />;

  if (!contributions || isLoading) {
    Page = <LoadingPage />;
  } else {
    Page = <Table columns={columns} dataSource={matchResults} />;
  }
  return Page;
};
