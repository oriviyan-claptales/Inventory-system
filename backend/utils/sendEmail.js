// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     // 🔍 Debug: env variables check
//     if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
//       throw new Error("EMAIL or EMAIL_PASSWORD missing in .env");
//     }

//     // 📬 Transporter
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true = 465, false = 587
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD, // Gmail App Password
//       },
//     });

//     // 🧪 Verify SMTP connection (very important)
//     await transporter.verify();

//     // ✉️ Send mail
//     const info = await transporter.sendMail({
//       from: `"Auth App" <${process.env.EMAIL}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent:", info.messageId);
//     return true;

//   } catch (error) {
//     console.error("❌ Email send failed:", error.message);
//     throw error; // controller ko error milega
//   }
// };

// export default sendEmail;









// code for real deploy


// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
//       throw new Error("EMAIL or EMAIL_PASSWORD missing");
//     }

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,              // 🔥 465 only (Render friendly)
//       secure: true,          // MUST true
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     // ❌ Render pe verify mat karo (ye hi hang hota hai)
//     // await transporter.verify();

//     // 🔥 10s timeout safety (warna login hang)
//     const sendPromise = transporter.sendMail({
//       from: `"Oriviyan Inventory" <${process.env.EMAIL}>`,
//       to,
//       subject,
//       html,
//     });

//     await Promise.race([
//       sendPromise,
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("SMTP timeout")), 10000)
//       )
//     ]);

//     console.log("✅ OTP email sent");
//     return true;

//   } catch (error) {
//     console.error("❌ Email error:", error.message);
//     throw new Error("Email sending failed");
//   }
// };

// export default sendEmail;

















import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Oriviyan Inventory <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", data.id);
    return true;
  } catch (error) {
    console.error("Resend error:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
