import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Memo from "./components/Memo";

function App() {
  const [memos, setMemos] = useState<{ id: string; text: string }[]>([]);
  const [id, setId] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();

  useEffect(() => {
    const json = localStorage.getItem("memos");
    if (json) {
      setMemos(JSON.parse(json));
    }
  }, []);

  function editMemo(id: string, text: string) {
    setId(id);
    setText(text);
  }

  function createMemo() {
    const newMemo = { id: nanoid(), text: "新規メモ" };
    setMemos([...memos, newMemo]);
    setId(newMemo.id);
    setText(newMemo.text);
    saveMemos();
  }

  function updateMemo() {
    if (!id || !text) return;
    setMemos(memos.map((memo) => (memo.id === id ? { id, text } : memo)));
    setId(undefined);
    setText(undefined);
    saveMemos();
  }

  function deleteMemo() {
    if (!id) return;
    setMemos(memos.filter((memo) => memo.id !== id));
    setId(undefined);
    setText(undefined);
    saveMemos();
  }

  function saveMemos() {
    localStorage.setItem("memos", JSON.stringify(memos));
  }

  return (
    <>
      <div>{text ? "編集" : "一覧"}</div>
      <div className="flex">
        <ul>
          {memos.map((memo) => (
            <Memo
              key={memo.id}
              id={memo.id}
              text={memo.text}
              editMemo={editMemo}
            />
          ))}
          <li>
            <a
              href=""
              onClick={(event) => {
                event.preventDefault();
                createMemo();
              }}
              className="text-indigo-600 underline"
            >
              ＋
            </a>
          </li>
        </ul>
        {text && (
          <form>
            <div>
              <textarea
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  updateMemo();
                }}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                編集
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  deleteMemo();
                }}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                削除
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
