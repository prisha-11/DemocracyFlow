import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global Error Boundary to catch UI errors and prevent white screens.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  /**
   * Updates state so the next render shows the fallback UI.
   * @param {Error} _ - The error object.
   * @returns {State} New state with hasError true.
   */
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * Logs the error to an error reporting service.
   * @param {Error} error - The error object.
   * @param {ErrorInfo} errorInfo - The error info object.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  /**
   * Renders the component or fallback UI on error.
   * @returns {ReactNode} The rendered output.
   */
  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 aria-label="Error Status Message">Sorry, something went wrong.</h1>
          <p>We are working to fix the issue. Please try again later.</p>
          <button aria-label="Reload Application Page" onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
