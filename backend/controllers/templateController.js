// import Template from "../models/Template.js";
// import { logAction } from "../utils/logger.js";

// // ==================== CREATE TEMPLATE ====================
// export const createTemplate = async (req, res) => {
//   try {
//     const {
//       templateName,
//       templateType,
//       description,
//       templateData,
//       tags
//     } = req.body;

//     // Check if template name already exists
//     const existingTemplate = await Template.findOne({ templateName });
//     if (existingTemplate) {
//       return res.status(400).json({
//         success: false,
//         message: "Template name already exists"
//       });
//     }

//     // Create new template
//     const template = await Template.create({
//       templateName,
//       templateType,
//       description,
//       templateData,
//       tags,
//       createdBy: req.user._id
//     });

//     // Log the action
//     await logAction(
//       req.user._id,
//       "TEMPLATE_CREATED",
//       `Created template: ${templateName} (${templateType})`
//     );

//     res.status(201).json({
//       success: true,
//       message: "Template created successfully",
//       template
//     });
//   } catch (error) {
//     console.error("Create Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create template",
//       error: error.message
//     });
//   }
// };

// // ==================== GET ALL TEMPLATES ====================
// export const getAllTemplates = async (req, res) => {
//   try {
//     const { type, isActive, search } = req.query;

//     // Build filter
//     let filter = {};
    
//     if (type) {
//       filter.templateType = type;
//     }
    
//     if (isActive !== undefined) {
//       filter.isActive = isActive === "true";
//     }
    
//     if (search) {
//       filter.$or = [
//         { templateName: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//         { tags: { $in: [new RegExp(search, "i")] } }
//       ];
//     }

//     const templates = await Template.find(filter)
//       .populate("createdBy", "name email username")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: templates.length,
//       templates
//     });
//   } catch (error) {
//     console.error("Get Templates Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch templates",
//       error: error.message
//     });
//   }
// };

// // ==================== GET SINGLE TEMPLATE ====================
// export const getTemplateById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const template = await Template.findById(id)
//       .populate("createdBy", "name email username");

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         message: "Template not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       template
//     });
//   } catch (error) {
//     console.error("Get Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch template",
//       error: error.message
//     });
//   }
// };

// // ==================== UPDATE TEMPLATE ====================
// export const updateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const template = await Template.findById(id);

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         message: "Template not found"
//       });
//     }

//     // Update template
//     const updatedTemplate = await Template.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate("createdBy", "name email username");

//     // Log the action
//     await logAction(
//       req.user._id,
//       "TEMPLATE_UPDATED",
//       `Updated template: ${updatedTemplate.templateName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Template updated successfully",
//       template: updatedTemplate
//     });
//   } catch (error) {
//     console.error("Update Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update template",
//       error: error.message
//     });
//   }
// };

// // ==================== DELETE TEMPLATE ====================
// export const deleteTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const template = await Template.findById(id);

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         message: "Template not found"
//       });
//     }

//     const templateName = template.templateName;

//     await Template.findByIdAndDelete(id);

//     // Log the action
//     await logAction(
//       req.user._id,
//       "TEMPLATE_DELETED",
//       `Deleted template: ${templateName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Template deleted successfully"
//     });
//   } catch (error) {
//     console.error("Delete Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete template",
//       error: error.message
//     });
//   }
// };

// // ==================== TOGGLE TEMPLATE STATUS ====================
// export const toggleTemplateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const template = await Template.findById(id);

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         message: "Template not found"
//       });
//     }

//     template.isActive = !template.isActive;
//     await template.save();

//     // Log the action
//     await logAction(
//       req.user._id,
//       "TEMPLATE_STATUS_CHANGED",
//       `${template.isActive ? 'Activated' : 'Deactivated'} template: ${template.templateName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: `Template ${template.isActive ? 'activated' : 'deactivated'} successfully`,
//       template
//     });
//   } catch (error) {
//     console.error("Toggle Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to toggle template status",
//       error: error.message
//     });
//   }
// };

// // ==================== USE TEMPLATE (INCREMENT USAGE) ====================
// export const useTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const template = await Template.findById(id);

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         message: "Template not found"
//       });
//     }

//     if (!template.isActive) {
//       return res.status(400).json({
//         success: false,
//         message: "Template is inactive"
//       });
//     }

//     // Increment usage
//     await template.incrementUsage();

//     // Log the action
//     await logAction(
//       req.user._id,
//       "TEMPLATE_USED",
//       `Used template: ${template.templateName} (Usage count: ${template.usageCount})`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Template usage recorded",
//       template
//     });
//   } catch (error) {
//     console.error("Use Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to record template usage",
//       error: error.message
//     });
//   }
// };

// // ==================== GET TEMPLATE STATS ====================
// export const getTemplateStats = async (req, res) => {
//   try {
//     const totalTemplates = await Template.countDocuments();
//     const activeTemplates = await Template.countDocuments({ isActive: true });
//     const inactiveTemplates = await Template.countDocuments({ isActive: false });

//     // Templates by type
//     const templatesByType = await Template.aggregate([
//       {
//         $group: {
//           _id: "$templateType",
//           count: { $sum: 1 },
//           totalUsage: { $sum: "$usageCount" }
//         }
//       }
//     ]);

//     // Most used templates
//     const mostUsedTemplates = await Template.find()
//       .sort({ usageCount: -1 })
//       .limit(5)
//       .populate("createdBy", "name username");

//     // Recently created
//     const recentTemplates = await Template.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate("createdBy", "name username");

//     res.status(200).json({
//       success: true,
//       stats: {
//         total: totalTemplates,
//         active: activeTemplates,
//         inactive: inactiveTemplates,
//         byType: templatesByType,
//         mostUsed: mostUsedTemplates,
//         recent: recentTemplates
//       }
//     });
//   } catch (error) {
//     console.error("Get Template Stats Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch template statistics",
//       error: error.message
//     });
//   }
// };

// // ==================== DUPLICATE TEMPLATE ====================
// export const duplicateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newName } = req.body;

//     const originalTemplate = await Template.findById(id);

//     if (!originalTemplate) {
//       return res.status(404).json({
//         success: false,
//         message: "Template not found"
//       });
//     }

//     // Create duplicate
//     const duplicateTemplate = await Template.create({
//       templateName: newName || `${originalTemplate.templateName} (Copy)`,
//       templateType: originalTemplate.templateType,
//       description: originalTemplate.description,
//       templateData: originalTemplate.templateData,
//       tags: originalTemplate.tags,
//       createdBy: req.user._id,
//       isActive: false // Start as inactive
//     });

//     // Log the action
//     await logAction(
//       req.user._id,
//       "TEMPLATE_DUPLICATED",
//       `Duplicated template: ${originalTemplate.templateName} → ${duplicateTemplate.templateName}`
//     );

//     res.status(201).json({
//       success: true,
//       message: "Template duplicated successfully",
//       template: duplicateTemplate
//     });
//   } catch (error) {
//     console.error("Duplicate Template Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to duplicate template",
//       error: error.message
//     });
//   }
// };









import Template from "../models/Template.js";
import { logActivity } from "../utils/logger.js";

// ==================== CREATE TEMPLATE ====================
export const createTemplate = async (req, res) => {
  try {
    const {
      templateName,
      templateType,
      description,
      templateData,
      tags
    } = req.body;

    // Check if template name already exists
    const existingTemplate = await Template.findOne({ templateName });
    if (existingTemplate) {
      return res.status(400).json({
        success: false,
        message: "Template name already exists"
      });
    }

    // Create new template
    const template = await Template.create({
      templateName,
      templateType,
      description,
      templateData,
      tags,
      createdBy: req.user._id
    });

    // Log the action
    await logActivity(
      req,
      "TEMPLATE_CREATED",
      `Created template: ${templateName} (${templateType})`
    );

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      template
    });
  } catch (error) {
    console.error("Create Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create template",
      error: error.message
    });
  }
};

// ==================== GET ALL TEMPLATES ====================
export const getAllTemplates = async (req, res) => {
  try {
    const { type, isActive, search } = req.query;

    // Build filter
    let filter = {};
    
    if (type) {
      filter.templateType = type;
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }
    
    if (search) {
      filter.$or = [
        { templateName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const templates = await Template.find(filter)
      .populate("createdBy", "name email username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    console.error("Get Templates Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
      error: error.message
    });
  }
};

// ==================== GET SINGLE TEMPLATE ====================
export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id)
      .populate("createdBy", "name email username");

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    res.status(200).json({
      success: true,
      template
    });
  } catch (error) {
    console.error("Get Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
      error: error.message
    });
  }
};

// ==================== UPDATE TEMPLATE ====================
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    // Update template
    const updatedTemplate = await Template.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("createdBy", "name email username");

    // Log the action
    await logActivity(
      req,
      "TEMPLATE_UPDATED",
      `Updated template: ${updatedTemplate.templateName}`
    );

    res.status(200).json({
      success: true,
      message: "Template updated successfully",
      template: updatedTemplate
    });
  } catch (error) {
    console.error("Update Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update template",
      error: error.message
    });
  }
};

// ==================== DELETE TEMPLATE ====================
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    const templateName = template.templateName;

    await Template.findByIdAndDelete(id);

    // Log the action
    await logActivity(
      req,
      "TEMPLATE_DELETED",
      `Deleted template: ${templateName}`
    );

    res.status(200).json({
      success: true,
      message: "Template deleted successfully"
    });
  } catch (error) {
    console.error("Delete Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete template",
      error: error.message
    });
  }
};

// ==================== TOGGLE TEMPLATE STATUS ====================
export const toggleTemplateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    template.isActive = !template.isActive;
    await template.save();

    // Log the action
    await logActivity(
      req,
      "TEMPLATE_STATUS_CHANGED",
      `${template.isActive ? 'Activated' : 'Deactivated'} template: ${template.templateName}`
    );

    res.status(200).json({
      success: true,
      message: `Template ${template.isActive ? 'activated' : 'deactivated'} successfully`,
      template
    });
  } catch (error) {
    console.error("Toggle Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle template status",
      error: error.message
    });
  }
};

// ==================== USE TEMPLATE (INCREMENT USAGE) ====================
export const useTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    if (!template.isActive) {
      return res.status(400).json({
        success: false,
        message: "Template is inactive"
      });
    }

    // Increment usage
    await template.incrementUsage();

    // Log the action
    await logActivity(
      req,
      "TEMPLATE_USED",
      `Used template: ${template.templateName} (Usage count: ${template.usageCount})`
    );

    res.status(200).json({
      success: true,
      message: "Template usage recorded",
      template
    });
  } catch (error) {
    console.error("Use Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record template usage",
      error: error.message
    });
  }
};

// ==================== GET TEMPLATE STATS ====================
export const getTemplateStats = async (req, res) => {
  try {
    const totalTemplates = await Template.countDocuments();
    const activeTemplates = await Template.countDocuments({ isActive: true });
    const inactiveTemplates = await Template.countDocuments({ isActive: false });

    // Templates by type
    const templatesByType = await Template.aggregate([
      {
        $group: {
          _id: "$templateType",
          count: { $sum: 1 },
          totalUsage: { $sum: "$usageCount" }
        }
      }
    ]);

    // Most used templates
    const mostUsedTemplates = await Template.find()
      .sort({ usageCount: -1 })
      .limit(5)
      .populate("createdBy", "name username");

    // Recently created
    const recentTemplates = await Template.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name username");

    res.status(200).json({
      success: true,
      stats: {
        total: totalTemplates,
        active: activeTemplates,
        inactive: inactiveTemplates,
        byType: templatesByType,
        mostUsed: mostUsedTemplates,
        recent: recentTemplates
      }
    });
  } catch (error) {
    console.error("Get Template Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch template statistics",
      error: error.message
    });
  }
};

// ==================== DUPLICATE TEMPLATE ====================
export const duplicateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    const originalTemplate = await Template.findById(id);

    if (!originalTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    // Create duplicate
    const duplicateTemplate = await Template.create({
      templateName: newName || `${originalTemplate.templateName} (Copy)`,
      templateType: originalTemplate.templateType,
      description: originalTemplate.description,
      templateData: originalTemplate.templateData,
      tags: originalTemplate.tags,
      createdBy: req.user._id,
      isActive: false // Start as inactive
    });

    // Log the action
    await logActivity(
      req,
      "TEMPLATE_DUPLICATED",
      `Duplicated template: ${originalTemplate.templateName} → ${duplicateTemplate.templateName}`
    );

    res.status(201).json({
      success: true,
      message: "Template duplicated successfully",
      template: duplicateTemplate
    });
  } catch (error) {
    console.error("Duplicate Template Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to duplicate template",
      error: error.message
    });
  }
};