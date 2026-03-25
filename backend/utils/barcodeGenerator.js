import bwipjs from "bwip-js";
import cloudinary from "../config/cloudinary.js";

export const generateAndUploadBarcode = async (sku) => {
  try {
    // 1️⃣ Barcode buffer generate
    const pngBuffer = await bwipjs.toBuffer({
      bcid: "code128", // Barcode type
      text: sku,       // Sku text
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });

    // 2️⃣ Cloudinary upload (base64)
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
    return null;
  }
};