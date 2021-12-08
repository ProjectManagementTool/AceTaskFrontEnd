import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProject} from "../../actions/projectActions";

class ProjectItem extends Component {
    onDeleteClick = (id) => {
        this.props.deleteProject(id);
    };

    render() {
        const {project} = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-dark mb-3 text-white border-secondary border-4">
                    <div className="row">
                        <div className="col-2 ml-5 border text-center">
                            <h5 style={{marginTop: "40px"}}>Project Id</h5>
                            <h5>{project.projectIdentifier}</h5>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8 border">
                            <h3 style={{marginTop: "30px"}}>{project.projectName}</h3>
                            <p>{project.description}</p>
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
