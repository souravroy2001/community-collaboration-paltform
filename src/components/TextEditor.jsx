import { useState } from "react";
import "./text-editor.css";

export default function TextEditor({ content = "", onChange }) {
  const [editorContent, setEditorContent] = useState(content);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);

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

  const handleChange = (e) => {
    const text = e.target.value;
    setEditorContent(text);
    onChange(text);

    const lastAtIndex = text.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      const query = text.slice(lastAtIndex + 1).split(" ")[0];
      if (query.length > 0) {
        setMentionQuery(query);
        setShowMentionSuggestions(true);
        return;
      }
    }
    setShowMentionSuggestions(false);
  };

  const insertMention = (user) => {
    const words = editorContent.split(" ");
    words[words.length - 1] = `@${user.username} `;
    const updatedText = words.join(" ");
    setEditorContent(updatedText);
    onChange(updatedText);
    setShowMentionSuggestions(false);
  };

  return (
    <div className="text-editor-container">
      <textarea
        className="text-editor"
        value={editorContent}
        onChange={handleChange}
        placeholder="What do you want to talk about?"
      />

      {showMentionSuggestions && (
        <div className="mention-suggestions">
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
    </div>
  );
}
