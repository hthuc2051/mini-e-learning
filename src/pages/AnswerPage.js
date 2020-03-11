import React, { Component } from 'react';
import {AnswerPageContainer} from '../containers/index';

class AnswerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
   

    render() {
      
        return (
            <div>
                <AnswerPageContainer  params = {this.props.match.params}/>
            </div>
        );
    }
}

export default AnswerPage;
