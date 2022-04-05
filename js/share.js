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

function kakaoShare2(shareTitle, shareText, shareURL) {
  console.log(shareTitle)
  console.log(shareText)
  console.log(shareURL)

  Kakao.Link.sendDefault({
    objectType: 'text',
    text: shareTitle + "\n" + shareText,
    link: {
      mobileWebUrl: shareURL,
      webUrl: shareURL,
    }
  });
}

function kakaoShare(shareTitle, shareText, shareURL) {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'shareTitle',
      description: 'shareText',
      imageUrl: '',
      link: {        
        webUrl: shareURL,
        mobileWebUrl: shareURL,
      },
    },
    itemContent: {
      profileText: shareTitle,      
      items: [
        {
          item: shareText,
          itemOp: shareText
        },
        {
          item: shareText,
          itemOp: shareText
        },
        {
          item: shareText,
          itemOp: shareText
        },
        {
          item: shareText,
          itemOp: shareText
        },
        {
          item: shareText,
          itemOp: shareText
        },
      ],
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: shareURL,
        },
      }      
    ]
  });
}