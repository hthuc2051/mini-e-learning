

export const onLoading = (action) => {
    return {
        type: action,
    }
}
export const is2xx = (statusCode, action, lesson) => {
    return {
        statusCode: statusCode,
        type: action,
        lesson: lesson,
    }
}

export const isNot2xx = (statusCode, action) => {
    return {
        statusCode: statusCode,
        type: action,
    }
}