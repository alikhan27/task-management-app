import './App.css';
import AddTask from './components/AddTask/AddTask';
import ViewTasks from './components/ViewTasks/ViewTasks';

function App() {
  return (
    <div className="App">
      <h1>Task Management App</h1>
      <AddTask />
      <ViewTasks></ViewTasks>
    </div>
  );
}

export default App;
