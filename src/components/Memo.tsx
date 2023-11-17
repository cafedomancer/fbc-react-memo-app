import React from "react";

function Memo({
  id,
  text,
  editMemo,
}: {
  id: string;
  text: string;
  editMemo: (id: string, text: string) => void;
}) {
  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();
    editMemo(id, text);
  }

  return (
    <li key={id}>
      <a href="" onClick={handleClick} className="text-indigo-600 underline">
        {text.split("\n")[0]}
      </a>
    </li>
  );
}

export default Memo;
