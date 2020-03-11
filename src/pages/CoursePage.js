import React, { Component } from 'react';
import {CoursePageContainer} from '../containers/index';
import { connect } from 'react-redux';
class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
   

    render() {
        return (
            <div>
                <CoursePageContainer params = {this.props.match.params}/>
            </div>
        );
    }

}


export default CoursePage