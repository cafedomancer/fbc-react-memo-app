export default function MemoDetail(props) {
  return (
    <form onSubmit={props.onSave} className="memo-app-form">
      <textarea
        name="text"
        onChange={props.onChange}
        value={props.text}
        className="memo-app-form-text-area"
      />
      <div className="memo-app-button-area">
        <button className="memo-app-save-button">Save</button>
        <button className="memo-app-delete-button" onClick={props.onDelete}>
          Delete
        </button>
      </div>
    </form>
  );
}
