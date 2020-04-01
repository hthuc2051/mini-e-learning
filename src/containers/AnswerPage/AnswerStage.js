import React, { Component } from 'react';


class AnswerStage extends Component {

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
    componentWillReceiveProps(nextProps){
        let newId = nextProps.selectedId;
        this.setState({selectedId: newId});
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

        console.log(question);
       
        let className = "row answers-stage d-flex justify-content-center ";
        className = isCorrect ? className + "pointer-none" : className;
        if(question !== null && typeof(question) !== 'undefined'){
            if(question.isVideo === true){
                let link = question.content.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/');
                console.log(link);
                return (
                    <div >
                        <div className=" d-flex flex-column align-items-center mx-5 question-stage justify-content-center">
                            {question && question.image_src ? <img className="question-img" src={question.image_src} alt="img-question" /> : ''}
                            <div className="lead" onChange={(e) => {this.renderQuestion.bind(this)}}>
                            <iframe width="560" height="315" src={link}  allowFullScreen></iframe>
                            </div>
        
                        </div>
                        <div className={className}>
                            {question ? this.renderAnswers(question.answers) : ''}
                        </div>
                    </div>
                );
            }else{
                return (
                    <div >
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
        }else {
            return <p></p>;
        }
  
    }
}

export default AnswerStage;

