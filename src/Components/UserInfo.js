import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import axios from 'axios';

import $ from 'jquery';
import TagSkill from "./TagSkill";
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                skills: []
            },
            showAddSkill: false,
            listSkill: []
        };
        this.token = localStorage.getItem("token");
        this.role = localStorage.getItem("role");
        if (this.token) {
            axios.get("http://localhost:8000/user/info",
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                }).then((res) => {
                    if (res.data.data) {
                        this.setState({
                            userInfo: res.data.data
                        })
                    }
                    else {
                        this.props.history.push('/login');
                    }
                });

                axios.post("http://localhost:8000/user/list-skill").then((res)=>{
                    this.setState({
                        listSkill: res.data.data
                    })
                })
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
                            <div className="form-control" style={{
                                height: "max-content",
                                display: "flex",
                                position: "relative"
                            }}>
                                {this.renderSkill(this.state.userInfo.skills)}
                                <div style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "10px"
                                }}>
                                    <i className="fas fa-plus" style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => this.addSkill(e)}> </i>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: this.state.showAddSkill ? "block" : "none" }}>
                            <div className="form-wrapper">
                                <span></span>
                                <select name="skill" className="form-control" id="skill">
                                    {this.state.listSkill.map((e,index)=>{
                                        return(
                                            <option key={index} value={e.id}>{e.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div align="right">
                                <button className="btn btn-primary mb-2" onClick={(e) => this.btnAddSkill()}>Add skill</button>
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
                       
                        <div style={{ display: this.state.showAddSkill ? "block" : "none" }}>
                            <div className="form-wrapper">
                                <span></span>
                                <select name="skill" className="form-control" id="skill">
                                    {this.state.listSkill.map((e,index)=>{
                                        return(
                                            <option key={index} value={e.id}>{e.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div align="right">
                                <button className="btn btn-primary mb-2" onClick={(e) => this.btnAddSkill()}>Add skill</button>
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
        axios.post("http://localhost:8000/user/update", {
            ...userInfo
        }, {
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then((res) => {
            if (!res.data.code)
                alert("Cập nhật thành công");
        })
    }

    addSkill(e) {
        let show = this.state.showAddSkill;
        this.setState({
            showAddSkill: !show
        });
    }

    renderSkill(listSkill) {
        return (
            <div style={{display: "flex",flexWrap: "wrap"}}>{listSkill.map((el, index) => {
                return (<TagSkill key={index} skill={el.name}></TagSkill>)
            })}
            </div>
        );

    }

    btnAddSkill(e) {
        let skill = $("#skill").val();
        this.setState({
            showAddSkill: false
        });

        axios.post("http://localhost:8000/user/add-skill",{
            "skill_ids": [skill]
        },{
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then(function(res){
            window.location.reload();
        })
    }
}

export default UserInfo;