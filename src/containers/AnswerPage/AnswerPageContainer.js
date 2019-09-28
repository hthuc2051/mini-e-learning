import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constant';
import './styles.css';
import { fetchQuestionsOfLesson } from './axios';
import { onLoading } from './actions';
import AnswerStage from './AnswerStage';

class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statusCode: 200,
            questions: [],
            messages: '',
            curQuestion: 0,
            latestIndex: 2,
            isCorrect: false,
            isShowHint: false,
            answerMsg: '',
            hintClass: null,
        };
    }

    componentWillMount() {
        this.props.onLoading();
        this.setState({
            isLoading: true,
        })
        this.props.fetchQuestions(1);
    }

    componentWillReceiveProps(nextProps) {
        let { lesson } = nextProps;
        if (lesson && lesson.questions) {
            this.setState({
                isLoading: nextProps.isLoading,
                statusCode: nextProps.statusCode,
                questions: nextProps.lesson.questions,
                latestIndex: nextProps.lesson.latestIndex,
            })
        }
    }

    onChangeQuestion = i => () => {
        // let {curQuestion,latestIndex} = this.state;
        this.setState({
            curQuestion: i,
        })
        if (this.state.curQuestion > this.state.latestIndex) {
            this.setState({
                latestIndex: this.state.curQuestion,
            });
        }
    }
    renderHexagon = (length) => {
        let result = [];
        let { curQuestion, latestIndex } = this.state;
        console.log('latestIndex' + latestIndex);
        for (let i = 0; i < length; i++) {
            result.push(<div style={i > latestIndex ? { opacity: .5, pointerEvents: 'none', cursor: 'default' } : {}} onClick={this.onChangeQuestion(i)} key={i} className={curQuestion == i ? 'hexagon_selected hexagon' : 'hexagon_viewed hexagon'} />);
        }
        return result;
    }
    onSelectedAnswer = (id) => {
        let { isCorrect, curQuestion, questions } = this.state;
        let question = questions[curQuestion];
        let hintClass = '';
        if (question) {
            let answer = question.answers.find(answer => answer.id === id);
            if (question.correctId === id) {
                this.setState({
                    isCorrect: true,
                });
                hintClass = "show hint-true"
            } else {
                hintClass = "show hint-false"
            }
            this.setState({
                isShowHint: true,
                answerMsg: answer ? answer.answerMsg : '',
                hintClass: hintClass,
            });
        }


    }
    onClickNextQuestion = () => {
        let { curQuestion, latestIndex } = this.state;
        let newIndex = curQuestion + 1;
        this.setState({
            curQuestion: newIndex,
            latestIndex: (newIndex > latestIndex) ? newIndex : latestIndex,
            isCorrect: false,
            isShowHint: false,
            hintClass: null,

        });
    }
    onClickPreQuestion = () => {
        let { curQuestion } = this.state;
        if (curQuestion > 0) {
            this.setState({
                curQuestion: curQuestion - 1,
                isCorrect: false,
                isShowHint: false,
                hintClass: null,
            });
        }
    }

    onCloseHint = () => {
        this.setState({
            isShowHint: false,
            hintClass: null,
        })
    }

    render() {
        let { questions, isLoading, curQuestion, isCorrect, isShowHint, answerMsg, hintClass } = this.state;

        return (
            <div>
                {isLoading ? <div className="loading-spinner" ></div> : ''}
                <div id="snackbar_top" className={hintClass ? hintClass : ''}>
                    <div className="message_text_container">
                        <div className="message-element">
                            <p>{answerMsg}</p>
                        </div>
                    </div>
                    <button onClick={this.onCloseHint} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <nav className="navbar d-flex justify-content-between">
                    <div className="nav-back d-flex align-items-center col-2 col-sm-3" >
                        <img className="icon-back" src="/images/left-arrow.png" ></img>
                        <span className="nav-caption" >EXIT</span>
                    </div>
                    <div className="justify-content-center nav-hexa col-8 col-sm-6">
                        <div className="hexagon_questions justify-content-center " >
                            {this.renderHexagon(questions.length)}
                        </div>
                        <h3>Select an answer for each blank</h3>
                    </div>

                    <div className="nav-title col-2 col-sm-3">
                        <div className="title">
                            <h2>The Time Value of Money</h2>
                            <h3>Chapter 1 • Lesson 1 of 4</h3>
                        </div>
                        <img width={28} src="/images/cancel.png" className="but-ansPage-close " alt="Close" />
                    </div>
                </nav>
                <AnswerStage isCorrect={isCorrect} onSelectedAnswer={this.onSelectedAnswer} question={questions[curQuestion]} />
                <div className="button-stage fixed-bottom">
                    <button onClick={this.onClickPreQuestion} style={curQuestion < 1 ? { display: 'none' } : { display: 'inline' }} type="button" className="btn-pre  col-12 col-sm-4">Previous</button>
                    <button onClick={this.onClickNextQuestion} style={!isCorrect ? { display: 'none' } : { display: 'inline' }} type="button" className="btn-next col-12 col-sm-4">Continue</button>
                </div>
                <div onClick={this.onCloseHint} id="snackbar" className={hintClass ? hintClass : ''}>
                    <div className="message_text_container">
                        <div className="message-element">
                            <p>{answerMsg}</p>
                        </div>
                    </div>
                    <div className={hintClass ? hintClass + " close-button message-close-hexagon" : ""}><img className="hex-close-icon" src="./images/hexagon_close.png"></img></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        statusCode: state.answerPage.statusCode,
        isLoading: state.answerPage.isLoading,
        messages: state.answerPage.messages,
        lesson: state.answerPage.lesson,
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_QUESTIONS + Constants.PREFIX_LOADING));
        },
        fetchQuestions: (lessonId) => {
            fetchQuestionsOfLesson(lessonId, dispatch);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnswerPageContainer);

