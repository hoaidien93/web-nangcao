import React from 'react';
import '../Assets/login.css';
import $ from 'jquery';
import axios from 'axios';


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100" >
                    <div className="wrap-login100">
                        <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                            <span className="login100-form-title">
                                Quên mật khẩu
                            </span>
                            <div className="wrap-input100 validate-input m-b-16">
                                <input required className="input100" type="email" name="email" id="email" placeholder="Email" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="text-right p-t-13 p-b-23">

                            </div>
                            <div className="container-login100-form-btn mb-5">
                                <button className="login100-form-btn" onClick={(e) => this.handleLogin(e)}>
                                    Lấy lại mật khẩu
						        </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }

    handleLogin(e) {
        e.preventDefault();
        let email = $("#email").val();
        axios.get(`http://localhost:8000/user/reset-password?email=${email}`).then((res)=>{
            if(!res.data.code){
                alert("Reset mật khẩu thành công");
                this.props.history.push('/login');
            }
            else alert("Reset mật khẩu thất bại");

        });
    }
}

export default ForgotPassword;