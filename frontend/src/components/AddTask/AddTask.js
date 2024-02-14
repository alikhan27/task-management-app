export default function AddTask() {
    return (<div className="add-task-container">
        <h2>Add Task</h2>
        <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" name="title" id="title" />
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <textarea className="form-control" name="description" id="desc" />
            </div>
            <div className="btn-group">
                <button className="btn" data-testid="add-task">Add Task</button>
            </div>
        </form>
    </div>)
}