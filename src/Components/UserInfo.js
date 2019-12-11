import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import axios from 'axios';

import  $ from 'jquery';
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            showAddSkill: false
        };
        this.token = localStorage.getItem("token");
        if (this.token) {
            axios.get("http://localhost:3000/user/info",
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                }).then((res) => {
                    if (res.data.data) {
                        this.setState({
                            userInfo: res.data.data
                        })
                        console.log(this.state.userInfo.skills);
                    }
                    else {
                        this.props.history.push('/login');
                    }
                });
        }
        else {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="homePage">
                {this.renderRedirect()}
                {this.role === "STUDENT" ? this.renderInfoStudent() : this.renderInfoTeacher()}
            </div>
        );
    }

    renderRedirect() {
        let token = localStorage.getItem("token");
        if (!token) {
            return (<Redirect to='/login' />);
        }
        return;
    }

    renderInfoTeacher() {
        return (<div>
            <Header></Header>
            <span className="user-title">Thông tin Cá Nhân</span>
            <div className="w-75 m-auto">
                <div className="user-info">
                    <div className="user-image">
                        <img src={this.state.userInfo.avatar ? this.state.userInfo.avatar : "no-avatar.png"}></img>
                        <div className="mt-1">
                            <div>{this.state.userInfo.username}</div>
                        </div>
                    </div>
                    <div className="user-info-wrapper">
                        <div className="form-wrapper">
                            <span>Họ và tên</span>
                            <input className="form-control" type="text" name="display_name" onChange={(e) => this.handleChange(e)} value={this.state.userInfo.display_name}></input>
                        </div>
                        <div className="form-wrapper">
                            <span>Email</span>
                            <input className="form-control" type="text" name="email" onChange={(e) => this.handleChange(e)} value={this.state.userInfo.email}></input>
                        </div>
                        <div className="form-wrapper">
                            <span>Nơi ở</span>
                            <input className="form-control" type="text" name="address" onChange={(e) => this.handleChange(e)} value={this.state.userInfo.address}></input>
                        </div>
                        <div className="form-wrapper">
                            <span>Link avatar</span>
                            <input className="form-control" type="text" name="avatar" onChange={(e) => this.handleChange(e)} value={this.state.userInfo.avatar}></input>
                        </div>
                        <div className="form-wrapper">
                            <span>Kỹ năng</span>
                            <div className="form-control" >
                                {
                                    this.state.userInfo.skills && this.state.userInfo.skills.map(element => {
                                        return (
                                            <span class="skill">{element}</span>
                                        );
                                    })
                                }
                                <div align="right">
                                    <i className="fas fa-plus" style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => this.addSkill(e)}> </i>
                                </div>
                            </div>
                        </div>
                        <div style={{display: this.state.showAddSkill?"block" : "none"}}>
                            <div className="form-wrapper">
                                <span></span>
                                <input type="text" className="form-control" id="skill"></input>
                            </div>
                            <div align="right">
                            <button className="btn btn-primary mb-2" onClick={(e)=> this.btnAddSkill()}>Add skill</button>
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <span>Giới Thiệu</span>
                            <textarea className="form-control" name="description" onChange={(e) => this.handleChange(e)} value={this.state.userInfo.description}>

                            </textarea>
                        </div>
                        <button className="btn btn-primary" onClick={(e) => this.saveChanged(e)}>Lưu thay đổi</button>
                    </div>
                </div>

            </div>
        </div>);
    }

    renderInfoStudent() {
        return (<div>Student</div>);
    }

    handleChange(e) {
        let nameInput = e.target.getAttribute('name');
        let userInfo = this.state.userInfo;
        userInfo[nameInput] = e.target.value;
        this.setState({
            userInfo: userInfo
        });
    }

    saveChanged(e) {
        let userInfo = this.state.userInfo;
        console.log(userInfo);
        axios.post("http://localhost:3000/user/update", {
            ...userInfo
        }, {
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then((res) => {
            if (res.data.message === "Success")
                alert("Cập nhật thành công");
        })
    }

    addSkill(e) {
        let show = this.state.showAddSkill;
        this.setState({
            showAddSkill: !show
        });
    }

    btnAddSkill(e){
        let skill = $("#skill").val();
        let userInfo = this.state.userInfo;
        userInfo.skills.push(skill);
        this.setState({
            userInfo: userInfo,
            showAddSkill: false
        });
    }
}

export default UserInfo;