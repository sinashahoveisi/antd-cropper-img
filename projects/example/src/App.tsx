import React from 'react';
import {DrillD} from 'antd-cropper-img';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<DrillD title="sina" folders={[{name: 'sina', children: [{name: 'sina2'}, {name: 'sina3'}]}]} />*/}
        {/*<DrillD*/}
        {/*  title="sina"*/}
        {/*  showFullPath*/}
        {/*  folders={[{name: 'sina', children: [{name: 'sina2', children: [{name: 'ali'}]}, {name: 'sina3'}]}]}*/}
        {/*/>*/}
        {/*<DrillD*/}
        {/*  title="sina"*/}
        {/*  url="https://a.behzee.com/general/v1/diseases/children"*/}
        {/*  headerRequest={{*/}
        {/*    Authorization:*/}
        {/*      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTQwMzE0MDk2N2QzNTZjNzE3YzY5ZjlhYjJjZDNiMjhmZGJlMjM2MGNkZDc5NTVkMmVjZjEyNzViZWYwMjhiMmM4MTRkYWE4NjUwYzU1NjciLCJpYXQiOjE2NTU4NDE2MjYuNjQ2MTA0LCJuYmYiOjE2NTU4NDE2MjYuNjQ2MTEyLCJleHAiOjE2NTY0NDY0MjYuNjIzMjk5LCJzdWIiOiIzODgwIiwic2NvcGVzIjpbImFkbWluIl19.lOtTHTG7btEmQz-xi049KDixI6GFT8qvizdvHqcoPZ9GzytGDYqqw3bIGgr77_ehCn-A__nAjfsJpeaGtUug5MXp7ExnnAkIx3sA2FdaAO9twI1wGiTj0Mc-_oEZ7O3pjYkru8yGhLKMyTYNlIVobeEXfdFc4iknoxyUiM4AHEb6oMMPcFMkabTldbINAcbqdpxselNbhy0-3Vd7pyIkRM9qGJtaOW2KudHrFj5lbQd5D12-ZQ0X6VFcpZVj_191A9PKACXHyDh7Cqbj5HRTggTlGh8hCRy3KqArYiOSIRplZBRgKcmH03vxIur0SeiKhepKJVSwVVWrSibXBjkbRCqy2AkajcVMNgFdvYr9rpLbiE3V3K2oyK6syxmIYJhXOM5BGWAQ0VDaY1jtzsjTgjDqhjATaOTWq9kifssG1tEqHt93TNZPMgLdmX5GRc4bDKD7IJZEBjD8KN5qFkaKoCYjNC9f3C1VQ0JvhmoWjlEK4MiPak0E_pDo6IfarCArfKWrR7LHdnLqFgbFPccAHaEht5keeIIsaTfPLr1SinOc4mZVTJIvaWr7ygOkvUDHhQPGF8uqRFf74MJZGeUz650yCQQV9Rao-frr390LAC2viYq0rLV2h1JYlIrENuaucfLzkyqtEtLVm0fopF_xAimLaBrIwQ9rknL4XXm9krs'*/}
        {/*  }}*/}
        {/*  mode="multiple"*/}
        {/*  selectFolderQueryParams={(folder: any) => ({parent_id: folder?.id})}*/}
        {/*  fetchedChildrenDataPath={['data']}*/}
        {/*  folderKey="is_parent"*/}
        {/*/>*/}
        {/*<DrillD*/}
        {/*  title="Choose Folder or File"*/}
        {/*  hasSearch*/}
        {/*  folders={[*/}
        {/*    {*/}
        {/*      name: 'Folder A',*/}
        {/*      children: [{name: 'File A1'}, {name: 'File A2'}, {name: 'Folder AA', children: [{name: 'File AA1'}]}]*/}
        {/*    },*/}
        {/*    {*/}
        {/*      name: 'File 1'*/}
        {/*    },*/}
        {/*    {*/}
        {/*      name: 'Folder B',*/}
        {/*      children: [{name: 'File B1'}, {name: 'File A2'}, {name: 'Folder BB', children: [{name: 'File BB1'}]}]*/}
        {/*    }*/}
        {/*  ]}*/}
        {/*/>*/}
        {/*<DrillD*/}
        {/*  title="Choose Category"*/}
        {/*  url="https://api.stlouisfed.org/fred/category/children"*/}
        {/*  mode="multiple"*/}
        {/*  showFullPath*/}
        {/*  isSelectableFolder*/}
        {/*  queryParams={{api_key: 'f8d2c84d4b22cefd6a6e1d5e78128c61', file_type: 'json'}}*/}
        {/*  selectFolderQueryParams={(folder: any) => ({category_id: folder?.id})}*/}
        {/*  fetchedChildrenDataPath={['categories']}*/}
        {/*  folderKey*/}
        {/*/>*/}
        <DrillD
          title="Choose Category"
          url="https://api.stlouisfed.org/fred/category/children"
          mode="multiple"
          showFullPath
          isSelectableFolder
          queryParams={{api_key: 'f8d2c84d4b22cefd6a6e1d5e78128c61', file_type: 'json'}}
          selectFolderQueryParams={(folder: any) => ({category_id: folder?.id})}
          fetchedChildrenDataPath={['categories']}
          folderKey
        />
      </header>
    </div>
  );
}

export default App;
