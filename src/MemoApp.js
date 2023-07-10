// import logo from "./logo.svg";
// import "./App.css";

import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Contents from "./components/Contents";

function MemoApp() {
  const [memos, setMemos] = React.useState([]);
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState("");
  const [id, setId] = React.useState("");

  const itemKey = "memos";

  React.useEffect(() => {
    const memos = getMemos();
    setMemos(memos);
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    setEditing(true);
    setId("");
    setText("");
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSave(e) {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }

    if (id) {
      updateMemo(id, text);
    } else {
      createMemo(text);
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const memoToEdit = memos.find((memo) => memo.id === parseInt(id));
    setEditing(true);
    setId(id);
    setText(memoToEdit.content);
  }

  function handleDelete(e) {
    e.preventDefault();
    if (id) {
      deleteMemo(id);
    }
  }

  function updateMemo(id, text) {
    const newMemos = [...memos];
    const updatedMemo = newMemos.find((memo) => memo.id === parseInt(id));
    updatedMemo.title = text.split("\n")[0];
    updatedMemo.content = text;

    setMemos(newMemos);
    setEditing(false);
    setId("");
    setText("");
    saveMemos(newMemos);
  }

  function createMemo(text) {
    const newMemo = {
      id: Date.now(),
      title: text.split("\n")[0],
      content: text,
    };
    const newMemos = [...memos, newMemo];

    setMemos(newMemos);
    setEditing(false);
    setId("");
    setText("");
    saveMemos(newMemos);
  }

  function deleteMemo(id) {
    const newMemos = memos.filter((memo) => memo.id !== parseInt(id));
    setMemos(newMemos);
    setEditing(false);
    setId("");
    setText("");
    saveMemos(newMemos);
  }

  function getMemos() {
    const memos = localStorage.getItem(itemKey);
    return memos === null ? [] : JSON.parse(memos);
  }

  function saveMemos(memos) {
    localStorage.setItem(itemKey, JSON.stringify(memos));
  }

  return (
    <div className="memo-app">
      <Header />
      <div className="memo-app-container">
        <Sidebar memos={memos} onEdit={handleEdit} onAdd={handleAdd} />
        <Contents
          editing={editing}
          text={text}
          id={id}
          onChange={handleChange}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default MemoApp;
