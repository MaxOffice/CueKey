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
});