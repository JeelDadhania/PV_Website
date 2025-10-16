/**
 * HTTPS Enforcement and Security Script
 * Ensures all traffic is redirected to HTTPS
 */

// Force HTTPS redirect if not already on HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}

// Additional security measures
document.addEventListener('DOMContentLoaded', function() {
    
    // Prevent loading mixed content by converting HTTP URLs to HTTPS
    var links = document.querySelectorAll('a[href^="http://"]');
    links.forEach(function(link) {
        if (link.href.startsWith('http://')) {
            // Only convert if it's not a localhost URL
            if (!link.href.includes('localhost') && !link.href.includes('127.0.0.1')) {
                link.href = link.href.replace('http://', 'https://');
            }
        }
    });
    
    // Convert any HTTP images to HTTPS
    var images = document.querySelectorAll('img[src^="http://"]');
    images.forEach(function(img) {
        if (img.src.startsWith('http://')) {
            if (!img.src.includes('localhost') && !img.src.includes('127.0.0.1')) {
                img.src = img.src.replace('http://', 'https://');
            }
        }
    });
    
    // Set secure attributes on existing cookies
    if (document.cookie) {
        var cookies = document.cookie.split(';');
        cookies.forEach(function(cookie) {
            if (cookie.trim() && !cookie.includes('Secure')) {
                // Note: This is informational - actual cookie security should be set server-side
                console.log('Consider setting Secure flag on cookies for HTTPS');
            }
        });
    }
});

// Service Worker registration for additional security (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    // You can uncomment this if you add a service worker later
    // navigator.serviceWorker.register('/sw.js');
}