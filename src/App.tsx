import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { store } from './store/store';

import Root from './pages/Root';
import NotFound from './pages/notFound/NotFound';
import WelcomePage from './pages/welcomePage/WelcomePage';
import MainPage from './pages/mainPage/MainPage';
import BoardPage from './pages/boardPage/BoardPage';
import SignInUpPage from './pages/signInOutPage/SignInUpPage';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="sign/:id" element={<SignInUpPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
