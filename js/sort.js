
  var valLiving = 0;
  var valTrans = 0;
  var valInfra = 0;
  var valEdu = 0;
  var valLiving_temp = 0;
  var valTrans_temp = 0;
  var valInfra_temp = 0;
  var valEdu_temp = 0;
  var sortSelection = ""

  function sleep (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  } 

  function initSorting(){
    sortSelection = "sortDefault"
  }

  function showSorting(){
    //$('.btn-close').hide()
    var titleHtml = "<div class='popupTitle'>총점 계산 가중치 설정 (BETA)</div>";
    titleHtml += "<div class='comment2'> 각 항목별 점수는 변하지 않으며, 가중치에 따라 총점을 다시 계산합니다.</div>";
    var footerHtml = ""

    /*
    var detailHtml = "<div class='filterArea'>";
    detailHtml += "<div class='filterRange'>"
    detailHtml += "<div>필터항목</div>"
    detailHtml += "<div>최소값</div>"
    detailHtml += "<div>"
    detailHtml += "<input type='range' class='form-range' min='0' max='30' step='0.5' value='0' id='minRange'>"   
    detailHtml += "<input type='range' class='form-range' min='0' max='30' step='0.5' value='30' id='maxRange'>"
    detailHtml += "</div>"    
    detailHtml += "<div>최대값</div>"
    detailHtml += "</div>";
    detailHtml += "</div>";
    */

    var detailHtml = "<div class='settingArea'>";
    detailHtml += "<div><input type='radio' class='btn-check' name='btnSort' autocomplete='off' id='sortDefault' onClick='setRangeValue(this)'><label class='btn btn-outline-danger' for='sortDefault'>균형잡힌</label></div>"
    detailHtml += "<div><input type='radio' class='btn-check' name='btnSort' autocomplete='off' id='sortLiving' onClick='setRangeValue(this)'><label class='btn btn-outline-danger' for='sortLiving'>주거우선</label></div>"

    if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
      detailHtml += "<div><input type='radio' class='btn-check' name='btnSort' autocomplete='off' id='sortTrans' onClick='setRangeValue(this)'><label class='btn btn-outline-danger' for='sortTrans'>교통우선</label></div>"
    }

    detailHtml += "<div><input type='radio' class='btn-check' name='btnSort' autocomplete='off' id='sortInfra' onClick='setRangeValue(this)'><label class='btn btn-outline-danger' for='sortInfra'>인프라우선</label></div>"
    detailHtml += "<div><input type='radio' class='btn-check' name='btnSort' autocomplete='off' id='sortEdu' onClick='setRangeValue(this)'><label class='btn btn-outline-danger' for='sortEdu'>교육우선</label></div>"
    detailHtml += "<div><input type='radio' class='btn-check' name='btnSort' autocomplete='off' id='sortCustom' onClick='setRangeValue(this)'><label class='btn btn-outline-danger' for='sortCustom'>커스텀</label></div>"
    detailHtml += "</div>";

    detailHtml += "<hr>";

    detailHtml += "<div class='rangeArea'>";
    
    detailHtml += "<div class='rangeName'>주거</div>"
    detailHtml += "<div class='rangeSet'><input type='range' class='form-range' min='0' max='100' step='5' value='50' id='rangeLiving' onInput='updateRangeValue(" + 'setLivingValue,' + 'this' + ")'/></div>";
    detailHtml += "<div class='rangeValue' id='setLivingValue'>50%</div>";

    if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
      detailHtml += "<div class='rangeName'>교통</div>"
      detailHtml += "<div class='rangeSet'><input type='range' class='form-range' min='0' max='100' step='5' value='50' id='rangeTrans' onInput='updateRangeValue(" + 'setTransValue,' + 'this' + ")'/></div>";
      detailHtml += "<div class='rangeValue' id='setTransValue'>50%</div>";
    }

    detailHtml += "<div class='rangeName'>인프라</div>"
    detailHtml += "<div class='rangeSet'><input type='range' class='form-range' min='0' max='100' step='5' value='50' id='rangeInfra' onInput='updateRangeValue(" + 'setInfraValue,' + 'this' + ")'/></div>";
    detailHtml += "<div class='rangeValue' id='setInfraValue'>50%</div>";

    detailHtml += "<div class='rangeName'>교육</div>"
    detailHtml += "<div class='rangeSet'><input type='range' class='form-range' min='0' max='100' step='5' value='50' id='rangeEdu' onInput='updateRangeValue(" + 'setEduValue,' + 'this' + ")'/></div>";
    detailHtml += "<div class='rangeValue' id='setEduValue'>50%</div>";    

    footerHtml += "<div class='modal-footer'>"
    //footerHtml += "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'><label class='form-check-label' for='flexCheckDefault'>이번 달에 보지 않기</label></div>"    
    footerHtml += "<div><button type='button' id='sortClose' class='btn btn-outline-danger' onClick='closeSorting()'>닫기</button></div>"
    footerHtml += "<div><button type='button' id='sortApply' class='btn btn-outline-danger' onClick='applySorting()'>적용</button></div>"    
    footerHtml += "</div>"    
    
    $('#exampleModalLabel').html(titleHtml);
    $('#aptDetail').html(detailHtml);
    $('#footer').html(footerHtml);

    $('#rangeLiving').prop("value", valLiving_temp)
    $('#rangeTrans').prop("value", valTrans_temp)
    $('#rangeInfra').prop("value", valInfra_temp)
    $('#rangeEdu').prop("value", valEdu_temp)

    $('#setLivingValue').html(valLiving_temp)
    $('#setTransValue').html(valTrans_temp)
    $('#setInfraValue').html(valInfra_temp)
    $('#setEduValue').html(valEdu_temp)
    
    $('#'+sortSelection).prop("checked", true)   

    if(sortSelection == "sortDefault" || sortSelection == "sortLiving" || sortSelection == "sortTrans" || sortSelection == "sortInfra" || sortSelection == "sortEdu"){
      $('#rangeLiving').prop("disabled", true)
      $('#rangeTrans').prop("disabled", true)
      $('#rangeInfra').prop("disabled", true)
      $('#rangeEdu').prop("disabled", true)
    }
    else{
      $('#rangeLiving').prop("disabled", false)
      $('#rangeTrans').prop("disabled", false)
      $('#rangeInfra').prop("disabled", false)
      $('#rangeEdu').prop("disabled", false)
    }

    $('#percentWarning').css({'visibility' : 'hidden'})    

    $('#sortApply').css({"border-radius": '5px', "background-color": "#ff3849", "color":"white", "height":"2.5em"})
    $('#sortClose').css({"border-radius": '5px', "background-color": "#ff3849", "color":"white", "height":"2.5em"})    
  }

  function setRangeValue(e){
    sortSelection = e.id

    if(sortSelection == "sortDefault" || sortSelection == "sortLiving" || sortSelection == "sortTrans" || sortSelection == "sortInfra" || sortSelection == "sortEdu"){
      $('#rangeLiving').prop("disabled", true)
      $('#rangeTrans').prop("disabled", true)
      $('#rangeInfra').prop("disabled", true)
      $('#rangeEdu').prop("disabled", true)
    }
    if(sortSelection == "sortDefault"){
      valLiving_temp = 0
      valTrans_temp = 0
      valInfra_temp = 0
      valEdu_temp = 0
    }    
    if(sortSelection == "sortLiving"){
      if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
        valLiving_temp = 100
        valTrans_temp = 20
        valInfra_temp = 40
        valEdu_temp = 40
      }
      else{
        valLiving_temp = 100
        valTrans_temp = 0
        valInfra_temp = 50
        valEdu_temp = 50
      }
    }
    if(sortSelection == "sortTrans"){
      valLiving_temp = 30
      valTrans_temp = 100
      valInfra_temp = 40
      valEdu_temp = 30
    }
    if(sortSelection == "sortInfra"){
      if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
        valLiving_temp = 20
        valTrans_temp = 30
        valInfra_temp = 100
        valEdu_temp = 50
      }
      else{
        valLiving_temp = 30
        valTrans_temp = 0
        valInfra_temp = 100
        valEdu_temp = 60
      }
    }
    if(sortSelection == "sortEdu"){
      if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
        valLiving_temp = 40
        valTrans_temp = 20
        valInfra_temp = 40
        valEdu_temp = 100
      }
      else{
        valLiving_temp = 50
        valTrans_temp = 0
        valInfra_temp = 50
        valEdu_temp = 100
      }
    }
    if(sortSelection == "sortCustom"){
      $('#rangeLiving').prop("disabled", false)
      $('#rangeTrans').prop("disabled", false)
      $('#rangeInfra').prop("disabled", false)
      $('#rangeEdu').prop("disabled", false)
    }

    //$('#rangeLiving').prop("value", valLiving_temp)
    //$('#rangeTrans').prop("value", valTrans_temp)
    //$('#rangeInfra').prop("value", valInfra_temp)
    //$('#rangeEdu').prop("value", valEdu_temp)

    $('#setLivingValue').html(valLiving_temp)
    $('#setTransValue').html(valTrans_temp)
    $('#setInfraValue').html(valInfra_temp)
    $('#setEduValue').html(valEdu_temp)

    //$("#rangeLiving").stop().animate()
    $("#rangeLiving").animate({ value: valLiving_temp}, 250, 'linear')
    //$("#rangeTrans").stop().animate()
    $("#rangeTrans").animate({ value: valTrans_temp}, 250, 'linear')
    //$("#rangeInfra").stop().animate()
    $("#rangeInfra").animate({ value: valInfra_temp}, 250, 'linear')
    //$("#rangeEdu").stop().animate()
    $("#rangeEdu").animate({ value: valEdu_temp}, 250, 'linear')
  }

  function updateRangeValue(idname, current){
    var val = current.value
    $('#' + idname.id).html(val);

    valLiving_temp = $('#rangeLiving').val();
    valTrans_temp = $('#rangeTrans').val();
    valInfra_temp = $('#rangeInfra').val();
    valEdu_temp = $('#rangeEdu').val();

    //console.log(valLiving_temp, valTrans_temp, valInfra_temp, valEdu_temp)
  }

  function closeSorting(){    
    $('div.modal').modal("hide")
  }
  function applySorting(){
    valLiving = valLiving_temp
    valTrans = valTrans_temp
    valInfra = valInfra_temp
    valEdu = valEdu_temp    

    if(sortSelection != "sortDefault"){
      showWeight()
      if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
        total = Number(valLiving) + Number(valTrans) + Number(valInfra) + Number(valEdu)      
        rearrange(aptData, valLiving/total, valTrans/total, valInfra/total, valEdu/total)
      }
      else{
        total = Number(valLiving) + Number(valInfra) + Number(valEdu)      
        rearrange(aptData, valLiving/total, 0, valInfra/total, valEdu/total)
      }
      
      aptSearch()
      $('html').scrollTop(0)
    }
    else{
      updateRegion()      
    }

    $('div.modal').modal("hide")
    sleep(250)
  }

  function rearrange(jsonData, living, trans, infra, edu){
    for(var i = 0 ; i < jsonData.data.length; i++){
      if(jsonData.data[i]["교통총점"] == "NA"){
        jsonData.data[i]["가치 총점"] = jsonData.data[i]["주거총점"]*living + jsonData.data[i]["인프라총점"]*infra + jsonData.data[i]["학군총점"]*edu
      }
      else{
        jsonData.data[i]["가치 총점"] = jsonData.data[i]["주거총점"]*living + jsonData.data[i]["교통총점"]*trans + jsonData.data[i]["인프라총점"]*infra + jsonData.data[i]["학군총점"]*edu
      }      
    }

    key = "가치 총점"
    type = "desc"
    data = jsonData.data
    var sortJSON = function(data, key, type) {
      if (type == undefined) {
        type = "asc";
      }
      return data.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (type == "desc") {
          return x > y ? -1 : x < y ? 1 : 0;
        } else if (type == "asc") {
          return x < y ? -1 : x > y ? 1 : 0;
        }
      });
    };

    sortData.data = sortJSON(data, key, type)

//    return sortData
  }