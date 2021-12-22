import React, {Component} from "react";
import {createProject, getProject} from "../actions/projectActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Doughnut} from "react-chartjs-2";

class ChartAnalysis extends Component {
    //set state
    constructor() {
        super();

        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        const {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date,
        } = nextProps.project;

        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date,
        });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getProject(id, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const chartAnalysis = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
        };

        this.props.createProject(chartAnalysis, this.props.history);
    }

    render() {
        const {errors} = this.state;
        let {project} = this.props

        const dateStr=project.end_date

        var dem=String(dateStr)

        const start=project.start_date

        var startdate=String(start)

        // console.log(dateStr)
        const diff=Math.abs(new Date(dem.replace(/-/,'/'))-new Date())
        // console.log(diff)

       const days=Math.floor(diff/(24*60*60*1000)+1)

        const spent=Math.abs(new Date()-new Date(startdate.replace(/-/,'/')))
        const spentDays=Math.floor(spent/(24*60*60*1000)+1)


        const data = {
            labels: [
                'Days Spent',
                'Days remaining for deadline',

            ],
            datasets: [{
                data: [spentDays, days],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',

                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',

                ]
            }]
        };



        return (
            <div className="project">
                <div className="container">
                    <div className="row">

                        {project.projectName}
                        <br/>

                        Days remaining to complete the project : {days}


                        <Doughnut data={data} />

                    </div>
                </div>
            </div>
        );
    }
}

ChartAnalysis.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    project: state.project.project,
    errors: state.errors,
});

export default connect(mapStateToProps, {getProject, createProject})(
    ChartAnalysis
);
