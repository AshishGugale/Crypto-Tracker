import { useState} from "react";

export function NewTodoForm({addTodo}) {
  const [newItem, setNewItem] = useState("");
  const [newDateItem, setNewDateItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "" || newDateItem === "")
        return;
    addTodo(newItem, newDateItem);
    setNewItem("");
    setNewDateItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">Add new Todo: </label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Enter todo title!"
        />
        <input
          value={newDateItem}
          onChange={(e) => setNewDateItem(e.target.value)} 
          type="date"
          id="dateItem" 
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
