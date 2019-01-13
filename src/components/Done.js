import React, { Component } from "react";
import "../App.css";

class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  render() {
    const { isEditing } = this.state;
    const currentTask = this.props.currentTask;
    return (
      <div style={{ display: "flex" }}>
        <li
          className="list-group-item "
          style={{ marginLeft: "22px", marginBottom: "10px" }}
        >
          {this.props.detail}
        </li>

        <i
          className="fas fa-trash-alt"
          onClick={() => this.props.deleteTask(this.props.detail)}
          style={{ fontSize: "35px" }}
        />
      </div>
    );
  }
}

export default Done;
