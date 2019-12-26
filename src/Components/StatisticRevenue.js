import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
import TagSkill from './TagSkill';
import MainMenu from './MainMenu';


class StatisticRevenue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0
        }
        this.token = localStorage.getItem("token");
    }


    render() {
        return (
            <div>
                <Header></Header>
                <MainMenu role="TUTOR"></MainMenu>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px", textAlign: "left" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue", textAlign: "center" }}>Thống kê doanh thu</h3>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="w-50">
                            <span>
                                Từ ngày:
                            </span>
                            <input className="form-control mb-3" type="date" id="fromDate"></input>
                            <span>
                                Đến ngày:
                            </span>
                            <input className="form-control mb-3" type="date" id="toDate"></input>
                            <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Lọc</button>
                        </div>
                        <div style={{width: "35%"}}>
                            <span>Tổng số tiền:</span>
                            <div class="form-control">{this.state.total + " $"}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleSubmit(e) {
        let fromDate = $("#fromDate").val();
        let toDate = $("#toDate").val();

        axios.post("http://localhost:8000/user/statistic-revenue", {
            "date_from": (new Date(fromDate)).getTime(),
            "date_to": (new Date(toDate)).getTime()
        }, {
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then((res) => {
            this.setState({
                total : res.data.data.total
            });
        })
    }
}

export default StatisticRevenue;