import React from 'react';
import './Dashboard.css';
import logo from './icon.svg';
import icon from './images.png';
import { Button } from 'reactstrap';

class TopBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            "hello":1
        }
    }
    render() {
        let {info} = this.props;
        return (
            <div className="topbox" >
                <div className="topbox-contain">
                    <div className="topbox-contain-title">
                        <div className="topbox-contain-title-bigicon">
                            <img src= {info.icon} className="topbox-contain-title-smallicon" alt="logo"/>
                        </div>
                        <div className="topbox-contain-title-text">
                            <div className="playlist-title">
                               {info.playlist_title}
                            </div>
                            <div className="playlist-subtitle">
                            {info.playlist_subtitle}
                            </div>
                        </div>
                        <div className="topbox-contain-title-button">
                            <button className="playlist-button">
                                <img src={info.sub_icon} className="playlist-button-icon" alt="icon" /> CURRICULUM</button>
                        </div>
                    </div>
                    <div className="topbox-contain-description">
                       {info.description}
                    </div>
                    <div className="topbox-contain-boxline">
                        <hr className="topbox-contain-line"></hr>
                    </div>
                    <div className="topbox-contain-courcemode">
                        <div className="topbox-contain-courcemode-text">
                            <div className="topbox-contain-courcemode-stream">{info.stream_title}}</div>
                            <div className="topbox-contain-courcemode-lession">{info.lession_title}</div>
                        </div>
                        <Button color="success" className="topbox-contain-courcemode-button">START</Button>
                    </div>
                </div>
            </div>
        );
    };
}
export default TopBox;