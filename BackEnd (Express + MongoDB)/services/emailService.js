const nodemailer = require("nodemailer");
require("dotenv").config();

// --- TEMPORARY DEBUG LOG ---
console.log("Email User:", process.env.EMAIL_USER);
console.log(
  "Email Pass (first 4 chars):",
  process.env.EMAIL_PASS
    ? process.env.EMAIL_PASS.substring(0, 4) + "..."
    : "NOT FOUND",
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendAccountEmail({
  email,
  firstName,
  lastName,
  role,
  username,
}) {
  const genderPrefix = "Mr./Ms."; // agar future me gender add karna ho to yahan logic laga dena

  const mailOptions = {
    from: `"Department of Computer Science Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Library Account Has Been Created",
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 20px;">
      
      <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
        
        <h2 style="color:#2c3e50; margin-bottom:20px;">
          Department of Computer Science Library
        </h2>

        <p style="font-size:15px; color:#333;">
          Dear ${genderPrefix} ${firstName} ${lastName},
        </p>

        <p style="font-size:15px; color:#333; line-height:1.6;">
          We are pleased to inform you that your <strong>${role}</strong> account has been 
          successfully created in the Library Management System.
        </p>

        <div style="background:#f8f9fa; padding:15px; border-radius:6px; margin:20px 0;">
          <p style="margin:0; font-size:14px;">
            <strong>Username:</strong> ${username}
          </p>
        </div>

        <p style="font-size:15px; color:#333;">
          You may now log in to the system and access your library dashboard and services.
        </p>

        <p style="font-size:15px; color:#333; margin-top:25px;">
          If you did not request this account, please contact the library administration immediately.
        </p>

        <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

        <p style="font-size:14px; color:#555;">
          Regards,<br/>
          <strong>Library Management Team</strong><br/>
          Department of Computer Science<br/>
          University of Peshawar
        </p>

        <p style="font-size:12px; color:#999; margin-top:25px;">
          This is an automated email. Please do not reply to this message.
        </p>

      </div>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
}
async function sendBookIssuedEmail({
  email,
  firstName,
  lastName,
  bookTitle,
  dueDate,
}) {
  await transporter.sendMail({
    from: `"Department of Computer Science Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Library Book Issued Confirmation",
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 20px;">
      
      <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
        
        <h2 style="color:#2c3e50; margin-bottom:20px;">
          Department of Computer Science Library
        </h2>

        <p style="font-size:15px; color:#333;">
          Dear ${firstName} ${lastName},
        </p>

        <p style="font-size:15px; color:#333; line-height:1.6;">
          This is to confirm that the following book has been successfully issued to your account.
        </p>

        <div style="background:#f8f9fa; padding:15px; border-radius:6px; margin:20px 0;">
          <p style="margin:6px 0; font-size:14px;">
            <strong>Book Title:</strong> ${bookTitle}
          </p>
          <p style="margin:6px 0; font-size:14px;">
            <strong>Due Date:</strong> ${dueDate.toDateString()}
          </p>
        </div>

        <p style="font-size:15px; color:#333;">
          Kindly ensure that the book is returned on or before the due date to avoid any late return penalties.
        </p>

        <p style="font-size:15px; color:#333; margin-top:25px;">
          For any queries, please contact the library administration.
        </p>

        <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

        <p style="font-size:14px; color:#555;">
          Regards,<br/>
          <strong>Library Management Team</strong><br/>
          Department of Computer Science<br/>
          University of Peshawar
        </p>

        <p style="font-size:12px; color:#999; margin-top:25px;">
          This is an automated notification. Please do not reply to this email.
        </p>

      </div>
    </div>
  `,
  });
}
async function sendBookReturnedEmail({
  email,
  firstName,
  lastName,
  bookTitle,
}) {
  await transporter.sendMail({
    from: `"Department of Computer Science Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Library Book Return Confirmation",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
          
          <h2 style="color:#2c3e50; margin-bottom:20px;">
            Department of Computer Science Library
          </h2>

          <p style="font-size:15px; color:#333;">
            Dear ${firstName} ${lastName},
          </p>

          <p style="font-size:15px; color:#333; line-height:1.6;">
            This email confirms that the following book has been successfully returned to the library.
          </p>

          <div style="background:#f8f9fa; padding:15px; border-radius:6px; margin:20px 0;">
            <p style="margin:6px 0; font-size:14px;">
              <strong>Book Title:</strong> ${bookTitle}
            </p>
          </div>

          <p style="font-size:15px; color:#333;">
            Thank you for using the Department of Computer Science Library services. We look forward to serving you again.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

          <p style="font-size:14px; color:#555;">
            Regards,<br/>
            <strong>Library Management Team</strong><br/>
            Department of Computer Science<br/>
            University of Peshawar
          </p>

          <p style="font-size:12px; color:#999; margin-top:25px;">
            This is an automated notification. Please do not reply to this email.
          </p>

        </div>
      </div>
    `,
  });
}
async function sendBookReservedEmail({
  email,
  firstName,
  lastName,
  bookTitle,
}) {
  await transporter.sendMail({
    from: `"Department of Computer Science Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Library Book Reservation Confirmation",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
          
          <h2 style="color:#2c3e50; margin-bottom:20px;">
            Department of Computer Science Library
          </h2>

          <p style="font-size:15px; color:#333;">
            Dear ${firstName} ${lastName},
          </p>

          <p style="font-size:15px; color:#333; line-height:1.6;">
            The following book is currently unavailable. However, it has been successfully reserved for your account.
          </p>

          <div style="background:#f8f9fa; padding:15px; border-radius:6px; margin:20px 0;">
            <p style="margin:6px 0; font-size:14px;">
              <strong>Book Title:</strong> ${bookTitle}
            </p>
          </div>

          <p style="font-size:15px; color:#333;">
            You will be notified automatically as soon as the book becomes available for issue.
          </p>

          <p style="font-size:15px; color:#333; margin-top:25px;">
            If you have any questions, please contact the library administration.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

          <p style="font-size:14px; color:#555;">
            Regards,<br/>
            <strong>Library Management Team</strong><br/>
            Department of Computer Science<br/>
            University of Peshawar
          </p>

          <p style="font-size:12px; color:#999; margin-top:25px;">
            This is an automated notification. Please do not reply to this email.
          </p>

        </div>
      </div>
    `,
  });
}
async function sendBookRequestUpdateEmail({
  email,
  firstName,
  lastName,
  bookTitle,
  status,
  adminNote,
}) {
  await transporter.sendMail({
    from: `"Department of Computer Science Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Book Request ${status.toUpperCase()} - Library Notification`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
          
          <h2 style="color:#2c3e50; margin-bottom:20px;">
            Department of Computer Science Library
          </h2>

          <p style="font-size:15px; color:#333;">
            Dear ${firstName} ${lastName},
          </p>

          <p style="font-size:15px; color:#333; line-height:1.6;">
            This is to inform you that your request for the following book has been 
            <strong style="text-transform: capitalize;">${status}</strong>.
          </p>

          <div style="background:#f8f9fa; padding:15px; border-radius:6px; margin:20px 0;">
            <p style="margin:6px 0; font-size:14px;">
              <strong>Book Title:</strong> ${bookTitle}
            </p>
            <p style="margin:6px 0; font-size:14px;">
              <strong>Admin Response:</strong> ${adminNote || "No additional note provided."}
            </p>
          </div>

          <p style="font-size:15px; color:#333;">
            For further assistance, please contact the library administration.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

          <p style="font-size:14px; color:#555;">
            Regards,<br/>
            <strong>Library Management Team</strong><br/>
            Department of Computer Science<br/>
            University of Peshawar
          </p>

          <p style="font-size:12px; color:#999; margin-top:25px;">
            This is an automated notification. Please do not reply to this email.
          </p>

        </div>
      </div>
    `,
  });
}
async function sendBookRequestSubmittedEmail({
  email,
  firstName,
  lastName,
  bookTitle,
}) {
  await transporter.sendMail({
    from: `"Department of Computer Science Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Library Book Request Received",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
          
          <h2 style="color:#2c3e50; margin-bottom:20px;">
            Department of Computer Science Library
          </h2>

          <p style="font-size:15px; color:#333;">
            Dear ${firstName} ${lastName},
          </p>

          <p style="font-size:15px; color:#333; line-height:1.6;">
            Your request for the following book has been successfully submitted and is currently under review.
          </p>

          <div style="background:#f8f9fa; padding:15px; border-radius:6px; margin:20px 0;">
            <p style="margin:6px 0; font-size:14px;">
              <strong>Book Title:</strong> ${bookTitle}
            </p>
          </div>

          <p style="font-size:15px; color:#333;">
            The library administration will review your request shortly. You will be notified once a decision has been made.
          </p>

          <p style="font-size:15px; color:#333; margin-top:25px;">
            If you have any questions, please contact the library administration.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

          <p style="font-size:14px; color:#555;">
            Regards,<br/>
            <strong>Library Management Team</strong><br/>
            Department of Computer Science<br/>
            University of Peshawar
          </p>

          <p style="font-size:12px; color:#999; margin-top:25px;">
            This is an automated notification. Please do not reply to this email.
          </p>

        </div>
      </div>
    `,
  });
}

module.exports = {
  transporter,
  sendAccountEmail,
  sendBookIssuedEmail,
  sendBookReturnedEmail,
  sendBookReservedEmail,
  sendBookRequestUpdateEmail,
  sendBookRequestSubmittedEmail,
};
