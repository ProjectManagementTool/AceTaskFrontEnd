import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getProjectTask,} from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class ViewProjectTask extends Component {
    constructor() {
        super();

        this.state = {
            id: "",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            create_At: "",
            errors: {}
        };

    }

    componentDidMount() {
        const {backlog_id, pt_id} = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        } = nextProps.project_task;

        this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        });
    }


    render() {

        const { project_task } = this.props;

        let priorityStr;

        if (project_task.priority === 1) {
            priorityStr = "HIGH";
        }
        if (project_task.priority === 2) {
            priorityStr = "MEDIUM";
        }
        if (project_task.priority === 3) {
            priorityStr = "LOW";
        }
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto pb-5 pt-4 pr-4 pl-4 mt-3 border border-light shadow rounded">
                            <Link
                                to={`/projectBoard/${this.state.projectIdentifier}`}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-circle-left font-weight-bold"> Back to project board</i>
                            </Link>
                            <h1 className="text-center mt-3">Project Task Detail :</h1>
                            <p className="lead text-center">

                                <table className="table table-striped table-bordered">

                                    <tbody>
                                    <tr>

                                        <td>Project Id</td>
                                        <td>{this.state.projectIdentifier}</td>
                                    </tr>
                                    <tr>

                                        <td>Task Id</td>
                                        <td>{this.state.projectSequence}</td>
                                    </tr>

                                    <tr>
                                        <td>Summary</td>
                                        <td>{this.state.summary}</td>
                                    </tr>
                                    <tr>

                                        <td>Priority</td>
                                        <td>{priorityStr}</td>
                                    </tr>

                                    <tr>
                                        <td>Due Date</td>
                                        <td>{this.state.dueDate}</td>
                                    </tr>

                                    <tr>
                                        <td>Description</td>
                                        <td>{this.state.acceptanceCriteria}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ViewProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {getProjectTask}
)(ViewProjectTask);