import { Icon } from 'antd';
import React from 'react';

export const CoinIcon: React.FC = () => (
  <Icon
    type="copyright"
    className="status-icon--coins"
    style={{ fontSize: 16, lineHeight: '16px', background: 'transparent' }}
  />
);

export const UserIcon: React.FC = () => (
  <Icon
    type="user"
    style={{ fontSize: 16, lineHeight: '16px', color: 'blue' }}
  />
);

export const summaryDescription = [
  {
    header: 'If ALL players contribute:',
    items: [
      <>
        6 <UserIcon /> x 10 <CoinIcon /> = 60 <CoinIcon /> x 2 = 120{' '}
        <CoinIcon />
      </>,
      <>
        120 <CoinIcon /> / 6 <UserIcon /> = 20 <CoinIcon />
      </>,
      <>
        All players get an equal share of 20 <CoinIcon /> for that round
      </>,
    ],
  },
  {
    header: 'If ONE player does not contribute:',
    items: [
      <>
        5 <UserIcon /> x 10 <CoinIcon /> = 50 <CoinIcon /> x 2 = 100{' '}
        <CoinIcon />
      </>,
      <>
        100 <CoinIcon /> / 6 <UserIcon /> = 16.67 <CoinIcon />
      </>,
      <>
        Players who contributed get 16.67 <CoinIcon />
      </>,
      <>
        Player who did not contribute get 26.67 <CoinIcon /> (16.67 shareout
        plus 10 <CoinIcon /> he/she kept)
      </>,
    ],
  },
  {
    header: 'If HALF of the players contribute:',
    items: [
      <>
        3 <UserIcon /> x 10 <CoinIcon /> = 30 <CoinIcon /> x 2 = 60 <CoinIcon />
      </>,
      <>
        60 <CoinIcon /> / 6 <UserIcon /> = 10 <CoinIcon />
      </>,
      <>
        3 players get 10 <CoinIcon />
      </>,
      <>
        3 players get 20 <CoinIcon /> (10 shareout plus 10 <CoinIcon /> he/she
        kept)
      </>,
    ],
  },
];

export const conclustionDescription = [
  {
    header: 'When not everybody contributes:',
    items: [
      'Some individuals benefit more than others',
      'Some individuals lose more than others',
    ],
  },
  {
    header: 'But when everybody in the groups contribute:',
    items: ['Everybody benefits.'],
  },
];
