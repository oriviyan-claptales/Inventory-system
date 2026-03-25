// import sendEmail from "./sendEmail.js";

// export const sendLowStockMail = async (product) => {
//   await sendEmail({
//     to: process.env.ADMIN_EMAIL, // admin ko jayega
//     subject: `⚠ Low Stock Alert - ${product.name}`,
//     html: `
//       <h2>⚠ Inventory Low Stock Alert</h2>

//       <p><b>Product:</b> ${product.name}</p>
//       <p><b>SKU:</b> ${product.sku}</p>
//       <p><b>Remaining Qty:</b> ${product.Qty}</p>

//       <p style="color:red;font-weight:bold;">
//         Please restock immediately.
//       </p>
//     `,
//   });
// };















import sendEmail from "./sendEmail.js";

export const sendLowStockMail = async (product) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `⚠ Low Stock Alert - ${product.name}`,

    html: `
    <div style="
      font-family: Arial, sans-serif;
      background:#f4f6f8;
      padding:40px 0;
    ">
      <div style="
        max-width:600px;
        margin:auto;
        background:#ffffff;
        border-radius:10px;
        box-shadow:0 5px 20px rgba(0,0,0,0.08);
        overflow:hidden;
      ">

        <!-- Header -->
        <div style="
          background:#ff4d4f;
          padding:20px;
          text-align:center;
          color:#ffffff;
        ">
          <h2 style="margin:0;">⚠ Low Stock Alert</h2>
        </div>

        <!-- Body -->
        <div style="padding:30px; color:#333;">
          <p style="font-size:15px;">
            Hello Admin,
          </p>

          <p style="font-size:14px;">
            The following product inventory is running low. Please restock it as soon as possible.
          </p>

          <!-- Product Details Table -->
          <table style="
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
            font-size:14px;
          ">
            <tr>
              <td style="padding:10px; background:#f2f2f2;"><b>Product Name</b></td>
              <td style="padding:10px;">${product.name}</td>
            </tr>
            <tr>
              <td style="padding:10px; background:#f2f2f2;"><b>SKU</b></td>
              <td style="padding:10px;">${product.sku}</td>
            </tr>
            <tr>
              <td style="padding:10px; background:#f2f2f2;"><b>Remaining Quantity</b></td>
              <td style="padding:10px; color:#ff4d4f; font-weight:bold;">
                ${product.Qty}
              </td>
            </tr>
          </table>

          <!-- Warning Box -->
          <div style="
            margin-top:25px;
            padding:15px;
            background:#fff1f0;
            border-left:5px solid #ff4d4f;
            font-size:13px;
          ">
            ⚠ Immediate action required to avoid stock-out.
          </div>
        </div>

        <!-- Footer -->
        <div style="
          background:#fafafa;
          text-align:center;
          padding:15px;
          font-size:12px;
          color:#888;
        ">
          This is an automated alert from your Inventory System<br/>
          © ${new Date().getFullYear()} Oriviyan Pvt
        </div>

      </div>
    </div>
    `,
  });
};
