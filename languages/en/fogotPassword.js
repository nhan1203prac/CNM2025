const fogotPassword = {
    step1: {
        title: "Forgot Password?",
        desc: "Enter your email to receive a recovery code",
        email_label: "Email",
        placeholder: "example@gmail.com",
        btn_continue: "Continue",
        btn_sending: "Sending..."
      },
      step2: {
        title: "Verify OTP",
        desc_prefix: "Code sent to",
        btn_verify: "Verify Code",
        btn_change_email: "Change Email",
        resend: {
          loading: "Sending...",
          btn: "Resend Code",
          wait_prefix: "Resend code in"
        }
      },
      step3: {
        title: "Reset Password",
        desc: "Please enter your new password",
        new_pass_label: "New Password",
        confirm_pass_label: "Confirm Password",
        btn_update: "Update Password",
        btn_processing: "Processing..."
      },
      back_to_login: "Back to Login",
      toast: {
        sent: "Verification code sent to your email",
        resent: "New code has been sent!",
        mismatch: "Confirm password does not match",
        success: "Password reset successfully!"
      }
};

export default fogotPassword;