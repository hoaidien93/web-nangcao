import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
import TagSkill from './TagSkill';
import MainMenu from './MainMenu';


class ListTuTor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listTutor: []
        }

        axios.post("http://localhost:8000/list-tutor",{
            "keyword":"",
            "order_by":"ASC"
        }).then((res) => {
            console.log(res);
            this.setState({
                listTutor: res.data.data.users
            });
        });
    }


    render() {
        return (
            <div>
                <Header></Header>
                <MainMenu></MainMenu>
                <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
                    <h3 style={{ marginBottom: "20px", color: "blue" }}>Danh sách gia sư</h3>
                    <table className="table table-dark">
                        <thead>
                            <tr >
                                <th scope="col">STT</th>
                                <th scope="col">Họ và Tên</th>
                                <th scope="col">SĐT</th>
                                <th scope="col" style={{"maxWidth": "200px"}}>Email</th>
                                <th scope="col">Tag Skill</th>
                                <th scope="col">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listTutor.map((element,index) => {
                                    return (
                                        <tr key={index} style={{cursor: "pointer"}} onClick={(e) => this.handleClick(element.id)}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{element.display_name}</td>
                                            <td>{element.phone}</td>
                                            <td  style={{"maxWidth": "200px"}}>{element.email}</td>
                                            <td style={{width: "350px"}}>{this.renderSkill(element.skills)}</td>
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

    renderSkill(listSkill){
        return(
            <div style={{display: "flex",flexWrap: "wrap"}}>{listSkill.map((el,index)=> {
                    return (<TagSkill key={index} skill={el.name}></TagSkill>)
                })}
            </div>
        );

    }

    handleClick(id){
        this.props.history.push(`/detail-tutor/${id}`);
    }
}

export default ListTuTor;