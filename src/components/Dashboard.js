import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { PropTypes } from "prop-types";
import './Dashboard.css'

class Dashboard extends Component {
  constructor() {
    super();
    this.state={
      searchTerm:''
    }
  }
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const projects = this.props.project.projects;
    //binary search algorithm
    function binarySearch(sortedArray, key){
      let start = 1;
      let end = sortedArray.length - 1;

      while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] === key) {
          // found the key
          return middle;
        } else if (sortedArray[middle] < key) {
          // continue searching to the right
          start = middle + 1;
        } else {
          // search to the left
          end = middle - 1;
        }
      }
      // key wasn't found
      return -1;
    }
    return (
      <div>
        {/*Dashboard Component (Project Item included) */}

        <CreateProjectButton />
        <br/>

        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <h1 className=" text-center">Project Dashboard</h1>
                <hr/>

                <div className={"search"}>
                <input className={"m-3 p-1"} type="text" placeholder="Search your project...." onChange={(event => this.setState({searchTerm:event.target.value}))}/>
                  <i className={"search_button fa fa-search "}></i>
                </div>
                {projects.filter((value => {
                  if(this.state.searchTerm===""){
                    return value
                  }else if(value.projectName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || value.projectIdentifier.toLowerCase().includes(this.state.searchTerm)){

                    return binarySearch(projects , value)
                  }
                })).map((project,key) => (

                    <div className={"user"} key={key}>
                      <ProjectItem key={project.id} project={project}/>
                    </div>

                ))}

                {/*<h1 className=" text-center">Project Dashboard</h1>*/}

                {/*<hr />*/}
                {/*{projects.map((project) => (*/}
                {/*  <ProjectItem key={project.id} project={project}/>*/}
                {/*))}*/}


              </div>
            </div>
          </div>
        </div>
      </div>

      /*{/!*  End of Dashboard Component *!/}*/
    );
  }
}
Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});
export default connect(mapStateToProps, { getProjects })(Dashboard);
