import React from 'react';
class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.token = localStorage.getItem("token");

    }

    render() {
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
                                        <li><a href="/user-info"><i className="fa fa-user"></i> Tài khoản của tôi</a></li>
                                        <li><a href="#" onClick={(e) => this.handleLogout(e)}><i className="fa fa-user"></i> Đăng xuất</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-branding-area">
                    <div className="container-fluid">
                        <div className="row logo-container">
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
            </div>
        );
    }

    handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/login';
    }

    renderLogin() {
        if (this.token) {
            return (
                <ul>
                    <li><a href="/user-info"><i className="fa fa-user"></i> Tài khoản của tôi</a></li>
                    <li><a href="#" onClick={(e) => this.handleLogout(e)}><i className="fa fa-user"></i> Đăng xuất</a></li>
                </ul>
            );
        }
        return (
            <ul>
                <li><a href="/user-info"><i className="fa fa-user"></i> Đăng nhập</a></li>
            </ul>
        );
    }
}

export default HeaderComponent;