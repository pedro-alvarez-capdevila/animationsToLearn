import { TaskInterface } from './types';

const TITLES = [
  'record the dismissible tutorial',
  'Leave like to the video',
  'Check youtube comments',
  'Suscribe to the channel',
];

export const TASKS: TaskInterface[] = TITLES.map((title, index) => ({
  title,
  index,
}));
