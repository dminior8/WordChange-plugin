// window.onload = function() {
//     // teraz możemy bezpiecznie wysyłać wiadomości do skryptu tła
//     chrome.tabs.sendMessage({greeting: "hello"}, function(response) {
//         console.log(request.message);
//         if (response) {
//             console.log(response.farewell);
//         } else {
//             console.log('No response');
//         }
//     });

    const myButton = document.getElementById("myButton");
    const letterToReplaceInput = document.getElementById("letterToReplace");
    const newLetterInput = document.getElementById("newLetter");

    myButton.addEventListener("click", function () {
        const letterToReplace = letterToReplaceInput.value;
        const newLetter = newLetterInput.value;

        chrome.tabs.query({ 
            active: true, currentWindow: true }, function (tabs) {
            try {
                var activeTab = tabs[0];
                console.log("Sending message");
                chrome.tabs.sendMessage(activeTab.id, {
                    action: "changeLetter",
                    letterToReplace: letterToReplace,
                    newLetter: newLetter
                  }, window.onload = function(response) { //funkcja wykonywana po otrzymaniu odpowiedzi
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
