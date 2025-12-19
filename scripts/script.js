// Resize and prepare editor what loaded or window beign resized
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("htmlEditorTab").click();
    document.getElementById("resizeBar").style.left = window.innerWidth / 2 + "px";
    document.getElementById("editors").style.width = window.innerWidth / 2 + "px";
    document.getElementById("preview").style.width = (window.innerWidth / 2) - 15 + "px";
})
window.addEventListener("resize", function () {
    document.getElementById("resizeBar").style.left = window.innerWidth / 2 + "px";
    document.getElementById("editors").style.width = window.innerWidth / 2 + "px";
    document.getElementById("preview").style.width = (window.innerWidth / 2) - 15 + "px";
})
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
// - HTML
const HTMLeditor = ace.edit("HTMLeditor");
HTMLeditor.setTheme("ace/theme/nord_dark");
HTMLeditor.session.setMode("ace/mode/html");
HTMLeditor.setFontSize(14);
HTMLeditor.setReadOnly(false);
document.getElementById("HTMLeditor").addEventListener("keydown", function (e) {
    if (e.altKey && e.shiftKey && (e.key == "F")) {
        HTMLeditor.setValue(html_beautify(HTMLeditor.getValue()))
    }
});
HTMLeditor.session.on("change", updateCodeInIframe)
// - CSS
const CSSeditor = ace.edit("CSSeditor");
CSSeditor.setTheme("ace/theme/nord_dark");
CSSeditor.session.setMode("ace/mode/css");
CSSeditor.setReadOnly(false);
CSSeditor.setFontSize(14);
CSSeditor.session.on("change", updateCodeInIframe)
// - JS
const JSeditor = ace.edit("JSeditor");
JSeditor.setTheme("ace/theme/nord_dark");
JSeditor.session.setMode("ace/mode/javascript");
JSeditor.setReadOnly(false);
JSeditor.setFontSize(14);
JSeditor.session.on("change", updateCodeInIframe)
// Update code

function updateCodeInIframe() {
    document.getElementById("preview").srcdoc = "<!DOCTYPE html><html><head><style>" + CSSeditor.getValue() + "</style></head><body>" + HTMLeditor.getValue() + "<script>" + JSeditor.getValue() + "</script>" + "</body></html>"
}
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
        document.getElementById("preview").style.width = parseFloat(window.getComputedStyle(codespaceContainer).width) - newPosition - "15" + "px";
    }
})

