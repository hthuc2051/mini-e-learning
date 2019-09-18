import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constant';
import './styles.css';
import { fetchQuestionsOfLesson } from './axios';
import { onLoading } from './actions';

class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statusCode: 200,
            questions: [],
            message: '',
        };
    }

    componentWillMount() {
        this.props.onLoading();
        this.setState({
            isLoading:true,
        })
        this.props.fetchQuestions(1);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading,
            statusCode: nextProps.statusCode,
            questions: nextProps.questions,
        })
    }
    render() {
        let { questions,isLoading } = this.state;
        return (
            <div>
                {isLoading ? <div className="loading-spinner" ></div> : ''}
                <nav className="navbar">
                    <div style={{ width: '100%' }} className="row">
                        <div className="nav-back d-flex align-items-center col-4" >
                            <img className="icon-back" src="/images/left-arrow.png" ></img>
                            <span className="nav-caption" >EXIT</span>
                        </div>
                        <div className="d-flex flex-column col-4 justify-content-center nav-hexa">
                            <div className="hexagon_questions justify-content-center" >
                                <div className="hexagon_viewed hexagon" ></div>
                                <div className="hexagon_viewed hexagon" ></div>
                                <div className="hexagon_viewed hexagon" ></div>
                                <div className="hexagon_viewed hexagon" ></div>
                                <div className="hexagon_viewed hexagon" ></div>
                                <div className="hexagon_viewed hexagon" ></div>
                                <div className="hexagon_viewed hexagon" ></div>
                            </div>
                            <h3>Select an answer for each blank</h3>
                        </div>

                        <div className="d-flex flex-column col-4 nav-title">
                            <h2>The Time Value of Money</h2>
                            <h3>Chapter 1 • Lesson 1 of 4</h3>
                        </div>
                    </div>
                </nav>
                <div className=" d-flex flex-column align-items-center mx-5 question-stage justify-content-center">
                    <img className="question-img" src="https://img.freepik.com/free-photo/person-s-hand-putting-money-glass-jar-near-decreasing-stacked-coins_23-2147919232.jpg?size=626&ext=jpg" alt="img-question"></img>
                    <div className="lead">

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.
                        </p>

                    </div>

                </div>
                <div className="row button-stage d-flex justify-content-center">
                    <div className="answer-button col d-flex align-items-center">
                        1 of 2
    </div>
                    <div className="answer-button col d-flex align-items-center">
                        2 of 2
    </div>
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
        questions: state.answerPage.questions,
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

