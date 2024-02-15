import { useEffect, useState } from "react"

export default function AddTask({ onAddTask, toEditTask, onUpdateTask }) {
    useEffect(()=> {
        if(toEditTask)  {
            setValues(toEditTask);
            setIsEdit(true);
        };
        
    }, [toEditTask])
    
    const initialValue = {
        title: '',
        description: ''
    };

    const [values, setValues] = useState(initialValue);
    const [isEdit, setIsEdit] = useState(false);

    let button;
    if(isEdit) {
        button = <button className="btn" data-testid="edit-task">Update Task</button>
    } else {
        button = <button className="btn" data-testid="add-task" onClick={addTask}>Add Task</button>
    }

    function addTask(e) {
        e.preventDefault();
        if(values.title.trim().length && values.description.trim().length) {
            onAddTask(values);
            setValues(initialValue);
        }
    }

    function handleChange(e) {
        
        if (e.target.name === 'title') {
            setValues({ ...values, title: e.target.value });
        }
        if (e.target.name === 'description') {
            setValues({ ...values, description: e.target.value });
        }
    }

    return (<div className="add-task-container">
        <h2>Add Task</h2>
        <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" name="title" id="title" onChange={handleChange} value={values.title}/>
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <textarea className="form-control" name="description" id="desc" onChange={handleChange} value={values.description} />
            </div>
            <div className="btn-group">
                {button}
            </div>
        </form>
    </div>)
}