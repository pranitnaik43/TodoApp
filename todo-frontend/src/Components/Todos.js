const Todos = ({ todos }) => {
  return (
    <div className="mt-5">
      {
        (todos.length > 0) ? (
          <ul className="list-group">
            {
              todos.map(todo => (
                <li className="list-group-item" key={todo._id}>{todo.text}</li>
              ))
            }
          </ul>
        ) : (<p className="text-center text-secondary">The Todos list is empty</p>)
      }

    </div>
  );
}

export default Todos;