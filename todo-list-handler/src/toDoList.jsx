import React, { useState, useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const updateLocalStorage = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      updateLocalStorage([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    updateLocalStorage(newTodos);
  };

  const deleteTask = (index) => {
    updateLocalStorage(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="inpp"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              className="chkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <a>{index + 1}</a>
            <span
              className="text"
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "white",
                marginLeft: "8px"
              }}
            >
               {todo.text}
            </span>
            <button onClick={() => deleteTask(index)} style={{ marginLeft: "10px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
