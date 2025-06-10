import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * MainContainer is the root UI container for NoteEase,
 * displaying side bar, top bar, and main content panel
 * with all notes app features (placeholders or stubs for now).
 * 
 * Color scheme: primary (#4A90E2), secondary (#F5F7FA), accent (#FFD700).
 * Light theme.
 */
function MainContainer() {
  // Placeholder note data with category
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Welcome Note',
      content: 'This is your first note! 🎉',
      category: 'General'
    },
    {
      id: 2,
      title: 'Shopping List',
      content: '- Milk\n- Bread\n- Cheese',
      category: 'Personal'
    },
    {
      id: 3,
      title: 'Work Ideas',
      content: 'Brainstorm project names.',
      category: 'Work'
    }
  ]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(1); // Default to first note
  const [isEditing, setIsEditing] = useState(false);

  const selectedNote = notes.find(n => n.id === selectedId);

  // ---- PLACEHOLDER: search/filter logic ---- //
  const filteredNotes = search.trim()
    ? notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()) ||
                           note.content.toLowerCase().includes(search.toLowerCase()))
    : notes;

  // ---- PLACEHOLDER: new note logic ---- //
  function handleNewNote() {
    // Placeholder for real ID assignment and modal
    const newId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    const newNote = {
      id: newId,
      title: 'Untitled',
      content: '',
      category: 'General'
    };
    setNotes([newNote, ...notes]);
    setSelectedId(newId);
    setIsEditing(true);
  }

  // ---- PLACEHOLDER: edit logic ---- //
  function handleEditNote() {
    setIsEditing(true);
  }

  // ---- PLACEHOLDER: save logic ---- //
  function handleSaveNote(edited) {
    setNotes(notes.map(n => n.id === edited.id ? edited : n));
    setIsEditing(false);
  }

  // ---- PLACEHOLDER: delete logic ---- //
  function handleDeleteNote() {
    if (!window.confirm('Delete this note?')) return;
    const idx = notes.findIndex(n => n.id === selectedId);
    const newNotes = notes.filter(n => n.id !== selectedId);
    setNotes(newNotes);
    // Select next note if any, or clear
    if (newNotes.length) {
      const nextIdx = idx === 0 ? 0 : idx - 1;
      setSelectedId(newNotes[nextIdx].id);
    } else {
      setSelectedId(null);
    }
  }

  // ---- PLACEHOLDER: category logic stub ---- //
  const categories = Array.from(new Set(notes.map(n => n.category)));

  // Light theme and custom colors with inline styles for this component
  const styles = {
    root: {
      height: '100vh',
      background: '#F5F7FA',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      color: '#333'
    },
    topbar: {
      flex: '0 0 54px',
      background: '#4A90E2',
      color: '#fff',
      padding: '0 26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E0E6EF',
      zIndex: 10
    },
    sidebar: {
      width: 250,
      background: '#fff',
      borderRight: '1px solid #E0E6EF',
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    },
    main: {
      flex: 1,
      display: 'flex',
      minHeight: 0,
      background: '#F5F7FA'
    },
    notesList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      flex: 1,
      overflowY: 'auto'
    },
    notesListItem: isSelected => ({
      padding: '12px 22px',
      background: isSelected ? '#E8F1FC' : 'transparent',
      borderLeft: isSelected ? '4px solid #4A90E2' : '4px solid transparent',
      cursor: 'pointer',
      marginBottom: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      borderRadius: '0 8px 8px 0'
    }),
    categoryBadge: {
      display: 'inline-block',
      background: '#FFD700',
      color: '#333',
      borderRadius: 10,
      fontSize: 12,
      padding: '2px 8px',
      marginTop: 2,
      alignSelf: 'flex-start'
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '36px 32px',
      maxWidth: 680
    },
    noteTitle: {
      fontSize: 21,
      fontWeight: 600,
      marginBottom: 12,
      outline: isEditing ? '2px solid #FFD700' : 'none',
      background: isEditing ? '#FFFBE5' : 'transparent',
      transition: 'all 0.18s'
    },
    noteContent: {
      fontSize: 15.5,
      whiteSpace: 'pre-wrap',
      minHeight: 190,
      marginBottom: 22,
      background: isEditing ? '#FFFBE5' : 'transparent',
      outline: isEditing ? '2px solid #FFD700' : 'none',
      padding: isEditing ? 8 : 0,
      transition: 'all 0.18s'
    },
    editToolbar: {
      display: 'flex',
      gap: 12,
      marginBottom: 18
    },
    searchInput: {
      padding: '7px 13px',
      fontSize: 15,
      borderRadius: 4,
      border: '1px solid #dbe4f0',
      background: '#fff',
      color: "#27384e",
      marginRight: 13,
      minWidth: 220
    },
    newNoteBtn: {
      background: '#FFD700',
      color: '#333',
      border: 'none',
      padding: '8px 19px',
      fontSize: 16,
      fontWeight: 600,
      borderRadius: 4,
      cursor: 'pointer',
      marginLeft: 8
    },
    categoryHeader: {
      fontWeight: 700,
      fontSize: 14,
      color: '#4A90E2',
      padding: '0 19px 5px 19px'
    }
  };

  // ---- Rendering ----
  return (
    <div style={styles.root}>
      {/* Top Bar */}
      <div style={styles.topbar}>
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#FFD700', fontWeight: 900, fontSize: 23, marginRight: 6 }}>📝</span>
          NoteEase
        </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search notes"
          />
          <button style={styles.newNoteBtn} title="New Note" onClick={handleNewNote}>
            + New Note
          </button>
        </div>
      </div>

      {/* Main panels: sidebar + content */}
      <div style={styles.main}>
        {/* Sidebar: list of notes grouped by category */}
        <aside style={styles.sidebar}>
          {categories.map(category => (
            <React.Fragment key={category}>
              <div style={styles.categoryHeader}>{category}</div>
              <ul style={styles.notesList}>
                {filteredNotes
                  .filter(note => note.category === category)
                  .map(note => (
                    <li
                      key={note.id}
                      style={styles.notesListItem(note.id === selectedId)}
                      onClick={() => { setSelectedId(note.id); setIsEditing(false); }}
                      tabIndex={0}
                      aria-selected={note.id === selectedId}
                    >
                      <span style={{ fontWeight: 600 }}>{note.title}</span>
                      <span style={styles.categoryBadge}>{note.category}</span>
                    </li>
                  ))}
              </ul>
            </React.Fragment>
          ))}
        </aside>

        {/* Main Content Panel */}
        <main style={styles.content}>
          {!selectedNote ? (
            <div style={{ color: '#aaa', fontStyle: 'italic' }}>No note selected. Create a note to get started!</div>
          ) : (
            <React.Fragment>
              {/* Edit/Delete toolbar */}
              <div style={styles.editToolbar}>
                {!isEditing ? (
                  <>
                    <button
                      style={{
                        ...styles.newNoteBtn,
                        background: '#4A90E2',
                        color: '#fff'
                      }}
                      onClick={handleEditNote}
                      title="Edit Note"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={{
                        ...styles.newNoteBtn,
                        background: '#fff',
                        border: '1px solid #FFD700',
                        color: '#333'
                      }}
                      onClick={handleDeleteNote}
                      title="Delete Note"
                    >
                      🗑️ Delete
                    </button>
                  </>
                ) : (
                  <>
                    {/* Save/Cancel buttons, shown if editing */}
                    <button
                      style={{
                        ...styles.newNoteBtn,
                        background: '#4A90E2',
                        color: '#fff'
                      }}
                      onClick={() => {
                        // For now, simulate saving the note (stub)
                        const updated = {
                          ...selectedNote,
                          title: document.getElementById('edit-title').value,
                          content: document.getElementById('edit-content').value
                        };
                        handleSaveNote(updated);
                      }}
                      title="Save Note"
                    >
                      💾 Save
                    </button>
                    <button
                      style={{
                        ...styles.newNoteBtn,
                        background: '#fff',
                        border: '1px solid #dbe4f0',
                        color: '#27384e'
                      }}
                      onClick={() => setIsEditing(false)}
                      title="Cancel"
                    >
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
              {/* Title + Content (editable or static) */}
              {isEditing ? (
                <>
                  <input
                    id="edit-title"
                    style={styles.noteTitle}
                    defaultValue={selectedNote.title}
                    aria-label="Edit title"
                  />
                  <textarea
                    id="edit-content"
                    style={styles.noteContent}
                    defaultValue={selectedNote.content}
                    rows={12}
                    aria-label="Edit note content"
                  />
                </>
              ) : (
                <>
                  <div style={styles.noteTitle}>{selectedNote.title}</div>
                  <div style={{ marginBottom: 7 }}>
                    <span style={styles.categoryBadge}>{selectedNote.category}</span>
                  </div>
                  <div style={styles.noteContent}>{selectedNote.content}</div>
                </>
              )}
              {/* ---- Placeholder for future: tag/category editing, text formatting, etc. ---- */}
            </React.Fragment>
          )}
        </main>
      </div>
    </div>
  );
}

export default MainContainer;
