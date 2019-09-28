import React from 'react';
import './Mainbox.css';
import icon from './clock.png';
import { FaChevronRight } from 'react-icons/fa';

class MainBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            title: 'FINANCE: TIME VALUE OF MONEY',
            isEnable: true,
            description: 'Start learning with four core course designed to introduce you to the fields of Finance, Accounting, Economics and Statistics.',
            course: 'FINANCE AND ACCOUNTING',
            lesson: 9,
            isLastOne: false
        };
    }

    render() {
        return (
            <div className="mainbox">
                {
                    this.props.data.isEnable ? <div className="mainbox-boxnumber">
                        <div className="mainbox-number">{this.props.data.number}</div>
                        {!this.props.data.isLastOne ? <div className="mainbox-number-line"></div> : <div></div>}
                    </div>
                        :
                        <div className="mainbox-boxnumber">
                            <div className="mainbox-number-disable">{this.props.data.number}</div>
                            {!this.props.data.isLastOne ? <div className="mainbox-number-line-disable"></div> : <div></div>}
                        </div>
                }

                <div className="mainbox-playlist">
                    <div className="mainbox-playlist-contain">
                        <div className="mainbox-playlist-contain-title">
                            {this.props.data.isEnable ?  <img src={this.props.data.icon} className="mainbox-playlist-contain-title-icon" alt="playlist-icon" />
                            :
                            <img src={this.props.data.icon} className="mainbox-playlist-contain-title-icon-disable" alt="playlist-icon" />}
                           
                            <div className="mainbox-playlist-contain-title-text">{this.props.data.title}</div>
                        </div>
                        <div className="mainbox-contain-boxline">
                            <hr className="mainbox-contain-line"></hr>
                        </div>
                        <p className="mainbox-contain-description"> {this.props.data.description}</p>
                        <div className="mainbox-contain-hidden">
                            <div className="mainbox-contain-hidden-topic">{this.props.data.course}</div>
                        </div>
                        <div className="mainbox-contain-bottom">
                            <p className="mainbox-contain-caption">LESSONS</p>
                            <div className="mainbox-contain-bignumber">{this.props.data.lesson}</div>
                        </div>
                    </div>
                    <div className="mainbox-right-arrow">
                        <div className="mainbox-right-arrow-div">
                            <FaChevronRight color="white" size="30px" />
                        </div>

                    </div>
                </div>

            </div>
        );
    };
}
export default MainBox;