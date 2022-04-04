var shareTitle = ""
var shareText = ""
var shareURL = ""

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