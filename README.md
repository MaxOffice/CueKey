# CueKey
Created by [Raj Chaudhuri](https://github.com/rajch) and [Dr Nitin Paranjape](https://efficiency365.com)

Create images of keyboard key sequences. Download as transparent PNG files.
This is useful for creating user manuals, instructional videos or educational content.

## Features
1. Supports individual keystrokes 
2. Supports combination keystrokes
3. Add Windows key
4. Add Blank key
5. Add custom key text
6. Scale image from 100% to 500%
7. Download transparent PNG file
8. Customize the key gradient colors

## How to use 
1. Type keystrokes individually
  * No need to type characters together.
  * For example, press and release `CTRL` key, then press and release `C` key.
  * Image for `CTRL` `C` is created.
2. Type key combination
  * Press multiple modifier keys and regular keys together.
  * For example, press `CTRL SHIFT C` keys together.
  * Image for `SHIFT` `CTRL` `C` is created.
3. Scale the image as needed
  * Default scale is 200%
  * Range is between 50% and 500% in 50% increments
4. Save image
  * Click the `Save PNG` button.
  * Transparent PNG file is saved in currently selected scale.
  * Currently, only PNG files are supported.

## Previewing the app locally

If you're working in a development environment (for example Codespaces, a local clone, or another IDE) you can load the
latest code changes in a browser with a lightweight static server.

1. Install dependencies if you don't already have an HTTP server available. Two common options are built in:
   * **Python 3** – included with most environments. You can start a server from the repository root with
     ```bash
     python3 -m http.server 8000
     ```
   * **Node.js** – if you prefer Node tooling, install `serve` once with `npm install -g serve` and then run
     ```bash
     serve . -l 8000
     ```
2. After the server starts, open the forwarded URL (`http://localhost:8000` in most cases) in your browser.
3. Interact with the UI to verify new features, including the **Gradient** button that opens the gradient customization
   dialog described below.

## How to correct mistakes
If you press Backspace key, it will generate an image for it.
To correct mistakes, click the `Bksp` button on top.
This will remove the last typed key.
Click the `❌Clear` button to delete all keystrokes.

## Pressing Windows key combinations
Some Windows key combinations have undesirable effects. 
For example, pressing the Windows key itself will open the Start menu or Pressing Windows key and L will lock the PC.
To avoid these side effects, click the `Add 🪟` button in menu.

## Blank key
If the key you want is not supported, use the Blank key - `Add` button.
This adds a key without anything written on it.
Save the image and add the text you need in any image or video editor.

## Custom keys
You can type any custom key name in the textbox and click `Add`.
Maximum of 15 characters are supported.
The image size will adjust automatically.

## Order of modifier keys
If modifier keys are pressed together, the order is `Windows` `SHIFT` `CTRL` `ALT`
If you want custom order, type each key individually.

## Feedback and Feature requests
Your feedback is welcome. Please post as Issues in GitHub.

## Testing the custom key gradient

Follow these manual steps to verify the gradient customization dialog works as expected:

1. Start a static file server in the repository root (for example, `python3 -m http.server 8000`) and open `http://localhost:8000` in a modern desktop browser.
2. Click the **Gradient** button in the toolbar. The dialog should display the current start and end colors in the color pickers and preview swatch.
3. Choose two distinct colors. Confirm the preview updates immediately to reflect the new gradient.
4. Press **Apply**. Existing keys on the canvas (or a new key you add by typing) should render with the selected gradient.
5. Reload the page. The toolbar button and keys should retain the colors you selected, confirming the gradient preference persisted to `localStorage`.
6. (Optional) Clear the browser storage entry `cuekeyGradientStart`/`cuekeyGradientEnd` to reset to the default gradient.

