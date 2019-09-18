import * as Actions from '../constant';
import * as Messages from '../messages';
const initStage = {
    questions: [],
    isLoading: false,
    statusCode: 500,
    message: '',
};

const answerPage = (state = initStage, action) => {
    console.log(action);

    switch (action.type) {
        // Fetch questions
        case Actions.FETCH_QUESTIONS:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.FETCH_QUESTIONS_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                questions:action.questions,
            });
        case Actions.FETCH_QUESTIONS_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: Messages.MSG_FAILED,
            });
        case Actions.FETCH_QUESTIONS_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: Messages.MSG_TIMEOUT
            });

        // Answer questions
        default:
            return state;
    }
};

export default answerPage;