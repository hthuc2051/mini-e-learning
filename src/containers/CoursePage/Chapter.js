import React, { Component } from 'react';
import './styles.css';
import Lesson from './Lesson';
class Chapter extends Component {


    renderLessons = (lessons) =>{
        let result = null;
        console.log(lessons)
        result = lessons.map((lesson,index) =>{
            return lesson ? <Lesson key={index} index={index+1} lesson={lesson}/> : '';
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
        console.log(chapter);
        return (

            <div className="main">
                <label data-toggle="collapse" data-target={"#toggle-" + index} className="test" aria-expanded="true" aria-controls={"toggle-" + index} >
                    <div className="nameChapter">
                        <p className="text">Lesson</p>
                        
                    </div>
                    <span className="hexagon-span">
                        {this.renderHexagon(chapter.length)}
                    </span>
                </label>
                <div className="titleChapter">
                    <p className="text">Powered By Aqualic</p>
                </div>
                <div className="collapse show" id={"toggle-" + index} >
                    {chapter ? this.renderLessons(chapter):''}

                </div>
                <label data-toggle="collapse" data-target={"#toggle-" + index} className="demo" aria-expanded="true"
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

