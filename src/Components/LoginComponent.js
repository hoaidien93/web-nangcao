import React from 'react';
import '../Assets/login.css';

class LoginComponent extends React.Component {
    render() {
        return (
            <div class="limiter">
                <div class="container-login100" >
                    <div class="wrap-login100">
                        <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" action="/login" method="POST">
                            <span class="login100-form-title">
                                Đăng nhập
                            </span>
                            <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                <input required class="input100" type="text" name="username" placeholder="Tên tài khoản" />
                                <span class="focus-input100"></span>
                            </div>
                            <div class="wrap-input100 validate-input" data-validate="Please enter password">
                                <input required class="input100" type="password" name="pass" placeholder="Mật khẩu" />
                                <span class="focus-input100"></span>
                            </div>
                            <div class="text-right p-t-13 p-b-23">
                               
                            </div>
                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn">
                                    Đăng nhập
						        </button>
                            </div>
                            <div class="flex-col-c p-t-50 p-b-20">
                                <span class="txt1 p-b-9">
                                    Bạn chưa có tài khoản ?
						        </span>
                                <a href="/register" class="txt3">
                                    Đăng ký
						        </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default LoginComponent;