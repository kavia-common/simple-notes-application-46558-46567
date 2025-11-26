"use client";

import React from "react";

// PUBLIC_INTERFACE
export default function EmptyState() {
  /** Empty state for when no notes exist. */
  return (
    <div className="empty" role="status" aria-live="polite">
      <div>
        <p className="text-lg font-medium">No notes yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Click “New” to create your first note.
        </p>
      </div>
    </div>
  );
}
