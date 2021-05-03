# WebGL Keyboard
A Unity WebGL workaround to enable mobile input (virtual keyboard) be triggered by Input Fields

## What this fixes
When you try to interact with any input field in a WebGL application in mobile, the virtual keyboard will never be triggered. This is a fix to that. Also, this can be used to enable copy/paste to the input fields

## How to use
Simply add the `UGUIWebGLInputField` component to GameObjects with uGUI input fields, or `TMPWebGLInputField` component to GameObjects with TextMesh Pro input fields.

## How it works
This workaround is a combination of getting inputs natively from a HTML DOM input field and binds them to a uGUI or TMPro input field.
`UGUIWebGLInputField` and `TMPWebGLInputField` interact with the HTML DOM input field through `KeyboardController.cs`, `WebGLKeyboard.jslib` and `WebGLKeyboard.jspre` who acts as a bridge between Unity and the HTML page.

## Known problems
On some cases the device auto zoom would act, you can disable it by adding `viewport` `meta` element to the page header, with `user-scalable=no`.
Sample:
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```