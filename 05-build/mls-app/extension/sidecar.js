/**
 * Sidecar UI Logic (Path B: Extension-Universal)
 */

document.getElementById('fill-btn')?.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab?.id) return;

  console.log('[Path B] Initiating staged fill in tab:', tab.id);

  const form = document.getElementById('listing-form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Send message to content script to perform DOM injection
  chrome.tabs.sendMessage(tab.id, {
    action: 'STAGE_FILL',
    data: data
  });
});

document.getElementById('media-btn')?.addEventListener('click', () => {
  console.log('[Path B] Syncing media gallery...');
  // Logic to push media to FlexMLS UI
});
