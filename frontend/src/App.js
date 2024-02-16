import { useState, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import ViewTasks from './components/ViewTasks/ViewTasks';
import Task from './components/Task/Task';
function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const URL ="http://127.0.0.1:4000/api/";

  useEffect(() => {
    fetch(URL+"tasks", {
      method: "GET",
    })
    .then((response) => response.json())
    .then(data => {
      setData(data)
    })
    .catch(error => {
      console.log(error)
    })
  },[]);

  function handleAddTask(task) {
    
    fetch(URL+"addtask", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    })
    .then((response) => response.json())
    .then(task => {
      setData([ ...data , task]);
    })
    .catch(error => {
      console.log(error)
    })
  }

  function handleEditTask(id) {
    data.forEach((task, index) => {
      if(index === id) setEditData({...task, id})
    });
  }

  function handleUpdateTask({title, description, id}) {
    fetch(URL+"update/"+(id+1), {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description})
    })
    .then((response) => response.json())
    .then(task => {
      let newData = [...data];
      newData[id] = task;
      setData(newData);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  function handleDeleteTask(id) {
    fetch(URL+"delete/"+(id+1), {
      method: "DELETE"
    })
    .then((response) => response.json())
    .then(msg => {
      let newData = data.filter((task, index) => {
        return (index) !== id
      });
      setData(newData);
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <h1>Task Management App</h1>
      <main className='main-container'>
      <AddTask onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} toEditTask={editData}/>
      <ViewTasks>
        {data.map(({ title, description }, index) => {
          
          return <Task key={index} title={title} description={description} id={index} handleEdit={handleEditTask} handleDelete= {handleDeleteTask}></Task>
        })}
        {!data.length && 'No Task Available.!'}
      </ViewTasks>
      </main>
    </div>
  );
}

export default App;
