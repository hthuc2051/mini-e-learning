import React from 'react';
import './BottomBox.css';
// import image from './cetification.jpg';
class BottomBox extends React.Component{
render(){
    let {info} = this.props;
    return(
        <div className="bottombox-headerbox">
            <div className="bottombox-header">
                {info.bottombox_caption}
            </div>
            <div className="bottombox-completeline"></div>
            <div className="bottombox-text">{info.bottombox_description}</div>
            <div className="bottombox-imagediv">
                <img src={info.bottombox_image} className="bottombox-image"/>
            </div>
        </div>
    );
}
}
export default BottomBox;