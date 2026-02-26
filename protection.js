// Disable Right-Click Context Menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable Keyboard Shortcuts for Developer Tools
document.onkeydown = function (e) {
    // Disable F12
    if (event.keyCode == 123) {
        return false;
    }
    // Disable Ctrl+Shift+I (Windows/Linux) or Cmd+Opt+I (Mac)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+Shift+J (Windows/Linux) or Cmd+Opt+J (Mac)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+C / Ctrl+X (Optional: prevent copying)
    // if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 88)) {
    //    return false;
    // }
};
