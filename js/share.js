var shareTitle = ""
var shareText = ""
var shareURL = ""
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
  console.log(shareTitle)
  console.log(shareText)
  console.log(shareURL)
  Kakao.Link.sendDefault({    
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareText,
      imageUrl: '',
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
    ],
    // 카카오톡 미설치 시 카카오톡 설치 경로이동
    installTalk: true,
  })
}