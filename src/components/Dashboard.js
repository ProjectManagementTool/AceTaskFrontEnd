import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { PropTypes } from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const projects = this.props.project.projects;
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

                <hr />
                {projects.map((project) => (
                  <ProjectItem key={project.id} project={project}/>
                ))}
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
