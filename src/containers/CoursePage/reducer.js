import * as Actions from '../constant';
import * as Messages from '../messages';
const initStage = {
    course: null,
    isLoading: false,
    statusCode: 500,
    message: '',
};

const coursePage = (state = initStage, action) => {
    console.log(action);

    switch (action.type) {
        // Fetch course
        case Actions.FETCH_COURSE:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.FETCH_COURSE_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                course:action.course,
            });
        case Actions.FETCH_COURSE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: Messages.MSG_FAILED,
            });
        case Actions.FETCH_COURSE_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: Messages.MSG_TIMEOUT
            });

        // Answer course
        default:
            return state;
    }
};

export default coursePage;