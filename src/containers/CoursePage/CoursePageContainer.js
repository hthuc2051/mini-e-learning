import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constant';
import './styles.css';
import { fetchCourse } from './axios';
import { onLoading } from './actions';
import Chapter from './Chapter';
class CoursePageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statusCode: 200,
            course: null,
            message: '',
        };
    }

    componentWillMount() {
        this.props.onLoading();
        this.setState({
            isLoading: true,
        })
        this.props.fetchCourse(1);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading,
            statusCode: nextProps.statusCode,
            course: nextProps.course,
        })
    }
    renderChapters = (chapters) => {
        let result = null;
        if(chapters){
        result = chapters.map((chapter,index) =>{
            return chapter ? <Chapter key={index} index={chapter.id} chapter={chapter}/> : '';
        })
        
        }
        return result;
    }
    render() {
        let { course } = this.state;
        return (
            <div className="article">
                <div className="box">
                {course ? this.renderChapters(course.chapters) : ''}
                </div>
                <div className="right">

                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        statusCode: state.coursePage.statusCode,
        isLoading: state.coursePage.isLoading,
        messages: state.coursePage.messages,
        course: state.coursePage.course,
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_QUESTIONS + Constants.PREFIX_LOADING));
        },
        fetchCourse: (courseId) => {
            fetchCourse(courseId, dispatch);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePageContainer);

