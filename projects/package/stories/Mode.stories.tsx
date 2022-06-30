import {ComponentStory, ComponentMeta} from '@storybook/react';
import DrillD from '../src/DrillD';

export default {
  title: 'Example/Mode',
  component: DrillD,
  args: {
    title: 'Choose Folder or File',
  },
} as ComponentMeta<typeof DrillD>;

const Template: ComponentStory<typeof DrillD> = (args) => <DrillD {...args} />;

export const SelectMultipleFile = Template.bind({});
SelectMultipleFile.args = {
  mode: 'multiple',
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

export const SelectableFolders = Template.bind({});
SelectableFolders.args = {
  isSelectableFolder: true,
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
    }
  ]
};

export const SelectableFoldersAndFiles = Template.bind({});
SelectableFoldersAndFiles.args = {
  isSelectableFolder: true,
  mode: 'multiple',
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

