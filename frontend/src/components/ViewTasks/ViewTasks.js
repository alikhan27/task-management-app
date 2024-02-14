export default function ViewTasks({children}) {
    return (<div className="view-task-container">
        <h2>All Tasks</h2>
        <ul className="task-list">
            {children}
        </ul>
    </div>)
}