/**
 * Content Script (Path B: Extension-Universal)
 *
 * This script runs in the context of the FlexMLS page and performs
 * the actual DOM manipulation for form auto-filling.
 */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'STAGE_FILL') {
    console.log('[Path B] Received fill command for listing data:', message.data);
    performFill(message.data);
  }
});

/**
 * Maps normalized listing data to FlexMLS form fields.
 *
 * !!! IMPORTANT !!!
 * The CSS selectors below are BEST GUESSES and are NOT validated.
 * They will need to be inspected and corrected against the live FlexMLS UI
 * during development (Task T0-2).
 * The naming convention `input[name="f_FieldName"]` is a common pattern
 * but may not be accurate for FlexMLS.
 */
function performFill(data) {
  const fieldMapping = {
    'AboveGradeFinishedArea': 'input[name="f_AboveGradeFinishedArea"]',
    'AboveGradeFinishedAreaSource': 'input[name="f_AboveGradeFinishedAreaSource"]',
    'AboveGradeFinishedAreaUnits': 'input[name="f_AboveGradeFinishedAreaUnits"]',
    'AboveGradeUnfinishedArea': 'input[name="f_AboveGradeUnfinishedArea"]',
    'AccessCode': 'input[name="f_AccessCode"]',
    'AccessibilityFeatures': 'input[name="f_AccessibilityFeatures"]',
    'ActivationDate': 'input[name="f_ActivationDate"]',
    'Appliances': 'input[name="f_Appliances"]',
    'ArchitecturalStyle': 'input[name="f_ArchitecturalStyle"]',
    'AssociationFee': 'input[name="f_AssociationFee"]',
    'AttachedGarageYN': 'input[name="f_AttachedGarageYN"]',
    'Basement': 'input[name="f_Basement"]',
    'BathroomsFull': 'input[name="f_BathroomsFull"]',
    'BathroomsHalf': 'input[name="f_BathroomsHalf"]',
    'BathroomsOneQuarter': 'input[name="f_BathroomsOneQuarter"]',
    'BathroomsPartial': 'input[name="f_BathroomsPartial"]',
    'BathroomsThreeQuarter': 'input[name="f_BathroomsThreeQuarter"]',
    'BathroomsTotalInteger': 'input[name="f_BathroomsTotalInteger"]',
    'BedroomsPossible': 'input[name="f_BedroomsPossible"]',
    'BedroomsTotal': 'input[name="f_BedroomsTotal"]',
    'BelowGradeFinishedArea': 'input[name="f_BelowGradeFinishedArea"]',
    'BelowGradeFinishedAreaSource': 'input[name="f_BelowGradeFinishedAreaSource"]',
    'BelowGradeFinishedAreaUnits': 'input[name="f_BelowGradeFinishedAreaUnits"]',
    'BelowGradeUnfinishedArea': 'input[name="f_BelowGradeUnfinishedArea"]',
    'BuilderModel': 'input[name="f_BuilderModel"]',
    'BuilderName': 'input[name="f_BuilderName"]',
    'BuildingAreaSource': 'input[name="f_BuildingAreaSource"]',
    'BuildingAreaTotal': 'input[name="f_BuildingAreaTotal"]',
    'BuildingAreaUnits': 'input[name="f_BuildingAreaUnits"]',
    'BuildingFeatures': 'input[name="f_BuildingFeatures"]',
    'BusinessName': 'input[name="f_BusinessName"]',
    'BusinessType': 'input[name="f_BusinessType"]',
    'BuyerAgentAOR': 'input[name="f_BuyerAgentAOR"]',
    'BuyerAgentCellPhone': 'input[name="f_BuyerAgentCellPhone"]',
    'BuyerAgentDesignation': 'input[name="f_BuyerAgentDesignation"]',
    'BuyerAgentDirectPhone': 'input[name="f_BuyerAgentDirectPhone"]',
    'BuyerAgentEmail': 'input[name="f_BuyerAgentEmail"]',
    'BuyerAgentFax': 'input[name="f_BuyerAgentFax"]',
    'BuyerAgentFirstName': 'input[name="f_BuyerAgentFirstName"]',
    'BuyerAgentFullName': 'input[name="f_BuyerAgentFullName"]',
  };

  for (const [key, selector] of Object.entries(fieldMapping)) {
    const value = data[key];
    const element = document.querySelector(selector);

    if (element && value) {
      console.log(`[Path B] Filling ${key} (${selector}) with: ${value}`);
      // In a real implementation, we'd handle dynamic events (change, input)
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (value) { // Only warn if there was a value to fill
      console.warn(`[Path B] Field not found for: ${key} (selector: ${selector})`);
    }
  }

  alert('Staged fill completed. Please review all fields carefully before saving.');
}
