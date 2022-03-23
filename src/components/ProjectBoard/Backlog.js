import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";
import "./ProjectTasks/style.css";
import ProjectItem from "../Project/ProjectItem";
class Backlog extends Component {
  constructor() {
    super();
    this.state={
      searchTerm:''
    }
  }
  render() {
    const { project_tasks_prop } = this.props;

    const tasks = project_tasks_prop.map((project_task) => (
      <ProjectTask key={project_task.id} project_task={project_task} />
    ));

    function binarySearchAlgorithm(sortedArray, key){
      let begin = 1;
      let end = sortedArray.length - 1;

      while (begin <= end) {
        let middle = Math.floor((begin + end) / 2);

        if (sortedArray[middle] === key) {
          // found the key
          return middle;
        } else if (sortedArray[middle] < key) {
          // continue searching to the right
          begin = middle + 1;
        } else {
          // search to the left
          end = middle - 1;
        }
      }
      // key wasn't found
      return -1;
    }


    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.project_task.status === "TO_DO") {
        todoItems.push(tasks[i]);
      }
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.project_task.status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
      }
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.project_task.status === "DONE") {
        doneItems.push(tasks[i]);
      }
    }
    return (
      <div className="container">

        {/*Search Bar*/}
        <div className={"search"}>
          <input className={"m-3 p-1"} type="text" placeholder="Search your task...." onChange={(event => this.setState({searchTerm:event.target.value}))}/>
          <i className={"search_button fa fa-search "}></i>
        </div>
        {project_tasks_prop.filter((value => {
          if(this.state.searchTerm==""){
            return ""
          }else if(value.summary.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || value.projectSequence===this.state.searchTerm ){
            return binarySearchAlgorithm(tasks,value)
          }
        })).map((project_task,key) => (
            <div className={"user"} key={key}>
              <ProjectTask key={project_task.id} project_task={project_task}/>
            </div>
        ))}




        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className=" demo pt-2 text-light">
                <h4>
                  To Do
                </h4>
              </div>
            </div>
            {todoItems}
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="demo pt-2 text-light">
                <h4>
                  In Progress
                </h4>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="demo pt-2 text-light">
                <h4>
                  Done
                </h4>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
