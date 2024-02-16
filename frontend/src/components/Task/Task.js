export default function Task({title, description, id, handleEdit, handleDelete}) {
    
    return (<li className="task">
        <div className="task-content">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <div className="btn-container">
            <button className="btn" data-testid="editbtn" onClick={() => {handleEdit(id)}}>Edit</button>
            <button className="btn" data-testid="deletebtn" onClick={() =>{handleDelete(id)}}>Delete</button>
        </div>
</li>)
}