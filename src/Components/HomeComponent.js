import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.token = localStorage.getItem("token");
        if (this.token) {
            axios.get("http://localhost:3000/user/info",
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                }).then((res) => {
                    if (res.data.data) {
                        this.role = res.data.data.role.name;
                    }
                    else {
                        this.props.history.push('/login');
                    }
                });
        }
    }

    render() {
        return (
            <div className="homePage">
                {this.role !== "STUDENT" ?  this.renderHeaderTeacher() : this.renderHeaderStudent()}
            </div>
        );
    }


    renderHeaderStudent() {
        return (
            <div>
                <Header></Header>
                <div className="mainmenu-area">
                    <div className="container">
                        <div className="row">
                            <div className="w-100 h-100">
                                <ul className="nav navbar-nav d-flex" style={{ height: "53px", alignItems: "center" }}>
                                    <li className="home active"><a href="#">Trang Chủ</a></li>
                                    <li className="product"><a href="#">Khóa học của tôi</a></li>
                                    <li className="cart"><a href="#">Danh sách khóa học</a></li>
                                    <li className="checkout"><a href="/list-tutor">Danh sách gia sư</a></li>
                                    <li className="search"><a href="#">Tìm kiếm</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                    <div class="content">
                        <p class="topcontent"><span>100 </span>Tutor Online</p>
                        <p class="botcontent">Learn for every situation</p>
                        <p class="botcontent">Join today to get more knowledge</p>
                        <div align="center">
                            <a class="btn btn-primary" href="/register">Register Now</a>
                        </div>
                    </div>
                    <div>
                        <img src="book.png" style={{width: '350px'}}></img>
                    </div>
                </div>
            </div>
        );
    }

    renderHeaderTeacher() {
        return (
            <div>
                <Header></Header>
                <div className="mainmenu-area">
                    <div className="container">
                        <div className="row">
                            <div className="w-100 h-100">
                                <ul className="nav navbar-nav d-flex" style={{ height: "53px", alignItems: "center" }}>
                                    <li className="home active"><a href="#">Trang Chủ</a></li>
                                    <li className="product"><a href="#">Học sinh đang học</a></li>
                                    <li className="cart"><a href="#">Quản lý khóa học</a></li>
                                    <li className="checkout"><a href="/#">Thêm khóa học</a></li>
                                    <li className="search"><a href="#">Tìm kiếm</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                    <div class="content">
                        <p class="topcontent"><span>100 </span>Turtor Online</p>
                        <p class="botcontent">Learn for every situation</p>
                        <p class="botcontent">Join today to get more knowledge</p>
                        <div align="center">
                            <a class="btn btn-primary" href="/register">Register Now</a>
                        </div>
                    </div>
                    <div>
                        <img src="book.png" style={{width: '350px'}}></img>
                    </div>
                </div>
            </div>
        );
    }

}

export default HomeComponent;