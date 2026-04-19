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
 * Note: Actual CSS selectors to be validated in Week 0/T0-2.
 */
function performFill(data) {
  const fieldMapping = {
    price: 'input[name="listing_price"]',
    beds: 'input[name="bedrooms"]',
    baths: 'input[name="bathrooms"]',
    remarks: 'textarea[name="public_remarks"]'
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
    } else {
      console.warn(`[Path B] Field not found or value missing: ${key} (${selector})`);
    }
  }

  alert('Staged fill completed for top fields. Please review before saving.');
}
