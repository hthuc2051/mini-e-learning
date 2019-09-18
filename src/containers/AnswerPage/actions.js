

export const onLoading = (action) => {
    return {
        type: action,
    }
}
export const is2xx = (statusCode, action, questions) => {
    return {
        statusCode: statusCode,
        type: action,
        questions: questions,
    }
}

export const isNot2xx = (statusCode, action) => {
    return {
        statusCode: statusCode,
        type: action,
    }
}