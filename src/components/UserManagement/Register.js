import React, {Component} from 'react';
import {createNewUser} from "../../actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import classnames from "classnames"


class Register extends Component {

    constructor() {
        super();
        this.state = {
            "username": "",
            "fullName": "",
            "password": "",
            "confirmPassword": "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        this.props.createNewUser(newUser, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors} = this.state;
        return (

            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto pb-5 pt-4 pr-4 pl-4 mt-3 border border-light shadow rounded">
                            <h1 className=" text-center">Create a new account</h1>
                            <p className="lead text-center">It's quick and easy</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.fullName
                                    })} placeholder="Full Name"
                                           name="fullName"
                                           value={this.state.fullName}
                                           onChange={this.onChange}
                                    />
                                    {
                                        errors.fullName && (
                                            <div className={"invalid-feedback"}>{errors.fullName}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.username
                                    })}
                                           placeholder="Email Address (User name)" name="username"
                                           value={this.state.username}
                                           onChange={this.onChange}
                                    />{
                                    errors.username && (
                                        <div className={"invalid-feedback"}>{errors.username}</div>
                                    )
                                }

                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.password
                                    })}
                                           placeholder="Password" name="password"
                                           value={this.state.password}
                                           onChange={this.onChange}
                                    />{
                                    errors.password && (
                                        <div className={"invalid-feedback"}>{errors.password}</div>
                                    )
                                }
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.confirmPassword
                                    })
                                    }
                                           placeholder="Confirm Password"
                                           name="confirmPassword"
                                           value={this.state.confirmPassword}
                                           onChange={this.onChange}
                                    />
                                    {
                                        errors.confirmPassword && (
                                            <div className={"invalid-feedback"}>{errors.confirmPassword}</div>
                                        )
                                    }
                                </div>
                                <input type="submit" value={"Create new account"} className="font-weight-bold btn btn-success pt-2 pb-2 pl-4 pr-4 mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

Register.protoTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
})
export default connect(mapStateToProps, {createNewUser})(Register);