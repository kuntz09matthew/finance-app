import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Log error to an error reporting service if needed
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8 dark:bg-gray-900 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
            Something went wrong.
          </h2>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            An unexpected error occurred. Please try refreshing the page or contact support if the
            problem persists.
          </p>
          {this.state.error && (
            <details className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {this.state.error.toString()}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
