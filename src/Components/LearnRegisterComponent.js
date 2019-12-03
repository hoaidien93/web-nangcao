import React from 'react';
import '../Assets/signup.css';

class LearnRegisterComponent extends React.Component {
    render() {
        return (
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form" >
                        <h2 class="form-title" style={{color: 'green' , fontFamily: 'JosefinSans-Bold'}} >Tạo tài khoản</h2>
                        <div class="form-group">
                            <input type="text" required class="form-input" name="name" id="name" placeholder="Họ và tên" minlength="6" maxlength="50"/>
                        </div>
                        <div class="form-group">
                            <input type="text" required class="form-input" name="phoneNumber" id="phoneNumber" placeholder="Số điện thoại" minlength="6" maxlength="50"/>
                        </div>
                        <div class="form-group">
                            <input type="email" required class="form-input" name="email" id="email" placeholder="Email"/>
                        </div>
                        <div class="form-group">
                            <input type="password" required minlength="6" class="form-input" name="password" id="password" placeholder="Mật khẩu"/>
                            <span toggle="#password" class="zmdi zmdi-eye field-icon toggle-password"></span>
                        </div>
                        <div class="form-group">
                            <input type="password" required minlength="6" class="form-input" name="re_password" id="re_password" placeholder="Nhập lại mật khẩu"/>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                            <label for="agree-term" class="label-agree-term"><span><span></span></span>Tôi đồng ý tất cả các  <a href="#" class="term-service">điều khoản dịch vụ</a></label>
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" id="submit" class="form-submit" value="Đăng ký"/>
                        </div>
                    </form>
                    <p class="loginhere">
                        Bạn đã có tài khoản ? <a href="/login" class="loginhere-link">Đăng nhập</a>
                    </p>
                </div>
            </div>
        </section>
        );
    }
}

export default LearnRegisterComponent;