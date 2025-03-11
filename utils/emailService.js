import nodemailer from "nodemailer";

// Create a reusable email transport service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h2>Hello!</h2>
        <p>Thank you for registering with us. To complete your registration, please verify your email using the OTP code below:</p>
        <h3 style="color: #2d87f0;">${otp}</h3>
        <p>This OTP is valid for the next 10 minutes. If you didn't request this, please ignore this email.</p>
        <p>If you need any assistance, feel free to reach out to our support team.</p>
        <p>Best regards,<br>Your Company Name</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
};

export default sendOtpEmail;








