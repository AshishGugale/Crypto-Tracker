import { TodoItem } from "./TodoItem"
import { useState, useEffect } from "react"

export function TodoList({ todos, toggleTodo, deleteTodo, editTodo}) {
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        const completed = todos.filter((todo) => todo.isCompleted);
        setCompletedTodos(completed);
    }, [todos])
    return (
        <>
            <h1>Todo List</h1>
            <ul className="list">
                {todos.length === 0 && "No Todos!!"}
                {todos.filter((todo) => !todo.isCompleted).map((todo) => {
                    return (
                        <TodoItem {...todo} key={todo.UUID} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
                    )
                })}
            </ul>
            <h1>Completed</h1>
            <ul className="list">
                {completedTodos.length === 0 && "No Todos Completed yet!!"}
                {completedTodos.map((todo) => {
                    return (
                        <TodoItem {...todo} key={todo.UUID} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
                    )
                })}
            </ul>
        </>
    )
}