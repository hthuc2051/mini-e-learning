import * as Constants from '../constant';

export const onLoading = (action) => {
    return {
        type: action,
    }
}
export const is2xx = (statusCode, action, message) => {
    return {
        statusCode: statusCode,
        type: action,
        message: message,
    }
}

export const isNot2xx = (statusCode, action) => {
    return {
        statusCode: statusCode,
        type: action,
    }
}