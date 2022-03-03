// Scroll to top if the window is reloaded
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

var totalBGs = 21;
var backgroundIds = Array.from({length: totalBGs}, (_, i) => i + 1);
var availableIds = [...backgroundIds];

function generateRandom() {

    var index = Math.floor(Math.random() * availableIds.length);

    var photoID = availableIds[index];

    availableIds.splice(index, 1);

    var elements = document.getElementsByClassName('background-container');
    for(i = 0; i < elements.length; i++) {
        elements[i].style.backgroundImage = `url("images/cats/cat_${photoID}.jpg")`;
    }

    if (availableIds.length === 0) {
        availableIds = [...backgroundIds];
    }
}

// Check if the element is visible, this will only check if the top of the element is over the bottom of the window.
function isElementVisible (element) {
    var rect = element.getBoundingClientRect();
    return rect.top < (window.innerHeight || document.documentElement.clientHeight) - 1;
}

function onVisibilityChange(element, callback) {
    // Store the previous value so that the callback is not repeatedly called.
    var old_visible = false;
    return function () {
        var visible = isElementVisible(element);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback(old_visible);
            }
        }
    }
}

// Set up the event listeners etc on site load
function setup() {
    var handler = onVisibilityChange(document.getElementById("image-container"), function(isVisible) {
        if (isVisible === false) {
            generateRandom();
        }
    });

    if (window.addEventListener) {
        addEventListener('DOMContentLoaded', handler, false);
        addEventListener('load', handler, false);
        addEventListener('scroll', handler, false);
        addEventListener('resize', handler, false);
    } else if (window.attachEvent)  {
        attachEvent('onDOMContentLoaded', handler);
        attachEvent('onload', handler);
        attachEvent('onscroll', handler);
        attachEvent('onresize', handler);
    }

    var fullscreenHandler = () => {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            switchFull(false);
        } else {
            switchFull(true);
        }
    }

    if (document.addEventListener) {
        document.addEventListener('fullscreenchange', fullscreenHandler, false);
        document.addEventListener('mozfullscreenchange', fullscreenHandler, false);
        document.addEventListener('MSFullscreenChange', fullscreenHandler, false);
        document.addEventListener('webkitfullscreenchange', fullscreenHandler, false);
    }
}

var docElement = document.documentElement;
var isFull = false;

var fullPath = "images/fullscreen_white.png";
var collapsePath = "images/collapse_white.png";

function toggleFullscreen() {
    if (isFull) {
        closeFullscreen();
    }
    else {
        openFullscreen();
    }
}

// Set "full" to true when entering full screen, this function should only run when the screen is successfully resized
function switchFull(full) {
    if (full) {
        document.getElementById("fullscreen-image").src = collapsePath;
    } else {
        document.getElementById("fullscreen-image").src = fullPath;
    }
    isFull = full;
}

// Open fullscreen
function openFullscreen() {
    if (docElement.requestFullscreen) {
        docElement.requestFullscreen();
    } else if (docElement.webkitRequestFullscreen) {
        docElement.webkitRequestFullscreen();
    } else if (docElement.msRequestFullscreen) {
        docElement.msRequestFullscreen();
    }
}

// Close fullscreen
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


// Messages to pick from randomly
var messages = ["meow", "purrrrr", "mrow", "rawr", "prrt", "prrr", "mew", "roww", "mewp?"];

function popupTrigger() {

    // Set content to a random message
    document.getElementById("popup-box").innerHTML = messages[Math.floor(Math.random() * messages.length)];

    // If the animation has already been run this code block clones the element, and removes the original, this leaves an element with no animation
    var element = document.getElementById("popup-container");
    var newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);

    // Give the clone the animation
    newElement.style.animation = "popup 2s linear";
}