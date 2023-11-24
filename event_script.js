window.changeText = changeText;
window.addEventListener('mousedown', window.changeText);

function getSelectionItem(activeElement, activeElementTagName) {
    if (
        (activeElementTagName === "textarea") || (activeElementTagName === "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeElement.type)) &&
        (typeof activeElement.selectionStart == "number")
    ) {
        return activeElement.value.slice(activeElement.selectionStart, activeElement.selectionEnd);
    } else if (window.getSelection) {
        return window.getSelection();
    }
}


function changeText(event) {
    const middleMouseButton = 2;
    if (event.which === middleMouseButton) {
        const activeElement = document.activeElement;
        const activeElementTagName = activeElement ? activeElement.tagName.toLowerCase() : null;
        const selection = getSelectionItem(activeElement, activeElementTagName);
        if (selection) {
            const selectionText = selection.toString().replace(',', '.').replace('h', '');
            if (selectionText.length && !isNaN(selectionText)) {
                const timeElements = selectionText.split('.');
                const hour = timeElements[0] || 0;
                let minute = timeElements[1] || 0;
                const isMinuteOneDigit = minute.length === 1;
                minute = isMinuteOneDigit ? minute * 10 : minute;
                const calculatedHour = hour + "h";
                const calculatedMinute = Math.trunc(minute * 0.6) + "m";
                const convertedTime = calculatedHour + " " + calculatedMinute;
                if (["input", "textarea"].includes(activeElementTagName)) {
                    activeElement.value = convertedTime;
                } else {
                    const range = selection.getRangeAt(0);
                    range.deleteContents();
                    const createdNode = document.createTextNode(convertedTime);
                    range.insertNode(createdNode)
                }
            }
        }
    }
}

