import React, {Component} from "react";

import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/backlogActions";
import {Bar} from "react-chartjs-2";


class ProjectBoard extends Component {
    //constructor to handle errors
    constructor() {
        super();
        this.state = {
            errors: {},
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const {id} = this.props.match.params;
        const {project_tasks} = this.props.backlog;
        const {errors} = this.state;

        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];
        for (let i = 0; i < project_tasks.length; i++) {
            if (project_tasks[i].status === "TO_DO") {
                todoItems.push(project_tasks[i]);
            }
        }
        let todo=todoItems.length

        for (let i = 0; i < project_tasks.length; i++) {
            if (project_tasks[i].status === "IN_PROGRESS") {
                inProgressItems.push(project_tasks[i])
            }
        }
        let inprogress=inProgressItems.length
        for (let i = 0; i < project_tasks.length; i++) {
            if (project_tasks[i].status === "DONE") {
                doneItems.push(project_tasks[i])
            }
        }
        let done=doneItems.length


        // const labels = Utils.months({count: 7});
        const data = {
            labels: [
                'ToDo',
                'InProgress',
                'Done'
            ],
            datasets: [{
                label:"Project Task Report",
                data: [todo, inprogress, done],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',

                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',

                ],
                borderWidth: 1
            }]
        };


        return (
            <div>
                <div className="container">
                    {/*<p>Total number of project:{todoItems.length}</p>*/}
                    {/*<p>Total number of project:{inProgressItems.length}</p>*/}
                    {/*<p>Total number of project:{doneItems.length}</p>*/}
                    <Bar data={data}/>
                </div>
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    backlog: state.backlog,
    errors: state.errors,
});

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);
