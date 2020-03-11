import React from 'react';
import './Register.css';
import { connect } from 'react-redux';
import { register } from './axios';
import { history } from './../../App';
import * as Constant from '../constant';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            message: '',
            user:'',
            isLoading: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.user.message == Constant.REGISTER_SUCCESS_MESSAGE) {
            console.assert(nextProps.user.message);
            history.push("/home/"+nextProps.user.id);
        } else {
            this.setState({
                message: nextProps.user.message,
                isLoading: nextProps.isLoading
            });
        }
    }
    render() {
        let { message, isLoading } = this.state;
        return (
            <div className="wall-paper">
                <div className="signup-form">
                    {isLoading ? <div className="loading-spinner" ></div> : ''}
                    <form>
                        <h1>Create an Account</h1>
                        <div className="form-group">
                            <input type="email" className="form-control input-lg" name="username" placeholder="Email Address" onChange={this.handleChange} required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control input-lg" name="password" placeholder="Password" onChange={this.handleChange} required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control input-lg" name="confirm_password" placeholder="Confirm Password" onChange={this.handleChange} required="required" />
                            <span className="confirm_not_match">{message}</span>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-success btn-lg btn-block signup-btn" id="submit" name="key" value="Sign Up" onClick={this.handleSubmit}>Sign Up</button>
                        </div>
                        <div className="text-center text-black">Already have an account? <a href="/">Login here</a></div>
                    </form>
                </div>
            </div>

        );
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        let { password } = this.state;
        if (event.target.name === 'confirm_password') {
            if (password !== event.target.value) {
                this.setState({ message: Constant.CONFIRM_PASSWORD_NOTMATCH });
            } else {
                this.setState({ message: '' });
            }
        }
        else if (event.target.name === 'username') {
            this.setState({ message: '' });
        }

    }
    handleSubmit() {
        let { username, password, confirm_password, message } = this.state;
        if (password !== confirm_password) {
            this.setState({ message: Constant.CONFIRM_PASSWORD_NOTMATCH });
        }
        else if (username == '') {
            this.setState({ message: Constant.EMAIL_EMPTY_MESSAGE });
        }
        else if (password == '') {
            this.setState({ message: Constant.PASSWORD_EMPTY_MESSAGE });
        }
        else if (confirm_password == '') {
            this.setState({ message: Constant.CONFIRM_PASSWORD_EMPTY_MESSAGE });
        }
        else if (message == '') {
            this.setState({ isLoading: true });
            this.props.register(username, password);
        }
    }

}
const mapStateToProps = state => {
    return {
        isLoading: state.registerPage.isLoading,
        user: state.registerPage.user
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        register: (username, password) => {
            register(dispatch, username, password);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);