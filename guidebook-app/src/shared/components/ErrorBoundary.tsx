import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <h1 className={styles.errorTitle}>Something went wrong</h1>
          <p className={styles.errorMessage}>
            We're sorry, but something unexpected happened. Please try again or
            return to the home page.
          </p>
          {this.state.error && import.meta.env.DEV && (
            <details className={styles.errorDetails}>
              <summary>Error Details (Development Only)</summary>
              <pre>{this.state.error.toString()}</pre>
            </details>
          )}
          <Link to="/" className={styles.homeLink}>
            Return to Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

