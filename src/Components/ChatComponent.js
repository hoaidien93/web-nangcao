import React from 'react';
import '../Assets/login.css';
import $ from 'jquery';
import axios from 'axios';
import io from 'socket.io-client';


class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            isShowChat: false,
            endPoint: "http://localhost:3001"
        }

        let socket = io.connect(this.state.endPoint);
        let token = localStorage.getItem("token");
        if (localStorage.getItem("id_user")) {
            socket.on('connect', () => {
                socket.emit('register', {
                    socketId: socket.id,
                    username: localStorage.getItem("username"),
                    id: localStorage.getItem("id_user")
                });

                socket.on('newMessage', (data) => {
                    localStorage.setItem("patternId", data.fromID);
                    $(".chat-message").append("<p class='message-chat'><span class='c-blue'>" + data.from + "</span>: " + data.message + "</p>");
                    $(".chat-message").scrollTop(9999);
                });
            });
        }

    }
    toggleChat() {
        let toggle = !this.state.isShowChat;
        this.setState({
            isShowChat: toggle
        })
    }
    render() {
        return (
            <div className={this.state.isShowChat ? "chatbox" : "chatbox offchat"}>
                <div className="chatcontent">
                    <div className="chat-label" onClick={(e) => { this.toggleChat() }}>Chatting</div>
                    <div className="chat-message"></div>
                </div>
                <div className="chat-bottom">
                    <input className="form-control" placeholder="Chatting" type="text" value={this.state.message} name="message" onChange={(e) => { this.handleChange(e) }} />
                    <button className="btn btn-primary ml-1" onClick={(e) => { this.sendMessage() }}>Send</button>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    sendMessage() {
        let socket = io.connect(this.state.endPoint);

        // Emit send message
        socket.emit("sendMessage", {
            from: localStorage.getItem("username"),
            fromID: localStorage.getItem("id_user"),
            to: localStorage.getItem("patternId"),
            message: this.state.message
        });
        $(".chat-message").append("<p class='message-chat'><span class='c-red'>" + localStorage.getItem("username") + "</span>: " + this.state.message + "</p>");
        $(".chat-message").scrollTop(9999);

        this.setState({
            message: ""
        });

        // Clear Input
        document.querySelector("[name='message']").value = "";
    }
}

export default ChatComponent;