"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Note } from "@/lib/types";
import { debounce } from "@/lib/storage";

type Props = {
  note: Note | null;
  onChange: (patch: Partial<Note>) => void;
  onSave: () => void;
  onDelete: () => void;
};

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onSave, onDelete }: Props) {
  /** Main editor with title and content fields, autosave via debounce. */
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  // Sync local inputs when note changes
  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerAutosave = useMemo(
    () =>
      debounce((t: string, c: string) => {
        onChange({ title: t, content: c });
      }, 300),
    [onChange],
  );

  useEffect(() => {
    triggerAutosave(title, content);
  }, [title, content, triggerAutosave]);

  if (!note) {
    return (
      <section className="empty" aria-live="polite">
        <div>
          <p className="text-lg font-medium">No note selected</p>
          <p className="text-sm text-gray-500 mt-1">
            Choose a note from the list or create a new one.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="editor" aria-label="Note editor" data-testid="editor">
      <div className="editor-header">
        <input
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
          data-testid="note-title"
        />
        <div className="flex items-center gap-2">
          <button
            className="button"
            onClick={onDelete}
            aria-label="Delete note"
            data-testid="editor-delete"
          >
            Delete
          </button>
          <button
            className="button button-primary"
            onClick={onSave}
            aria-label="Save note"
            data-testid="save-note"
          >
            Save
          </button>
        </div>
      </div>

      <textarea
        className="content-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your thoughts..."
        aria-label="Note content"
        data-testid="note-content"
      />
    </section>
  );
}
