import { useState, useRef, useEffect, useCallback } from "react";
import "./text-editor.css";

export default function TextEditor({ content, onChange }) {
  const editorRef = useRef(null);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [editorContent, setEditorContent] = useState(content || "");

  const users = [
    { id: 1, name: "John Doe", username: "johndoe" },
    { id: 2, name: "Jane Smith", username: "janesmith" },
    { id: 3, name: "Alex Johnson", username: "alexj" },
    { id: 4, name: "Sarah Williams", username: "sarahw" },
    { id: 5, name: "Michael Brown", username: "michaelb" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const formatContent = useCallback((text) => text, []);

  useEffect(() => {
    setEditorContent(formatContent(content));
  }, [content, formatContent]);

  const handleInput = (e) => {
    const rawContent = e.target.innerHTML;
    setEditorContent(rawContent);
    onChange(rawContent);

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const text = preCaretRange.toString();

      const lastAtSymbol = text.lastIndexOf("@");
      if (lastAtSymbol !== -1) {
        const query = text.substring(lastAtSymbol + 1);
        if (query.length > 0 && !query.includes(" ")) {
          setMentionQuery(query);
          const rect = range.getBoundingClientRect();
          const editorRect = editorRef.current.getBoundingClientRect();
          setMentionPosition({
            top: rect.bottom - editorRect.top,
            left: rect.left - editorRect.left,
          });
          setShowMentionSuggestions(true);
          return;
        }
      }
    }

    setShowMentionSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (showMentionSuggestions) {
      if (e.key === "Escape") {
        setShowMentionSuggestions(false);
        e.preventDefault();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
      } else if (e.key === "Enter" && filteredUsers.length > 0) {
        insertMention(filteredUsers[0]);
        e.preventDefault();
      }
    }
  };

  const insertMention = (user) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const text = preCaretRange.toString();
      const lastAtSymbol = text.lastIndexOf("@");

      if (lastAtSymbol !== -1) {
        const mentionSpan = `<span class="mention">@${user.username}</span>&nbsp;`;
        const newText =
          text.substring(0, lastAtSymbol) +
          mentionSpan +
          text.substring(lastAtSymbol + mentionQuery.length + 1);
        setEditorContent(newText);
        onChange(newText);
        setShowMentionSuggestions(false);
      }
    }
  };

  const handleFormatClick = (command) => {
    document.execCommand(command, false);
    setEditorContent(editorRef.current.innerHTML);
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="text-editor-container">
      <div className="formatting-toolbar">
        <button onClick={() => handleFormatClick("bold")} title="Bold">
          B
        </button>
        <button onClick={() => handleFormatClick("italic")} title="Italic">
          I
        </button>
        <button
          onClick={() => handleFormatClick("underline")}
          title="Underline"
        >
          U
        </button>
        <button
          onClick={() => handleFormatClick("insertUnorderedList")}
          title="Bullet List"
        >
          •
        </button>
        <button
          onClick={() => handleFormatClick("insertOrderedList")}
          title="Numbered List"
        >
          1.
        </button>
      </div>

      <div
        ref={editorRef}
        className="text-editor"
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: editorContent }}
        placeholder="What do you want to talk about?"
        dir="ltr"
      />

      {showMentionSuggestions && (
        <div
          className="mention-suggestions"
          style={{
            top: `${mentionPosition.top}px`,
            left: `${mentionPosition.left}px`,
          }}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="mention-suggestion-item"
                onClick={() => insertMention(user)}
              >
                <div className="mention-avatar">{user.name.charAt(0)}</div>
                <div className="mention-user-info">
                  <div className="mention-name">{user.name}</div>
                  <div className="mention-username">@{user.username}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="mention-no-results">No users found</div>
          )}
        </div>
      )}

      <div className="editor-tips">
        <p>Pro tips: Use # for hashtags and @ to mention people</p>
      </div>
    </div>
  );
}
