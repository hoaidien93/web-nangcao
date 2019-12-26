import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
import TagSkill from './TagSkill';
import MainMenu from './MainMenu';

class DetailTutor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                skills: []
            }
        }
        this.id = this.props.match.params.id || 1;
        this.token = localStorage.getItem("token");
        if (this.token) {

            axios.get(`http://localhost:8000/manager/view-detail?userId=${this.id}`, {
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then((res) => {
                this.setState({ userInfo: res.data.data });
            });
        }
    }


    render() {
        return (
            <div>
                <Header></Header>
                <MainMenu></MainMenu>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue" }}>Chi tiết gia sư</h3>
                    <div className="w-75 m-auto">
                        <div className="user-info">
                            <div className="user-image">
                                <img src={this.state.userInfo.avatar ? this.state.userInfo.avatar : "/no-avatar.png"}></img>
                                <div className="mt-1">
                                    <div>{this.state.userInfo.username}</div>
                                </div>
                            </div>
                            <div className="user-info-wrapper">
                                <div className="form-wrapper">
                                    <span>Họ và tên</span>
                                    <input className="form-control" type="text" name="display_name" readOnly value={this.state.userInfo.display_name}></input>
                                </div>
                                <div className="form-wrapper">
                                    <span>Email</span>
                                    <input className="form-control" type="text" name="email" readOnly value={this.state.userInfo.email}></input>
                                </div>
                                <div className="form-wrapper">
                                    <span>Giá</span>
                                    <input className="form-control" type="text" readOnly value={this.state.userInfo.hourly_wage + " $/1 giờ"}></input>
                                </div>
                                <div className="form-wrapper">
                                    <span>Nơi ở</span>
                                    <input className="form-control" type="text" name="address" readOnly value={this.state.userInfo.address}></input>
                                </div>
                                <div className="form-wrapper">
                                    <span>Kỹ năng</span>
                                    <div className="form-control" style={{
                                        height: "max-content",
                                        display: "flex"
                                    }}>
                                        {this.renderSkill(this.state.userInfo.skills)}
                                    </div>
                                </div>

                                <div className="form-wrapper">
                                    <span>Giới Thiệu</span>
                                    <textarea className="form-control" name="description" readOnly value={this.state.userInfo.description} style={{ height: "150px" }}>
                                    </textarea>
                                </div>

                                <button
                                style={{ marginBottom: "40px" }}
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModal">
                                    Thuê
                                </button>
                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Thông tin thuê</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body" style={{textAlign: 'left'}}>
                                                <div>Từ: </div>
                                                <input className="form-control" type="date" id="from-date"></input>
                                                <div>Đến: </div>
                                                <input className="form-control" type="date" id="to-date"></input>

                                                <div>Kĩ năng thuê: </div>
                                                <select id="skill" class="form-control">
                                                    {this.state.userInfo.skills.map((e,index)=>{
                                                        return(
                                                            <option  key={index} value={e.id}>{e.name}</option>
                                                        );
                                                    })}
                                                </select>
                                                <div>Tổng thời gian(giờ):</div>
                                                <input className="form-control" type="number" min="0" id="total"></input>
                                                <div>Ghi chú:</div>
                                                <textarea className="form-control" id="description"></textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={(e)=> this.handleRent(e)}>Thuê</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    renderSkill(listSkill) {
        return (
            <div>{listSkill.map((el, index) => {
                return (<TagSkill key={index} skill={el.name}></TagSkill>)
            })}
            </div>
        );

    }

    handleClick() {
        this.props.history.push('/detail-tutor');
    }

    handleRent(e) {

        let description = $("#description").val();
        let total = $("#total").val();
        let fromDate = $("#from-date").val();
        let toDate = $("#to-date").val();
        let skill = $("#skill").val();
        
        axios.post("http://localhost:8000/user/register-tutor",{
            "tutor_id": this.id,
            "number_hour": total,
            "skill": skill,
            "date_from": (new Date(fromDate)).getTime(),
            "date_to": (new Date(toDate)).getTime(),
            "description": description
        },{
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then(function(res){
            if(!res.data.code){
                alert("Thuê gia sư thành công");
                window.location.reload();
            }
            else alert("Thuê gia sư thất bại");
        })


    }
}

export default DetailTutor;