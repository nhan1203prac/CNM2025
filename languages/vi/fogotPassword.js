const forgotPassword = {
    step1: {
        title: "Quên mật khẩu?",
        desc: "Nhập email của bạn để nhận mã khôi phục",
        email_label: "Email",
        placeholder: "example@gmail.com",
        btn_continue: "Tiếp tục",
        btn_sending: "Đang gửi..."
      },
      step2: {
        title: "Xác thực OTP",
        desc_prefix: "Mã đã được gửi tới",
        btn_verify: "Xác nhận mã",
        btn_change_email: "Thay đổi email",
        resend: {
          loading: "Đang gửi...",
          btn: "Gửi lại mã",
          wait_prefix: "Gửi lại mã sau"
        }
      },
      step3: {
        title: "Đặt lại mật khẩu",
        desc: "Vui lòng nhập mật khẩu mới",
        new_pass_label: "Mật khẩu mới",
        confirm_pass_label: "Xác nhận mật khẩu",
        btn_update: "Cập nhật mật khẩu",
        btn_processing: "Đang xử lý..."
      },
      back_to_login: "Quay lại đăng nhập",
      toast: {
        sent: "Mã xác thực đã được gửi tới email của bạn",
        resent: "Mã mới đã được gửi!",
        mismatch: "Mật khẩu xác nhận không khớp",
        success: "Đặt lại mật khẩu thành công!"
      }
};

export default forgotPassword;