import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProject} from "../../actions/projectActions";
import '../Layout/Landing.css'

class ProjectItem extends Component {
    onDeleteClick = (id) => {
        this.props.deleteProject(id);
    };

    render() {
        const {project} = this.props;
        return (
            <div className="container">
                <div className="projectItem_car card-body mb-3 text-white border-secondary border-4">
                    <div className="row border-left">
                        <div className="col-3 ml-auto pr-3 border text-left">
                            <p style={{marginTop: "20px"}}>Project Id : {project.projectIdentifier}</p>
                            <p>Start Date : {project.start_date}</p>
                            <p style={{fontSize:"15px"}}>Expected End Date : {project.end_date}</p>
                        </div>
                        <div className="col-lg-5 col-md-4 col-8 border">
                            <h3 style={{marginTop: "20px"}}>{project.projectName}</h3>
                            <p>{project.description}</p>

                            <div className="text-center mb-0">
                                <Link to={`/chart/${project.projectIdentifier}`} className="btn btn-outline-light font-weight-bold ml-2">
                                    <i className={"fas fa-analytics "}/> Project Deadline Report
                                </Link>
                            </div>

                        </div>



                        <div className="col-md-3 ml-auto border-right">
                            <ul className="list-group">
                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-lg-5"> Project Board</i>
                                    </li>
                                </Link>
                                <Link to={`/updateProject/${project.projectIdentifier}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-lg-2"> Update Project Info</i>
                                    </li>
                                </Link>

                                <li
                                    className="list-group-item delete"
                                    onClick={this.onDeleteClick.bind(
                                        this,
                                        project.projectIdentifier
                                    )}
                                >
                                    <i className="fa fa-minus-circle pr-lg-5"> Delete Project</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired,
};

export default connect(null, {deleteProject})(ProjectItem);
