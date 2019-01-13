import React, { Component } from "react";
import "../App.css";
const TodoForm = props => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={props.addTask} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter your task here"
          value={props.currentTask}
          onChange={props.updateTask}
          className="inputText"
          maxLength="10"
        />
        <button type="submit" className="btn btn-success btn-lg">
          Add task
        </button>
      </form>
    </div>
  );
};
export default TodoForm;
