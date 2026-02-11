# CueKey
Created by [Raj Chaudhuri](https://github.com/rajch) and [Dr Nitin Paranjape](https://efficiency365.com)

Create images of keyboard key sequences. Download as transparent PNG files.
This is useful for creating user manuals, instructional videos or educational content.

## Features
1. Supports individual keystrokes 
2. Supports combination keystrokes
3. Add Windows/Command ⌘ key
4. Add Blank key
5. Add custom key text
6. Scale image from 50% to 500%
7. Download transparent PNG file
8. Two choices for key appearance: mechanical and chiclet 
9. Customize the mechanical key gradient colors

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
  * Default scale is 500%
  * Range is between 50% and 500% in 50% increments
4. Save image
  * Click the `Save PNG (⤓)` button.
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
To correct mistakes, click the `Backspace (⌫)` button on top.
This will remove the last typed key.
Click the `Clear (🗑)` button to delete all keystrokes.

## Pressing Windows key combinations
Some Windows key combinations have undesirable effects. For example, pressing the Windows key itself will open the Start menu or Pressing Windows key and L will lock the PC. To avoid these side effects, click the `Add 🪟` button in menu.

## Blank key
If the key you want is not supported, use the Blank key - `Add` button. This adds a key without anything written on it. Save the image and add the text you need in any image or video editor.

## Custom keys
You can type any custom key name in the textbox and click `Add`. Maximum 15 characters are supported. The image size will adjust automatically.

## Order of modifier keys
If modifier keys are pressed together, the order is `Windows/Command` `SHIFT` `CTRL` `ALT/Option`.
If you want a different order, type each key individually.

## Settings

Press the `Settings (⚙)` button to open settings. Here, you can:

* choose the platform: Windows, macOS or Linux
* choose the key style: Mechanical or Chiclet. If key style is mechanical, you can also choose:
    * Key text color
    * Key surface gradient
* choose the gap between keys

## Feedback and Feature requests
Your feedback is welcome. Please post as Issues in GitHub.
