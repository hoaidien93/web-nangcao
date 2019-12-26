import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
import TagSkill from './TagSkill';
import MainMenu from './MainMenu';
import ChatComponent from './ChatComponent';

class DetailContract extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                skills: []
            }
        }
        this.id = this.props.match.params.id || 1;
        this.token = localStorage.getItem("token");
        this.role = localStorage.getItem("role");
        if (this.token) {
            axios.get(`http://localhost:8000/user/detail-contract?contract_id=${this.id}`, {
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then((res) => {
                this.setState({ userInfo: res.data.data });
                if(this.role === "STUDENT")
                    localStorage.setItem("patternId", res.data.data.tutor_id);
                else
                {
                    console.log(res.data.data.student_id);
                    localStorage.setItem("patternId", res.data.data.student_id);
                }
            });
        }
    }


    render() {
        return (
            <div>
                {this.role === "STUDENT" ? this.renderContractStudent() : this.renderContractTeacher()}
            </div>
        );
    }

    renderStatus(status) {
        let stt = "";
        if (status === 0) stt = "Đang chờ";
        if (status === 1) stt = "Đang học";
        if (status === 2) stt = "Đã hoàn thành";
        return (
            <div>
                {stt}
            </div>
        );
    }

    renderDate(longDate) {
        let date = new Date(longDate);
        return (
            <div>
                {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
            </div>
        )
    }

    renderBtn(status) {
        if (status === 0) return (<button
            style={{ marginBottom: "40px" }}
            type="button"
            className="btn btn-primary"
            onClick={(e) => this.handlePay()}
        >
            Thanh toán
        </button>);
        return (
            <div>
                <button
                    style={{ marginBottom: "40px" }}
                    type="button"
                    className="btn btn-info"
                    data-toggle="modal"
                    data-target="#exampleModal">
                    Gởi phản hồi
            </button>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thông tin phản hồi</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ textAlign: 'left' }}>
                                <div>Đánh giá: </div>
                                <select id="type" className="form-control">
                                    <option value="-1">Phàn nàn</option>
                                    <option value="0">Góp ý</option>
                                    <option value="1">Phản hồi tốt</option>
                                </select>
                                <div>Ghi chú:</div>
                                <textarea className="form-control" id="description"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={(e) => this.handleRate(e)}>Đánh giá</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handlePay() {
        let pay = window.confirm("Bạn có chắc chắn thanh toán");
        if (pay) {
            axios.get(`http://localhost:8000/user/pay?contract_id=${this.id}`, {
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then((res) => {
                console.log(res);
                if (!res.data.code) {
                    alert("Thanh toán gia sư thành công");
                    window.location.reload();
                }
            });
        }
    }

    handleRate() {
        let description = $("#description").val();
        let type = $("#type").val();

        axios.post("http://localhost:8000/user/add-feedback", {
            "contract_id": this.id,
            "type": type,
            "description": description
        }, {
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then(function (res) {
            if (!res.data.code) {
                alert("Thêm đánh giá thành công");
                window.location.reload();
            }
            else alert("Thêm đánh giá thất bại");
        })
    }

    renderContractTeacher() {
        return (
            <div>
                <Header></Header>
                <MainMenu></MainMenu>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue" }}>Chi tiết hợp đồng</h3>
                    <div className="w-75 m-auto">
                        <div className="contract-table">
                            <span> Tên học sinh: </span>
                            <input className="form-control" readOnly value={this.state.userInfo.student_name} />
                        </div>
                        <div className="contract-table">
                            <span>Kỹ năng: </span>
                            <div className="form-control" style={{
                                height: "max-content",
                                display: "flex",
                                position: "relative"
                            }}>
                                <TagSkill skill={this.state.userInfo.skill}></TagSkill>
                            </div>
                        </div>
                        <div className="contract-table">
                            <span>Từ ngày: </span>
                            <div className="form-control ta-left">
                                {this.renderDate(this.state.userInfo.date_from)}
                            </div>
                        </div>
                        <div className="contract-table">
                            <span>Đến ngày: </span>
                            <div className="form-control ta-left">
                                {this.renderDate(this.state.userInfo.date_to)}
                            </div>
                        </div>
                        <div className="contract-table">
                            <span>Thời gian thuê: </span>
                            <input className="form-control" readOnly value={this.state.userInfo.number_hour} />
                        </div>
                        <div className="contract-table">
                            <span>Tổng tiền: </span>
                            <input className="form-control" readOnly value={this.state.userInfo.total + " $"} />
                        </div>
                        <div className="contract-table">
                            <span>Trang thái: </span>
                            <div className="form-control ta-left">
                                {this.renderStatus(this.state.userInfo.status)}
                            </div>
                        </div>
                    </div>

                </div>
                <ChatComponent></ChatComponent>
            </div>
        )
    }

    renderContractStudent() {
        return (
            <div>
                <Header></Header>
                <MainMenu></MainMenu>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue" }}>Chi tiết hợp đồng</h3>
                    <div className="w-75 m-auto">
                        <div className="contract-table">
                            <span> Tên gia sư: </span>
                            <input className="form-control" readOnly value={this.state.userInfo.tutor_name} />
                        </div>
                        <div className="contract-table">
                            <span>Kỹ năng: </span>
                            <div className="form-control" style={{
                                height: "max-content",
                                display: "flex",
                                position: "relative"
                            }}>
                                <TagSkill skill={this.state.userInfo.skill}></TagSkill>
                            </div>
                        </div>
                        <div className="contract-table">
                            <span>Từ ngày: </span>
                            <div className="form-control ta-left">
                                {this.renderDate(this.state.userInfo.date_from)}
                            </div>
                        </div>
                        <div className="contract-table">
                            <span>Đến ngày: </span>
                            <div className="form-control ta-left">
                                {this.renderDate(this.state.userInfo.date_to)}
                            </div>
                        </div>
                        <div className="contract-table">
                            <span>Thời gian thuê: </span>
                            <input className="form-control" readOnly value={this.state.userInfo.number_hour} />
                        </div>
                        <div className="contract-table">
                            <span>Tổng tiền: </span>
                            <input className="form-control" readOnly value={this.state.userInfo.total + " $"} />
                        </div>
                        <div className="contract-table">
                            <span>Trang thái: </span>
                            <div className="form-control ta-left">
                                {this.renderStatus(this.state.userInfo.status)}
                            </div>
                        </div>
                        {this.renderBtn(this.state.userInfo.status)}
                    </div>

                </div>
                <ChatComponent></ChatComponent>
            </div>
        );
    }
}

export default DetailContract;