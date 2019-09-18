import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constant from '../constant';


class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    

    render() {
      
        return (
            <div>
                Hello
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
       
    }

}
const mapDispatchToProps = (dispatch, props) => {
    return {
       
    }
}
// export default connect(mapStateToProps, mapDispatchToProps)(AnswerPageContainer);
export default AnswerPageContainer;

