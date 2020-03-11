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
import {history} from './../../App';
import * as Constant from '../constant';
import * as Data from './Data';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      statusCode: 200,
      course: [],
      messages: '',
    }
  }

  componentWillMount() {
    let params = this.props.params;
    this.setState({isLoading: true});
     this.props.getMainBox(params);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course: nextProps.course,
      isLoading: nextProps.isLoading
    })
  }

  render() {
    let {  course, isLoading } = this.state;
    let info = Data.INFO;
    return (
      <div>
        {isLoading ? <div className="loading-spinner" ></div> : ''}
        <Container >
          <Row>
            <Col md="8" xs="12" className="dashboard">
              {info[0] ? this.RenderTopBox(course,info) : ''}
              
              {course ? this.RenderMainBoxs(course) : ''}
            </Col>
            <Col md="4" xs="12" className="menu">
              {info[1] ? <RightBoxUp  info={info[1]} /> : ''}

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
     array[i].number = i + 1;
     if(i+1 == array.length) array[i].isLastOne = true;
     if(array[i].status ===  Constant.LEARNED|| array[i].status === Constant.LEARNING){
      array[i].isEnable = true;
     }
     array[i].numberLesson = array[i].courseLesson.length
      result.push(<MainBox key={array[i].id} data={array[i]} id={array[i].id} onSave={this.getCourse}/>);
    }
    return result;
  }

  getCourse(event,id){
    event.preventDefault();
    history.push("/course/"+id);
  }

  RenderTopBox = (array,info) => {
    let learning_course,learning_course_id,learning_lesson,learning_lesson_id;
    for(let i = 0; i< array.length; i++){
      if( array[i].status === Constant.LEARNING){
          learning_course = array[i].name;
          learning_course_id = array[i].id;
          for(let j = 0 ; j <  array[i].courseLesson.length; j++ ){
              if( array[i].courseLesson[j].status === Constant.LEARNING){
                  learning_lesson = array[i].courseLesson[j].name;
                  learning_lesson_id = array[i].courseLesson[j].id;
                  return <TopBox info={info[0]} learning_course = {learning_course} learning_course_id = {learning_course_id}
                  learning_lesson = {learning_lesson} learning_lesson_id = {learning_lesson_id}/>
                  break;
              }
          }
          break;
      }
      return <TopBox info={info[0]} learning_course = {learning_course} learning_course_id = {learning_course_id}
      learning_lesson = {learning_lesson} learning_lesson_id = {learning_lesson_id}/>
  }
  
  }

}

const mapStateToProps = state => {
  return {
    statusCode: state.dashBoardPage.statusCode,
    isLoading: state.dashBoardPage.isLoading,
    messages: state.dashBoardPage.messages,
    course: state.dashBoardPage.course,
  }
}

const mapDispatchToProps = (dispatch, props) => {

  return {
    getMainBox: (userId) => {
      getMainBox(userId,dispatch);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
