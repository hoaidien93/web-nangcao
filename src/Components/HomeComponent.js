import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
class HomeComponent extends React.Component {
    constructor(props){
        super(props);
        this.role = localStorage.getItem("role");

    }

    render() {
        return (
            <div className="homePage">
                {this.renderRedirect()}
                {this.role === "student " ? this.renderHeaderStudent() : this.renderHeaderTeacher()}
            </div>
        );
    }
    renderRedirect() {
        let email = localStorage.getItem("email");
        if (!email) {
            return (<Redirect to='/login' />);
        }
        return;
    }
    renderHeaderStudent() {
        return (
            <div>
                <div className="header-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            
                        </div>

                        <div className="col-md-4">
                        <div className="user-menu">
                                <ul>
                                    <li><a href="#o"><i className="fa fa-user"></i> Tài khoản của tôi</a></li>
                                    <li><a href="#"><i className="fa fa-user"></i> Đăng xuất</a></li>
                                </ul>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
                <div className="site-branding-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 m-0 p-0">
                            <div className="logo">
                                <h1><a href="/">My React Site</a></h1>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="shopping-item">
                                <a href="#">Mua Khóa Học<i className="fa fa-shopping-cart"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="mainmenu-area">
                <div className="container">
                    <div className="row">
                        <div className="w-100 h-100">
                            <ul className="nav navbar-nav d-flex">
                                <li className="home active"><a href="#">Trang Chủ</a></li>
                                <li className="product"><a href="#">Khóa học của tôi</a></li>
                                <li className="cart"><a href="#">Danh sách khóa học</a></li>
                                <li className="checkout"><a href="/#">Danh sách gia sư</a></li>
                                <li className="search"><a href="#">Tìm kiếm</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
            </div>
        );
    }

    renderHeaderTeacher(){
        return (
            <div>
                <div className="header-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                        </div>

                        <div className="col-md-4">
                        <div className="user-menu">
                                <ul>
                                    <li><a href="/update-info"><i className="fa fa-user"></i> Tài khoản của tôi</a></li>
                                    <li><a href="/logout"><i className="fa fa-user"></i> Đăng xuất</a></li>
                                </ul>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
                <div className="site-branding-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 m-0 p-0">
                            <div className="logo">
                                <h1><a href="/">My React Site</a></h1>
                            </div>
                        </div>

                        <div className="col-sm-6">
                        </div>
                    </div>
                </div>
            </div>
                <div className="mainmenu-area">
                <div className="container">
                    <div className="row">
                        <div className="w-100 h-100">
                            <ul className="nav navbar-nav d-flex">
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
            </div>
        );
    }
}

export default HomeComponent;