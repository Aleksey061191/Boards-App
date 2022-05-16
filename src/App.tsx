import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Root from './pages/Root';
import NotFound from './pages/notFound/NotFound';
import WelcomePage from './pages/welcomePage/WelcomePage';
import MainPage from './pages/mainPage/MainPage';
import BoardPage from './pages/boardPage/BoardPage';
import AuthPage from './pages/authPage/AuthPage';
import RequireAuth from './components/hoc/RequireAuth';
import LogedRoute from './components/hoc/LogedRoute';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="auth"
              element={
                <LogedRoute>
                  <AuthPage />
                </LogedRoute>
              }
            />
            <Route
              path="main"
              element={
                <RequireAuth>
                  <MainPage />
                </RequireAuth>
              }
            />
            <Route path="board" element={<BoardPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
