import React, { Component } from 'react';
import './styles.css';
import progress_badge_incomplete from '../../progress_badge_incomplete.png'
import progress_badge_in_progress from '../../progress_badge_in_progress.png'

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
        if(state == 0){
            result = <div className="lesson-progress">
                        <div className="lesson-progress-icon">
                            <img src={progress_badge_incomplete} className="progress-badge-incomplete" />
                        </div>
                        <div className="lesson-progress-incomplete-button">

                        </div>
                    </div>
        } else if(state == 1) {
            result = <div className="lesson-progress">
                        <div className="lesson-progress-icon">
                            <img src={progress_badge_in_progress} className="progress-badge-in-progress" />
                        </div>
                        <div className="lesson-progress-in-progress-button">

                        </div>
                    </div>
        } else if(state == 2) {
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
    render() {
        let { lesson } = this.props;
        return (
            <div className="expand-child">
                <div className="expand-child-lesson">
                    <p className="name-lesson">
                        {lesson.name}
                    </p>
                    <p className="title-lesson">
                        {lesson.title}
                    </p>
                    <ul className="ul-content-lesson">
                        {this.renderDescription(lesson.description)}
                    </ul>
                </div>
                {/* <div className="lesson-progress">
                    <div className="lesson-progress-icon">

                    </div>
                    <div className="lesson-progress-button">

                    </div>
                </div> */}
                {this.renderState(lesson.state)}
            </div>
        );
    }
}

export default Lesson;

