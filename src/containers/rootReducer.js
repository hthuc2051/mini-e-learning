import { combineReducers } from 'redux';
import answerPage from './AnswerPage/reducer';
const appReducers = combineReducers({
    answerPage,
});

export default appReducers;