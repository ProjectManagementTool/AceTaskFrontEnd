import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import logo from "../../assets/Ace.gif"
import '../../../src/App.css';
import './Landing.css';

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
                                    <img src={logo} width={"60%"} alt="Logo"/>
                                </div>

                                <p className="btmtext lead ">
                                    Create your account to join active projects or start your own
                                </p>

                                <hr/>
                                <div className={"landing_bottom"}>
                                    <Link className={"btn btn-lg btn-outline-success border  border-success ml-5"}
                                          to={"/register"}>
                                        <i className='fas fa-user-plus'> Create new account</i>
                                    </Link>
                                    <Link className={"btn btn-lg btn-outline-dark ml-5"} to={"/login"}>
                                        Log In <i className='	fas fa-sign-in' aria-hidden="true"> </i>
                                    </Link>
                                </div>


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