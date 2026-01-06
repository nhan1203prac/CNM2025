const profile = {
    title: "Profile Information",
    subtitle: "Manage your profile information for account security.",
    avatar: {
      label: "Profile Picture",
      helper: "Max size 2MB. Formats: JPG, PNG.",
      btn_change: "Select Image",
      overlay_change: "CHANGE",
      processing: "Processing..."
    },
    form: {
      fullname: "Full Name",
      email: "Email (Fixed)",
      phone: "Phone Number",
      gender: "Gender",
      dob: "Date of Birth",
      btn_save: "Save Changes"
    },
    gender_options: {
      male: "Male",
      female: "Female",
      other: "Other"
    },
    toast: {
      file_too_large: "File too large! Please choose image under 2MB.",
      uploading: "Uploading image...",
      upload_success: "Image uploaded successfully!",
      upload_fail: "Image upload failed!",
      wait_upload: "Please wait for image upload to finish!",
      updating: "Updating profile...",
      update_success: "Profile updated successfully!",
      update_error: "Error updating data!"
    }
};

export default profile;