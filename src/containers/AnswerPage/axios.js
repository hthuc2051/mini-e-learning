import {history} from './../../App';
import * as Actions from './actions';
import * as Constants from '../constant';
import callApi from '../api/apiCaller';

export const fetchQuestionsOfLesson = async (lessonId, dispatch) => {
    let res = await callApi(Constants.QUESION_ENDPOINT,Constants.GET_METHOD,lessonId,Constants.QUESION); //TODO: Change later
    console.log(res);
    if (res != null) {
        console.log(res.data);
        handleResponse(res, dispatch, Constants.FETCH_QUESTIONS);
    }
}

export const saveLearning = async (userId,courseId,lessonId,status) => {
    let data = JSON.stringify({userId:userId,courseId : courseId,lessonId : lessonId, status: status});
    console.log(data);
    let res = await callApi(Constants.SAVE_LESSON_ENDPOINT,Constants.POST_METHOD,data,Constants.SAVE_LESSON); //TODO: Change later
   history.push('/home/'+ userId);
}
const handleResponse = async (res, dispatch, action) => {
    let status = res.status;
    switch (status) {
        case 200:
            await dispatch(Actions.is2xx(200, action + Constants.PREFIX_OK, res.data));
            break;
        case 400:
            // await dispatch(Actions.isNot2xx(400, messages));
            break;
        case 401:
            // await dispatch(Actions.isNot2xx(401, Constants.MSG_REQUEST_LOGIN));
            break;
        case 403:
            // await dispatch(Actions.isNot2xx(403, Constants.MSG_REQUEST_LOGIN));
            break;
        case 404:
            // messages = await getMessages(res.data.message);
            // await dispatch(Actions.isNot2xx(404, messages));
            break;
        case 408:
            await dispatch(Actions.isNot2xx(408, action + Constants.PREFIX_TIME_OUT));
            break;
        default:
            await dispatch(Actions.isNot2xx(500, action + Constants.PREFIX_FAILED));
            break;
    }
}