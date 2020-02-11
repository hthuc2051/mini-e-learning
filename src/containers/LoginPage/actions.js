import * as Constants from '../constant';

export const onLoading = (action) => {
    return {
        type: action,
    }
}
export const is2xx = (statusCode, action, role) => {
    return {
        statusCode: statusCode,
        type: action,
        role: role,
    }
}

export const isNot2xx = (statusCode, action) => {
    return {
        statusCode: statusCode,
        type: action,
    }
}