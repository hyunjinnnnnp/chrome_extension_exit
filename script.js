//TO DO : interval clear

//textToSpeak ??

const getVideoEndTiming = () => {
  const video = document.querySelector(".html5-main-video");
  const duration = video.duration;

  const callSpeechAPI = (currentTime) => {
    const result = (currentTime / duration) * 100;
    console.log(Math.round(result), currentTime, duration);
    //isTrue ? 이걸 result로 보낸다?

    // if (
    //   Math.round(result) === 70 ||
    //   Math.round(result) === 80 ||
    //   Math.round(result) === 90
    // ) {
    //   isTrue = true;
    //   console.log("heelo");
    //   // chrome.storage.sync.get("storageText", ({ storageText }) => {
    //   //   let utterance = new SpeechSynthesisUtterance(storageText);
    //   //        speechSynthesis.speak(utterance);
    //   //      });
    //   // speechSynthesis.pause();
    // } else {
    //   isTrue = false;
    // }
  };
  const getCurrentTime = () => {
    const currentTime = video.currentTime;
    const ad = document.querySelector(".ytp-ad-text");
    video && !ad && callSpeechAPI(currentTime);
  };
  setInterval(getCurrentTime, 1000);
};
const init = () => {
  getVideoEndTiming();
};
init();
