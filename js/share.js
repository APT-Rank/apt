function capture(){
  if(screen.width < 1024) {
    document.getElementById("viewport").setAttribute("content", "width=1200px");
  }
  html2canvas(document.querySelector("body")).then(canvas => {
    document.body.appendChild(canvas)
  });
}