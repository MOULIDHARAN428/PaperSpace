import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart} from "@fortawesome/free-solid-svg-icons";
class Footer extends Component {

    render(){
        return (
            <div className="footer">
                Made with <FontAwesomeIcon icon={faHeart}/> by PaperGram
            </div>
        );
    }
}
export default Footer;
