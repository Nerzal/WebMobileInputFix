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
        if(!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))){
            return;
        }
       // Module.ccall("SetFullscreen", null, [ "number" ], [ fullscreen ])
       var element = document.querySelector("#unity-container");

        if(element.requestFullscreen) {
            element.requestFullscreen()
            .then(function() {
                // element has entered fullscreen mode successfully
            })
            .catch(function(error) {
                // element could not enter fullscreen mode
                // error message
                console.log(error.message);
            });
        } else if(element.webkitRequestFullscreen) {  // iOS Safari
            element.webkitRequestFullscreen();
        }       
    },

    DisableFullScreen: function() {
        if(!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))){
            return;
        }
       // Module.ccall("SetFullscreen", null, [ "number" ], [ fullscreen ])

        if(document.exitFullscreen) {
            document.exitFullscreen()
            .then(function() {
                // element has exited fullscreen mode
            })
            .catch(function(error) {
                // element could not exit fullscreen mode
                // error message
                console.log(error.message);
            });
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
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