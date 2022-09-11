import React from 'react';
import './App.scss';
import Dialog from './Components/Dialog';
import List from './Components/List';
import { useAppSelector } from './store/hooks';

const App: React.FC = () => {
  const isShown = useAppSelector(state => state.dialog.isShown);
  return (
    <div className="App">
      <main className="main">
        <List />
        { isShown && <Dialog /> }
      </main>
    </div>
  )
}

export default App;
