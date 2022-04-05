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
  console.log(shareTitle)
  console.log(shareText)
  console.log(shareURL)
  Kakao.Link.sendDefault({    
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: '',
      imageUrl: '',
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
    itemContent: {
      profileText: shareText[0],
      profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      titleImageText: 'Cheese cake',
      titleImageCategory: 'Cake',
      items: [
        {
          item: '순위',
          itemOp: shareText[1],
        },
        {
          item: '최근 실거래',
          itemOp: shareText[2],
        },
        {
          item: '세대수',
          itemOp: shareText[3],
        },
        {
          item: '주차',
          itemOp: shareText[4],
        },
        {
          item: '가장 가까운 역',
          itemOp: shareText[5],
        },
      ],
      sum: 'Total',
      sumOp: '15000원',
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