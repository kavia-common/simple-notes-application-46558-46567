"use client";

import React, { useMemo, useState } from "react";
import { Note } from "@/lib/types";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedId,
  onCreate,
  onDelete,
  onSelect,
}: Props) {
  /** Sidebar notes list with search, create, select and delete actions. */
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q),
    );
  }, [notes, query]);

  return (
    <aside
      className="sidebar"
      aria-label="Notes navigation"
      data-testid="sidebar"
    >
      <div className="sidebar-header">
        <button
          type="button"
          className="button button-primary"
          onClick={onCreate}
          aria-label="Create new note"
          data-testid="create-note"
        >
          + New
        </button>
        <input
          className="search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
          data-testid="search-notes"
        />
      </div>

      <nav className="notes-list" aria-label="Notes list">
        {filtered.length === 0 ? (
          <p className="px-3 py-2 text-sm text-gray-500">No notes found</p>
        ) : (
          <ul role="list" className="space-y-2">
            {filtered.map((note) => (
              <li key={note.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className={`note-item ${
                    note.id === selectedId ? "selected" : ""
                  }`}
                  onClick={() => onSelect(note.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelect(note.id);
                  }}
                  aria-pressed={note.id === selectedId}
                  aria-current={note.id === selectedId ? "true" : undefined}
                  data-testid={`note-item-${note.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {note.title || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(note.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      aria-label={`Delete ${note.title || "note"}`}
                      className="button button-danger text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note.id);
                      }}
                      data-testid={`delete-note-${note.id}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
