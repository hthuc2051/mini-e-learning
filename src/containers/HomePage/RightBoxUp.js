import React from 'react';
import './RightBoxUp.css';

class RightBoxUp extends React.Component {
    render() {
        let{info} =this.props;
        return (
            <div className="rightboxup">
                <div className="rightboxup-contain">
                    <div className="rightboxup-contain-title">
                        <div className="rightboxup-contain-title-hiddenicon">
                            <img src={info.upbox_icon} className="rightboxup-contain-title-icon" />
                        </div>
                        <div className="rightboxup-contain-title-text">
                            {info.upbox_tile}
                            </div>
                        <div className="rightboxup-contain-title-icondiv">
                            <img src={info.upbox_icon} className="rightboxup-contain-title-icon" />
                        </div>
                    </div>
                    <p className="rightboxup-contain-description">{info.upbox_description}</p>
                    <div className="rightboxup-contain-buttondiv">
                        <div className="rightboxup-contain-bottom">
                            <button className="rightboxup-contain-button">Complete Application</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RightBoxUp;