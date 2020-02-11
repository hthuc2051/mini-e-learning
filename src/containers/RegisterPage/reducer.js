import * as Actions from '../constant';
import * as Messages from '../messages';
const initStage = {
    isLoading: false,
    message:"",
};

const registerPage = (state = initStage, action) => {
    console.log(action);

    switch (action.type) {
        // Fetch course
        case Actions.LOGIN:
            return Object.assign({}, state, {
                isLoading: false,
                message:action.message,
            });

        // Answer course
        default:
            return state;
    }
};

export default registerPage;