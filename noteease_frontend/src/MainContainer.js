import React, { useState, useEffect } from 'react';

/**
 * MainContainer is the root UI container for NoteEase,
 * displaying side bar, top bar, and main content panel
 * with all notes app features (placeholders or stubs for now).
 * 
 * Supports light/dark theme toggle in the top bar.
 */
// PUBLIC_INTERFACE
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

  // --- DARK THEME STATE + EFFECT ---
  const [darkTheme, setDarkTheme] = useState(() => {
    // Respect system preference for first render if possible
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect: Toggle body class for theme
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // Also set :root class for CSS variable fallback
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  // Theme toggle
  function handleToggleTheme() {
    setDarkTheme(d => !d);
  }

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

  // Theme and custom colors with CSS variable reference
  const styles = {
    root: {
      height: '100vh',
      background: 'var(--secondary)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      color: 'var(--text-color)'
    },
    topbar: {
      flex: '0 0 54px',
      background: 'var(--primary)',
      color: 'var(--text-color)',
      padding: '0 26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-color)',
      zIndex: 10
    },
    sidebar: {
      width: 250,
      background: 'var(--secondary)',
      borderRight: '1px solid var(--border-color)',
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      color: 'var(--text-color)'
    },
    main: {
      flex: 1,
      display: 'flex',
      minHeight: 0,
      background: 'var(--secondary)'
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
      background: isSelected ? 'rgba(74, 144, 226, 0.10)' : 'transparent',
      borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent',
      cursor: 'pointer',
      marginBottom: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      borderRadius: '0 8px 8px 0',
      color: 'var(--text-color)'
    }),
    categoryBadge: {
      display: 'inline-block',
      background: 'var(--accent)',
      color: 'var(--text-color)',
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
      maxWidth: 680,
      color: 'var(--text-color)'
    },
    noteTitle: {
      fontSize: 21,
      fontWeight: 600,
      marginBottom: 12,
      outline: isEditing ? '2px solid var(--accent)' : 'none',
      background: isEditing ? 'rgba(255, 249, 200, 0.17)' : 'transparent',
      color: 'var(--text-color)',
      transition: 'all 0.18s'
    },
    noteContent: {
      fontSize: 15.5,
      whiteSpace: 'pre-wrap',
      minHeight: 190,
      marginBottom: 22,
      background: isEditing ? 'rgba(255, 249, 200, 0.17)' : 'transparent',
      outline: isEditing ? '2px solid var(--accent)' : 'none',
      padding: isEditing ? 8 : 0,
      color: 'var(--text-color)',
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
      border: '1px solid var(--border-color)',
      background: 'var(--secondary)',
      color: 'var(--text-color)',
      marginRight: 13,
      minWidth: 220
    },
    newNoteBtn: {
      background: 'var(--accent)',
      color: 'var(--text-color)',
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
      color: 'var(--primary)',
      padding: '0 19px 5px 19px'
    }
  };

  // ---- Rendering ----
  return (
    <div style={styles.root}>
      {/* Top Bar */}
      <div style={styles.topbar}>
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: 23, marginRight: 6 }}>📝</span>
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
          <button
            className="theme-toggle-btn"
            onClick={handleToggleTheme}
            aria-label={darkTheme ? "Switch to light theme" : "Switch to dark theme"}
            title={darkTheme ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkTheme ? "🌙" : "🌞"}
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
                        background: 'var(--primary)',
                        color: 'var(--text-color)'
                      }}
                      onClick={handleEditNote}
                      title="Edit Note"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={{
                        ...styles.newNoteBtn,
                        background: 'var(--secondary)',
                        border: '1px solid var(--accent)',
                        color: 'var(--text-color)'
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
                        background: 'var(--primary)',
                        color: 'var(--text-color)'
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
                        background: 'var(--secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-color)'
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
