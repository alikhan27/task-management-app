export default function Task({title, description}) {
    return (<li className="task">
        <h3>{title}</h3>
        <p>{description}</p>
</li>)
}