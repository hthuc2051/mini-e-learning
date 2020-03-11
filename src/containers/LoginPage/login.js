import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { login } from './axios'
import { Route } from 'react-router-dom';
import {history} from './../../App'
import { FaLifeRing } from 'react-icons/fa';
import * as Constant from '../constant';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            password: "",
            isLoading: false,
            user:"",
            loginFail:"",
        }
    }

    componentWillReceiveProps(nextProps) {
    
       if(nextProps.user.role ==='user'){
           history.push("/home/"+ nextProps.user.id);
       }else if(nextProps.user.role ==='failed'){
       this.setState({
           loginFail:'wrong email or password',
           isLoading:false,
       });
       }    
    }
    render() {
        let { isLoading,loginFail } = this.state;
        return (
           
            <div className="container-fluid">
                {isLoading ? <div className="loading-spinner" ></div> : ''}
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h1 className="login-heading mb-4">Welcome to Online Learning System!</h1>
                                        <input type="email" id="inputEmail" className="inputBox" placeholder="Email address" name="username" onChange={this.handleChange} required autoFocus />

                                        <input type="password" id="inputPassword" className="inputBox" placeholder="Password" name="password" onChange={this.handleChange} required />

                                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" onClick={this.handleSubmit} type="button" name="key" value="Sign In">Sign In</button>
        {loginFail?<p className="error_message">{loginFail}</p>:''}
                                        <div className="text-center">
                                            <a className="small registerLink" href="/register">Sign Up Here</a></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // handelSubmiss = () => {
    //     let{username,password} = this.state;
    //     this.setState({ isLoading: true });
    //     login(username,password);
    // }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit() {
  
        let { username, password } = this.state;
        if (username == '') {
            this.setState({ loginFail: Constant.EMAIL_EMPTY_MESSAGE });
        }
        else if (password == '') {
            this.setState({ loginFail: Constant.PASSWORD_EMPTY_MESSAGE });
        }else{
            this.setState({ isLoading: true,loginFail:'' });
            this.props.login(username,password);
        }
      
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.loginPage.isLoading,
        user : state.loginPage.user
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (username, password) => {
            login(dispatch, username, password);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);;