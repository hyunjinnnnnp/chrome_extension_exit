import getVideoEndTiming from "./script.js";
const body = document.querySelector("body");
let textToSpeak = "유정아 공부해야지";

const userInputContainer = `
      <div class="container">
      <h4>현재 보고있는 영상이 끝나면 나올 텍스트 입력</h4>
      <textarea id="text">${textToSpeak}</textarea>
      <button>타이머 시작하기</button>
    </div>
`;
const indicator = `
  <div class="indicator">
    <span>유튜브가 아닌 웹사이트</span>
  </div>
`;

const getCurrentTab = async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.storage.sync.get("storageText", ({ storageText }) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getVideoEndTiming,
      args: [storageText],
    });
  });
};

const getEditedText = () => {
  const textarea = document.querySelector("textarea");

  textarea.addEventListener("change", (event) => {
    const editedText = event.target.value;
    chrome.storage.sync.set({ storageText: editedText });
    textToSpeak = editedText;
  });
  getCurrentTab();
};

const getStorageText = () => {
  const textarea = document.querySelector("textarea");
  chrome.storage.sync.get("storageText", ({ storageText }) => {
    if (storageText) {
      textarea.value = storageText;
      textToSpeak = storageText;
    } else {
      textarea.value = textToSpeak;
    }
    getEditedText();
  });
};

const getCurrentTapURL = async () => {
  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url = tabs[0].url;
    const currentUrl = url.split("/")[2];
    if (currentUrl === "www.youtube.com") {
      body.innerHTML = userInputContainer;
      getStorageText();
    } else {
      body.innerHTML = indicator;
    }
  });
};

const init = () => {
  getCurrentTapURL();
};
init();
