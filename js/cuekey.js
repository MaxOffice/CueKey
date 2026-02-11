document.addEventListener('DOMContentLoaded', function () {
    const keyPanel = document.getElementById('keyPanel');
    const txtInput = document.getElementById('txtInput');
    const displayContent = document.getElementById('displayContent');
    const saveBtn = document.getElementById('saveBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsDialog = document.getElementById('settingsDialog');
    const settingsCloseButton = document.getElementById('settingsCloseButton');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomReset = document.getElementById('zoomReset');
    const zoomValue = document.getElementById('zoomValue');
    const statusZoom = document.getElementById('status');
    const saveStatus = document.getElementById('saveStatus');
    const chkWinkey = document.getElementById('chkWinKey');
    const addMetaBtn = document.getElementById('addMetaBtn');
    const clearBtn = document.getElementById('clearBtn');
    const backspaceBtn = document.getElementById('backspaceBtn');
    const addFnBtn = document.getElementById('addFnBtn');
    const txtCustom = document.getElementById('txtCustom');
    const addCustomBtn = document.getElementById('addCustomBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Consolidated Settings Elements
    const rbWindows = document.getElementById('rbWindows');
    const rbMac = document.getElementById('rbMac');
    const rbLinux = document.getElementById('rbLinux');
    const rbMechanical = document.getElementById('rbMechanical');
    const rbChiclet = document.getElementById('rbChiclet');

    const gradientStartInput = document.getElementById('gradientStart');
    const gradientEndInput = document.getElementById('gradientEnd');
    const gradientAngleInput = document.getElementById('gradientAngle');
    const gradientAngleValue = document.getElementById('gradientAngleValue');
    const gradientResetButton = document.getElementById('gradientResetButton');

    const keyTextColorInput = document.getElementById('keyTextColor');
    const resetTextColorBtn = document.getElementById('resetTextColorBtn');

    const keyGapInput = document.getElementById('keyGap');
    const keyGapValueDisplay = document.getElementById('keyGapValue');
    const resetGapBtn = document.getElementById('resetGapBtn');

    const settingsPreviewPanel = document.getElementById('settingsPreviewPanel');

    const mechanicalTextColor = document.getElementById('mechanicalTextColor');
    const mechanicalTextGradient = document.getElementById('mechanicalTextGradient');

    // Input functionality
    const keyString = (keycap, keyclasses) => {
        const classString = `key${keyclasses != "" ? ` ${keyclasses}` : ""}`;
        return `<span class="${classString}"><span>${keycap}</span></span>`;
    }

    const eatKey = (modifiers) => "";

    const modifierKeyMap = {
        "Meta": () => keyString(
            "<img class='keylogo windowsonly linuxonly' src='images/WindowsLogo-2012.svg'><span class='maconly'>Command ⌘</span>",
            "bigkey macbigbigkey"
        ),
        "Shift": () => keyString("Shift    ⇧", "bigbigkey"),
        "Control": () => keyString("Ctrl", "bigkey"),
        "Alt": () => keyString(
            "<span class='windowsonly linuxonly'>Alt</span><span class='maconly'>Option ⌥</span>",
            "bigkey macbigbigkey"
        ),
    }

    const modifierCountMap = {
        "Meta": 0,
        "Shift": 0,
        "Control": 0,
        "Alt": 0,
    }

    const specialKeyMap = {
        "Meta": eatKey,
        "Shift": eatKey,
        "Control": eatKey,
        "Alt": eatKey,
        " ": (m) => keyString("Spacebar", "bigbigkey"),
        "Escape": (m) => keyString("Esc", "notransform"),
        "Tab": (m) => keyString("Tab ⭾", "bigkey"),
        "PageUp": (m) => keyString("PgUp", "notransform"),
        "PageDown": (m) => keyString("PgDn", "notransform"),
        "Home": (m) => keyString("Home", "notransform"),
        "End": (m) => keyString("End", "notransform"),
        "Backspace": (m) => keyString("⌫ Backspace", "bigbigkey"),
        "Delete": (m) => keyString("Del", "bigkey"),
        "Insert": (m) => keyString("Ins", "bigkey"),
        "CapsLock": (m) => keyString("Caps Lock", "bigbigkey"),
        "Enter": (m) => keyString("Enter ⮠ ", "bigbigkey"),
        "ArrowUp": (m) => keyString("🡅", ""),
        "ArrowRight": (m) => keyString("🡆", ""),
        "ArrowDown": (m) => keyString("🡇", ""),
        "ArrowLeft": (m) => keyString("🡄", ""),
        "Pause": (m) => keyString("Pause", "bigkey"),
        "NumLock": (m) => keyString("Num<br>Lock", "bigkey"),
        "PrintScreen": (m) => keyString("Prt Scr", "bigkey"),
        "ScrollLock": (m) => keyString("Srl Lck", "bigkey"),
        "Undefined": (m) => keyString(" ", ""),
        "!": (m) => keyString("1", ""),
        "@": (m) => keyString("2", ""),
        "#": (m) => keyString("3", ""),
        "$": (m) => keyString("4", ""),
        "%": (m) => keyString("5", ""),
        "^": (m) => keyString("6", ""),
        "&": (m) => keyString("7", ""),
        "*": (m) => keyString(m.length === 0 ? "*" : "8", ""),
        "(": (m) => keyString("9", ""),
        ")": (m) => keyString("0", ""),
        "_": (m) => keyString("-", ""),
        "+": (m) => keyString(m.length === 0 ? "+" : "=", ""),
        "<": (m) => keyString(",", ""),
        ">": (m) => keyString(".", ""),
        "?": (m) => keyString("/", ""),
        ":": (m) => keyString(";", ""),
        "\"": (m) => keyString("'", ""),
        "|": (m) => keyString("\\", ""),
        "{": (m) => keyString("[", ""),
        "}": (m) => keyString("]", ""),
        "~": (m) => keyString("`", ""),
    }

    const isModifierKey = (keypressed) => Object.hasOwn(modifierKeyMap, keypressed);
    const displayClassForKey = (keypressed) => keypressed.length > 9
        ? "bigbigkey notransform"
        : keypressed.length > 4
            ? "bigkey notransform"
            : "";


    /**
     * processKeys decides how modifiers and a normal
     * key are processed, based on how many times the
     * modifiers have already been processed.
     * @param {string[]} modifiers 
     * @param {string} keypressed 
     * @returns {string} HTML that should be inserted
     */
    const processKeys = (modifiers, keypressed) => {
        // If the key just released is a modifier, check
        // if it has already been processed. If not, 
        // process it immediately, and don't precess any
        // other keys.
        if (isModifierKey(keypressed)) {
            modifierCountMap[keypressed]--;
            if (modifierCountMap[keypressed] < 0) {
                modifierCountMap[keypressed] = 0;
                return modifierKeyMap[keypressed]();
            } else {
                return "";
            }
        }

        // Process normal keys
        let normalkeys;
        if (Object.hasOwn(specialKeyMap, keypressed)) {
            normalkeys = specialKeyMap[keypressed](modifiers);
        } else {
            normalkeys = keyString(keypressed, displayClassForKey(keypressed));
        }
        normalkeys = normalkeys.trim();

        // Process modifiers
        let modifierkeys = "";
        modifierkeys = modifiers.reduce(
            (prev, current) => {
                modifierCountMap[current]++;
                return prev + modifierKeyMap[current]()
            },
            ""
        );

        let result = modifierkeys + normalkeys;
        return result;
    }

    // Prevent keypress from showing up in textarea
    txtInput.addEventListener('keydown', function (e) {
        e.preventDefault();
    });

    // Capture keyboard input on key release
    txtInput.addEventListener('keyup', function (e) {
        e.preventDefault();

        let keyPressed = e.key;
        let modifiers = [];

        if (e.metaKey || chkWinkey.checked) modifiers.push('Meta');
        if (e.shiftKey) modifiers.push('Shift');
        if (e.ctrlKey) modifiers.push('Control');
        if (e.altKey) modifiers.push('Alt');

        let displayText = processKeys(modifiers, keyPressed);
        let styledOutput = displayText;

        displayContent.innerHTML += styledOutput;

        if (styledOutput != "") {
            enableEditUI(true);
        }
    });

    // Set ready or not status
    txtInput.addEventListener('focus', e => {
        saveStatus.textContent = "Ready";
    });

    txtInput.addEventListener('blur', e => {
        saveStatus.textContent = "Click the input area.";
    });

    // Zoom functionality
    const zoomMin = 50;
    const zoomMax = 500;
    const zoomIncrement = 50;
    const zoomDefault = 500;

    const updateZoom = () => {
        keyPanel.style.transform = `scale(${zoom / 100})`;
        keyPanel.style.transformOrigin = 'top left';
        zoomValue.textContent = `${zoom}%`;
        statusZoom.textContent = `Zoom: ${zoom}%`;
    }

    zoomIn.addEventListener('click', function () {
        zoom = Math.min(zoom + zoomIncrement, zoomMax);
        updateZoom();
    });

    zoomOut.addEventListener('click', function () {
        zoom = Math.max(zoom - zoomIncrement, zoomMin);
        updateZoom();
    });

    zoomReset.addEventListener('click', function () {
        zoom = zoomDefault;
        updateZoom();
    });

    let zoom = zoomDefault;
    updateZoom();

    // Copy and Save button functionality

    /**
     * processImage creates a transparent PNG image from the
     * rendered keys using an HTML canvas, and then calls a 
     * callback.
     * @param {string} opstring Operation name as past tense, for status message 
     * @param {function(HTMLCanvasElement):void} processfn Callback after successful process
     * @returns void
     */
    const processImage = (opstring, processfn) => {
        // Get current zoom level to preserve in PNG
        const currentZoom = zoom / 100;

        // Temporary adjustments to ensure complete capture
        const displayContentElem = document.getElementById('displayContent');
        const keyPanelElem = document.getElementById('keyPanel');

        // Store original styles
        const originalKeyPanelWidth = keyPanelElem.style.width;
        const originalKeyPanelHeight = keyPanelElem.style.height;
        const originalKeyPanelOverflow = keyPanelElem.style.overflow;
        const originalTransformOrigin = keyPanelElem.style.transformOrigin;

        // Make sure content is not clipped during capture but keep zoom scale
        keyPanelElem.style.width = 'auto';
        keyPanelElem.style.height = 'auto';
        keyPanelElem.style.overflow = 'visible';
        keyPanelElem.style.transformOrigin = '0 0';  // Ensure consistent scaling from top-left

        // Create a wrapper div to maintain the zoom
        const wrapper = document.createElement('div');
        wrapper.style.transform = `scale(${currentZoom})`;
        wrapper.style.transformOrigin = '0 0';
        wrapper.style.width = 'fit-content';
        wrapper.style.height = 'fit-content';

        // Clone the display content to work with
        const clonedContent = displayContentElem.cloneNode(true);
        wrapper.appendChild(clonedContent);
        document.body.appendChild(wrapper);

        // Use htmlToImage to capture the zoomed wrapper
        htmlToImage.toCanvas(wrapper, {
            backgroundColor: null,  // Transparent background
            scale: 5,               // Not Higher quality
            logging: false,
            // width: document.documentElement.offsetWidth,
            // height: document.documentElement.offsetHeight
            width: displayContent.getBoundingClientRect().width,
            height: displayContent.getBoundingClientRect().height
        }).then(function (canvas) {
            processfn(canvas);

            // Remove the temporary wrapper
            document.body.removeChild(wrapper);

            // Restore original styles
            keyPanelElem.style.width = originalKeyPanelWidth;
            keyPanelElem.style.height = originalKeyPanelHeight;
            keyPanelElem.style.overflow = originalKeyPanelOverflow;
            keyPanelElem.style.transformOrigin = originalTransformOrigin;

            // Update status
            saveStatus.textContent = `${opstring} at ${zoom}% zoom as PNG!`;
            setTimeout(() => {
                txtInput.focus();
            }, 3000);
        }).catch(error => {
            console.error("Error processing image:", error);

            // Remove the temporary wrapper
            if (document.body.contains(wrapper)) {
                document.body.removeChild(wrapper);
            }

            // Restore original styles on error too
            keyPanelElem.style.width = originalKeyPanelWidth;
            keyPanelElem.style.height = originalKeyPanelHeight;
            keyPanelElem.style.overflow = originalKeyPanelOverflow;
            keyPanelElem.style.transformOrigin = originalTransformOrigin;

            saveStatus.textContent = "Error processing image";
            setTimeout(() => {
                txtInput.focus();
            }, 3000);
        });
    }

    copyBtn.addEventListener('click', function () {
        saveStatus.textContent = "Saving...";

        processImage("Copied", (canvas) => {
            canvas.toBlob(blob => {
                navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            }, "image/png");
        });
    });

    saveBtn.addEventListener('click', function () {
        saveStatus.textContent = "Saving...";

        processImage("Saved", function (canvas) {
            // Create temporary link for download
            const link = document.createElement('a');
            link.download = `key-capture-${zoom}pct.png`;

            // Convert canvas to data URL
            link.href = canvas.toDataURL('image/png');

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // Editing UI enable/disable functionality
    const enableEditUI = (enable) => {
        const operation = enable && 'remove' || 'add';
        backspaceBtn.classList[operation]('disabled');
        clearBtn.classList[operation]('disabled');
        copyBtn.classList[operation]('disabled');
        saveBtn.classList[operation]('disabled');
    }

    // Insert buttons functionality

    // Add meta button functionality
    addMetaBtn.addEventListener('click', function () {
        displayContent.innerHTML += processKeys(['Meta'], 'Meta');
        enableEditUI(true);
        txtInput.focus();
    })

    // Add fn button functionality
    addFnBtn.addEventListener('click', function () {
        displayContent.innerHTML += keyString('<span class="windowsonly linuxonly">fn</span><span class="maconly">fn &#x1F310;&#xfe0e;</span>', 'notransform macbigkey');
        enableEditUI(true);
        txtInput.focus();
    });

    // Add Custom Button Functionality
    txtCustom.addEventListener('keyup', e => {
        if (e.key === "Enter") {
            e.preventDefault();

            addCustomBtn.click();
        }
    });

    addCustomBtn.addEventListener('click', function () {
        if (txtCustom.value === 'Blank' || txtCustom.value === '') {
            displayContent.innerHTML += keyString(' ', '');
        } else {
            let displayClass = displayClassForKey(txtCustom.value);
            if (!displayClass) displayClass = "notransform";
            displayContent.innerHTML += keyString(txtCustom.value, displayClass);
        }
        enableEditUI(true);
        txtInput.focus();
    });

    // Clear button functionality
    clearBtn.addEventListener('click', function () {
        displayContent.innerHTML = "";
        enableEditUI(false);
        txtCustom.value = "";
        modifierCountMap.Alt = 0;
        modifierCountMap.Control = 0;
        modifierCountMap.Shift = 0;
        modifierCountMap.Meta = 0;
        txtInput.textContent = "";
        txtInput.focus();
    });

    // Backspace button functionality
    backspaceBtn.addEventListener('click', function () {
        const lastElement = displayContent.querySelector('span.key:last-child');
        if (lastElement) {
            displayContent.removeChild(lastElement);
        }

        if (displayContent.childNodes.length === 0) {
            enableEditUI(false);
        }
        txtInput.focus();
    });

    // Settings functionality
    const GRADIENT_START_STORAGE_KEY = 'cuekeyGradientStart';
    const GRADIENT_END_STORAGE_KEY = 'cuekeyGradientEnd';
    const GRADIENT_ANGLE_STORAGE_KEY = 'cuekeyGradientAngle';
    const KEY_TEXT_COLOR_STORAGE_KEY = 'cuekeyTextColor';
    const KEY_GAP_STORAGE_KEY = 'cuekeyGap';
    const OS_TYPE_STORAGE_KEY = 'cuekeyOsType';
    const KEY_TYPE_STORAGE_KEY = 'cuekeyKeyType';

    const normalizeColorValue = (colorString) => {
        if (!colorString) return '#000000';
        const trimmed = colorString.trim();
        if (trimmed.startsWith('#')) {
            if (trimmed.length === 4) {
                const [, r, g, b] = trimmed;
                return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
            }
            return trimmed.toLowerCase();
        }

        const rgbMatch = trimmed.match(/^rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
        if (rgbMatch) {
            const toHex = (value) => parseInt(value, 10).toString(16).padStart(2, '0');
            return `#${toHex(rgbMatch[1])}${toHex(rgbMatch[2])}${toHex(rgbMatch[3])}`.toLowerCase();
        }

        return '#000000';
    }

    const normalizeAngleValue = (angleString) => {
        if (angleString == null) return 0;
        const parsed = parseFloat(angleString);
        if (!Number.isNaN(parsed)) return ((parsed % 360) + 360) % 360;
        return 0;
    }

    const getCurrentSettings = () => {
        const computed = getComputedStyle(document.documentElement);
        return {
            start: normalizeColorValue(computed.getPropertyValue('--keycap-gradient-start')),
            end: normalizeColorValue(computed.getPropertyValue('--keycap-gradient-end')),
            angle: normalizeAngleValue(computed.getPropertyValue('--keycap-gradient-angle')),
            textColor: normalizeColorValue(computed.getPropertyValue('--keycap-text-color')),
            gap: computed.getPropertyValue('--key-gap').trim() || '0.5rem',
            os: document.body.getAttribute('data-os') || 'windows',
            keyStyle: document.body.classList.contains('chiclet') ? 'chiclet' : 'mechanical'
        };
    }

    const DEFAULT_SETTINGS = {
        start: '#646464',
        end: '#000000',
        angle: 135,
        textColor: '#ffffff',
        gap: '0.5rem',
        os: 'windows',
        keyStyle: 'mechanical'
    };

    const applyMechanicalKeyStyle = () => {
        settingsPreviewPanel.classList.remove('chiclet');
        settingsPreviewPanel.classList.add('mechanical');
        mechanicalTextColor.classList.remove('hidden-in-place');
        mechanicalTextGradient.classList.remove('hidden-in-place');
    }

    const applyChicletKeyStyle = () => {
        settingsPreviewPanel.classList.remove('mechanical');
        settingsPreviewPanel.classList.add('chiclet');
        mechanicalTextColor.classList.add('hidden-in-place');
        mechanicalTextGradient.classList.add('hidden-in-place');
    }

    const applySettings = (settings, persist = true) => {
        if (settings.start) document.documentElement.style.setProperty('--keycap-gradient-start', settings.start);
        if (settings.end) document.documentElement.style.setProperty('--keycap-gradient-end', settings.end);
        if (settings.angle !== undefined) document.documentElement.style.setProperty('--keycap-gradient-angle', `${settings.angle}deg`);
        if (settings.textColor) {
            document.documentElement.style.setProperty('--keycap-text-color', settings.textColor);
            document.documentElement.style.setProperty('--preview-keycap-text-color', settings.textColor);
        }
        if (settings.gap) document.documentElement.style.setProperty('--key-gap', settings.gap);

        if (settings.os) {
            document.body.setAttribute('data-os', settings.os);
            settingsPreviewPanel.setAttribute('data-os', settings.os);
            const rb = document.getElementById(`rb${settings.os.charAt(0).toUpperCase() + settings.os.slice(1)}`);
            if (rb) rb.checked = true;
        }

        if (settings.keyStyle) {
            if (settings.keyStyle === 'chiclet') {
                document.body.classList.add('chiclet');
                applyChicletKeyStyle();
            } else {
                document.body.classList.remove('chiclet');
                applyMechanicalKeyStyle();
            }
            const rb = document.getElementById(`rb${settings.keyStyle.charAt(0).toUpperCase() + settings.keyStyle.slice(1)}`);
            if (rb) rb.checked = true;
        }

        if (persist) {
            if (settings.start) localStorage.setItem(GRADIENT_START_STORAGE_KEY, settings.start);
            if (settings.end) localStorage.setItem(GRADIENT_END_STORAGE_KEY, settings.end);
            if (settings.angle !== undefined) localStorage.setItem(GRADIENT_ANGLE_STORAGE_KEY, settings.angle.toString());
            if (settings.textColor) localStorage.setItem(KEY_TEXT_COLOR_STORAGE_KEY, settings.textColor);
            if (settings.gap) localStorage.setItem(KEY_GAP_STORAGE_KEY, settings.gap);
            if (settings.os) localStorage.setItem(OS_TYPE_STORAGE_KEY, settings.os);
            if (settings.keyStyle) localStorage.setItem(KEY_TYPE_STORAGE_KEY, settings.keyStyle);
        }
    }

    const loadSettings = () => {
        const settings = { ...DEFAULT_SETTINGS };
        try {
            const start = localStorage.getItem(GRADIENT_START_STORAGE_KEY);
            const end = localStorage.getItem(GRADIENT_END_STORAGE_KEY);
            const angle = localStorage.getItem(GRADIENT_ANGLE_STORAGE_KEY);
            const textColor = localStorage.getItem(KEY_TEXT_COLOR_STORAGE_KEY);
            const gap = localStorage.getItem(KEY_GAP_STORAGE_KEY);
            const os = localStorage.getItem(OS_TYPE_STORAGE_KEY);
            const keyStyle = localStorage.getItem(KEY_TYPE_STORAGE_KEY);

            if (start) settings.start = start;
            if (end) settings.end = end;
            if (angle) settings.angle = parseFloat(angle);
            if (textColor) settings.textColor = textColor;
            if (gap) settings.gap = gap;
            if (os) settings.os = os;
            if (keyStyle) settings.keyStyle = keyStyle;
        } catch (e) { console.warn("Load settings failed", e); }
        return settings;
    }

    // Initialize UI
    const initialSettings = loadSettings();
    applySettings(initialSettings, false);

    settingsBtn.addEventListener('click', () => {
        const current = getCurrentSettings();
        gradientStartInput.value = current.start;
        gradientEndInput.value = current.end;
        gradientAngleInput.value = current.angle;
        gradientAngleValue.textContent = `${current.angle}°`;
        keyTextColorInput.value = current.textColor;
        const gapNum = parseFloat(current.gap);
        keyGapInput.value = gapNum;
        keyGapValueDisplay.textContent = `${gapNum}rem`;

        applySettings(current, false); // Update preview
        settingsDialog.showModal();
    });

    rbWindows.addEventListener('change', () => {
        settingsPreviewPanel.setAttribute('data-os', 'windows');
    });

    rbMac.addEventListener('change', () => {
        settingsPreviewPanel.setAttribute('data-os', 'mac');
    });

    rbLinux.addEventListener('change', () => {
        settingsPreviewPanel.setAttribute('data-os', 'linux');
    });

    rbMechanical.addEventListener('change', () => {
        applyMechanicalKeyStyle();
    });

    rbChiclet.addEventListener('change', () => {
        applyChicletKeyStyle();
    });

    const updatePreviewFromInputs = () => {
        document.documentElement.style.setProperty('--preview-keycap-gradient-angle', `${gradientAngleInput.value}deg`);
        document.documentElement.style.setProperty('--preview-keycap-gradient-start', gradientStartInput.value);
        document.documentElement.style.setProperty('--preview-keycap-gradient-end', gradientEndInput.value);
    }

    gradientStartInput.addEventListener('input', updatePreviewFromInputs);
    gradientEndInput.addEventListener('input', updatePreviewFromInputs);
    gradientAngleInput.addEventListener('input', () => {
        gradientAngleValue.textContent = `${gradientAngleInput.value}°`;
        updatePreviewFromInputs();
    });

    keyGapInput.addEventListener('input', () => {
        keyGapValueDisplay.textContent = `${keyGapInput.value}rem`;
        document.documentElement.style.setProperty('--preview-key-gap', `${keyGapInput.value}rem`);
    });

    resetGapBtn.addEventListener('click', () => {
        keyGapInput.value = 0.5;
        keyGapValueDisplay.textContent = `0.5rem`;
        document.documentElement.style.setProperty('--preview-key-gap', `0.5rem`);
    });

    keyTextColorInput.addEventListener('input', () => {
        document.documentElement.style.setProperty('--preview-keycap-text-color', keyTextColorInput.value);
    });

    resetTextColorBtn.addEventListener('click', () => {
        keyTextColorInput.value = '#ffffff';
        document.documentElement.style.setProperty('--preview-keycap-text-color', '#ffffff');
    });

    gradientResetButton.addEventListener('click', () => {
        gradientStartInput.value = DEFAULT_SETTINGS.start;
        gradientEndInput.value = DEFAULT_SETTINGS.end;
        gradientAngleInput.value = DEFAULT_SETTINGS.angle;
        gradientAngleValue.textContent = `${DEFAULT_SETTINGS.angle}°`;
        updatePreviewFromInputs();
    });

    settingsDialog.addEventListener('close', () => {
        if (settingsDialog.returnValue === 'apply') {
            const os = document.querySelector('input[name="ostype"]:checked').value;
            const keyStyle = document.querySelector('input[name="keytype"]:checked').value;

            applySettings({
                start: gradientStartInput.value,
                end: gradientEndInput.value,
                angle: parseFloat(gradientAngleInput.value),
                textColor: keyTextColorInput.value,
                gap: `${keyGapInput.value}rem`,
                os: os,
                keyStyle: keyStyle
            });
        }
    });
});