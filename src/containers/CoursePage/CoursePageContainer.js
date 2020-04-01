import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constant';
import './styles.css';
import { fetchCourse } from './axios';
import Chapter from './Chapter';
class CoursePageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: 200,
            course: null,
            message: '',
            courseID: '',
            currentCourse: ''
        };
    }

    componentWillMount() {

        let params = this.props.params;
        this.setState({ courseID: params });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            course: nextProps.course,
        })
        let { courseID } = this.state;
        for (let i = 0; i < nextProps.course.length; i++) {
            let temp = nextProps.course[i].id + "";
            if (temp === courseID.id) {
                this.setState({ currentCourse: nextProps.course[i] });
            }
        }
    }

    // renderChapters = (chapters) => {
    //     let result = null;
    //     if (chapters) {
    //         result = chapters.map((chapter, index) => {
    //             return chapter ? <Chapter key={index} index={chapter.id} chapter={chapter} /> : '';
    //         })

    //     }
    //     return result;
    // }

    renderChapters = () => {
        let { currentCourse } = this.state;
        return <Chapter chapter={currentCourse.courseLesson} index='1' />;
    }



    render() {
        let { currentCourse } = this.state;
        console.log(this.state);
        return (
            
            <div className="article">
                <div className="box">
                    <div>
                        <div className="course-box">
                            <img src={currentCourse.icon} className="course-icon" />
                            <span className="course-title">{currentCourse.name}</span>
                        </div>
                        <p className="course-description">{currentCourse.description}</p>
                    </div>

                    {currentCourse ? this.renderChapters() : ''}
                </div>
                <div className="right">
                    <div className="top-right-box">
                        <div className="topbox-title">SAVED TO MY COURSES</div>
                        <div className="icon">
                            <img className="icon-start" src="https://quantic.mba/assets/vectors/star_white-e2068605.svg" />
                        </div>
                    </div>
                    <div className="smarly-highlight">
                        <div className="bottombox-headers">
                            SMARTLY ADVANCE
                        </div>
                        <hr className="bottombox-completeline" />
                        <hr className="diamon" />
                        <ul className="smarly-ul">
                            <li>More flexibility. You can work and fit your work schedule.</li>
                            <li>Choose your own learning environment that works best for your needs</li>
                            <li>Lower cost for studying </li>
                        </ul>
                    </div>
                    <div className="smarly-highlight">
                        <div className="bottombox-headers">
                            CREDIT
                        </div>
                        <hr className="bottombox-completeline" />
                        <hr className="diamon" />
                        <div>
                            <div className="smarly-creadit">
                                Vo Nhat Thien
                        </div>
                            <div className="smarly-ul-bold">
                                CEO, Doctor, Head lecturer
                        </div>
                        </div>
                        <p>
                            
                        </p>
                        <div>
                            <div className="smarly-creadit">
                                Nguyen Huy Thuc
                        </div>
                            <div className="smarly-ul-bold">
                                Key Board Member
                        </div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        course: state.dashBoardPage.course,
        message: state.coursePage.course
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        Loading: (courseID) => {
            fetchCourse(courseID, dispatch);
        }
    }
}
export default connect(mapStateToProps, null, null, { pure: false })(CoursePageContainer);

