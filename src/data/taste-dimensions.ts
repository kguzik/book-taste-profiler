export type TasteDimension = {
  label: string;
  tags: string[];
};

export const tasteDimensions: TasteDimension[] = [
  {
    label: 'Vibe',
    tags: ['dark academia', 'cozy', 'gothic', 'whimsical', 'gritty', 'dreamlike', 'surreal', 'nostalgic'],
  },
  {
    label: 'Mood',
    tags: ['melancholic', 'hopeful', 'tense', 'playful', 'contemplative', 'bittersweet', 'unsettling', 'uplifting'],
  },
  {
    label: 'Pacing',
    tags: ['slow burn', 'fast-paced', 'meditative', 'plot-driven', 'meandering', 'propulsive'],
  },
  {
    label: 'Writing style',
    tags: ['lyrical prose', 'sparse', 'verbose', 'witty', 'poetic', 'conversational', 'stream of consciousness'],
  },
  {
    label: 'Themes',
    tags: ['grief & loss', 'identity', 'belonging', 'power', 'love', 'survival', 'memory', 'morality', 'coming of age'],
  },
  {
    label: 'Relationships',
    tags: ['found family', 'enemies to lovers', 'slow romance', 'platonic bond', 'rivalry', 'mentorship', 'unrequited love'],
  },
  {
    label: 'Emotional tone',
    tags: ['emotionally intense', 'restrained', 'cathartic', 'heartbreaking', 'warm', 'cold & distant'],
  },
  {
    label: 'Setting',
    tags: ['coastal', 'urban', 'rural', 'historical', 'fantasy world', 'dystopian', 'small town', 'abroad'],
  },
];
