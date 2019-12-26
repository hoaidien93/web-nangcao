import React from 'react';
import '../Assets/signup.css';
import $ from 'jquery';
import axios from 'axios';
class LearnRegisterComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <form method="POST" id="signup-form" className="signup-form" >
                        <h2 className="form-title" style={{color: 'green' , fontFamily: 'JosefinSans-Bold'}} >Tạo tài khoản</h2>
                        <div className="form-group">
                            <input type="text" required className="form-input" name="username" id="username" placeholder="Username" minLength="6" maxLength="50"/>
                        </div>
                        <div className="form-group">
                            <select className="form-input" name="role" id="role" placeholder="Vai trò">
                                <option value="1">Người học</option>
                                <option value="2">Người dạy</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" required className="form-input" name="name" id="name" placeholder="Họ và tên" minLength="6" maxLength="50"/>
                        </div>
                        <div className="form-group">
                            <input type="text" required className="form-input" name="phoneNumber" id="phoneNumber" placeholder="Số điện thoại" minLength="6" maxLength="50"/>
                        </div>
                        <div className="form-group">
                            <input type="email" required className="form-input" name="email" id="email" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" required minLength="6" className="form-input" name="password" id="password" placeholder="Mật khẩu"/>
                            <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                        </div>
                        <div className="form-group">
                            <input type="password" required minLength="6" className="form-input" name="re_password" id="re_password" placeholder="Nhập lại mật khẩu"/>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>Tôi đồng ý tất cả các  <a href="#" className="term-service">điều khoản dịch vụ</a></label>
                        </div>
                        <div className="form-group">
                            <input type="submit" name="submit" id="submit" className="form-submit" value="Đăng ký" onClick={(e)=>this.handleSubmit(e)}/>
                        </div>
                    </form>
                    <p className="loginhere">
                        Bạn đã có tài khoản ? <a href="/login" className="loginhere-link">Đăng nhập</a>
                    </p>
                </div>
            </div>
        </section>
        );
    }

    handleSubmit(e){
        e.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let phoneNumber = $('#phoneNumber').val();
        let username = $('#username').val();
        let role = $("#role").val();
        let data = {
            "display_name": name,
            "email": email,
            "password": password,
            "phone": phoneNumber,
            "username": username,
            "role_id" : role
        };
        axios.post("http://localhost:8000/user/register",data).then((res) => {
            if(!res.data.code){
                alert("Đăng ký thành công");
                this.props.history.push('/login');
            }
            else{
                alert("Đăng ký thất bại");
            }
        })
       
            
    }
}

export default LearnRegisterComponent;