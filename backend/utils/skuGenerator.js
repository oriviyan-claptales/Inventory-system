// // // // utils/skuGenerator.js
// // // import Counter from "../models/Counter.js";

// // // const BRAND_CODE = "CT"; // Claptales

// // // // CATEGORY CODES
// // // const CATEGORY_CODES = {
// // //   "Soft Toy": "SFT",
// // //   "Die-cast": "DC",
// // //   "Remote Control": "RC",
// // //   "Board Game": "BG",
// // //   "Scooter": "SC"
// // // };

// // // // COLOR CODES
// // // const COLOR_CODES = {
// // //   Black: "BL",
// // //   White: "WH",
// // //   Red: "RD",
// // //   Blue: "BU",
// // //   Green: "GR",
// // //   Yellow: "YL",
// // //   Orange: "OR",
// // //   Broun: "BR",
// // //   Grey: "GY"
// // // };

// // // // SERIAL INCREMENT
// // // export const getNextSerial = async (counterName = "productSerial") => {
// // //   const updated = await Counter.findOneAndUpdate(
// // //     { name: counterName },
// // //     { $inc: { seq: 1 } },
// // //     { new: true, upsert: true }
// // //   );
// // //   return updated.seq;
// // // };

// // // // 🔥 Product Name Code Generator
// // // const getNameCode = (name) => {
// // //   if (!name) return "NA";

// // //   const parts = name.trim().split(" ");

// // //   if (parts.length >= 2) {
// // //     return (
// // //       parts[0][0].toUpperCase() +
// // //       parts[1][0].toUpperCase()
// // //     );
// // //   }

// // //   return parts[0].substring(0, 2).toUpperCase();
// // // };

// // // // Extract clean size for SKU
// // // const getCleanSizeCode = (size) => {
// // //   if (!size) return "NA";

// // //   // Case 1: 1:32 → 32
// // //   if (size.includes(":")) {
// // //     return size.split(":")[1];
// // //   }

// // //   // Case 2: 20 cm / 30 inch → 20 / 30 (remove letters)
// // //   const numeric = size.replace(/[^0-9]/g, "");

// // //   // If S, M, L, XL → no numeric, so return original
// // //   if (numeric === "") return size.toUpperCase();

// // //   return numeric; // number only
// // // };

// // // // SKU Generator
// // // export const generateSKU = async ({ category, color, size, name }) => {
// // //   const categoryCode = CATEGORY_CODES[category] || "XX";
// // //   const colorCode = COLOR_CODES[color] || "XX";
// // //   const nameCode = getNameCode(name);
// // //   const sizeCode = getCleanSizeCode(size);

// // //   const serial = await getNextSerial();
// // //   const finalSerial = String(serial).padStart(4, "0");

// // //   // Final SKU Format:
// // //   // CT-DC-BL-RR-32-0001
// // //   return `${BRAND_CODE}-${categoryCode}-${colorCode}-${nameCode}-${sizeCode}-${finalSerial}`;
// // // };



// // // utils/skuGenerator.js
// // import Counter from "../models/Counter.js";

// // const BRAND_CODE = "CT";

// // const CATEGORY_CODES = {
// //   "Soft Toy": "SFT",
// //   "Die-cast": "DC",
// //   "Remote Control": "RC",
// //   "Board Game": "BG",
// //   "Scooter": "SC"
// // };

// // const COLOR_CODES = {
// //   Black: "BL",
// //   White: "WH",
// //   Red: "RD",
// //   Blue: "BU",
// //   Green: "GR",
// //   Yellow: "YL",
// //   Orange: "OR",
// //   Brown: "BR",     // ⭐ FIXED
// //   Grey: "GY"
// // };

// // // SERIAL
// // export const getNextSerial = async (counterName = "productSerial") => {
// //   const updated = await Counter.findOneAndUpdate(
// //     { name: counterName },
// //     { $inc: { seq: 1 } },
// //     { new: true, upsert: true }
// //   );
// //   return updated.seq;
// // };

// // // NAME CODE
// // const getNameCode = (name) => {
// //   if (!name || !name.trim()) return "NA";

// //   const parts = name.trim().split(" ");

// //   if (parts.length >= 2) {
// //     return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
// //   }

// //   return parts[0].substring(0, 2).toUpperCase();
// // };

// // export const generateSKU = async ({ category, color, size, name }) => {
// //   const categoryCode = CATEGORY_CODES[category] || "XX";
// //   const colorCode = COLOR_CODES[color] || "XX";
// //   const nameCode = getNameCode(name);

// //   let sizeCode = "";

// //   // Soft Toy & Board Game → number only
// //   if (["Soft Toy", "Board Game"].includes(category)) {
// //     if (!size || !size.trim()) size = "0"; // ⭐ Prevent empty
// //     sizeCode = size.replace(/cm|inch|in/gi, "").trim();
// //   }

// //   // Scooter → S,M,L,XL
// //   else if (category === "Scooter") {
// //     sizeCode = size ? size.toUpperCase() : "NA";
// //   }

// //   // Other → ratio 1:32 → 32
// //   else {
// //     sizeCode = size ? (size.includes(":") ? size.split(":")[1] : size) : "0";
// //   }

// //   const serial = await getNextSerial();
// //   const finalSerial = String(serial).padStart(4, "0");

// //   return `${BRAND_CODE}-${categoryCode}-${colorCode}-${nameCode}-${sizeCode}-${finalSerial}`;
// // };





























// import Counter from "../models/Counter.js";
// // 👇 Ye 2 naye imports add kiye hain
// import bwipjs from "bwip-js";
// import cloudinary from "../config/cloudinary.js";

// const BRAND_CODE = "CT";

// const CATEGORY_CODES = {
//   "Soft Toy": "SFT",
//   "Die-cast": "DC",
//   "Remote Control": "RC",
//   "Board Game": "BG",
//   "Scooter": "SC"
// };

// // const COLOR_CODES = {
// //   Black: "BL",
// //   White: "WH",
// //   Red: "RD",
// //   Blue: "BU",
// //   Green: "GR",
// //   Yellow: "YL",
// //   Orange: "OR",
// //   Brown: "BR",
// //   Grey: "GY"
// // };

// const COLOR_CODES = {
//   Black: "BL",
//   White: "WH",
//   Red: "RD",
//   Blue: "BU",
//   Green: "GR",
//   Yellow: "YL",
//   Orange: "OR",
//   Brown: "BR",
//   Grey: "GY",

//   Pink: "PK",
//   Purple: "PU",
//   Silver: "SV",
//   Gold: "GD",
//   Beige: "BG",
//   Maroon: "MR",
//   Navy: "NV",
//   Teal: "TL",
//   Cream: "CR",
//   Violet: "VT",
//   Multicolor: "MC"
// };


// // SERIAL INCREMENT (Same as before)
// export const getNextSerial = async (counterName = "productSerial") => {
//   const updated = await Counter.findOneAndUpdate(
//     { name: counterName },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   return updated.seq;
// };

// // NAME CODE GENERATOR (Same as before)
// const getNameCode = (name) => {
//   if (!name || !name.trim()) return "NA";

//   const parts = name.trim().split(" ");

//   if (parts.length >= 2) {
//     return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
//   }

//   return parts[0].substring(0, 2).toUpperCase();
// };

// // 1️⃣ SKU STRING GENERATOR (Apka purana logic same hai)
// export const generateSKU = async ({ category, color, size, name }) => {
//   const categoryCode = CATEGORY_CODES[category] || "XX";
//   const colorCode = COLOR_CODES[color] || "XX";
//   const nameCode = getNameCode(name);

//   let sizeCode = "";

//   // Soft Toy & Board Game → number only
//   if (["Soft Toy", "Board Game"].includes(category)) {
//     if (!size || !size.trim()) size = "0"; 
//     sizeCode = size.replace(/cm|inch|in/gi, "").trim();
//   }

//   // Scooter → S,M,L,XL
//   else if (category === "Scooter") {
//     sizeCode = size ? size.toUpperCase() : "NA";
//   }

//   // Other → ratio 1:32 → 32
//   else {
//     sizeCode = size ? (size.includes(":") ? size.split(":")[1] : size) : "0";
//   }

//   const serial = await getNextSerial();
//   const finalSerial = String(serial).padStart(4, "0");

//   return `${BRAND_CODE}-${categoryCode}-${colorCode}-${nameCode}-${sizeCode}-${finalSerial}`;
// };

// // 👇 2️⃣ NEW FUNCTION: Barcode Generate & Upload karne ke liye
// export const generateAndUploadBarcode = async (sku) => {
//   try {
//     // 1. Barcode buffer generate
//     const pngBuffer = await bwipjs.toBuffer({
//       bcid: "code128", // Barcode type
//       text: sku,       // Sku text
//       scale: 3,
//       height: 10,
//       includetext: true,
//       textxalign: "center",
//     });

//     // 2. Cloudinary upload (base64)
//     const result = await cloudinary.uploader.upload(
//       `data:image/png;base64,${pngBuffer.toString("base64")}`,
//       {
//         folder: "barcodes",
//         public_id: `barcode_${sku}`,
//       }
//     );

//     return result.secure_url; // Return Cloudinary URL
//   } catch (error) {
//     console.error("Barcode Generation Error:", error);
//     return null; // Error aane par null return karega
//   }
// };



















import Counter from "../models/Counter.js";
// 👇 Ye 2 naye imports add kiye hain
import bwipjs from "bwip-js";
import cloudinary from "../config/cloudinary.js";

const BRAND_CODE = "CT";

const CATEGORY_CODES = {
  "Soft Toy": "SFT",
  "Die-cast": "DC",
  "Remote Control": "RC",
  "Board Game": "BG",
  "Scooter": "SC",
  "Gun":"GN",
};

// const COLOR_CODES = {
//   Black: "BL",
//   White: "WH",
//   Red: "RD",
//   Blue: "BU",
//   Green: "GR",
//   Yellow: "YL",
//   Orange: "OR",
//   Brown: "BR",
//   Grey: "GY"
// };

const COLOR_CODES = {
  Black: "BL",
  White: "WH",
  Red: "RD",
  Blue: "BU",
  Green: "GR",
  Yellow: "YL",
  Orange: "OR",
  Brown: "BR",
  Grey: "GY",

  Pink: "PK",
  Purple: "PU",
  Silver: "SV",
  Gold: "GD",
  Beige: "BG",
  Maroon: "MR",
  Navy: "NV",
  Teal: "TL",
  Cream: "CR",
  Violet: "VT",
  Multicolor: "MC"
};


// SERIAL INCREMENT (Same as before)
export const getNextSerial = async (counterName = "productSerial") => {
  const updated = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return updated.seq;
};

// NAME CODE GENERATOR (Same as before)
const getNameCode = (name) => {
  if (!name || !name.trim()) return "NA";

  const parts = name.trim().split(" ");

  if (parts.length >= 2) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  }

  return parts[0].substring(0, 2).toUpperCase();
};

// 1️⃣ SKU STRING GENERATOR (Apka purana logic same hai)
// 1️⃣ SKU STRING GENERATOR
export const generateSKU = async ({ category, color, size, name }) => {
  const categoryCode = CATEGORY_CODES[category] || "XX";
  const colorCode = COLOR_CODES[color] || "XX";
  const nameCode = getNameCode(name);

  let sizeCode = "";

  // 👇 UPDATE: Yahan "Gun" add karein taaki cm/inch hat jaye
  if (["Soft Toy", "Board Game", "Gun"].includes(category)) {
    if (!size || !size.trim()) size = "0"; 
    // Ye cm, inch hata kar sirf number nikal lega
    sizeCode = size.replace(/cm|inch|in/gi, "").trim();
  }

  // Scooter → S,M,L,XL
  else if (category === "Scooter") {
    sizeCode = size ? size.toUpperCase() : "NA";
  }

  // Other (Die-cast/RC) → ratio 1:32 → 32
  else {
    sizeCode = size ? (size.includes(":") ? size.split(":")[1] : size) : "0";
  }

  const serial = await getNextSerial();
  const finalSerial = String(serial).padStart(4, "0");

  return `${BRAND_CODE}-${categoryCode}-${colorCode}-${nameCode}-${sizeCode}-${finalSerial}`;
};

// 👇 2️⃣ NEW FUNCTION: Barcode Generate & Upload karne ke liye
export const generateAndUploadBarcode = async (sku) => {
  try {
    // 1. Barcode buffer generate
    const pngBuffer = await bwipjs.toBuffer({
      bcid: "code128", // Barcode type
      text: sku,       // Sku text
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });

    // 2. Cloudinary upload (base64)
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${pngBuffer.toString("base64")}`,
      {
        folder: "barcodes",
        public_id: `barcode_${sku}`,
      }
    );

    return result.secure_url; // Return Cloudinary URL
  } catch (error) {
    console.error("Barcode Generation Error:", error);
    return null; // Error aane par null return karega
  }
};
