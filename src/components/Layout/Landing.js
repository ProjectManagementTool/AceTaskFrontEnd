import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import logo from "../../assets/AceTask.gif"
import '../../../src/App.css'

class Landing extends Component {

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                {/*<h1 className="display-3 mb-4">Personal Kanban Tool</h1>*/}
                                <div>
                                    <img src={logo} width={"60%"} alt="Logo" />
                                </div>
                                <p className="lead text-dark">
                                    Create your account to join active projects or start your own
                                </p>
                                <hr/>
                                <Link className={"btn btn-lg btn-success border  border-secondary ml-5"} to={"/register"}>
                                    Create new account
                                </Link>
                                <Link className={"btn btn-lg btn-dark ml-5"} to={"/login"}>
                                    Log In
                                </Link>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    security: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps)(Landing);