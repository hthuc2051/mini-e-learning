import React from 'react';
import './RightBoxDown.css';
// import image from './brain.svg';
class RightBoxDown extends React.Component {
    constructor(props){
        super(props);
        this.state={
            step : []
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            step : nextProps.steps
        })
    }
    render() {
        let { info } = this.props;
        return (
            <div className="rightboxdown">
                <div className="rightboxdown-title">
                    <div className="rightboxdown-title-text">{info.downbox_hello}<br /> {info.user_name}!</div>
                    <div className="rightboxdown-title-iconbox"><img src={info.downbox_icon} className="rightboxdown-title-icon" /></div>
                </div>
               {this.renderStep(info.steps)}
            </div>
        );
    }

    renderStep = (step) => {
        let result = [];
        for (let i = 0; i < step.length; i++) {
            result.push(
                <div key={step[i].title} className="rightboxdown-text">
                    <div className="rightboxdown-text-headline">{step[i].title}</div>
                    <div className="rightboxdown-text-description">{step[i].description}</div>
                </div>
            )
        }
        return result;
    }
}
export default RightBoxDown;