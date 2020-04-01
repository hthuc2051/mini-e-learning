import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constant';
import './styles.css';
import { fetchQuestionsOfLesson } from './axios';
import { onLoading } from './actions';
import { saveLearning } from './axios';
import AnswerStage from './AnswerStage';


class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            lessonId: 0,
            courseId: 0,
            statusCode: 200,
            questions: [],
            messages: '',
            curQuestion: 0,
            latestIndex: 2,
            isCorrect: false,
            isShowHint: false,
            answerMsg: '',
            hintClass: null,
            lessonName: '',
            lesson_video_link: '',
            lessonIndex: 0,
            lessonNumber: 0,
            userId: 0,
            isShowVideo: true,
        };
    }

    componentWillMount() {
        let params = this.props.params;
        this.props.onLoading();
        this.setState({
            isLoading: true,
            lessonId: params.id,
        })
        this.props.fetchQuestions(params.id);
    }

    componentWillReceiveProps(nextProps) {
        let video_link= '';
        let { lesson } = nextProps;
        if (lesson && lesson.questions) {
            let course = nextProps.course;
            for (let i = 0; i < course.length; i++) {
                let lessonsList = course[i].courseLesson;
                for (let j = 0; j < lessonsList.length; j++) {
                    let lessons = lessonsList[j];
                    let lessonID = lessons.id + "";
                    if (lessonID === this.state.lessonId) {
                        this.setState({
                            lessonIndex: j + 1,
                            lessonNumber: lessonsList.length,
                            lessonName: lessons.name,
                            courseId: course[i].id,
                        });
                        video_link = lessons.video_link;
                    }
                }

            }
            let video = {
                content: video_link,
                isVideo: true,
                answers:[{
                    id: "VIDEO", content: "Next", answerMsg: "NEXT"
                }]
            };
            let newQuestions = [video].concat(nextProps.lesson.questions)
            this.setState({
                isLoading: nextProps.isLoading,
                statusCode: nextProps.statusCode,
                questions: newQuestions,
                latestIndex: nextProps.lesson.latestIndex,
                userId: nextProps.userId,
            })
            console.log(nextProps.lesson.questions);
        }
    }

    onChangeQuestion = i => () => {
        // let {curQuestion,latestIndex} = this.state;
        this.setState({
            curQuestion: i,
            selectedId:-1,
        })
        if (this.state.curQuestion > this.state.latestIndex) {
            this.setState({
                latestIndex: this.state.curQuestion,
                selectedId:-1,
            });
        }
    }
    renderHexagon = (length) => {
        let result = [];
        let { curQuestion, latestIndex } = this.state;
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
            if(id === "VIDEO"){
                 this.onClickNextQuestion();
            }else{
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
                    selectedId: id,
                });
            }
          
        }


    }
    onClickNextQuestion = () => {
        let { curQuestion, latestIndex, selectedId } = this.state;
        let newIndex = curQuestion + 1;
        this.setState({
            curQuestion: newIndex,
            latestIndex: (newIndex > latestIndex) ? newIndex : latestIndex,
            isCorrect: false,
            isShowHint: false,
            hintClass: null,
            selectedId :-1,
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
                selectedId :-1,
            });
        }
    }

    onCloseHint = () => {
        this.setState({
            isShowHint: false,
            hintClass: null,
        })
    }

    renderTitle() {
        let { lessonName, lessonNumber, lessonIndex } = this.state;
        return (
            <div className="nav-title col-2 col-sm-3">
                <div className="title">
                    <h2>{lessonName}</h2>
                    <h3>Lesson {lessonIndex} of {lessonNumber}</h3>
                </div>
                <img width={28} src="/images/cancel.png" className="but-ansPage-close " alt="Close" />
            </div>
        );
    }

    saveAndExit() {
        console.log(this.state);
        let { courseId, lessonId, userId, curQuestion, questions } = this.state;
        let status = Constants.LEARNING;
        if (curQuestion === questions.length) {
            status = Constants.LEARNED;
        }
        this.props.saveLearningStatus(userId, courseId, lessonId, status);
    }

    render() {
        let { questions, isLoading, curQuestion, isCorrect, isShowHint, answerMsg, hintClass, selectedId } = this.state;

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
                    <div className="nav-back d-flex align-items-center col-2 col-sm-3" onClick={(e) => { e.preventDefault(); this.saveAndExit() }}>
                        <img className="icon-back" src="/images/left-arrow.png" ></img>
                        <span className="nav-caption" >SAVE AND EXIT</span>
                    </div>
                    <div className="justify-content-center nav-hexa col-8 col-sm-6">
                        <div className="hexagon_questions justify-content-center " >
                            {this.renderHexagon(questions.length)}
                        </div>
                        <h3>Select an answer for each blank</h3>
                    </div>
                    {this.renderTitle()}

                </nav>
                <AnswerStage isCorrect={isCorrect} onSelectedAnswer={this.onSelectedAnswer} question={questions[curQuestion]} selectedId={selectedId} />
                <div className="button-stage fixed-bottom">
                    <button onClick={this.onClickPreQuestion} style={curQuestion < 1 ? { display: 'none' } : { display: 'inline' }} type="button" className="btn-pre  col-12 col-sm-4">Previous</button>
                    <button onClick={this.onClickNextQuestion} style={!isCorrect ? { display: 'none' } : { display: 'inline' }} type="button" className="btn-next col-12 col-sm-4">Continue</button>
                </div>
                <div onClick={this.onCloseHint} id="snackbar" className={hintClass ? hintClass : ''}>
                    <div className="message_text_container">
                        <div className="message-element">
                            <p>{answerMsg}</p>
                            {answerMsg == 'Correct' ? <p>Smart choice</p> : <p>Let try again</p>}
                        </div>
                    </div>
                    <div className={hintClass ? hintClass + " close-button message-close-hexagon" : ""}><img className="hex-close-icon" src="https://quantic.mba/assets/images/hexagon_close-d5d50336.png"></img></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        statusCode: state.answerPage.statusCode,
        isLoading: state.answerPage.isLoading,
        messages: state.answerPage.messages,
        lesson: state.answerPage.lesson,
        course: state.dashBoardPage.course,
        userId: state.loginPage.user.id,
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_QUESTIONS + Constants.PREFIX_LOADING));
        },
        fetchQuestions: (lessonId) => {
            fetchQuestionsOfLesson(lessonId, dispatch);
        },
        saveLearningStatus: (userId, courseId, lessonID, status) => {
            saveLearning(userId, courseId, lessonID, status);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnswerPageContainer);

