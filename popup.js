
// popup.js
    const myButton = document.getElementById("myButton");
    const letterToReplaceInput = document.getElementById("letterToReplace");
    const newLetterInput = document.getElementById("newLetter");

    document.getElementById("myButton").addEventListener("click", myClickHandler);
    function myClickHandler() {
    myButton.addEventListener("click", function () {
      const letterToReplace = letterToReplaceInput.value;
      const newLetter = newLetterInput.value;
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        try {
          chrome.tabs.sendMessage(
            tabs[0].id, {
              action: "changeLetter",
              letter: letterToReplace,
              newLetter: newLetter
            },
            function (response) {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
              } else {
                console.log(response);
              }
            }
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }
      });
    });
  }
  