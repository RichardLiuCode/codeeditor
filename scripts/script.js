// Prepare application when loaded
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("htmlEditorTab").click();
    document.getElementById("resizeBar").style.left = window.innerWidth / 2 + "px";
    document.getElementById("editors").style.width = window.innerWidth / 2 + "px";
    document.getElementById("previewAreaWrapper").style.width = (window.innerWidth / 2) - 17 + "px";
});
window.addEventListener("resize", function () {
    document.getElementById("resizeBar").style.left = window.innerWidth / 2 + "px";
    document.getElementById("editors").style.width = window.innerWidth / 2 + "px";
    document.getElementById("previewAreaWrapper").style.width = (window.innerWidth / 2) - 17 + "px";
});
fetch("../iframeTemplate.html")
    .then(function (response) {
        return response.text();
    }).then(function (html) {
        html = html.replace("<!--|HTML|-->", HTMLeditor.getValue());
        html = html.replace("/*--|CSS|--*/", CSSeditor.getValue());
        html = html.replace("/*--|JavaScript|--*/", JSeditor.getValue());
        html = html.replace("--|AccessToken|--", IFRAMEACCESSTOKEN)
        document.getElementById("preview").srcdoc = html
    })
// - Iframe Token
const GernerateTokenCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
let token = "";
for (let i = 0; i < 5000; i++) {
    token = token + GernerateTokenCharacters[Math.floor(Math.random() * GernerateTokenCharacters.length)]
}
const IFRAMEACCESSTOKEN = token;
// Editor
// - Tabs
document.getElementById("htmlEditorTab").addEventListener("click", function () {
    this.style.backgroundColor = "rgba(138, 136, 136, 1)";
    document.getElementById("jsEditorTab").style.backgroundColor = "rgb(91, 90, 90)";
    document.getElementById("cssEditorTab").style.backgroundColor = "rgb(91, 90, 90)";
    document.getElementById("HTMLeditor").style.zIndex = 4;
    document.getElementById("CSSeditor").style.zIndex = 3;
    document.getElementById("JSeditor").style.zIndex = 2;
});
document.getElementById("cssEditorTab").addEventListener("click", function () {
    this.style.backgroundColor = "rgba(138, 136, 136, 1)";
    document.getElementById("jsEditorTab").style.backgroundColor = "rgb(91, 90, 90)";
    document.getElementById("htmlEditorTab").style.backgroundColor = "rgb(91, 90, 90)";
    document.getElementById("CSSeditor").style.zIndex = 4;
    document.getElementById("HTMLeditor").style.zIndex = 2;
    document.getElementById("JSeditor").style.zIndex = 3;
});
document.getElementById("jsEditorTab").addEventListener("click", function () {
    document.getElementById("htmlEditorTab").style.backgroundColor = "rgb(91, 90, 90)";
    document.getElementById("cssEditorTab").style.backgroundColor = "rgb(91, 90, 90)";
    this.style.backgroundColor = "rgba(138, 136, 136, 1)";
    document.getElementById("JSeditor").style.zIndex = 4;
    document.getElementById("CSSeditor").style.zIndex = 3;
    document.getElementById("HTMLeditor").style.zIndex = 2;
});
// run code shortcut
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        runCode();
    }
})
// - HTML
const HTMLeditor = ace.edit("HTMLeditor");
HTMLeditor.setTheme("ace/theme/nord_dark");
HTMLeditor.session.setMode("ace/mode/html");
HTMLeditor.setFontSize(14);
HTMLeditor.setReadOnly(false);
HTMLeditor.commands.addCommand({
    name: "format",
    bindKey: { win: "Alt-Shift-F" },
    exec: function () {
        HTMLeditor.setValue(html_beautify(HTMLeditor.getValue()))
    }
})

// - CSS
const CSSeditor = ace.edit("CSSeditor");
CSSeditor.setTheme("ace/theme/nord_dark");
CSSeditor.session.setMode("ace/mode/css");
CSSeditor.setReadOnly(false);
CSSeditor.setFontSize(14);
document.getElementById("CSSeditor").addEventListener("keydown", function (e) {
    if (e.altKey && e.shiftKey && (e.key == "F")) {
        CSSeditor.setValue(css_beautify(CSSeditor.getValue()))
    }
});
// - JS
const JSeditor = ace.edit("JSeditor");
JSeditor.setTheme("ace/theme/nord_dark");
JSeditor.session.setMode("ace/mode/javascript");
JSeditor.setReadOnly(false);
JSeditor.setFontSize(14);
document.getElementById("JSeditor").addEventListener("keydown", function (e) {
    if (e.altKey && e.shiftKey && (e.key == "F")) {
        JSeditor.setValue(html_beautify(JSeditor.getValue()))
    }
});

// Resize
let isDrag = false;
let startX;
let startLeft;

document.getElementById("resizeBar").addEventListener("mousedown", function (e) {
    isDrag = true;
    startX = e.x;
    startLeft = parseFloat(window.getComputedStyle(document.getElementById("resizeBar")).left);
})
document.getElementById("resizeBar").addEventListener("mouseup", function (e) {
    isDrag = false;
})
document.getElementById("codespaceContainer").addEventListener("mouseout", function (e) {
    isDrag = false;
})
document.addEventListener("mousemove", function (e) {
    if (isDrag) {
        let dx = e.clientX - startX;
        let newPosition = startLeft + dx;
        if (newPosition <= 100) {
            newPosition = 100
        }
        document.getElementById("resizeBar").style.left = newPosition + "px";
        document.getElementById("editors").style.width = newPosition + "px";
        document.getElementById("previewAreaWrapper").style.width = parseFloat(window.getComputedStyle(codespaceContainer).width) - newPosition - 17 + "px";
    }
})

// Update code

function runCode() {
    fetch("../iframeTemplate.html")
        .then(function (response) {
            return response.text();
        }).then(function (html) {
            html = html.replace("<!--|HTML|-->", HTMLeditor.getValue());
            html = html.replace("/*--|CSS|--*/", CSSeditor.getValue());
            html = html.replace("/*--|JavaScript|--*/", JSeditor.getValue());
            html = html.replace("--|AccessToken|--", IFRAMEACCESSTOKEN)
            document.getElementById("preview").srcdoc = html
        });
}

// Display Message that show code is running
setTimeout(function () {
    window.addEventListener("message", function (e) {
        if (e.data.verifyID == IFRAMEACCESSTOKEN && (e.origin.includes("http://127.0.0.1:5500") || e.origin.includes("https://richardliucode.github.io"))) {
            if (e.data.type == "request") {
                if (e.data.loaded) {
                    document.getElementById("codeRunningMessage").style.display = "flex";
                    setTimeout(function () {
                        document.getElementById("codeRunningMessage").style.display = "none";
                    }, 3000)
                }
            }
        }
    });
}, 5000)

// Display custom console.log() messages

window.addEventListener("message", function (e) {
    if (e.data.verifyID == IFRAMEACCESSTOKEN && (e.origin.includes("http://127.0.0.1:5500") || e.origin.includes("https://richardliucode.github.io"))) {
        if (e.data.type == "console") {
            let consoleLogMessage = document.createElement("div");
            consoleLogMessage.innerHTML = e.data.message;
            consoleLogMessage.style = "padding-left:4px;width:fit-content;margin-top:3px;"
            document.getElementById("console").appendChild(consoleLogMessage);
        }
    }
});

// Console Input 
document.getElementById("consoleInput").addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        document.getElementById("preview").contentWindow.postMessage({
            "type": "consoleInput",
            "verifyID": IFRAMEACCESSTOKEN,
            "content": document.getElementById("consoleInput").innerText
        }, "*");
    }
});