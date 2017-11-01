import React, { Component } from 'react';

/**
 * Demo of an unauthenticated API call.
 */
class UnprotectedCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true
    };
  }

  componentDidMount() {

    fetch('/api/db/unprotected')
      .then(response => {
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        this.setState({'todos': json.todos, 'loading': false});
      })
      .catch(function (error) {
        this.setState({'loading': false});
        console.error(error);
      });
  }

  render() {
    let todoList = this.state.todos.map(function(todo) {
      return <li key={todo._id}>{todo.task}</li>;
    });

    if (this.state.loading) {
      return <h1>loading...</h1>
    } else {
      return (
        <div className="Db">
          <h1>todos from an unprotected db call</h1>
          <ul>
            {todoList}
          </ul>
        </div>
      );
    }

  }
}

export default UnprotectedCall;
