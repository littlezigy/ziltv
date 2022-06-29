// Save and clear local storage
let storage = { ...window.localStorage };
window.localStorage.clear();

// Imports go here
import './fetchUserNFTBalance.js';
import './badge.api.js';
import './comments.api.js';
import './auth.api.js';
import './profile.api.js';
import './getUserBadges.test.js';
// ------------------

window.localStorage.clear();

for (const key in storage) {
    const value = storage[key];
    window.localStorage.setItem(key, value)
}
