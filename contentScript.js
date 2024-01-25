//contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received");
    if (request.action === "changeLetter") {
    //const wordToChange = request.word;
    const letterToReplace = request.letter;
    const newLetter = request.newLetter;

    const modifiedWord = changeLetterInWord(wordToChange, letterToReplace, newLetter);

    replaceTextInBody(document.body, wordToChange, modifiedWord);
  }else{
    console.log("Unknown action");
  }
});

function replaceTextInBody(element, searchTerm, replacement) {
  // Rekurencyjna funkcja do zamiany tekstu w elementach podrzędnych
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];

    if (node.nodeType === Node.TEXT_NODE) {
      // Jeśli to jest tekstowy węzeł, zamień odpowiednie wystąpienia tekstu
      const replacedText = node.textContent.replace(new RegExp(searchTerm, "gi"), replacement);
      node.textContent = replacedText;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Jeśli to jest element, wywołaj rekurencyjnie dla jego dzieci
      replaceTextInBody(node, searchTerm, replacement);
    }
  }
}

function changeLetterInWord(word, letterToReplace, newLetter) {
  const wordArray = word.split('');
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === letterToReplace) {
      wordArray[i] = newLetter;
    }
  }
  return wordArray.join('');
}
