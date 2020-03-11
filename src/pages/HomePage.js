import React from 'react';
import Dashboard from '../containers/HomePage/dashboard';

class HomePage extends React.Component{
    render(){
        return(
            <div><Dashboard params = {this.props.match.params}/></div>
        );
    }
}

export default HomePage;
