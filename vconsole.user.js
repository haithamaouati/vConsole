// ==UserScript==
// @name         vConsole
// @namespace    https://github.com/haithamaouati/vConsole
// @version      1.0
// @description  vConsole - A lightweight, extendable front-end developer tool for mobile web pages.
// @author       Haitham Aouati
// @icon         https://github.com/tencent.png
// @match        https://*/*
// @match        http://*/*
// @require      https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js
// @run-at       document-end
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @homepageURL  https://github.com/Tencent/vConsole
// @supportURL   https://github.com/Tencent/vConsole/issues
// @downloadURL  https://raw.githubusercontent.com/haithamaouati/vConsole/main/vconsole.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Don't run inside iframes (avoids nested consoles on embeds/ads)
    if (window.self !== window.top) return;

    var STORAGE_KEY = 'vconsole-enabled';
    var instance = null;

    function isEnabled() {
        return GM_getValue(STORAGE_KEY, true); // default: on
    }

    function setEnabled(value) {
        GM_setValue(STORAGE_KEY, value);
    }

    function initVConsole() {
        if (!instance && typeof window.VConsole !== 'undefined') {
            instance = new window.VConsole({
                theme: 'dark'
            });
        }
    }

    function destroyVConsole() {
        if (instance) {
            instance.destroy();
            instance = null;
        }
    }

    // @require loads vConsole synchronously before this IIFE runs,
    // so window.VConsole is already available here.
    if (typeof window.VConsole !== 'undefined' && isEnabled()) {
        initVConsole();
    }

    // Menu command lets you toggle vConsole on/off for future page loads
    // without editing the script.
    GM_registerMenuCommand('Toggle vConsole', function() {
        var next = !isEnabled();
        setEnabled(next);
        if (next) {
            initVConsole();
        } else {
            destroyVConsole();
        }
    });
})();
