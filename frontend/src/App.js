import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import ViewTasks from './components/ViewTasks/ViewTasks';
import Task from './components/Task/Task';
function App() {
  const [data, setData] = useState([]);
  let id = 1;
  function handleAddTask(task) {
    setData([{ ...task, id: id }, ...data]);
    id += 1;
  }
  
  return (
    <div className="App">
      <h1>Task Management App</h1>
      <AddTask onAddTask={handleAddTask} />
      <ViewTasks>
        {data.map(({ title, description }, index) => {
          
          return <Task key={index} title={title} description={description}></Task>
        })}
        {!data.length && 'No Task Available.!'}
      </ViewTasks>
    </div>
  );
}

export default App;
