import * as Actions from '../constant';
import * as Messages from '../messages';
const initStage = {
    isLoading: false,
    role:"",
};

const loginPage = (state = initStage, action) => {
    console.log(action);

    switch (action.type) {
        // Fetch course
        case Actions.LOGIN:
            return Object.assign({}, state, {
                isLoading: false,
                role:action.role,
            });

        // Answer course
        default:
            return state;
    }
};

export default loginPage;