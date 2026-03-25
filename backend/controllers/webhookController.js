// // import Sale from "../models/Sale.js";
// // import Product from "../models/Product.js";

// // export const createShopifyOrder = async (req, res) => {
// //   try {
// //     const orderData = req.body; // Shopify se jo order aaya

// //     // 1. Duplicate Check (Taki ek hi order ka stock do baar minus na ho)
// //     const existingSale = await Sale.findOne({ shopifyOrderId: orderData.id });
// //     if (existingSale) {
// //       console.log("Order pehle hi process ho chuka hai.");
// //       return res.status(200).send("Already processed"); // Shopify ko 200 dena zaroori hai
// //     }

// //     const lineItems = orderData.line_items; // Order ke andar ke items

// //     // 2. Har item ke liye loop chalao
// //     for (let item of lineItems) {
// //       if (!item.sku) continue; // Agar kisi item me SKU nahi hai toh ignore karo

// //       // Product find karo DB se exact usi SKU se
// //       const product = await Product.findOne({ sku: item.sku });

// //       if (product) {
// //         // 3. Calculation Logic
// //         const sellingPrice = parseFloat(item.price);
// //         const quantity = item.quantity;
// //         const totalAmount = sellingPrice * quantity;
        
// //         const costPricePerUnit = product.costing_price || 0;
// //         const totalCostPrice = costPricePerUnit * quantity;
// //         const profit = totalAmount - totalCostPrice;

// //         // 4. Sale ki Auto-Entry banao
// //         const newSale = new Sale({
// //           shopifyOrderId: orderData.id,
// //           sku: item.sku,
// //           productName: product.name,
// //           category: product.category,
// //           quantity: quantity,
// //           sellingPrice: sellingPrice,
// //           totalAmount: totalAmount,
// //           costPrice: totalCostPrice,
// //           profit: profit,
// //           shop: product.shop || "Shopify" 
// //         });
// //         await newSale.save(); // Sale DB me save

// //         // 5. Product ka Stock (Qty) minus karo
// //         product.Qty = product.Qty - quantity;
// //         await product.save(); // Stock update DB me save
        
// //         console.log(`✅ SKU: ${item.sku} ki sale record ho gayi aur stock update ho gaya!`);
// //       } else {
// //         console.log(`⚠️ SKU: ${item.sku} system mein nahi mila.`);
// //       }
// //     }

// //     // 6. Sab successful hone ke baad Shopify ko OK message bhejo
// //     res.status(200).send("Webhook processed successfully");

// //   } catch (error) {
// //     console.error("Webhook Error: ", error);
// //     res.status(500).send("Server Error");
// //   }
// // };



























// import Sale from "../models/Sale.js";
// import Product from "../models/Product.js";

// // 👉 APNI COMPANY KA STATE YAHAN DAAL
// // Agar 'Haryana' se bahar ship hoga toh IGST lagega, warna CGST/SGST.
// const ORIGIN_STATE = "Haryana"; 

// export const createShopifyOrder = async (req, res) => {
//   try {
//     const orderData = req.body;

//     // 1. Duplicate Check
//     const existingSale = await Sale.findOne({ shopifyOrderId: String(orderData.id) });
//     if (existingSale) {
//       console.log("Order pehle hi process ho chuka hai.");
//       return res.status(200).send("Already processed");
//     }

//     // 2. Extract General Order Info
//     const orderNumber = orderData.name; // Gives #1024
//     const paymentMethod = orderData.gateway || orderData.financial_status; 
//     const customerName = orderData.customer ? `${orderData.customer.first_name} ${orderData.customer.last_name}` : "Guest";
    
//     // Addresses
//     const billingAddress = orderData.billing_address || {};
//     const shippingAddress = orderData.shipping_address || {};

//     const lineItems = orderData.line_items;

//     // 3. Process Each Toy/Item in the Order
//     for (let item of lineItems) {
//       if (!item.sku) continue;

//       const product = await Product.findOne({ sku: item.sku });

//       if (product) {
//         // Basic Pricing
//         const sellingPrice = parseFloat(item.price);
//         const quantity = item.quantity;
//         const totalAmount = sellingPrice * quantity;
        
//         const costPricePerUnit = product.costing_price || 0;
//         const totalCostPrice = costPricePerUnit * quantity;
//         const profit = totalAmount - totalCostPrice;

//         // --- 🟢 GST CALCULATION LOGIC 🟢 ---
//         const gstPercent = product.gst || 0;
        
//         // Formula assumes Total Amount includes GST (Inclusive Tax)
//         // Tax Amount = Total - (Total / (1 + (GST / 100)))
//         const totalTaxAmount = totalAmount - (totalAmount / (1 + (gstPercent / 100)));
        
//         let igst = 0, cgst = 0, sgst = 0;
        
//         // Ship To State check karte hain
//         const destinationState = shippingAddress.province || billingAddress.province || "";
        
//         if (destinationState.toLowerCase() === ORIGIN_STATE.toLowerCase()) {
//           // Same State (CGST + SGST)
//           cgst = totalTaxAmount / 2;
//           sgst = totalTaxAmount / 2;
//         } else {
//           // Other State (IGST)
//           igst = totalTaxAmount;
//         }

//         // 4. Create Full Sale Entry
//         const newSale = new Sale({
//           shopifyOrderId: String(orderData.id),
//           orderNumber: orderNumber,
//           companyName: "Claptales",
//           paymentMethod: paymentMethod,
          
//           customerName: customerName,
//           billingAddress: {
//             first_name: billingAddress.first_name,
//             last_name: billingAddress.last_name,
//             address1: billingAddress.address1,
//             address2: billingAddress.address2,
//             city: billingAddress.city,
//             province: billingAddress.province, // State
//             zip: billingAddress.zip,           // Pincode
//             country: billingAddress.country
//           },
//           shippingAddress: {
//             first_name: shippingAddress.first_name,
//             last_name: shippingAddress.last_name,
//             address1: shippingAddress.address1,
//             address2: shippingAddress.address2,
//             city: shippingAddress.city,
//             province: shippingAddress.province, // State
//             zip: shippingAddress.zip,           // Pincode
//             country: shippingAddress.country
//           },

//           sku: item.sku,
//           productName: product.name,
//           category: product.category,
//           quantity: quantity,
//           unit: "pcs",
          
//           sellingPrice: sellingPrice,
//           totalAmount: totalAmount,
//           costPrice: totalCostPrice,
//           profit: profit,

//           // Tax Data Saved
//           gstPercentage: gstPercent,
//           igst: parseFloat(igst.toFixed(2)),
//           cgst: parseFloat(cgst.toFixed(2)),
//           sgst: parseFloat(sgst.toFixed(2)),

//           shop: product.shop || "Shopify"
//         });

//         await newSale.save();

//         // 5. Deduct Inventory Stock
//         product.Qty = product.Qty - quantity;
//         await product.save();
        
//         console.log(`✅ SKU: ${item.sku} saved! Order: ${orderNumber}, Customer: ${customerName}, Pincode: ${shippingAddress.zip}`);
//       } else {
//         console.log(`⚠️ SKU: ${item.sku} system mein nahi mila.`);
//       }
//     }

//     res.status(200).send("Webhook processed successfully with tax info");

//   } catch (error) {
//     console.error("Webhook Error: ", error);
//     res.status(500).send("Server Error");
//   }
// };

























import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// 👉 APNI COMPANY KA STATE YAHAN DAAL
// Agar 'Haryana' se bahar ship hoga toh IGST lagega, warna CGST/SGST.
const ORIGIN_STATE = "Haryana"; 

export const createShopifyOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // 1. Duplicate Check
    const existingSale = await Sale.findOne({ shopifyOrderId: String(orderData.id) });
    if (existingSale) {
      console.log("Order pehle hi process ho chuka hai.");
      return res.status(200).send("Already processed");
    }

    // 2. Extract General Order Info
    const orderNumber = orderData.name; // Gives #1024
    const paymentMethod = orderData.gateway || orderData.financial_status; 
    const customerName = orderData.customer ? `${orderData.customer.first_name} ${orderData.customer.last_name}` : "Guest";
    
    // Addresses
    const billingAddress = orderData.billing_address || {};
    const shippingAddress = orderData.shipping_address || {};

    const lineItems = orderData.line_items;

    // 3. Process Each Toy/Item in the Order
    for (let item of lineItems) {
      if (!item.sku) continue;

      const product = await Product.findOne({ sku: item.sku });

      if (product) {
        // ✅ MRP, Discount & Basic Pricing Logic (Ab ye loop ke andar hai)
        const mrp = product.price || 0; 
        const sellingPrice = parseFloat(item.price); 
        const quantity = item.quantity;
        const totalAmount = sellingPrice * quantity;
        
        let discountPercent = 0;
        if (mrp > sellingPrice) {
          discountPercent = ((mrp - sellingPrice) / mrp) * 100;
        }

        const costPricePerUnit = product.costing_price || 0;
        const totalCostPrice = costPricePerUnit * quantity;
        const profit = totalAmount - totalCostPrice;

        // --- 🟢 GST CALCULATION LOGIC 🟢 ---
        const gstPercent = product.gst || 0;
        
        // Formula assumes Total Amount includes GST (Inclusive Tax)
        const totalTaxAmount = totalAmount - (totalAmount / (1 + (gstPercent / 100)));
        
        let igst = 0, cgst = 0, sgst = 0;
        
        // Ship To State check karte hain
        const destinationState = shippingAddress.province || billingAddress.province || "";
        
        if (destinationState.toLowerCase() === ORIGIN_STATE.toLowerCase()) {
          // Same State (CGST + SGST)
          cgst = totalTaxAmount / 2;
          sgst = totalTaxAmount / 2;
        } else {
          // Other State (IGST)
          igst = totalTaxAmount;
        }

        // 4. Create Full Sale Entry
        const newSale = new Sale({
          shopifyOrderId: String(orderData.id),
          orderNumber: orderNumber,
          companyName: "Claptales",
          paymentMethod: paymentMethod,
          
          customerName: customerName,
          billingAddress: {
            first_name: billingAddress.first_name,
            last_name: billingAddress.last_name,
            address1: billingAddress.address1,
            address2: billingAddress.address2,
            city: billingAddress.city,
            province: billingAddress.province, 
            zip: billingAddress.zip,           
            country: billingAddress.country
          },
          shippingAddress: {
            first_name: shippingAddress.first_name,
            last_name: shippingAddress.last_name,
            address1: shippingAddress.address1,
            address2: shippingAddress.address2,
            city: shippingAddress.city,
            province: shippingAddress.province, 
            zip: shippingAddress.zip,           
            country: shippingAddress.country
          },

          sku: item.sku,
          productName: product.name,
          category: product.category,
          itemImage:product.img,
          quantity: quantity,
          unit: "pcs",
          
          sellingPrice: sellingPrice,
          totalAmount: totalAmount,
          costPrice: totalCostPrice,
          profit: profit,

          // Tax Data Saved
          gstPercentage: gstPercent,
          igst: parseFloat(igst.toFixed(2)),
          cgst: parseFloat(cgst.toFixed(2)),
          sgst: parseFloat(sgst.toFixed(2)),

          shop: product.shop || "Shopify",
          
          // MRP & Discount Data Saved
          mrp: mrp,
          discountPercentage: parseFloat(discountPercent.toFixed(2))
        });

        await newSale.save();

        // 5. Deduct Inventory Stock
        product.Qty = product.Qty - quantity;
        await product.save();
        
        console.log(`✅ SKU: ${item.sku} saved! Order: ${orderNumber}, Customer: ${customerName}, Pincode: ${shippingAddress.zip}`);
      } else {
        console.log(`⚠️ SKU: ${item.sku} system mein nahi mila.`);
      }
    }

    res.status(200).send("Webhook processed successfully with tax info");

  } catch (error) {
    console.error("Webhook Error: ", error);
    res.status(500).send("Server Error");
  }
};