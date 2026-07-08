document.querySelectorAll('.view-ar-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const viewer = document.getElementById(button.dataset.target);
    if (!viewer) return;
    try {
      await viewer.activateAR();
    } catch (err) {
      alert('AR could not start: ' + err.message);
    }
  });
});

document.querySelectorAll('model-viewer').forEach((viewer) => {
  viewer.addEventListener('ar-status', (event) => {
    if (event.detail.status === 'failed') {
      alert('AR failed to launch on this device/browser (model-viewer reported "failed").');
    }
  });
});

// Alt+click anywhere on a model to log its 3D coordinate to the console.
// Use that value to fine-tune the data-position of a hotspot button in index.html.
document.querySelectorAll('model-viewer').forEach((viewer) => {
  viewer.addEventListener('click', (event) => {
    if (!event.altKey) return;
    const rect = viewer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = viewer.positionAndNormalFromPoint(x, y);
    if (hit) {
      const { position, normal } = hit;
      console.log(
        `${viewer.id || viewer.src}\n  data-position="${position.x.toFixed(3)} ${position.y.toFixed(3)} ${position.z.toFixed(3)}"\n  data-normal="${normal.x.toFixed(3)} ${normal.y.toFixed(3)} ${normal.z.toFixed(3)}"`
      );
    }
  });
});
