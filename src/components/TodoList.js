import React from "react";
import ReactDOM from "react-dom";
import "../App.css";
import TodoItems from "./TodoItems";
import TodoForm from "./TodoForm";
import Done from "./Done";
import $ from "jquery";
import "jquery-ui-bundle";

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTask: "",
      tasks: []
    };
  }
  componentDidMount() {
    if (localStorage.getItem("tasks")) {
      localStorage.getItem("tasks") &&
        this.setState({
          tasks: JSON.parse(localStorage.getItem("tasks"))
        });
      $(function() {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
      });
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
    localStorage.setItem("tasksDate", Date.now());
  };

  updateTask = newValue => {
    this.setState({ currentTask: newValue.target.value });
  };
  addTask = e => {
    e.preventDefault();

    var currentTask = this.state.currentTask;
    if (localStorage.getItem("tasks") == null) {
      var tasks = this.state.tasks;
      if (this.state.currentTask) {
        tasks.push({ name: currentTask, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    } else {
      if (this.state.currentTask) {
        var tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push({ name: currentTask, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
    this.setState({
      tasks: JSON.parse(localStorage.getItem("tasks")),
      currentTask: ""
    });
  };
  sendToDone = index => {
    var tasks = this.state.tasks;

    var task = tasks[index];
    task.completed = !task.completed;

    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  editItem = (index, newValue) => {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var task = tasks[index];
    task["name"] = newValue;

    this.setState({
      tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(index, newValue);
  };
  deleteTask = name => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.name != name);
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  render() {
    return (
      <div>
        <TodoForm
          updateTask={this.updateTask}
          addTask={this.addTask}
          currentTask={this.state.currentTask}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ul id="sortable" className="TodoList" onDragOver={this.dragOver}>
            <div className="heading">
              <h2>Pending</h2>
            </div>

            {this.state.tasks.map((item, i) => {
              return (
                <TodoItems
                  detail={item.name}
                  key={i}
                  index={i}
                  sendToDone={this.sendToDone}
                  completed={this.state.completed}
                  editItem={this.editItem}
                  currentTask={this.state.currentTask}
                  item={item}
                />
              );
            })}
          </ul>

          <ul className="TodoList list-group">
            <div className="heading">
              <h2>Done</h2>
            </div>

            {this.state.tasks
              .filter(task => task.completed === true)
              .map((item, i) => {
                return (
                  <Done
                    detail={item.name}
                    key={i}
                    deleteTask={this.deleteTask}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
