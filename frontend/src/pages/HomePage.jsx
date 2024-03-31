import { useState, useEffect } from "react";
import { NewTodoForm } from "../components/NewTodoForm";
import { TodoList } from "../components/TodoList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();

  async function getAll() {

    const data = await axios.get("http://localhost:3002/todos/getAll");

    if (data) return data.data;
    else return [];
  }

  useEffect(() => {

    const fetchData = async () => {
      const data = await getAll();
      setTodos(data);
    };
    fetchData();
  
  }, [changed]);

  async function addTodo(title, Deadline) {
    try {
      const TodoItem = {
        title: title,
        UUID: crypto.randomUUID(),
        isCompleted: false,
        Deadline: Deadline
      };
      await axios.post("http://localhost:3002/todos/create", TodoItem);

      setChanged(!changed);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleTodo(id, isCompleted) {
    try {

      await axios.put(`http://localhost:3002/todos/edit/`, {
        UUID: id,
        isCompleted: isCompleted,
      });

      setChanged(!changed);
    } catch (err) {
      console.log(err);
    }
  }

  async function editTodo(id) {
    navigate(`/edit?id=${id}`);
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:3002/todos/delete/${id}`);
      setChanged(!changed);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </>
  );
};

export default HomePage;
