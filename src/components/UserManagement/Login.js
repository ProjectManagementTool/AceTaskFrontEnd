import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../actions/securityActions";
import classnames from "classnames"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        if(this.props.security.validToken){
            this.props.history.push("/dashboard")
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard");
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(LoginRequest);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {errors} = this.state;


        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto pb-5 pt-2 mt-2 border border-light shadow rounded">
                            <h1 className=" text-center">Log into AceTask</h1>
                            <p className="lead text-center">If you have created account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.username && (
                                            <div className={"invalid-feedback"}>{errors.username}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.password && (
                                            <div className={"invalid-feedback"}>{errors.password}</div>
                                        )
                                    }
                                </div>
                                <input type="submit" value={"Log In"} className="btn btn-primary  mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {login}
)(Login);

