// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

//확장 프로그램의 저장소에 저장된 값을 기반으로 팝업 버튼의 색상을 지정합니다.
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});
//이벤트 또는 특정 경우에 응답하여 실행해야 하는 콘텐츠 스크립트에 프로그래밍 방식 삽입을 사용합니다.
// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
