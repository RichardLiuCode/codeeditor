// HTML Editor

setInterval(function () {
    let HTMLEditor = {
        splitLines: document.getElementById("htmlInput").innerText.split("\n"),
        AllLines: 0,
        EmptyLines: 0,
        TextLines: 0
    }
    document.getElementById("HTMLEditorIndexsDisplay").innerHTML = "";
    for (let i = 0; i < HTMLEditor.splitLines.length; i = i + 1) {
        if (HTMLEditor.splitLines[i] == "") {
            HTMLEditor.EmptyLines++;
        } else {
            HTMLEditor.TextLines++
        }
    }
    HTMLEditor.EmptyLines = HTMLEditor.EmptyLines / 2
    HTMLEditor.AllLines = HTMLEditor.TextLines + HTMLEditor.EmptyLines
    if (HTMLEditor.AllLines != Math.round(HTMLEditor.AllLines)) {
        HTMLEditor.AllLines = HTMLEditor.AllLines.toFixed(0);
        HTMLEditor.AllLines = HTMLEditor.AllLines - 1;
    }
    if (HTMLEditor.AllLines == 0) {
        HTMLEditor.AllLines = 1;
    }
    for (let i = 1; i < HTMLEditor.AllLines + 1; i = i + 1) {
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
}, 200);

document.getElementById("HTMLEditor").addEventListener("keydown", function (e) {
    if ((e.key == "F") && (e.shiftKey) && (e.altKey)) {
        document.getElementById("htmlInput").innerText = html_beautify(document.getElementById("htmlInput").innerText);
    }
})
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