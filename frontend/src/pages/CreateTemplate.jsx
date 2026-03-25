import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function CreateTemplate() {
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    templateName: "",
    templateType: "",
    description: "",
    tags: "",
    isActive: true,
    
    // Layout Settings
    layoutWidth: "10cm",
    layoutHeight: "5cm",
    layoutOrientation: "landscape",
    
    // Logo Settings
    logoEnabled: true,
    logoUrl: "",
    logoPosition: "top-left",
    
    // Field Visibility (Product & Barcode Labels)
    showProductName: true,
    showSKU: true,
    showBarcode: true,
    showPrice: true,
    showCategory: false,
    showColor: false,
    showSize: false,
    showMRP: false,
    
    // Shipping Label Settings
    showFromAddress: true,
    showToAddress: true,
    showOrderNumber: true,
    showDate: true,
    companyName: "Claptales",
    companyAddress: "",
    
    // Thank You Card Settings
    thankYouMessage: "Thank you for your purchase!",
    showLogo: true,
    showSocialMedia: false,
    instagram: "",
    facebook: "",
    website: "",
    
    // Style Settings
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontSize: "12px",
    fontFamily: "Arial",
    borderColor: "#000000",
    borderWidth: "1px"
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Multi-step form

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.templateName.trim()) {
      return toast.error("Template name is required");
    }
    if (!form.templateType) {
      return toast.error("Please select a template type");
    }

    setLoading(true);
    const toastId = toast.loading("Creating template...");

    try {
      // Prepare data
      const templateData = {
        templateName: form.templateName,
        templateType: form.templateType,
        description: form.description,
        tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(t => t) : [],
        isActive: form.isActive,
        templateData: {
          layout: {
            width: form.layoutWidth,
            height: form.layoutHeight,
            orientation: form.layoutOrientation
          },
          logo: {
            enabled: form.logoEnabled,
            url: form.logoUrl,
            position: form.logoPosition
          },
          fields: {
            showProductName: form.showProductName,
            showSKU: form.showSKU,
            showBarcode: form.showBarcode,
            showPrice: form.showPrice,
            showCategory: form.showCategory,
            showColor: form.showColor,
            showSize: form.showSize,
            showMRP: form.showMRP
          },
          shipping: {
            showFromAddress: form.showFromAddress,
            showToAddress: form.showToAddress,
            showOrderNumber: form.showOrderNumber,
            showDate: form.showDate,
            companyName: form.companyName,
            companyAddress: form.companyAddress
          },
          thankYou: {
            message: form.thankYouMessage,
            showLogo: form.showLogo,
            showSocialMedia: form.showSocialMedia,
            socialLinks: {
              instagram: form.instagram,
              facebook: form.facebook,
              website: form.website
            }
          },
          styles: {
            backgroundColor: form.backgroundColor,
            textColor: form.textColor,
            fontSize: form.fontSize,
            fontFamily: form.fontFamily,
            borderColor: form.borderColor,
            borderWidth: form.borderWidth
          }
        }
      };

      await api.post("/templates", templateData);

      toast.success("Template created successfully!", { id: toastId });
      
      setTimeout(() => {
        navigate("/templates");
      }, 1500);

    } catch (err) {
      console.error("Error creating template:", err);
      toast.error(err.response?.data?.message || "Failed to create template", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!form.templateName.trim()) {
        return toast.error("Please enter template name");
      }
      if (!form.templateType) {
        return toast.error("Please select template type");
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        
        {/* Header Section */}
        <div style={styles.headerWrapper}>
          <button 
            onClick={() => navigate("/templates")} 
            style={styles.backBtn}
          >
            <span style={{marginRight: "8px"}}>⬅</span> Back
          </button>
          <h1 style={styles.pageTitle}>Template Management</h1>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill, 
                width: `${(currentStep / 4) * 100}%`
              }}
            />
          </div>
          <div style={styles.stepLabels}>
            <span style={currentStep >= 1 ? styles.stepActive : styles.stepInactive}>
              1. Basic Info
            </span>
            <span style={currentStep >= 2 ? styles.stepActive : styles.stepInactive}>
              2. Layout
            </span>
            <span style={currentStep >= 3 ? styles.stepActive : styles.stepInactive}>
              3. Content
            </span>
            <span style={currentStep >= 4 ? styles.stepActive : styles.stepInactive}>
              4. Style
            </span>
          </div>
        </div>

        {/* Card Section */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.title}>
              {currentStep === 1 && "📝 Step 1: Basic Information"}
              {currentStep === 2 && "📐 Step 2: Layout Settings"}
              {currentStep === 3 && "📋 Step 3: Content Configuration"}
              {currentStep === 4 && "🎨 Step 4: Style & Appearance"}
            </h2>
            <p style={styles.subtitle}>
              {currentStep === 1 && "Enter template name, type and description"}
              {currentStep === 2 && "Configure template dimensions and logo"}
              {currentStep === 3 && "Choose what information to display"}
              {currentStep === 4 && "Customize colors and fonts"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* ==================== STEP 1: BASIC INFO ==================== */}
            {currentStep === 1 && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Template Name *</label>
                  <input
                    type="text"
                    name="templateName"
                    placeholder="e.g. Standard Product Label"
                    value={form.templateName}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Template Type *</label>
                  <select
                    name="templateType"
                    value={form.templateType}
                    onChange={handleChange}
                    required
                    style={styles.select}
                  >
                    <option value="">Select Template Type...</option>
                    <option value="Product Label">📦 Product Label (Details on back)</option>
                    <option value="Barcode Label">🏷️ Barcode Label</option>
                    <option value="Shipping Label">📮 Shipping Label</option>
                    <option value="Thank You Card">💌 Thank You Card</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    name="description"
                    placeholder="Optional description for this template..."
                    value={form.description}
                    onChange={handleChange}
                    style={{...styles.input, minHeight: "100px"}}
                    rows="4"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="e.g. label, product, standard"
                    value={form.tags}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <small style={styles.hint}>Separate tags with commas</small>
                </div>

                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span>Make this template active immediately</span>
                  </label>
                </div>
              </>
            )}

            {/* ==================== STEP 2: LAYOUT ==================== */}
            {currentStep === 2 && (
              <>
                <div style={styles.sectionTitle}>📐 Template Dimensions</div>
                
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Width</label>
                    <input
                      type="text"
                      name="layoutWidth"
                      placeholder="e.g. 10cm, 4in"
                      value={form.layoutWidth}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Height</label>
                    <input
                      type="text"
                      name="layoutHeight"
                      placeholder="e.g. 5cm, 2in"
                      value={form.layoutHeight}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Orientation</label>
                  <select
                    name="layoutOrientation"
                    value={form.layoutOrientation}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="landscape">Landscape (Horizontal)</option>
                    <option value="portrait">Portrait (Vertical)</option>
                  </select>
                </div>

                <div style={styles.divider} />

                <div style={styles.sectionTitle}>🖼️ Logo Configuration</div>

                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="logoEnabled"
                      checked={form.logoEnabled}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span>Include company logo</span>
                  </label>
                </div>

                {form.logoEnabled && (
                  <>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Logo URL</label>
                      <input
                        type="text"
                        name="logoUrl"
                        placeholder="https://example.com/logo.png"
                        value={form.logoUrl}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Logo Position</label>
                      <select
                        name="logoPosition"
                        value={form.logoPosition}
                        onChange={handleChange}
                        style={styles.select}
                      >
                        <option value="top-left">Top Left</option>
                        <option value="top-right">Top Right</option>
                        <option value="center">Center</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            )}

            {/* ==================== STEP 3: CONTENT ==================== */}
            {currentStep === 3 && (
              <>
                {/* Product & Barcode Label Fields */}
                {(form.templateType === "Product Label" || form.templateType === "Barcode Label") && (
                  <>
                    <div style={styles.sectionTitle}>📦 Product Information Fields</div>
                    
                    <div style={styles.checkboxGrid}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showProductName"
                          checked={form.showProductName}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Product Name</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showSKU"
                          checked={form.showSKU}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>SKU Code</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showBarcode"
                          checked={form.showBarcode}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Barcode</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showPrice"
                          checked={form.showPrice}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Price</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showMRP"
                          checked={form.showMRP}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>MRP</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showCategory"
                          checked={form.showCategory}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Category</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showColor"
                          checked={form.showColor}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Color</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showSize"
                          checked={form.showSize}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Size</span>
                      </label>
                    </div>
                  </>
                )}

                {/* Shipping Label Fields */}
                {form.templateType === "Shipping Label" && (
                  <>
                    <div style={styles.sectionTitle}>📮 Shipping Information</div>
                    
                    <div style={styles.checkboxGrid}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showFromAddress"
                          checked={form.showFromAddress}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>From Address</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showToAddress"
                          checked={form.showToAddress}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>To Address</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showOrderNumber"
                          checked={form.showOrderNumber}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Order Number</span>
                      </label>

                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showDate"
                          checked={form.showDate}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Date</span>
                      </label>
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Company Address</label>
                      <textarea
                        name="companyAddress"
                        value={form.companyAddress}
                        onChange={handleChange}
                        style={{...styles.input, minHeight: "80px"}}
                        rows="3"
                      />
                    </div>
                  </>
                )}

                {/* Thank You Card Fields */}
                {form.templateType === "Thank You Card" && (
                  <>
                    <div style={styles.sectionTitle}>💌 Thank You Message</div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Message Text</label>
                      <textarea
                        name="thankYouMessage"
                        value={form.thankYouMessage}
                        onChange={handleChange}
                        style={{...styles.input, minHeight: "100px"}}
                        rows="4"
                      />
                    </div>

                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showLogo"
                          checked={form.showLogo}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Show company logo</span>
                      </label>
                    </div>

                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="showSocialMedia"
                          checked={form.showSocialMedia}
                          onChange={handleChange}
                          style={styles.checkbox}
                        />
                        <span>Show social media links</span>
                      </label>
                    </div>

                    {form.showSocialMedia && (
                      <>
                        <div style={styles.divider} />
                        <div style={styles.sectionTitle}>🌐 Social Media Links</div>

                        <div style={styles.inputGroup}>
                          <label style={styles.label}>Instagram</label>
                          <input
                            type="text"
                            name="instagram"
                            placeholder="@claptales"
                            value={form.instagram}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>

                        <div style={styles.inputGroup}>
                          <label style={styles.label}>Facebook</label>
                          <input
                            type="text"
                            name="facebook"
                            placeholder="facebook.com/claptales"
                            value={form.facebook}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>

                        <div style={styles.inputGroup}>
                          <label style={styles.label}>Website</label>
                          <input
                            type="text"
                            name="website"
                            placeholder="www.claptales.com"
                            value={form.website}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {/* ==================== STEP 4: STYLE ==================== */}
            {currentStep === 4 && (
              <>
                <div style={styles.sectionTitle}>🎨 Colors</div>
                
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Background Color</label>
                    <div style={styles.colorInputWrapper}>
                      <input
                        type="color"
                        name="backgroundColor"
                        value={form.backgroundColor}
                        onChange={handleChange}
                        style={styles.colorInput}
                      />
                      <input
                        type="text"
                        value={form.backgroundColor}
                        onChange={(e) => handleChange({target: {name: "backgroundColor", value: e.target.value}})}
                        style={styles.colorTextInput}
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Text Color</label>
                    <div style={styles.colorInputWrapper}>
                      <input
                        type="color"
                        name="textColor"
                        value={form.textColor}
                        onChange={handleChange}
                        style={styles.colorInput}
                      />
                      <input
                        type="text"
                        value={form.textColor}
                        onChange={(e) => handleChange({target: {name: "textColor", value: e.target.value}})}
                        style={styles.colorTextInput}
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Border Color</label>
                    <div style={styles.colorInputWrapper}>
                      <input
                        type="color"
                        name="borderColor"
                        value={form.borderColor}
                        onChange={handleChange}
                        style={styles.colorInput}
                      />
                      <input
                        type="text"
                        value={form.borderColor}
                        onChange={(e) => handleChange({target: {name: "borderColor", value: e.target.value}})}
                        style={styles.colorTextInput}
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Border Width</label>
                    <input
                      type="text"
                      name="borderWidth"
                      placeholder="e.g. 1px, 2px"
                      value={form.borderWidth}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.divider} />

                <div style={styles.sectionTitle}>✍️ Typography</div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Font Family</label>
                    <select
                      name="fontFamily"
                      value={form.fontFamily}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Helvetica">Helvetica</option>
                    </select>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Font Size</label>
                    <input
                      type="text"
                      name="fontSize"
                      placeholder="e.g. 12px, 14px"
                      value={form.fontSize}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.divider} />

                <div style={styles.previewBox}>
                  <h4 style={styles.previewTitle}>Preview</h4>
                  <div style={{
                    backgroundColor: form.backgroundColor,
                    color: form.textColor,
                    fontFamily: form.fontFamily,
                    fontSize: form.fontSize,
                    border: `${form.borderWidth} solid ${form.borderColor}`,
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center"
                  }}>
                    <p style={{margin: 0}}>Sample Template Text</p>
                    <p style={{margin: "8px 0 0", fontSize: "12px", opacity: 0.7}}>
                      This is how your template will look
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div style={styles.buttonGroup}>
              {currentStep > 1 && (
                <button 
                  type="button"
                  onClick={prevStep}
                  style={styles.secondaryButton}
                >
                  ← Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  style={styles.button}
                >
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={loading}
                  style={loading ? styles.buttonDisabled : styles.button}
                >
                  {loading ? "Creating..." : "Create Template"}
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerWrapper: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  backBtn: {
    padding: "10px 16px",
    backgroundColor: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center"
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0
  },
  progressContainer: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "30px"
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    transition: "width 0.3s ease"
  },
  stepLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
    fontSize: "13px"
  },
  stepActive: {
    color: "#3b82f6",
    fontWeight: "600"
  },
  stepInactive: {
    color: "#9ca3af",
    fontWeight: "500"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
    padding: "32px",
    width: "100%",
    maxWidth: "800px",
  },
  cardHeader: {
    marginBottom: "32px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f3f4f6"
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0
  },
  inputGroup: {
    marginBottom: "24px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "white",
    cursor: "pointer",
    boxSizing: "border-box"
  },
  hint: {
    display: "block",
    marginTop: "6px",
    fontSize: "12px",
    color: "#9ca3af"
  },
  checkboxGroup: {
    marginBottom: "20px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
    gap: "8px"
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "20px"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "24px"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "16px",
    marginTop: "8px"
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "24px 0"
  },
  colorInputWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  colorInput: {
    width: "60px",
    height: "44px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer"
  },
  colorTextInput: {
    flex: 1,
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontFamily: "monospace"
  },
  previewBox: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    border: "2px dashed #d1d5db"
  },
  previewTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "12px",
    marginTop: 0
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "2px solid #f3f4f6"
  },
  button: {
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  secondaryButton: {
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  buttonDisabled: {
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#9ca3af",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    opacity: 0.6
  }
};