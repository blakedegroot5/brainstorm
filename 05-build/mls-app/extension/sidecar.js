/**
 * Sidecar UI Logic (Path B: Extension-Universal)
 */

document.getElementById('fill-btn')?.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab?.id) return;

  console.log('[Path B] Initiating staged fill in tab:', tab.id);

  // Send message to content script to perform DOM injection
  chrome.tabs.sendMessage(tab.id, {
    action: 'STAGE_FILL',
    data: {
      price: '350000',
      beds: '3',
      baths: '2',
      remarks: 'Gorgeous property with modern updates. Move-in ready!'
    }
  });
});

document.getElementById('media-btn')?.addEventListener('click', () => {
  console.log('[Path B] Syncing media gallery...');
  // Logic to push media to FlexMLS UI
});
