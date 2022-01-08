import axios from "axios";
import { useState } from "react";

const AddTodo = ({getTodos}) => {
  const todoTemplate = {
    text: "",
    priority: ""
  }

  const [todo, setTodo] = useState({...todoTemplate});

  let config = {
    method: "POST",
    url: "/api/todos",
    data: {...todo}
  }

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setTodo({ ...todo, [name]: value });
  }

  let canSubmit = (e) => {
    if(todo.text && todo.priority) {
      return true;
    }
    return false;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    // add todo to db
    axios(config).then(response => {
      if(response.data.success) {
        console.log(response.data.message);
        setTodo({...todoTemplate});
        getTodos();
      } else {
        console.log(response.data.message);
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group w-100">
          {/* to do text input  */}
          <input type="text" name="text" className="form-control" id="floatingInput" placeholder="To do text" value={todo.text} onChange={(e) => { handleChange(e) }} />
          {/* Priority drop down */}
          <div>
          <select className="form-select" name="priority" id="floatingSelect" onChange={(e) => { handleChange(e) }} value={todo.priority}>
            <option value="" disabled>Priority</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </select>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!canSubmit()}>Add</button>
        </div>
      </form>
    </>
  );
}

export default AddTodo;