import React, { useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  function deleteTask(index){
    const updatedTasks=todos.filter((_,i)=>i !==index);
    setTodos(updatedTasks)
    localStorage.setItem('todos',JSON.stringify(updatedTasks))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
      localStorage.setItem('todos', JSON.stringify([...todos, inputValue]));
    }
  };
  React.useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
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
            
            <a>{index+1}</a>
            <span className='text'>{todo}</span>
            <button onClick={()=>deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;