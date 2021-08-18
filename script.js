//TO DO : interval clear

//textToSpeak ??

const getVideoEndTiming = (storageText) => {
  const video = document.querySelector(".html5-main-video");
  const duration = video.duration;

  const callSpeechAPI = (currentTime) => {
    const percent = Math.round((currentTime / duration) * 100);

    console.log(percent, storageText);
    let utterance = new SpeechSynthesisUtterance(storageText);

    if (percent === 70 || percent === 80 || percent === 90) {
      console.log("hi");
      alert(storageText);
      speechSynthesis.speak(utterance);
    } else if (percent === 99) {
      alert(storageText);
      video.pause();
    }
  };
  const getCurrentTime = () => {
    const currentTime = video.currentTime;
    const ad = document.querySelector(".ytp-ad-text");
    video && !ad && callSpeechAPI(currentTime);
  };
  setInterval(getCurrentTime, 1000);
};
export default getVideoEndTiming;
