import { combineReducers } from 'redux';
import answerPage from './AnswerPage/reducer';
import coursePage from './CoursePage/reducer';
const appReducers = combineReducers({
    answerPage, coursePage,
});

export default appReducers;