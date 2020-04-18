import { Channel } from '../hooks';

const defaultChannelValues: Channel = {
  name: '',
  docId: '',
  hasStarted: false,
  currentRound: 1,
  population: 2,
  players: [],
};

export const defaultChannels: Channel[] = [
  {
    ...defaultChannelValues,
    name: 'Atlantic Cod',
    docId: 'atlantic-cod',
  },
  {
    ...defaultChannelValues,
    name: 'Blue Shark',
    docId: 'blue-shark',
  },
  {
    ...defaultChannelValues,
    name: 'Crab',
    docId: 'crab',
  },
  {
    ...defaultChannelValues,
    name: 'Dolphin',
    docId: 'dolphin',
  },
  {
    ...defaultChannelValues,
    name: 'Eel',
    docId: 'eel',
  },
  {
    ...defaultChannelValues,
    name: 'Flounder',
    docId: 'flounder',
  },
  {
    ...defaultChannelValues,
    name: 'Great White Shark',
    docId: 'great-white-shark',
  },
  {
    ...defaultChannelValues,
    name: 'Humpback Whale',
    docId: 'humpback-whale',
  },
  {
    ...defaultChannelValues,
    name: 'Isopod',
    docId: 'isopod',
  },
  {
    ...defaultChannelValues,
    name: 'Jellyfish',
    docId: 'jellyfish',
  },
  {
    ...defaultChannelValues,
    name: 'Killer Whaile',
    docId: 'killer-whale',
  },
];
