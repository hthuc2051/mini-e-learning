

export const onLoading = (action) => {
    return {
        type: action,
    }
}
export const is2xx = (statusCode, action, course) => {
    return {
        statusCode: statusCode,
        type: action,
        course: course,
    }
}

export const isNot2xx = (statusCode, action) => {
    return {
        statusCode: statusCode,
        type: action,
    }
}