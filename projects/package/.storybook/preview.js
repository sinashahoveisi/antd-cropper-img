export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*",
    storySort: {
      order: ['Intro', 'Example', ['Simple', 'Mode'], 'Advance', ['Simple', 'Mode']],
      locales: 'en-US',
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    grid: {
      disable: true,
    },
    default: 'main',
    values: [
      {
        name: 'main',
        value: '#282c34'
      },
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
};

export const decorators = [
  (Story) => (
      <div style={{ padding: '10px' }}>
        <Story />
      </div>
  ),
];

export const argTypes = {
  title: {
    name: 'title',
    type: { name: 'string', required: false },
    description: 'set title for top of container',
    control: {
      type: 'text'
    }
  },
  showFullPath: {
    name: 'showFullPath',
    type: { name: 'boolean', required: false },
    description: 'set for show full path or end folder',
    control: {
      type: 'boolean'
    }
  }
};
//
// export const args = { theme: 'light' };