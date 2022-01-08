import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo";
import Todos from "./Components/Todos";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/api/todos").then(response => {
      if(response.data && Array.isArray(response.data)) {
        setTodos(response.data);
      } else {
        console.log(response.data)
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div className="container">
      <div className='justify-content-center mt-5'>
        <div>
          <h1 className='text-primary text-center'>Todos</h1>
          <hr/>
          <AddTodo />
          <Todos todos={todos}/>
        </div>
      </div>
    </div>
  );
}

export default App;
