import * as Actions from '../constant';
import * as Messages from '../messages';
const initStage = {
    isLoading: false,
    user:"",
};

const loginPage = (state = initStage, action) => {
    console.log(action);

    switch (action.type) {
        // Fetch course
        case Actions.LOGIN:
            return Object.assign({}, state, {
                isLoading: false,
                user:action.user,
            });

        // Answer course
        default:
            return state;
    }
};

export default loginPage;