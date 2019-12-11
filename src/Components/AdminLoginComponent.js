import React from 'react';
import '../Assets/sb-admin.min.css';
import Request from '../API/Request';
import $ from 'jquery';

class AdminLoginComponent extends React.Component {
    render() {
        return (
            <div className="container h-100 pt-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src="loginlogo.jpg" className="brand_logo" alt="Logo" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form method="POST" action="/login">
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="email" id="email" className="form-control input_user"  placeholder="Email" required />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" name="password" id="password" className="form-control input_pass"  required placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                        <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <input type="submit" name="Login" className="btn login_btn" value="Login" onClick={(e) => this.handleLogin(e)}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleLogin(e){
        e.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
        let request = new Request();
        request.sendAPI('login-admin',{
            email: email,
            password: password,
        },(res)=>{
            if(res.status === 200){
                window.localStorage.setItem('email',email);
                window.localStorage.setItem('token',res.token);
                window.localStorage.setItem('role',res.role);
                this.props.history.push('/');
            }
            else{
                alert("Đăng nhập thất bại");
            }
        });
    }


}

export default AdminLoginComponent;