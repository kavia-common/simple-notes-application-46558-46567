"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { Note, NotesState } from "@/lib/types";
import { createBlankNote, loadState, saveState, sortNotesByUpdated } from "@/lib/storage";

export default function Home() {
  const [state, setState] = useState<NotesState>({ notes: [], selectedId: null });

  // load from localStorage on mount
  useEffect(() => {
    const s = loadState();
    setState({
      notes: sortNotesByUpdated(s.notes || []),
      selectedId: s.selectedId || (s.notes?.[0]?.id ?? null),
    });
  }, []);

  // persist to localStorage when state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const selectedNote: Note | null = useMemo(
    () => state.notes.find((n) => n.id === state.selectedId) ?? null,
    [state.notes, state.selectedId],
  );

  const handleCreate = useCallback(() => {
    const newNote = createBlankNote();
    setState((prev) => {
      const notes = sortNotesByUpdated([newNote, ...prev.notes]);
      return { notes, selectedId: newNote.id };
    });
    // focus will occur naturally in NoteEditor mount
  }, []);

  const handleSelect = useCallback((id: string) => {
    setState((prev) => ({ ...prev, selectedId: id }));
  }, []);

  const handleDelete = useCallback((id?: string) => {
    const targetId = id ?? state.selectedId;
    if (!targetId) return;
    const note = state.notes.find((n) => n.id === targetId);
    const name = note?.title || "note";
    if (typeof window !== "undefined") {
      const ok = window.confirm(`Delete "${name}"?`);
      if (!ok) return;
    }
    setState((prev) => {
      const notes = prev.notes.filter((n) => n.id !== targetId);
      let selectedId = prev.selectedId;
      if (prev.selectedId === targetId) {
        selectedId = notes[0]?.id ?? null;
      }
      return { notes, selectedId };
    });
  }, [state.selectedId, state.notes]);

  const handlePatchSelected = useCallback((patch: Partial<Note>) => {
    setState((prev) => {
      if (!prev.selectedId) return prev;
      const notes = prev.notes.map((n) =>
        n.id === prev.selectedId ? { ...n, ...patch, updatedAt: Date.now() } : n,
      );
      return { ...prev, notes: sortNotesByUpdated(notes) };
    });
  }, []);

  const handleSaveSelected = useCallback(() => {
    // with localStorage, save is implicit; still update timestamp and sort to give feedback
    setState((prev) => {
      if (!prev.selectedId) return prev;
      const notes = prev.notes.map((n) =>
        n.id === prev.selectedId ? { ...n, updatedAt: Date.now() } : n,
      );
      return { ...prev, notes: sortNotesByUpdated(notes) };
    });
    if (typeof window !== "undefined") {
      // Brief visual feedback via alert can be distracting; keep minimal (noop)
      // Using a debug log is acceptable during development
      console.debug("Note saved");
    }
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <section className="surface split" role="region" aria-label="Notes workspace">
          <NotesList
            notes={state.notes}
            selectedId={state.selectedId}
            onCreate={handleCreate}
            onDelete={(id) => handleDelete(id)}
            onSelect={handleSelect}
          />
          <NoteEditor
            note={selectedNote}
            onChange={handlePatchSelected}
            onSave={handleSaveSelected}
            onDelete={() => handleDelete()}
          />
        </section>
      </main>
    </>
  );
}
