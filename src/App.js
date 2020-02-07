import React from 'react';
import './App.css';
import DragListComponent from './components/TodoListCompoent';
import OperationComponent from './components/OperationComponent';
import {Provider} from './storeProvider';

function App() {
  return (
    <Provider>
      <div className="App">
        <OperationComponent />
        <DragListComponent />
      </div>
    </Provider>
  );
}

export default App;
