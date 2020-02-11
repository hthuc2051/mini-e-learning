import React from 'react';
import './Register.css';
import * as Constant from '../constant';

class Register extends React.Component{
    constructor (props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            username:'',
            password:'',
            confirm_password:'',
            message:'',
            isLoading : false,
        }
    }
    render(){
        let{message,isLoading} = this.state;
        return(
            <div className="signup-form">
                {isLoading ? <div className="loading-spinner" ></div> : ''}
                 <form>
                 <h1>Create an Account</h1>
                 <div className="form-group">
                    <input type="email" className="form-control input-lg" name="username" placeholder="Email Address" onChange={this.handleChange} required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control input-lg" name="password"  placeholder="Password" onChange={this.handleChange} required="required"/>
                </div>
                <div className="form-group"> 
                    <input type="password" className="form-control input-lg" name="confirm_password"  placeholder="Confirm Password" onChange={this.handleChange} required="required"/>
                 <span className="confirm_not_match">{message}</span>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success btn-lg btn-block signup-btn" id="submit" name="key" value="Sign Up" onClick={this.handleSubmit}>Sign Up</button>
                </div>
                <div className="text-center text-black">Already have an account? <a href="/login">Login here</a></div>
                </form>
            </div>
        );
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
        let {password} = this.state;
        if(event.target.name === 'confirm_password'){
            if(password !== event.target.value){
                this.setState({message : Constant.CONFIRM_PASSWORD_NOTMATCH});
            }else{
                this.setState({message :''});
            }
        }

    }
    handleSubmit(){
        let { username, password,confirm_password,message } = this.state;
        console.log(this.state)
        if(username == ''){
            this.setState({message : Constant.EMAIL_EMPTY_MESSAGE});
        }
        else if(password == ''){
            this.setState({message : Constant.PASSWORD_EMPTY_MESSAGE});
        }
        else if(confirm_password == ''){
            this.setState({message : Constant.CONFIRM_PASSWORD_EMPTY_MESSAGE});
        }
        else if(message == ''){
            this.setState({ isLoading: true });
           
        }
    }
  
}
const mapStateToProps = state => {
    return {
        
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (username, password) => {
            login(dispatch, username, password);
        }
    }
export default Register;