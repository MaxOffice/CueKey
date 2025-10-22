document.addEventListener('DOMContentLoaded', function () {
    const keyPanel = document.getElementById('keyPanel');
    const txtInput = document.getElementById('txtInput');
    const displayContent = document.getElementById('displayContent');
    const saveBtn = document.getElementById('saveBtn');
    const settingsBtn = document.getElementById('settingsBtn');
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
    const gradientBtn = document.getElementById('gradientBtn');
    const gradientDialog = document.getElementById('gradientDialog');
    const gradientStartInput = document.getElementById('gradientStart');
    const gradientEndInput = document.getElementById('gradientEnd');
    const gradientPreview = document.getElementById('gradientPreview');
    const gradientAngleInput = document.getElementById('gradientAngle');
    const gradientAngleValue = document.getElementById('gradientAngleValue');
    const gradientResetButton = document.getElementById('gradientResetButton');

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

    // Settings button functionality
    settingsBtn.addEventListener('click', function () {
        const settingDialog = document.getElementById('settingDialog');
        settingDialog.showModal();
    });

    // Settings dialog functionality
    const osTypeChanged = (e) => {
        document.body.setAttribute('data-os', e.target.value)
    }

    const keyTypeChanged = (e) => {
        const keytype = document.querySelector('dialog input[name="keytype"]:checked').value
        if (keytype === 'chiclet') {
            document.body.classList.add('chiclet');
        } else {
            document.body.classList.remove('chiclet')
        }
    }

    const choiceImageClicked = (e) => {
        const parentDiv = e.target.parentNode;
        const rb = parentDiv?.querySelector('input[type="radio"]');
        if (rb) rb.click();
    }

    // Handle OS type Change
    document.querySelectorAll('dialog input[name="ostype"]').forEach(
        item => item.addEventListener('click', osTypeChanged)
    );

    // Handle key type change 
    document.querySelectorAll('dialog input[name="keytype"]').forEach(
        item => item.addEventListener('click', keyTypeChanged)
    );

    // Make radio button images clickable
    document.querySelectorAll('dialog fieldset div>img').forEach(
        item => item.addEventListener('click', choiceImageClicked)
    );

    // Set initial values of settings
    if ((navigator.userAgent.indexOf('Mac ') > -1)) {
        document.getElementById('rbMac').checked = true;
        document.body.setAttribute('data-os', 'mac');
    }
    else if (navigator.userAgent.indexOf('Linux ') > -1) {
        document.getElementById('rbLinux').checked = true;
        document.body.setAttribute('data-os', 'linux');
    } else {
        document.getElementById('rbWindows').checked = true;
        document.body.setAttribute('data-os', 'windows');
    }

    // Gradient settings functionality
    const GRADIENT_START_STORAGE_KEY = 'cuekeyGradientStart';
    const GRADIENT_END_STORAGE_KEY = 'cuekeyGradientEnd';
    const GRADIENT_ANGLE_STORAGE_KEY = 'cuekeyGradientAngle';

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
        if (angleString == null) {
            return 0;
        }

        const parsed = parseFloat(angleString);
        if (!Number.isNaN(parsed)) {
            return ((parsed % 360) + 360) % 360;
        }

        const match = angleString.trim().match(/(-?\d+(?:\.\d+)?)deg/i);
        if (match) {
            const value = parseFloat(match[1]);
            if (!Number.isNaN(value)) {
                return ((value % 360) + 360) % 360;
            }
        }

        return 0;
    }

    const toAngleNumber = (value) => {
        if (typeof value === 'number') {
            if (!Number.isFinite(value)) {
                return 0;
            }
            return ((value % 360) + 360) % 360;
        }

        return normalizeAngleValue(value);
    }

    const getCurrentGradientSettings = () => {
        const computed = getComputedStyle(document.documentElement);
        return {
            start: normalizeColorValue(computed.getPropertyValue('--keycap-gradient-start')),
            end: normalizeColorValue(computed.getPropertyValue('--keycap-gradient-end')),
            angle: normalizeAngleValue(computed.getPropertyValue('--keycap-gradient-angle')),
        };
    }

    const DEFAULT_GRADIENT = getCurrentGradientSettings();

    const updateGradientPreview = (startColor, endColor, angle = DEFAULT_GRADIENT.angle) => {
        if (!gradientPreview) return;
        const angleValue = toAngleNumber(angle);
        gradientPreview.style.background = `linear-gradient(${angleValue}deg, ${startColor}, ${endColor})`;
    }

    const updateAngleDisplay = (angle = DEFAULT_GRADIENT.angle) => {
        if (!gradientAngleValue) return;
        const numeric = typeof angle === 'number' ? angle : parseFloat(angle);
        const fallback = toAngleNumber(DEFAULT_GRADIENT.angle);
        const angleValue = Number.isFinite(numeric)
            ? Math.min(Math.max(numeric, 0), 360)
            : fallback;
        gradientAngleValue.textContent = `${Math.round(angleValue)}°`;
    }

    const storeGradient = (startColor, endColor, angle) => {
        try {
            localStorage.setItem(GRADIENT_START_STORAGE_KEY, startColor);
            localStorage.setItem(GRADIENT_END_STORAGE_KEY, endColor);
            localStorage.setItem(GRADIENT_ANGLE_STORAGE_KEY, toAngleNumber(angle).toString());
        } catch (error) {
            console.warn('Unable to store gradient preferences.', error);
        }
    }

    const loadStoredGradient = () => {
        try {
            const start = localStorage.getItem(GRADIENT_START_STORAGE_KEY);
            const end = localStorage.getItem(GRADIENT_END_STORAGE_KEY);
            const angle = localStorage.getItem(GRADIENT_ANGLE_STORAGE_KEY);
            if (start && end) {
                return {
                    start,
                    end,
                    angle: angle !== null ? toAngleNumber(angle) : DEFAULT_GRADIENT.angle,
                };
            }
        } catch (error) {
            console.warn('Unable to load gradient preferences.', error);
        }
        return null;
    }

    const applyGradient = (startColor, endColor, angle = DEFAULT_GRADIENT.angle, persist = true) => {
        const normalizedAngle = toAngleNumber(angle);
        document.documentElement.style.setProperty('--keycap-gradient-start', startColor);
        document.documentElement.style.setProperty('--keycap-gradient-end', endColor);
        document.documentElement.style.setProperty('--keycap-gradient-angle', `${normalizedAngle}deg`);
        updateGradientPreview(startColor, endColor, normalizedAngle);
        updateAngleDisplay(normalizedAngle);
        if (persist) {
            storeGradient(startColor, endColor, normalizedAngle);
        }
    }

    updateAngleDisplay(DEFAULT_GRADIENT.angle);
    updateGradientPreview(DEFAULT_GRADIENT.start, DEFAULT_GRADIENT.end, DEFAULT_GRADIENT.angle);

    const storedGradient = loadStoredGradient();
    if (storedGradient) {
        applyGradient(storedGradient.start, storedGradient.end, storedGradient.angle, false);
    }

    if (gradientBtn && gradientDialog && gradientStartInput && gradientEndInput && gradientAngleInput && gradientResetButton) {
        const syncInputsToCurrent = () => {
            const { start, end, angle } = getCurrentGradientSettings();
            gradientStartInput.value = start;
            gradientEndInput.value = end;
            gradientAngleInput.value = angle;
            updateAngleDisplay(angle);
            updateGradientPreview(start, end, angle);
        }

        gradientBtn.addEventListener('click', () => {
            syncInputsToCurrent();
            gradientDialog.showModal();
        });

        const handleColorInput = () => {
            updateGradientPreview(gradientStartInput.value, gradientEndInput.value, gradientAngleInput.value);
        }

        gradientStartInput.addEventListener('input', handleColorInput);
        gradientEndInput.addEventListener('input', handleColorInput);

        gradientAngleInput.addEventListener('input', () => {
            updateAngleDisplay(gradientAngleInput.value);
            handleColorInput();
        });

        gradientResetButton.addEventListener('click', () => {
            gradientStartInput.value = DEFAULT_GRADIENT.start;
            gradientEndInput.value = DEFAULT_GRADIENT.end;
            gradientAngleInput.value = DEFAULT_GRADIENT.angle;
            updateAngleDisplay(DEFAULT_GRADIENT.angle);
            updateGradientPreview(DEFAULT_GRADIENT.start, DEFAULT_GRADIENT.end, DEFAULT_GRADIENT.angle);
        });

        gradientDialog.addEventListener('close', () => {
            if (gradientDialog.returnValue === 'apply') {
                applyGradient(gradientStartInput.value, gradientEndInput.value, gradientAngleInput.value);
            } else {
                // Reset preview to the active gradient if dialog dismissed
                const current = getCurrentGradientSettings();
                updateGradientPreview(current.start, current.end, current.angle);
                updateAngleDisplay(current.angle);
            }
        });
    }
});