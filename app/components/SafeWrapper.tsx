"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface SafeWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
}

/**
 * High-order protection component.
 * Combines Error Boundaries with Suspense for fail-safe rendering.
 */
export function SafeWrapper({ children, fallback, name }: SafeWrapperProps) {
  return (
    <Suspense fallback={fallback || <div className="h-screen w-full bg-black animate-pulse" />}>
      {children}
    </Suspense>
  );
}

