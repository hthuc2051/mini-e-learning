import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TopBox from './TopBox';
import MainBox from './MainBox.js';
import RightBoxUp from './RightBoxUp.js';
import RightBoxDown from './RightBoxDown.js';
import BottomBox from './BottomBox.js';
import './Dashboard.css';
import { connect } from 'react-redux';
import { getMainBox } from './axios';
import { loadData } from './axios';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      statusCode: 200,
      questions: [],
      messages: '',
      info: [],
    }
  }

  componentWillMount() {
    this.props.fetchQuestions();
    this.props.loadInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      info: nextProps.info,
      questions: nextProps.questions
    })
  }

  render() {
    let { info, questions } = this.state;
    return (
      <div>
        <Container >
          <Row>
            <Col md="8" xs="12" className="dashboard">
              {info[0] ? <TopBox info={info[0]} /> : ''}
              {questions ? this.RenderMainBoxs(questions) : ''}
            </Col>
            <Col md="4" xs="12" className="menu">
              {info[1] ? <RightBoxUp info={info[1]} /> : ''}

              {info[2] ? <RightBoxDown info={info[2]} /> : ''}
            </Col>
          </Row>
          {info[3] ? <BottomBox info={info[3]} /> : ''}
        </Container>
        {/* <Footer /> */}
      </div>
    );
  };

  RenderMainBoxs = (array) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(<MainBox data={this.props.questions[i]} />);
    }
    return result;
  }


}

const mapStateToProps = state => {
  return {
    statusCode: state.answerPage.statusCode,
    isLoading: state.answerPage.isLoading,
    messages: state.answerPage.messages,
    questions: state.answerPage.questions,
    info: state.answerPage.info
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadInfo: () => {
      loadData(dispatch);
    },
    fetchQuestions: () => {
      getMainBox(dispatch);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
