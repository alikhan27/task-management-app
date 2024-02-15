export default function Task({title, description, id, handleEdit, handleDelete}) {
    
    return (<li className="task">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="btn-container">
            <button data-testid="editbtn" onClick={() => {handleEdit(id)}}>Edit</button>
            <button data-testid="deletebtn" onClick={() =>{handleDelete(id)}}>Delete</button>
        </div>
</li>)
}