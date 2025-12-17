// HTML Editor
setInterval(function () {
    let HTMLEditorSplitLines = document.getElementById("htmlInput").innerText.split("\n");
    if (HTMLEditorSplitLines.length > 0 && HTMLEditorSplitLines[HTMLEditorSplitLines.length - 1] === "") {
        HTMLEditorSplitLines.pop();
    }
    let HTMLEditorTotalLines = HTMLEditorSplitLines.length;

    document.getElementById("HTMLEditorIndexsDisplay").innerHTML = "";
    if (HTMLEditorTotalLines == 0) {
        HTMLEditorTotalLines = 1;
    }
    for (let i = 1; i < HTMLEditorTotalLines + 1; i = i + 1) {
        let HTMLindexNumber = document.createElement("div");
        HTMLindexNumber.style = "font-size: 10px;margin:0px;margin-left:1px;padding:0px;"
        HTMLindexNumber.innerHTML = i;
        document.getElementById("HTMLEditorIndexsDisplay").appendChild(HTMLindexNumber);
    }

    if (document.getElementById("htmlInput").textContent == "") {
        document.getElementById("HTMLEditorPlaceholder").style.display = "revert";
    } else {
        document.getElementById("HTMLEditorPlaceholder").style.display = "none";
    }
}, 100);

document.getElementById("HTMLEditor").addEventListener("keydown", function (e) {
    if ((e.key == "F") && (e.shiftKey) && (e.altKey)) {
        let UnbeautifyedHTML = document.getElementById("htmlInput").innerText;
        document.getElementById("htmlInput").innerText = html_beautify(UnbeautifyedHTML)
    }
})
document.getElementById("htmlInput").addEventListener("paste", function (e) {
    e.preventDefault();
    alert("pasted");
});

document.getElementById("htmlInput").addEventListener("input", function (e) {
    let HTMLEDITORInsertSymbolList = [
        { "input": "(", "insert": ")" },
        { "input": "[", "insert": "]" },
        { "input": "{", "insert": "}" },
        { "input": "\"", "insert": "\"" }
    ]
    for (let i = 0; i < HTMLEDITORInsertSymbolList.length; i = i + 1) {
        if (e.data == HTMLEDITORInsertSymbolList[i].input) {
            let HTMLEditorSelection = {
                range: window.getSelection().getRangeAt(0),
                index: 0
            }
            HTMLEditorSelection.range.insertNode(document.createTextNode(HTMLEDITORInsertSymbolList[i].insert));
            HTMLEditorSelection.range.setStart(HTMLEditorSelection.range.startContainer, HTMLEditorSelection.range.startOffset);
            HTMLEditorSelection.range.setEnd(HTMLEditorSelection.range.startContainer, HTMLEditorSelection.range.startOffset);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(HTMLEditorSelection.range)
        }
    }
    if (e.data == ">") {
        let HTMLEditorSelection = {
            range: window.getSelection().getRangeAt(0),
            index: 0
        }
        let HTMLcopyRange = HTMLEditorSelection.range.cloneRange();
        HTMLcopyRange.selectNodeContents(htmlInput);
        HTMLcopyRange.setEnd(HTMLEditorSelection.range.startContainer, HTMLEditorSelection.range.startOffset);
        let HTMLLastOpenTag = HTMLcopyRange.toString().lastIndexOf("<");
        let fillHTMLTagText = HTMLcopyRange.toString().substring(HTMLLastOpenTag + 1, HTMLcopyRange.toString().length - 1)

        if ((fillHTMLTagText != "input") && (fillHTMLTagText != "!DOCTYPE html") && (fillHTMLTagText != "hr") && (fillHTMLTagText != "br") && (fillHTMLTagText != "link") && (fillHTMLTagText != "meta")) {
            HTMLEditorSelection.range.insertNode(document.createTextNode("</" + fillHTMLTagText + ">"));
            HTMLEditorSelection.range.setStart(HTMLEditorSelection.range.startContainer, HTMLEditorSelection.range.startOffset);
            HTMLEditorSelection.range.setEnd(HTMLEditorSelection.range.startContainer, HTMLEditorSelection.range.startOffset);

            window.getSelection().removeAllRanges();
            window.getSelection().addRange(HTMLEditorSelection.range)
        }
    }
})
