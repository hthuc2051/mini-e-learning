import * as Actions from '../constant';
import * as Messages from '../messages';
const initStage = {
    lesson: null,
    isLoading: false,
    statusCode: 500,
    message: '',
    info:[]
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
                lesson:action.lesson,
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

        // Load mainbox
        case Actions.LOAD_MAINBOX:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.LOAD_MAINBOX_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                questions:action.questions,
            });
        case Actions.LOAD_MAINBOX_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: Messages.MSG_FAILED,
            });
        case Actions.LOAD_MAINBOX_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: Messages.MSG_TIMEOUT
            });

             // Load mainbox
        case Actions.LOAD_HOMEPAGE:
                return Object.assign({}, state, {
                    isLoading: true,
                });
            case Actions.LOAD_HOMEPAGE_OK:
                return Object.assign({}, state, {
                    isLoading: false,
                    statusCode: 200,
                    info:action.info,
                });
            case Actions.LOAD_HOMEPAGE_FAILED:
                return Object.assign({}, state, {
                    isLoading: false,
                    statusCode: action.statusCode,
                    message: Messages.MSG_FAILED,
                });
            case Actions.LOAD_HOMEPAGE_TIME_OUT:
                return Object.assign({}, state, {
                    isLoading: false,
                    statusCode: action.statusCode,
                    message: Messages.MSG_TIMEOUT
                });
        default:
            return state;
    }
};

export default answerPage;