import * as Actions from '../constant';
import * as Messages from '../messages';
import * as Constant from'../constant';
const initStage = {
    lesson: null,
    isLoading: false,
    statusCode: 500,
    message: '',
    course:[],
};

const dashBoardPage = (state = initStage, action) => {
            switch (action.type) {
                // Fetch events
                case Actions.DASHBOARD:
                    return Object.assign({}, state, {
                        isLoading: false,
                        statusCode: 200,
                        course:action.course,
                    });
               
                // Answer EVENTS
                default:
                    return state;
                }
};

export default dashBoardPage;