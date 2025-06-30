import './App.css';
import ReactIcon from './assets/react.svg?react';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <ReactIcon width={512} height={512} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
