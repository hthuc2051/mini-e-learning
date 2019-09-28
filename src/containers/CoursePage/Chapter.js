import React, { Component } from 'react';
import './styles.css';
import Lesson from './Lesson';
class Chapter extends Component {


    renderLessons = (lessons) =>{
        let result = null;
        result = lessons.map((lesson,index) =>{
            return lesson ? <Lesson key={index} lesson={lesson}/> : '';
        })
        return result;
    }

    renderHexagon = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push(<div key={i} className="hexagon_total"/>);
        }
        return result;
    }

    render() {
        let { chapter,index } = this.props;
        return (

            <div className="main">
                <label data-toggle="collapse" data-target={"#toggle-" + index} className="test" aria-expanded="false" aria-controls={"toggle-" + index} >
                    <div className="nameChapter">
                        <p className="text">{chapter.name}</p>
                        
                    </div>
                    <div className="hexa">
                        {this.renderHexagon(chapter.totalLessons)}
                    </div>
                </label>
                <div className="titleChapter">
                    <p className="text">{chapter.title}</p>
                </div>
                <div className="collapse " id={"toggle-" + index} >
                    {chapter.lessons ? this.renderLessons(chapter.lessons):''}

                </div>
                <label data-toggle="collapse" data-target={"#toggle-" + index} className="demo" aria-expanded="false"
                    aria-controls={"toggle-" + index}>
                </label>
                {/* <div className="progress-complete"> */}
                <p className="progress-complete-text">{chapter.lessonsComplete} of {chapter.totalLessons} completed</p>
                {/* </div> */}
                <div className="progress-complete-final"></div>
            </div>

        );
    }
}

export default Chapter;

