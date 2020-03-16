import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is an <code>Open UI Plugin</code> and should be added in the context of BRX
        </p>
        <a
          className="App-link"
          href="https://documentation.bloomreach.com/library/concepts/open-ui/configure-a-document-field-extension.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Configure a Document Field Extension
        </a>
      </header>
    </div>
  );
}

export default App;
