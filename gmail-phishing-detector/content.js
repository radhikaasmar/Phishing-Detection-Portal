// Listen for new emails being opened
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const emailBody = document.querySelector('.a3s.aiL');
    if (emailBody) {
      const emailText = emailBody.innerText;
      chrome.runtime.sendMessage({
        type: 'CHECK_EMAIL',
        text: emailText
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});