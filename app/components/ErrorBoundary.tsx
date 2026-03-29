"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[Resilience Engine] Error caught in ${this.props.name || "Unknown Section"}:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[300px] w-full flex flex-col items-center justify-center p-8 bg-zinc-950 border border-zinc-800 rounded-3xl text-center">
          <AlertCircle className="w-10 h-10 text-amber-500 mb-4" />
          <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Sector_Render_Failure</h3>
          <p className="text-zinc-500 text-[10px] mb-6 max-w-xs font-mono uppercase tracking-tighter">
            {this.state.error?.message || "Internal system error detected in this sector."}
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] text-white uppercase tracking-[0.2em] transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            Initialize_Recovery
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
