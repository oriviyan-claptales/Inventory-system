import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    // Basic Info
    templateName: {
      type: String,
      required: true,
      trim: true
    },

    templateType: {
      type: String,
      enum: ["Product Label", "Barcode Label", "Shipping Label", "Thank You Card"],
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    // Template Design Data
    templateData: {
      // Layout settings
      layout: {
        width: { type: String, default: "10cm" },
        height: { type: String, default: "5cm" },
        orientation: { type: String, enum: ["portrait", "landscape"], default: "landscape" }
      },

      // Logo/Image
      logo: {
        enabled: { type: Boolean, default: true },
        url: { type: String, default: "" },
        position: { type: String, enum: ["top-left", "top-right", "center"], default: "top-left" }
      },

      // Fields to show (for Product & Barcode Labels)
      fields: {
        showProductName: { type: Boolean, default: true },
        showSKU: { type: Boolean, default: true },
        showBarcode: { type: Boolean, default: true },
        showPrice: { type: Boolean, default: true },
        showCategory: { type: Boolean, default: false },
        showColor: { type: Boolean, default: false },
        showSize: { type: Boolean, default: false },
        showMRP: { type: Boolean, default: false }
      },

      // Shipping Label specific
      shipping: {
        showFromAddress: { type: Boolean, default: true },
        showToAddress: { type: Boolean, default: true },
        showOrderNumber: { type: Boolean, default: true },
        showDate: { type: Boolean, default: true },
        companyName: { type: String, default: "Claptales" },
        companyAddress: { type: String, default: "" }
      },

      // Thank You Card specific
      thankYou: {
        message: { type: String, default: "Thank you for your purchase!" },
        showLogo: { type: Boolean, default: true },
        showSocialMedia: { type: Boolean, default: false },
        socialLinks: {
          instagram: { type: String, default: "" },
          facebook: { type: String, default: "" },
          website: { type: String, default: "" }
        }
      },

      // Styling
      styles: {
        backgroundColor: { type: String, default: "#FFFFFF" },
        textColor: { type: String, default: "#000000" },
        fontSize: { type: String, default: "12px" },
        fontFamily: { type: String, default: "Arial" },
        borderColor: { type: String, default: "#000000" },
        borderWidth: { type: String, default: "1px" }
      }
    },

    // Usage Tracking
    usageCount: {
      type: Number,
      default: 0
    },

    lastUsedAt: {
      type: Date,
      default: null
    },

    // Status
    isActive: {
      type: Boolean,
      default: true
    },

    // Who created
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Tags for searching
    tags: [{
      type: String
    }]
  },
  { timestamps: true }
);

// Index for faster searching
TemplateSchema.index({ templateName: 1, templateType: 1 });

// Method to increment usage
TemplateSchema.methods.incrementUsage = function() {
  this.usageCount += 1;
  this.lastUsedAt = new Date();
  return this.save();
};

export default mongoose.model("Template", TemplateSchema);