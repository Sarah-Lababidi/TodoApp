import { useState } from 'react';
import './App.css';


function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input className="form-control" placeholder="Add Todo ..." type="text" value={value} onChange={(evt) => setValue(evt.target.value)} />
      </div>
    </form>
  );
}

function App() {

  const [todos, setTodos] = useState([
    "Land a job as a react developer",
    "Broaden my experience as a developer",
    "Learn backend development",
    "Land a job as a full stack web developer"
  ])
  const [completed, setCompleted] = useState(["Learn about react", "Use react hooks"]);

  const completeTodo = (index) => {
    const newComplete = [...completed];
    newComplete.push(todos[index])
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setCompleted(newComplete);
    setTodos(newTodos);
  }

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const todosList = todos.map((todo, index) => {
    return (
      <li className="list-group-item" key={index}>
        <p className="d-inline-block mr-2">{todo}</p>
        <div className="d-inline-block float-right">
          <button className="btn btn-success rounded-circle mx-1" onClick={() => completeTodo(index)}><i className="fa fa-check"></i></button>
          <button className="btn btn-danger rounded-circle mx-1" onClick={() => deleteTodo(index)}><i className="fa fa-times"></i></button>
        </div>
      </li>
    );
  })

  const completedList = completed.map((todo, index) => {
    return (
      <li className="list-group-item fadeIn" key={index}>
        <p>{todo} <i className="fa fa-check float-right d-inline-block ml-auto"></i></p>
      </li>
    );
  })

  const addTodo = (todo) => {
    const newTodos = [...todos];
    newTodos.push(todo);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1 id="header" className="text-center mt-3 bounceIn">Todo App</h1>
      <div className="container w-75 mt-5">
        <div className="row justify-content-between">
          <div className="todoList col-7">
            <ul className="list-group">
              <li className="list-group-item bg-warning">
                <h5>Todo List</h5>
              </li>
              {todosList}
              <li className="list-group-item">
                <TodoForm addTodo={addTodo} />
              </li>
            </ul>
          </div>
          <div className="completedList col-5">
            <ul className="list-group">
              <li className="list-group-item bg-success">
                <h5>Completed</h5>
              </li>
              {completedList}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
