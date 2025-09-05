"use client"
import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console or external service
    console.error("ErrorBoundary caught an error:", error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" aria-live="assertive" className="w-[600px] mx-auto mt-10 text-center text-gray-600">
          <p className="text-sm font-medium">Something went wrong.</p>
          <p className="text-xs text-gray-400">Please try again.</p>
          <button
            onClick={this.handleRetry}
            className="mt-3 text-xs px-3 py-1 rounded-full bg-black text-white hover:opacity-90"
            aria-label="Retry"
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
