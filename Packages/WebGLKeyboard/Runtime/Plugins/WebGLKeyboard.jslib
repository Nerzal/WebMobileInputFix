mergeInto(LibraryManager.library, {
    SetWebGLKeyboardCallbacks: function (submitInput, updateInput)
    {
        Module.WebGLKeyboard.submitInputPtr = submitInput;
        Module.WebGLKeyboard.updateInputPtr = updateInput;
    },

    OpenInputKeyboard: function (currentValue, type, maxlength)
    {
        Module.WebGLKeyboard.formElement.style.visibility="visible";
        var input = Module.WebGLKeyboard.inputElement;
        input.value = '';
        input.type = UTF8ToString(type);
        input.value = UTF8ToString(currentValue);
        if (maxlength <= 0)
        {
          maxlength = -1;
        }
        input.maxlength = maxlength;
        Module.WebGLKeyboard.AddOpenWebGLKeyboardListeners();
    },

    RequestFullScreen: function() {
        unityInstance.SetFullscreen(1)
    },

    DisableFullScreen: function() {
        unityInstance.SetFullscreen(0)
    },

    CloseInputKeyboard: function ()
    {
        Module.WebGLKeyboard.inputElement.blur();
        Module.WebGLKeyboard.inputElement.value = '';
        Module.WebGLKeyboard.formElement.style.visibility = 'hidden';
    },

    SetCaretPosition: function(pos)
    {
        var input = Module.WebGLKeyboard.inputElement;
        if (input.type === "text" || input.type === "tel" || input.type==="search" || input.type === "url"
            || input.type === "password" || input.type === "number")
        {
            if(input.setSelectionRange) // normal browsers
            {
                if (input.type === "number")
                {
                  input.type = 'text';
                  input.setSelectionRange(pos,pos);
                  input.type = 'number';
                } else {
                  input.setSelectionRange(pos,pos);
                }
            }
            else if (input.createTextRange)  // IE8 and below
            {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
    },

    SetSelectionInKeyboard: function(start,end)
    {
        var input = Module.WebGLKeyboard.inputElement;
        if (input.type === "text" || input.type === "tel" || input.type==="search" || input.type === "url"
            || input.type === "password" || input.type === "number")
        {
            if(input.setSelectionRange) // normal browsers
            {
                if (input.type === "number")
                {
                  input.type = 'text';
                  input.setSelectionRange(start,end);
                  input.type = 'number';
                } else {
                  input.setSelectionRange(start,end);
                }
            }
            else if (input.createTextRange)  // IE8 and below
            {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        }
    }
});