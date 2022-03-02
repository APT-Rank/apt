function initSlide(){
  $(".rangeBar").css('left', 100/60*(minValue)-(100/60)+'%')
  $("#leftThumb").css('left', 100/60*(minValue)-(100/60)+'%')
  
  $(".rangeBar").css('right', 100 - ( 100/60*(maxValue)-(100/60) )+'%')
  $("#rightThumb").css('left', 100/60*(maxValue)-(100/60)+'%')

  $("#minRange").prop('value', minValue)
  $("#maxRange").prop('value', maxValue)

  $("#min_val").text(String((minValue/2).toFixed(1))+"억")
  $("#max_val").text(String((maxValue/2).toFixed(1))+"억")

  if(minValue == 0){
    if(maxValue == 60){
      $("#filterName").text("가격 전체")      
    }
    else{      
      $("#filterName").text(String((maxValue/2).toFixed(1))+"억 이하")
    }
  }
  else{
    if(maxValue == 60){      
      $("#filterName").text(String((minValue/2).toFixed(1))+"억 이상")
    }
    else{
      $("#filterName").text(String((minValue/2).toFixed(1))+"억" + "~" + String((maxValue/2).toFixed(1))+"억")      
    }
  }
}

function slideMin(e){  
  e.value=Math.min(e.value, e.parentNode.childNodes[2].value-1);
  var value=(100/(parseInt(e.max)-parseInt(e.min)))*parseInt(e.value)-(100/(parseInt(e.max)-parseInt(e.min)))*parseInt(e.min);
  minValue = e.value;
  //$(".leftBar").css('width', value+'%')
  $(".rangeBar").css('left', value+'%')
  $("#leftThumb").css('left', value+'%')  
  $("#min_val").text(String((e.value/2).toFixed(1))+"억")

  if(minValue == 0){
    if(maxValue == 60){
      $("#filterName").text("가격 전체")      
      $("#max_val").text(String((maxValue/2).toFixed(1))+"억")
    }
    else{
      $("#filterName").text(String((maxValue/2).toFixed(1))+"억 이하")
    }
  }
  else{
    if(maxValue == 60){      
      $("#filterName").text(String((e.value/2).toFixed(1))+"억 이상")      
    }
    else{      
      $("#filterName").text(String((e.value/2).toFixed(1))+"억" + "~" + String((maxValue/2).toFixed(1))+"억")
    }
  }
}

function slideMax(e){  
  e.value=Math.max(e.value, e.parentNode.childNodes[1].value-(-1));
  var value=(100/(parseInt(e.max)-parseInt(e.min)))*parseInt(e.value)-(100/(parseInt(e.max)-parseInt(e.min)))*parseInt(e.min);  
  maxValue = e.value;
  //$(".rightBar").css('width', 100-value+'%')
  $(".rangeBar").css('right', 100-value+'%')
  $("#rightThumb").css('left', value+'%')  
  $("#max_val").text(String((e.value/2).toFixed(1))+"억")

  if(minValue == 0){
    if(maxValue == 60){
      $("#filterName").text("가격 전체")
      $("#min_val").text(String((minValue/2).toFixed(1))+"억")      
    }
    else{
      $("#filterName").text(String((e.value/2).toFixed(1))+"억 이하")      
    }
  }
  else{
    if(maxValue == 60){
      $("#filterName").text(String((minValue/2).toFixed(1))+"억 이상")      
    }
    else{      
      $("#filterName").text(String((minValue/2).toFixed(1))+"억" + "~" + String((e.value/2).toFixed(1))+"억")
    }
  }
}