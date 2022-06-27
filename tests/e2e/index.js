// Save and clear local storage
let storage = { ...window.localStorage };
window.localStorage.clear();

// Imports go here
import './getBadges.js';
// ------------------

window.localStorage.clear();

for (const key in storage) {
    const value = storage[key];
    window.localStorage.setItem(key, value)
}
