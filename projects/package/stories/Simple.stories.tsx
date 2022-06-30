import {ComponentStory, ComponentMeta} from '@storybook/react';
import DrillD from '../src/DrillD';

export default {
  title: 'Example/Simple',
  component: DrillD,
  args: {
    title: 'Choose Folder or File',
  },
} as ComponentMeta<typeof DrillD>;

const Template: ComponentStory<typeof DrillD> = (args) => <DrillD {...args} />;

export const Base = Template.bind({});
Base.args = {
  folders: [{name: 'folder A', children: [{name: 'File A'}, {name: 'File B'}]}]
};

export const showFullPath = Template.bind({});
showFullPath.args = {
  showFullPath: true,
  folders: [
    {
      name: 'Folder A',
      children: [{name: 'File A1'}, {name: 'File A2'}, {name: 'Folder AA', children: [{name: 'File AA1'}]}]
    },
    {
      name: 'File 1'
    },
    {
      name: 'Folder B',
      children: [{name: 'File B1'}, {name: 'File A2'}, {name: 'Folder BB', children: [{name: 'File BB1'}]}]
    },
  ]
};

