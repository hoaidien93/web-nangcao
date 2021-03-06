import React from 'react';
import '../Assets/login.css';
import $ from 'jquery';
import axios from 'axios';


class TagSkill extends React.Component {
    constructor(props){
        super(props);


    }

    render() {
        return (
            <div className="tag-skill" style={{
                "borderRadius": "10px",
                "backgroundColor" : "#7272eb",
                "color": "white",
                "padding": "4px 3px",
                "width": "100px",
                "display" : "inline-flex",
                "margin" : "3px 2px",
                "height": "58px",
                "justifyContent": "center",
                "alignItems": "center"
            }}>{this.props.skill}</div>
        );
    }
}

export default TagSkill;