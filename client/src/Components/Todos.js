import axios from "axios";
import { useState, useEffect } from "react";

const Todos = ({ todos, setTodos }) => {
  const todoStatus = {
    PENDING: "pending",
    DONE: "done"
  }

  const [sortByPriority, setSortByPriority] = useState(false);  //False-CreatedAt, true-Priority

  const sortTodos = (sortByPriority = false) => {
    let tempTodos = [...todos];
    if(sortByPriority) {
      tempTodos.sort((a, b) => (a.priority >= b.priority) ? 1 : -1);
    }
    else {
      tempTodos.sort((a, b) => {
        console.log(a.createdAt, new Date(a.createdAt), new Date(b.createdAt), new Date(a.createdAt) < new Date(b.createdAt));  
        return (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1);
      })
    }
    setTodos([...tempTodos]);
  }

  useEffect(() => {
    sortTodos(sortByPriority);
  }, [sortByPriority]);

  let handleChange = (todo_id, isChecked) => {
    let status = (isChecked) ? (todoStatus.DONE) : (todoStatus.PENDING);
    axios({
      method: "PUT",
      url: "/api/todos/" + todo_id,
      data: { status }
    }).then(response => {
      if (response.data.success) {
        console.log(response.data.message);
        let newTodos = todos.map(todo => {
          if (todo_id === todo._id) {
            todo.status = status;
          }
          return todo;
        });
        // console.log(todos, newTodos)
        setTodos([...newTodos]);
      } else {
        console.log(response.data.message);
      }
    });
  }

  return (
    <div className="mt-5 d-flex justify-content-center">
      <div>
        {
          (todos.length > 0) ? (
            <>
              <select className="form-select mb-3" name="priority" id="floatingSelect" onChange={(e) => { setSortByPriority(e.target.value==="true") }} value={sortByPriority}>
                <option value={false}>Created At</option>
                <option value={true}>Priority</option>
              </select>
              {
                todos.map(todo => (
                  <div className="form-check" key={todo._id}>
                    <input className="form-check-input" type="checkbox" checked={todo.status === todoStatus.DONE} id={"todo_" + todo._id} onChange={(e) => { handleChange(todo._id, e.target.checked) }} />
                    <label className={"form-check-label text-wrap" + ((todo.status === todoStatus.DONE) ? (" text-secondary text-decoration-line-through") : (" text-dark"))} htmlFor={"todo_" + todo._id}>
                      {`(P${todo.priority}) -> ${todo.text}`}
                    </label>
                  </div>
                ))
              }
            </>
          ) : (<p className="text-center text-secondary">The Todos list is empty</p>)
        }
      </div>
    </div>
  );
}

export default Todos;