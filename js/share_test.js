var shareTitle = ""
var shareText = ""
var shareURL = ""
var kakaoShareText = []
var kakaoKey = "a8a036bfb275fc87317e07f76dccecb2"

function share(shareTitle, shareText, shareURL){
  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: shareText,
      url: shareURL
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    // fallback
    shareDialog.classList.add('is-open');
  }
}

function kakaoShare(shareTitle, shareText, shareURL) {
  Kakao.Link.sendDefault({
    objectType: 'text',
    text: shareTitle + shareText,
    link: {
      mobileWebUrl: shareURL,
      webUrl: shareURL,
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
      {
        title: '앱으로 이동',
        link: {
          androidExecutionParams: 'https://play.google.com/store/apps/details?id=com.aptrank.app'          
        },
      },
    ]
  });
}

function kakaoShareButton(shareTitle, shareText, shareURL) {
  Kakao.Link.createDefaultButton({
    container: '#kakao-link-btn',
    objectType: 'text',
    text: shareTitle + shareText,
    link: {
      mobileWebUrl: shareURL,
      webUrl: shareURL,
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
      {
        title: '앱으로 이동',
        link: {
          androidExecutionParams: 'https://play.google.com/store/apps/details?id=com.aptrank.app'          
        },
      },
    ]
  });
}