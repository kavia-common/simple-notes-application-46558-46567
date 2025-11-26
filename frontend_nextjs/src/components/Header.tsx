"use client";

import React from "react";

// PUBLIC_INTERFACE
export default function Header() {
  /** App header with branding and theme accent. */
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="Simple Notes App">
          <div className="brand-badge" aria-hidden />
          <div>
            <div className="brand-title" data-testid="app-title">
              Ocean Notes
            </div>
            <p
              className="text-xs text-gray-500"
              aria-label="subtitle"
            >
              Capture ideas with clarity
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
