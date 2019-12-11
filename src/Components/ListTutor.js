import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';

class ListTuTor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listTuTor: []
        }

        axios.post("http://localhost:3000/list-tutor",{
            "keyword":"",
            "order_by":"ASC"
        }).then((res) => {
            this.setState({
                listTuTor: res.data.data
            });
            console.log(this.state.listTuTor);
        });
    }


    render() {
        return (
            <div>
                <Header></Header>
                <div className="mainmenu-area">
                    <div className="container">
                        <div className="row">
                            <div className="w-100 h-100">
                                <ul className="nav navbar-nav d-flex" style={{ height: "53px", alignItems: "center" }}>
                                    <li className="home active"><a href="/">Trang Chủ</a></li>
                                    <li className="product"><a href="#">Khóa học của tôi</a></li>
                                    <li className="cart"><a href="#">Danh sách khóa học</a></li>
                                    <li className="checkout"><a href="/#">Danh sách gia sư</a></li>
                                    <li className="search"><a href="#">Tìm kiếm</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue" }}>Danh sách gia sư</h3>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ và Tên</th>
                                <th scope="col">SĐT</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tag Skill</th>
                                <th scope="col">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listTuTor.map((element,index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{element.display_name}</td>
                                            <td>{element.phone}</td>
                                            <td>{element.email}</td>
                                            <td>@skill</td>
                                            <td className="description">{element.description}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListTuTor;