import React, { Component, ReactNode } from 'react';
import cl from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={cl.container}>
          <h1>Something went wrong</h1>
          <p>{this.state.errorMessage}</p>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
