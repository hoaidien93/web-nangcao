import React from 'react';
import '../Assets/login.css';
import $ from 'jquery';
import axios from 'axios';


class LoginComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100" >
                    <div className="wrap-login100">
                        <form className="login100-form validate-form p-l-55 p-r-55 p-t-178" action="/login" method="POST">
                            <span className="login100-form-title">
                                Đăng nhập
                            </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                <input required className="input100" type="text" name="username" id="username" placeholder="Username" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Please enter password">
                                <input required className="input100" type="password" name="pass" id="password" placeholder="Mật khẩu" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="text-right p-t-13 p-b-23">
                               
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={(e)=>this.handleLogin(e)}>
                                    Đăng nhập
						        </button>
                            </div>
                            <div className="flex-col-c p-t-50 p-b-20">
                                <span className="txt1 p-b-9">
                                    Bạn chưa có tài khoản ?
						        </span>
                                <a href="/register" className="txt3">
                                    Đăng ký
						        </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    handleLogin(e){
        e.preventDefault();
        
        let username = $("#username").val();
        let password = $("#password").val();
        
        axios.post("http://localhost:3000/login", {
            username: username,
            password: password
        }).then((res)=>{
            if(res.status === 200 && res.data.data){
                window.localStorage.setItem('token',res.data.data);
                alert("Dang nhap thanh cong");
                this.props.history.push('/');
            }
            else{
                alert("Đăng nhập thất bại");
            }
        })
    }
}

export default LoginComponent;