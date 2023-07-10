import AddButton from "./AddButton";
import MemoList from "./MemoList";

export default function Sidebar(props) {
  return (
    <aside className="memo-app-sidebar">
      <MemoList memos={props.memos} onEdit={props.onEdit} />
      <AddButton onClick={props.onAdd} />
    </aside>
  );
}
