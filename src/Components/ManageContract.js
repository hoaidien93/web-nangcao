import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
import TagSkill from './TagSkill';
import MainMenu from './MainMenu';


class ManageContract extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listContract: []
        }
        this.token = localStorage.getItem("token");

        axios.get("http://localhost:8000/user/tutor-contract",{
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then((res) => {
            console.log(res.data.data);
            this.setState({
                listContract: res.data.data
            });
        });
    }


    render() {
        return (
            <div>
                <Header></Header>
                <MainMenu role="TUTOR"></MainMenu>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue" }}>Danh sách hợp đồng</h3>
                    <table className="table table-dark">
                        <thead>
                            <tr >
                                <th scope="col">STT</th>
                                <th scope="col">Học sinh</th>
                                <th scope="col">Kỹ năng</th>
                                <th scope="col">Từ ngày</th>
                                <th scope="col">Đến ngày</th>
                                <th scope="col">Thời gian thuê</th>
                                <th scope="col">Tổng số tiền</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.state.listContract.map((e,index)=>{
                               return(
                                   <tr key={index} style={{cursor: "pointer"}} onClick={()=> this.goToDetail(e.id)}>
                                       <th>{index + 1}</th>
                                        <th>{e.student}</th>
                                        <th><TagSkill skill={e.skill_name}></TagSkill></th>
                                        <th>{this.renderDate(e.date_from)}</th>
                                        <th>{this.renderDate(e.date_to)}</th>
                                        <th>{e.number_hour + " giờ"}</th>
                                        <th>{e.total + "$"}</th>
                                        <th>{this.renderStatus(e.status)}</th>
                                   </tr>
                               )
                           })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderSkill(listSkill){
        return(
            <div>{listSkill.map((el,index)=> {
                    return (<TagSkill key={index} skill={el.name}></TagSkill>)
                })}
            </div>
        );

    }

    handleClick(id){
        this.props.history.push(`/detail-tutor/${id}`);
    }

    renderStatus(status){
        let stt = "";
        if(status === 0) stt = "Đang chờ";
        if(status === 1) stt = "Đang học";
        if(status === 2) stt = "Đã hoàn thành";
        return(
            <div>
                {stt}
            </div>
        );
    }

    renderDate(longDate){
        let date = new Date(longDate);
        return(
            <div>
                {date.getDate()+"/"+ (date.getMonth() + 1) + "/" + date.getFullYear()}
            </div>
        )
    }

    goToDetail(index){
        this.props.history.push(`/detail-contract/${index}`);
    }
}

export default ManageContract;