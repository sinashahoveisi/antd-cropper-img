import {ComponentStory, ComponentMeta} from '@storybook/react';
import DrillD from '../src/DrillD';

export default {
  title: 'Example/Advance',
  component: DrillD,
  args: {
    title: 'Choose Folder or File',
  },
} as ComponentMeta<typeof DrillD>;

const Template: ComponentStory<typeof DrillD> = (args) => <DrillD {...args} />;

export const Base = Template.bind({});
Base.args = {
  title: "Choose Category",
  url: "https://api.stlouisfed.org/fred/category/children",
  mode: "multiple",
  isSelectableFolder: true,
  queryParams: {api_key: 'f8d2c84d4b22cefd6a6e1d5e78128c61', file_type: 'json'},
  selectFolderQueryParams: (folder: any) => ({category_id: folder?.id}),
  fetchedChildrenDataPath: ['categories'],
  folderKey: true
};

export const showFullPath = Template.bind({});
showFullPath.args = {
  title: "Choose Category",
  url: "https://api.stlouisfed.org/fred/category/children",
  mode: "multiple",
  showFullPath: true,
  isSelectableFolder: true,
  queryParams: {api_key: 'f8d2c84d4b22cefd6a6e1d5e78128c61', file_type: 'json'},
  selectFolderQueryParams: (folder: any) => ({category_id: folder?.id}),
  fetchedChildrenDataPath: ['categories'],
  folderKey: true
};

