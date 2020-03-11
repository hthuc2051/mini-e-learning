import { combineReducers } from 'redux';
import answerPage from './AnswerPage/reducer';
import coursePage from './CoursePage/reducer';
import loginPage from './LoginPage/reducer';
import registerPage from './RegisterPage/reducer';
import dashBoardPage from './HomePage/reducer';
const appReducers = combineReducers({
    answerPage, coursePage,loginPage,registerPage,dashBoardPage,
});

export default appReducers;