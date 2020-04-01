import React, { Component } from 'react';


class VideoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
        };
    }

    onSelectedAnswer = id => () => {
        this.props.onSelectedAnswer(id);
        this.setState({
            selectedId: id,
        })
    }

    renderAnswers = (answers) => {
        let { selectedId } = this.state;
        let result = null;
        //backend start from 0 but frontend start from 1
        if (answers.length > 0) {
            result = answers.map((item) => {
                return (<div key={item.id} onClick={this.onSelectedAnswer(item.id)} className={(selectedId == item.id ? "but-selected" : "") + " answer-button col d-flex align-items-center"}>{item.content}</div>)
            })
        }
        return result;
    }

    render() {
        let { question, isCorrect } = this.props;
        let className = "row answers-stage d-flex justify-content-center ";
        className = isCorrect ? className + "pointer-none" : className;
        return (
            <div  >
                <div className=" d-flex flex-column align-items-center mx-5 question-stage justify-content-center">
                    {question && question.image_src ? <img className="question-img" src={question.image_src} alt="img-question" /> : ''}
                    <div className="lead" onChange={(e) => {this.renderQuestion.bind(this)}}>
                        <p>
                            {question ? question.content : ''}
                        </p>
                    </div>

                </div>
                <div className={className}>
                    {question ? this.renderAnswers(question.answers) : ''}
                </div>
            </div>
        );
    }
}

export default VideoPage;

