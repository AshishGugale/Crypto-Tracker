import { TodoItem } from "./TodoItem"
import { useState, useEffect } from "react"

export function TodoList({ todos, toggleTodo, deleteTodo, editTodo}) {
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        const completed = todos.filter((todo) => todo.isCompleted);
        setCompletedTodos(completed);
    }, [todos])

    const date = new Date();
    const year = date.getFullYear(), month = date.getMonth(), today = date.getDate();
    function checkDeadline(Deadline) {
        const dateArr = Deadline.split('-');
        if (year > Number(dateArr[0])
            || month > Number(dateArr[1])
            || today > Number(dateArr[2])) {
            return true;
        }
        return false;
    }
    return (
        <>
            <h1>Todo List</h1>
            <ul className="list">
                {todos.length === 0 && "No Todos!!"}
                {todos.filter((todo) => !todo.isCompleted).map((todo) => {
                    return (
                        <TodoItem {...todo} key={todo.UUID} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} deadlinePassed= { checkDeadline(todo.Deadline) } />
                    )
                })}
            </ul>
            <h1>Completed</h1>
            <ul className="list">
                {completedTodos.length === 0 && "No Todos Completed yet!!"}
                {completedTodos.map((todo) => {
                    return (
                        <TodoItem {...todo} key={todo.UUID} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} deadlinePassed={checkDeadline(todo.Deadline)} />
                    )
                })}
            </ul>
        </>
    )
}