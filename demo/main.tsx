import React from 'react';
import ReactDOM from 'react-dom/client';
import ComprehensiveDemo from './ComprehensiveDemo';
import '../src/components/ReactBlackPlayer/styles.css';

const App: React.FC = () => {
  return <ComprehensiveDemo />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
