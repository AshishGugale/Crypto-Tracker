export function TodoItem({ isCompleted, UUID, title, Deadline, toggleTodo, deleteTodo, editTodo }) {
    if(!isCompleted)
        return (
            <li>
                <label>
                    <input type="checkbox" checked={isCompleted} onChange={(e) => toggleTodo(UUID, e.target.checked)} />
                    {title}
                </label>
                <button className="btn btn-danger" onClick={() => deleteTodo(UUID)}>Delete</button>
                <button className="btn" onClick = {() => editTodo(UUID)}>Edit</button>
                <button className="btn">{Deadline}</button>
            </li>
        )
    else 
    return (
        <li>
            <label>
                <input type="checkbox" checked={isCompleted} onChange={(e) => toggleTodo(UUID, e.target.checked)} />
                {title}
            </label>
            <button className="btn btn-danger" onClick={() => deleteTodo(UUID)}>Delete Task</button>
            <button className="btn" onClick={() => editTodo(UUID)}>Edit</button>
            <button className="btn">{ Deadline }</button>
        </li>
    )   
}