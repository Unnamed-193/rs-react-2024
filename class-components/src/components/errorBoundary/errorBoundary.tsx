import { Component, ReactNode } from 'react';
import { ErrorInfo } from 'react-dom/client';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          May the force be with you with test error! Refresh page 😊
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
