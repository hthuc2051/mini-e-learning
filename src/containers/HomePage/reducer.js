import * as Actions from '../constant';
import * as Messages from '../messages';
import * as Constant from'../constant';
const initStage = {
    lesson: null,
    isLoading: false,
    statusCode: 500,
    message: '',
    info:[]
};

const dashBoardPage = (state = initStage, action) => {
    console.log(action);

    switch (action.type) {
        // Fetch questions

        // Load mainbox
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
            case Actions.DASHBOARD:
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

export default dashBoardPage;