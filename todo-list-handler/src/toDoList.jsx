import React, { useState } from 'react'

function ToDOList(){
    const [tasks, setTasks] = useState([]);
    const[newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !==""){
            setTasks(t =>[...t,newTask]);
            setNewTask("");
        }
    }
    function deleteTask(index){

        const updatedTasks =tasks.filter((_,i)=> i !== index);
        setTasks(updatedTasks)
    }

    return(
        <>
            <div className='todo'>
        <div>
          <h1>Todo List</h1>
        </div>
          <input type='text' placeholder='Input a todo list' value={newTask} onChange={handleInputChange}></input>
          <button onClick={addTask}>+ Add </button>
        <ul>
          {tasks.map((task, index) =>
            <li key={index}>
                <span className='text'>{task}</span>
                <button className='delete-button' onClick={()=>deleteTask(index)}>Delete</button>
            </li>
        )}
        </ul>
      </div>
        </>
    );
}

export default ToDOList