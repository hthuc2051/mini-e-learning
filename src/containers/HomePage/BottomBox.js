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
            <hr className="bottombox-completeline">
               
            </hr>
            <hr className="diamon"/>
            <div className="bottombox-text">{info.bottombox_description}</div>
            <div className="bottombox-imagediv">
                <div className="cetificate">
                    <img src="https://quantic.mba/assets/images/icon_trophy-96e50b0f.png" className="trophy"/>
                </div>
            </div>
        </div>
    );
}
}
export default BottomBox;