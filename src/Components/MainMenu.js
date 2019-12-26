import React from 'react';
import '../Assets/login.css';
import $ from 'jquery';
import axios from 'axios';


class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mainmenu-area">
                <div className="container">
                    <div className="row">
                        <div className="w-100 h-100">
                            <ul className="nav navbar-nav d-flex" style={{ height: "53px", alignItems: "center" }}>
                                <li className="home active"><a href="/">Trang Chủ</a></li>
                                <li className="product"><a href="/student-contract">Khóa học của tôi</a></li>
                                <li className="cart"><a href="#">Danh sách khóa học</a></li>
                                <li className="checkout"><a href="/list-tutor">Danh sách gia sư</a></li>
                                <li className="search"><a href="#">Tìm kiếm</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;