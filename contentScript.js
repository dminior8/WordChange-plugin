chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if (msg.action === "changeLetter") {
      const letterToReplace = request.letter;
      const newLetter = request.newLetter;
  
      // Pobierz wszystkie tekstowe węzły na stronie
      const textNodes = getTextNodes(document.body);
  
      // Iteruj przez tekstowe węzły i zamień litery w słowach
      textNodes.forEach(node => {
        let originalText = '';
        if (node) {
        originalText = node.nodeValue;
        }
        const modifiedText = changeLetterInWord(originalText, letterToReplace, newLetter);
  
        // Zamień tekst w węźle na zmodyfikowany tekst
        if (originalText !== modifiedText) {
          node.nodeValue = modifiedText;
               
      }});
  }});
});
  
  function getTextNodes(element) {
    // Funkcja pomocnicza do pobierania tekstowych węzłów z elementu i jego dzieci
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
  
    return textNodes;
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
  