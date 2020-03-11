import React, { Component } from 'react';
import './styles.css';
import {history} from './../../App';
// import progress_badge_incomplete from '../../progress_badge_incomplete.png'
// import progress_badge_in_progress from '../../progress_badge_in_progress.png'

class Lesson extends Component {
    renderDescription = (descriptions) => {
        let result = null;
        result = descriptions.map((description, index) => {
            return <li className="li-content-lesson" key={index}>
                <p className="content-lesson" >
                    {description.content}
                </p>
            </li>
        })
        return result;
    }

    renderState = (state) => {
        let result = null;
        if (state == 0) {
            result = <div className="lesson-progress">
                <div className="lesson-progress-icon">
                    <img className="progress-badge-incomplete" />
                </div>
                <div className="lesson-progress-incomplete-button">

                </div>
            </div>
        } else if (state == 1) {
            result = <div className="lesson-progress">
                <div className="lesson-progress-icon">
                    <img className="progress-badge-in-progress" />
                </div>
                <div className="lesson-progress-in-progress-button">

                </div>
            </div>
        } else if (state == 2) {
            result = <div className="lesson-progress">
                <div className="lesson-progress-icon">
                    <p className="text-percent">0%</p>
                </div>
                <div className="lesson-progress-percent-button">

                </div>

            </div>
        }
        return result;
    }

    onLessonClicked(id){
        history.push("/lesson/"+id);
    }

    render() {
        let { lesson, index } = this.props;
        return (
            <div className="expand-child">
                <div className="expand-child-lesson" onClick={(event) => {event.preventDefault();this.onLessonClicked(lesson.id)}}>
                    <p className="name-lesson">
                        Lesson {index}
                    </p>
                    <p className="title-lesson">
                        {lesson.name}
                    </p>
                    <ul className="ul-content-lesson">
                        {/* {this.renderDescription(lesson.description)} */}
                        <span className="lesson-description">{lesson.description}</span>
                    </ul>
                </div>

                {this.renderStatus()}


                {/* {this.renderState(lesson.state)} */}
            </div>
        );
    }

    renderStatus = () => {
        let { lesson } = this.props;
        let status = lesson.status;
        if (status === 'Learned') {
            return (<div className="lesson-progress">
                <div className="lesson-progress-icon">
                    <img className="status" src="https://quantic.mba/assets/images/progress_badge_complete-e1752ca9.png" />
                </div>
                <div className="lesson-progress-button-done">
                        DONE
                </div>
             </div >);
        } else if (status === 'Learning') {
            return (<div className="lesson-progress">
            <div className="lesson-progress-icon">
                <img className="status" src="https://quantic.mba/assets/images/progress_badge_in_progress-d2ccc678.png" />
            </div>
            <div className="lesson-progress-button-learning">
                    LEARNING
            </div>
         </div >);
          
        } else {
            return (<div className="lesson-progress">
            <div className="lesson-progress-icon">
                <img className="status" src="https://quantic.mba/assets/images/progress_badge_incomplete-b2bb59b9.png" />
            </div>
            <div className="lesson-progress-button-start">
                    START
            </div>
         </div >);
            
        }
    }
}

export default Lesson;

