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
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <WelcomePage />
                </ErrorBoundary>
              }
            />
            <Route
              path="auth"
              element={
                <ErrorBoundary>
                  <LogedRoute>
                    <AuthPage />
                  </LogedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="main"
              element={
                <ErrorBoundary>
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                </ErrorBoundary>
              }
            />
            <Route
              path="board"
              element={
                <ErrorBoundary>
                  <BoardPage />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
