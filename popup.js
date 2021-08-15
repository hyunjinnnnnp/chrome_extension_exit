const body = document.querySelector("body");
const defaultText = "유정아 공부해야지";
let speechText = defaultText;
const userInputContainer = `
      <div class="container">
      <h4>현재 보고있는 영상이 끝나면 나올 텍스트 입력</h4>
      <textarea id="text">${defaultText}</textarea>
      <button>타이머 시작하기</button>
    </div>
`;
const indicator = `
  <div class="indicator">
    <span>유튜브가 아닌 웹사이트</span>
  </div>
`;

// let utterance = new SpeechSynthesisUtterance("공부해야지");
// speechSynthesis.speak(utterance);

//TO DO : interval clear

const getAlarmTiming = () => {
  const video = document.querySelector(".html5-main-video");
  const duration = video.duration;
  setInterval(() => {
    const currentTime = video.currentTime;
    const ad = document.querySelector(".ytp-ad-text");
    console.log(currentTime, duration);
    //TO DO : 50%, 70%, 80%, 85%, 90%, 95%, 100%를 구해서 이 때마다 speech API 호출
    //조건 : !ad
  }, 1000);
};

const getCurrentTab = async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getAlarmTiming,
  });
};

const getUserText = () => {
  const textarea = document.querySelector("textarea");
  textarea.addEventListener("change", (event) => {
    const userText = event.target.value;
    chrome.storage.sync.set({ storageText: userText });
    speechText = userText;
  });
  getCurrentTab();
};

const getStorageText = () => {
  const textarea = document.querySelector("textarea");
  chrome.storage.sync.get("storageText", ({ storageText }) => {
    if (storageText) {
      textarea.value = storageText;
      speechText = storageText;
    } else {
      textarea.value = defaultText;
    }
    getUserText();
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
