import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './scss/base/base.scss';
import App from './App';
import './utils/i18next';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
