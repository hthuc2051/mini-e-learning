import * as Constants from '../constant';

export const onLoading = (action) => {
    return {
        type: action,
    }
}
export const is2xx = (statusCode, action, prefix, questions) => {
    switch (action) {
        case Constants.LOAD_MAINBOX:
                return {
                    statusCode: statusCode,
                    type: action + prefix,
                    questions: questions,
                }
            
    
        default:
                return {
                    statusCode: statusCode,
                    type: action + prefix,
                    info: questions,
                }
           
    }
   
}

export const isNot2xx = (statusCode, action) => {
    return {
        statusCode: statusCode,
        type: action,
    }
}