import MemoDetail from "./MemoDetail";

export default function Contents(props) {
  return (
    <div className="memo-app-content">
      {props.editing && (
        <MemoDetail
          text={props.text}
          id={props.id}
          onChange={props.onChange}
          onSave={props.onSave}
          onDelete={props.onDelete}
        />
      )}
    </div>
  );
}
