import React, { Component } from "react";
import "../App.css";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }
  editTask = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };
  updateItem = evt => {
    evt.preventDefault();
    this.props.editItem(this.props.index, this.input.value);
    this.editTask();
    console.log(this.input.value);
  };

  render() {
    const { isEditing } = this.state;
    const currentTask = this.props.currentTask;
    const itemCompleted = this.props.item.completed;
    return (
      <div className={this.props.item.completed ? "completed" : "notcompleted"}>
        {isEditing ? (
          <form onSubmit={this.updateItem}>
            <input
              className="updateText"
              type="text"
              defaultValue={this.props.detail}
              ref={value => {
                this.input = value;
              }}
            />
            <i class="fas fa-plus" style={{ fontSize: "35px" }} />
          </form>
        ) : (
          <li className="list-group-item " style={{ marginLeft: "22px" }}>
            {this.props.detail}
          </li>
        )}
        {itemCompleted ? null : (
          <div style={{ marginRight: "10px" }}>
            <i
              className="far fa-edit"
              onClick={this.editTask}
              style={{ fontSize: "35px" }}
            />

            <i
              className="fas fa-fighter-jet"
              style={{ fontSize: "35px" }}
              onClick={() => this.props.sendToDone(this.props.index)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TodoItems;
