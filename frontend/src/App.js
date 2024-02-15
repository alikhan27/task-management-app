import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import ViewTasks from './components/ViewTasks/ViewTasks';
import Task from './components/Task/Task';
function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  function handleAddTask(task) {
    setData([{ ...task }, ...data]);
  }

  function handleEditTask(id) {
    data.forEach((task, index) => {
      if(index === id) setEditData({...task, id})
    });
  }

  function handleDeleteTask(id) {
    let newData = data.filter((task, index) => {
      return index !== id
    });
    setData(newData);
  }

  return (
    <div className="App">
      <h1>Task Management App</h1>
      <AddTask onAddTask={handleAddTask} />
      <ViewTasks>
        {data.map(({ title, description }, index) => {
          
          return <Task key={index} title={title} description={description} id={index} handleEdit={handleEditTask} handleDelete= {handleDeleteTask}></Task>
        })}
        {!data.length && 'No Task Available.!'}
      </ViewTasks>
    </div>
  );
}

export default App;
