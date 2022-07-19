function updateTopTable(month, region){
  $('#dataList').html("")
  //$('div.modal').modal("hide");    
  $('#sort').css("visibility", "hidden")
  $('#rearrange').css("visibility", "hidden")
  $('html').scrollTop(0)
  initSorting()

  if(Number(selectedMonth) < 202207){    
    var addon_html = "<div class='content'><div class='apt_name' style='text-align:center; padding-top: 2em'> TOP 300 정보는 <br> 2022년 7월부터 볼 수 있어요. </div></div>"
    $('#dataList').append(addon_html);
  }
  else{  
    url = "https://www.aptrank.kr/" + month + "/" + region + ".json"
    $('#dataList').html("");

    $.getJSON(url, function(json) {        
        sortData = json;
    })

    $.getJSON(url, function(json) {        
        aptData_original = json;
    })

    $.getJSON(url, function(json) {
        //console.log(json);
        aptData = json;         
        //sortData = json;
        itemNum = json.data.length;
        valueSum = 0;
        livingSum = 0;
        transportSum = 0;
        infraSum = 0;
        eduSum = 0;

        for(var i = 0 ; i < itemNum ; i++){
          var aptName = aptData.data[i]["아파트명"]
          var apt_m = aptData.data[i]["전용면적(m2)"]
          var apt_p = aptData.data[i]["전용면적(평)"]

          var apt_type = aptData.data[i]["매매타입"]

          var aptAddress = aptData.data[i]["도로명주소"]
          var aptAddress2 = aptData.data[i]["법정동주소"]
          var aptValue = Math.round( aptData.data[i]["우선총점"] * 100 ) / 100
          var house_num = aptData.data[i]["세대수.1"]
          var rank = aptData.data[i]["rank"].toFixed()
          var last_sales = aptData.data[i]["last_sales"].split(",")          
          var last_sales_date = last_sales[0].toString()
          var last_sales_price = last_sales[1].toString()
          var last_sales_area = last_sales[2]
          last_sales_date_short = last_sales_date.substr(2)

          valueSum += aptData.data[i]["우선총점"]
          livingSum += aptData.data[i]["주거총점"]
          transportSum += aptData.data[i]["교통총점"]
          infraSum += aptData.data[i]["인프라총점"]
          eduSum += aptData.data[i]["학군총점"]

          //가격필터 적용 시
          if(checkPrice(last_sales[1])){

            //console.log(valueSum)
            if(selectedSubRegion == "Trans_Top300" && i == 0){              
              var addon_html = "<div class='content' style='background-color: #ffdfde; border-bottom: 1px solid gray; padding-top: 0.5em; padding-bottom: 0.5em'><div class='apt_name' style='text-align:center; font-size: 0.75em;'> '출퇴근 교통'은 지하철이 있는 수도권과 광역시만 선정하고 있어요.</div></div>"
              addon_html += "<div class='listBox' data-bs-toggle='modal' data-bs-target='#exampleModal' id='myModal' onClick='showTopDetail(" + i + ")'>";
            }
            else{
              var addon_html = "<div class='listBox' data-bs-toggle='modal' data-bs-target='#exampleModal' id='myModal' onClick='showTopDetail(" + i + ")'>";
            }
            addon_html += "<div class='rank_content'>"
            addon_html += "<div class='ranksame'> TOP </div>"
            addon_html += "<div class='rank'><strong>" + rank + "</strong></div>";
            addon_html += "</div>"

            addon_html += "<div class='content'>";
            addon_html += "<div class='apt_name'>" + aptName;

            if(apt_type == "아파트"){
              addon_html += "<span class='aptYear'> (" + aptData.data[i]["준공년차"] + "년차)</span></div>";
            }
            if(apt_type == "재건축"){
              addon_html += "<span class='aptYear'> (" + aptData.data[i]["준공년차"] + "년차, 재건축)</span></div>";
            }
            if(apt_type == "분양권"){
              addon_html += "<span class='aptYear'> (분양권, " + aptData.data[i]["준공년월"].substr(0, 7) + " 예정)</span></div>";
            }
            
            if(last_sales_date == "1800-01-01"){
              addon_html += "<div class='apt_info'>" + house_num.toLocaleString() + "세대 / <span class='aptPrice'>거래 정보 없음</span></div>";
            }
            else{
              addon_html += "<div class='apt_info'>"+ house_num.toLocaleString() + "세대 / <span class='aptPrice'>" + Math.round(last_sales_price/100)/100 + "억, " + last_sales_area + ", " + last_sales_date_short + "</span></div>";
            }

            addon_html += "<div class='apt_address'>" + aptAddress2 + "</div>";
            addon_html += "</div>";
            addon_html += "<div class='value_score'>" + ( Math.round( aptValue * 100 ) / 100 ).toFixed(2) + "점</div>"
            addon_html += "</div>"

            $('#dataList').append(addon_html);
          }         
        }
        $('#dataList').append("<div style='height: 1.5em'></div>");
        if(!(minValue == 0 && maxValue == 60)){
          $(".aptPrice").css({'color': '#fe4040', 'font-weight': '600'})
        }
    })    
    showWeight()
    saveLocalStorage()
  }
}

function showTopDetail(index){
  $('#aptDetail').html("")
  titleHtml = "";
  detailHtml = "";
  footerHtml = "";

  aptData = sortData
  var aptRank = "TOP " + aptData.data[index]['rank']
  var aptRank_copy = "TOP " + aptData.data[index]['rank']

  var aptName = aptData.data[index]["아파트명"]
  var apt_m = aptData.data[index]["전용면적(m2)"]
  var apt_p = aptData.data[index]["전용면적(평)"]
  var apt_type = aptData.data[index]["매매타입"]
  var aptAddress = aptData.data[index]["도로명주소"]
  var aptValue = Math.round( aptData.data[index]["우선총점"] * 100 ) / 100;
  var aptDuration = aptData.data[index]["준공년차"]
  var aptYear = ""

  
  if(apt_type == "아파트"){        
    aptYear = aptData.data[index]["준공년월"] + " (" + aptDuration + "년차)"        
  }
  if(apt_type == "재건축"){        
    aptYear = aptData.data[index]["준공년월"] + " (" + aptDuration + "년차, 재건축)"        
  }
  if(apt_type == "분양권"){
    aptYear = "(분양권, " + aptData.data[index]["준공년월"].substr(0, 7) + " 예정)"        
  }
  var nearestStation = aptData.data[index]["가까운역이름"] + "역" + "(" + ( Math.round( aptData.data[index]["가까운역거리"] * 100 ) / 100 ).toFixed()  + "m)"
  var stationArea = aptData.data[index]["역세권여부"]
  var stationPoint_30m = aptData.data[index]["30분이내주요거점역"]
  var stationPoint_1h = aptData.data[index]["1시간이내주요거점역"]
  var departmentStore_3km = aptData.data[index]["3km이내백화점수"] + "개"
  var OutletMall_5km = aptData.data[index]["5km이내아울렛몰수"] + "개"
  var bigMart_1km = aptData.data[index]["1km이내대형먀트수"] + "개"
  var bank_500m = aptData.data[index]["500m이내은행수"] + "개"
  var hospital_500m = aptData.data[index]["500m이내병원수"] + "개"
  var bigHospital_5km = aptData.data[index]["5km이내대형병원수"] + "개"
  var park_500m = aptData.data[index]["500m이내공원수"] + "개"
  var big_park_1km = aptData.data[index]["800m이내대형공원수"] + "개"
  var harmful_3km = aptData.data[index]["3km이내혐오시설수"] + "개"
  var pSchool_edu = aptData.data[index]["초등학교학업성취도"]
  var pSchool_distance = aptData.data[index]["초등학교거리"]
  var mSchool_edu = aptData.data[index]["중학교학업성취도"] + "%"
  var academy_edu = aptData.data[index]["500m이내학원가"] + "개" + "(총 " + aptData.data[index]["500m이내학원수"] + "개 학원)"
  var market_infra = aptData.data[index]["300m이내상권"] + "개" + "(총 " + aptData.data[index]["300m이내점포수"] + "개 지점)"
  var livingScore = ( Math.round( aptData.data[index]["주거총점"] * 100 ) / 100 ).toFixed(2)
  var transportScore = ( Math.round( aptData.data[index]["교통총점"] * 100 ) / 100 ).toFixed(2)
  var infraScore = ( Math.round( aptData.data[index]["인프라총점"] * 100 ) / 100 ).toFixed(2)
  var eduScore = ( Math.round( aptData.data[index]["학군총점"] * 100 ) / 100 ).toFixed(2)
  var area_info = aptData.data[index]["area_info"]
  var area_array = area_info.split(",")
  var maintainance = aptData.data[index]["maintenance"]
  var rooms = aptData.data[index]["room"]
  var baths = aptData.data[index]["bath"]
  var house_num = aptData.data[index]["세대수.1"]
  var parking = aptData.data[index]["주차"]
  var heating = aptData.data[index]["난방"]
  var entrance = aptData.data[index]["현관구조"]
  var sales_info = aptData.data[index]["sales_info"]
  var price_per = aptData.data[index]["price_per"]

  var searchCode = aptData.data[index]["검색코드"]
  var coord_y = aptData.data[index]["Y"]
  var coord_x = aptData.data[index]["X"]

  var drink_pub = aptData.data[index]["300m이내유흥주점"]
  var daran_pub = aptData.data[index]["300m이내단란주점"]
  var motel = aptData.data[index]["300m이내모텔"]

  var last_sales = aptData.data[index]["last_sales"].split(",")
  var last_sales_date = last_sales[0].toString()
  var last_sales_price = last_sales[1].toString()
  var last_sales_area = last_sales[2]

  var floor_rate = ""
  if(aptData.data[index]["용적률"] == "0"){
    floor_rate = "--%"
  }
  else{
    floor_rate = aptData.data[index]["용적률"] + "%"
  }

  var cover_rate = ""
  if(aptData.data[index]["건폐율"] == "0"){
    cover_rate = "--%"
  }
  else{
    cover_rate = aptData.data[index]["건폐율"] + "%"
  }

  //타이틀
  //titleHtml += "<div class='popupTitle'>" + aptName + " " + apt_p + "(" + apt_m + ")</div>";
  titleHtml += "<div class='popupTitle'>" + aptName + "</div>";
  titleHtml += "<div class='popupSubtitle'>" + aptYear + "</div>";

  if(apt_type == "분양권"){
    titleHtml += "<div class='popupSubtitle'>" + aptData.data[index]["법정동주소"] + "</div>";
  }
  else{
    titleHtml += "<div class='popupSubtitle' style='font-size: 0.6em'>(신) " + aptAddress + "</div>";
    titleHtml += "<div class='popupSubtitle' style='font-size: 0.6em'>(구) " + aptData.data[index]["법정동주소"] + "</div>";
  }    

  //총점,순위
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";

  detailHtml += "<div class='popupSubtitle' style='font-size: 0.75em; text-align: center'>- " + $('#sido option:selected').text() + " " + $('#gungu option:selected').text() + " -</div>"
  detailHtml += "<div class='popRank'><strong>" + aptRank + "</strong></div></div>";

  detailHtml += "<div class='card-body' style='padding-top: 2px'>";
  detailHtml += "<div class='graph' style='height: 200px'> <canvas id='valueChart'></canvas></div>"
  detailHtml += "<div class='comment'>(전국 모든 단지에 대해 100점으로 환산한 상대 점수 입니다.)</div>";
  detailHtml += "</div></div>"

  $('#aptDetail').append(detailHtml);

  if(selectedSubRegion == "Living_Top300" || selectedSubRegion == "Balanced_Top300"){
    //주거
    livingCard(aptData, index)  

    //교통
    if(transportScore != 0){    
      transCard(aptData, index)    
    }
    //인프라
    infraCard(aptData, index)  

    //교육
    eduCard(aptData, index)
  }
  if(selectedSubRegion == "Trans_Top300"){
    //교통
    if(transportScore != 0){    
      transCard(aptData, index)    
    }

    //주거
    livingCard(aptData, index)
    
    //인프라
    infraCard(aptData, index)  

    //교육
    eduCard(aptData, index)
  }
  if(selectedSubRegion == "Infra_Top300"){
    //인프라
    infraCard(aptData, index)

    //주거
    livingCard(aptData, index)  

    //교통
    if(transportScore != 0){    
      transCard(aptData, index)    
    }

    //교육
    eduCard(aptData, index)
  }
  if(selectedSubRegion == "Edu_Top300"){
    //교육
    eduCard(aptData, index)

    //주거
    livingCard(aptData, index)  

    //교통
    if(transportScore != 0){    
      transCard(aptData, index)    
    }
    //인프라
    infraCard(aptData, index)       
  }

  avgLivingScore = ( Math.round( livingSum/itemNum * 100 ) / 100 ).toFixed(2)
  if(transportScore != 0){    
    avgTransportScore = ( Math.round( transportSum/itemNum * 100 ) / 100 ).toFixed(2)
  }
  avgInfraScore = ( Math.round( infraSum/itemNum * 100 ) / 100 ).toFixed(2)
  avgEduScore = ( Math.round( eduSum/itemNum * 100 ) / 100 ).toFixed(2)

  //실거래가
    var sales_info_array = sales_info.split(",")
    var price_per_array = price_per.split(",")

    detailHtml = "<div class='card'>";
    detailHtml += "<div class='card-header'>";
    detailHtml += "<div class='popTitle'><i class='fa-solid fa-coins'></i>&nbsp&nbsp실거래가 <span style='font-size: 0.7em; color:#fe4040'> (최근 1개월내 실거래는 빨간색으로 표시)</span> </div>"
    detailHtml += "</div>";
    detailHtml += "<div class='card-body' style='padding-left: 5px ; padding-right: 5px; padding-top: 5px;'>";
    detailHtml += "<div id='popEducation'>"
    detailHtml += "<div class='popTable'>"
    detailHtml += "<div id='popSubStation' style='grid-template-columns: 0.3fr 1fr; margin-left: 5px ; margin-right: 5px; margin-top: 10px;'>"
    detailHtml += "<div class='popContent'>최근 실거래</div>"

    //var current_year = selectedMonth.substr(0, 4)
    //var current_month = selectedMonth.substr(4, 2) - 1
    //var current_day = "01"
    var start_date = new Date()
    start_date.setMonth(start_date.getMonth() - 1)      

    if(isNaN(last_sales_price)){
      detailHtml += "<div class='popResult'>거래 정보 없음</div></div>"
    }
    else{
      var compare_year = Number(last_sales_date.substr(0, 4))
      var compare_month = Number(last_sales_date.substr(5, 2) - 1)
      var compare_day = Number(last_sales_date.substr(8, 2))
      var compare_date = new Date(compare_year, compare_month, compare_day)
      if(compare_date > start_date){
        detailHtml += "<div class='popResult' style='color: #fe4040'>" + last_sales_area + ", " + Math.round(last_sales_price/100)/100 + "억, "+ last_sales_date.substr(2) + "</div></div>"
      }
      else{
        detailHtml += "<div class='popResult'>" + last_sales_area + ", " + Math.round(last_sales_price/100)/100 + "억, "+ last_sales_date.substr(2) + "</div></div>"
      }

    }
    detailHtml += "<hr>"
    detailHtml += "<table class='table table-striped' style='font-size:0.8em'>"
      detailHtml += "<thead class='table-light'>"
        detailHtml += "<tr>"
          detailHtml += "<th scope='col'>" + "평형" + "</th>"
          detailHtml += "<th scope='col'>" + "실거래가" + "</th>"
          detailHtml += "<th scope='col'>" + "평단가" + "</th>"
        detailHtml += "</tr>"
      detailHtml += "</thead>"

      detailHtml += "<tbody>"
          for(var k = 0 ; k < area_array.length ; k++){
            detailHtml += "<tr>"                
              if(sales_info_array[k] == "거래 정보 없음"){
                detailHtml += "<td>" + area_array[k] + "</td>"
                detailHtml += "<td>" + "거래 정보 없음" + "</td>"
              }
              else{                  
                var sales_info_split = sales_info_array[k].split("억")

                var compare_year = Number(sales_info_split[1].substr(2, 4))
                var compare_month = Number(sales_info_split[1].substr(7, 2)-1)
                var compare_day = Number(sales_info_split[1].substr(10, 2))
                var compare_date = new Date(compare_year, compare_month, compare_day)                                

                if(compare_date > start_date){
                  detailHtml += "<td><span style='color:#fe4040; font-weight:600'>" + area_array[k] + "</span></td>"
                  detailHtml += "<td><span style='color:#fe4040; font-weight:600'>" + ( Math.round( sales_info_split[0] * 100 ) / 100 ).toFixed(2) + "억" + "<span style='font-size: 0.85em'>" + sales_info_split[1] + "</span></span></td>"
                }
                else{
                  detailHtml += "<td>" + area_array[k] + "</td>"
                  detailHtml += "<td>" + ( Math.round( sales_info_split[0] * 100 ) / 100 ).toFixed(2) + "억" + "<span style='font-size: 0.85em'>" + sales_info_split[1] + "</span></td>"
                }
              }
              if(price_per_array[k] == "nan" ){
                detailHtml += "<td>" + "---" + "</td>"
              }
              else{
                if(compare_date > start_date){
                  detailHtml += "<td><span style='color:#fe4040; font-weight:600'>" + Number(price_per_array[k]).toLocaleString() + "만원" + "</span></td>"
                }
                else{
                  detailHtml += "<td>" + Number(price_per_array[k]).toLocaleString() + "만원" + "</td>"
                }
              }
            detailHtml += "</tr>"
          }
      detailHtml += "</tbody>"
    detailHtml += "</table>"
    detailHtml += "<div class='comment2'>&nbsp&nbsp실거래가 정보는 네이버 부동산으로 취득합니다.</div>"
    detailHtml += "</div></div></div></div>"

    $('#aptDetail').append(detailHtml);


  //지역구
  /*
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-layer-group'></i>&nbsp&nbsp" + $('#sido option:selected').text() + " " + $('#gungu option:selected').text() + "</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popEducation'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='regionChart'></canvas></div>"
  detailHtml += "<div class='comment2'>지역구 정보는 공공데이터포탈 정보를 기반으로 산정됩니다.</div>"
  detailHtml += "</div></div></div>"
  */

  //Footer에 네이버 부동산 버튼
  footerHtml += "<div class='modal-footer'>"
  //footerHtml += "<div></div>"
  shareTitle = "[아파트랭크]\n"
  shareTitle += selectedMonth.substr(0, 4) + "년 " + Number(selectedMonth.substr(4, 2)).toString() + "월 아파트 입지 데이터\n"

  shareText = "\n『" + aptName
   
  if(apt_type == "재건축"){
    shareText += "(" + aptDuration + "년차, 재건축)』"
  }else if(apt_type == "분양권"){
    shareText += "(" + aptData.data[index]["준공년월"].substr(0, 7) + " 예정)』"        
  }
  else{
    shareText += "(" + aptDuration + "년차)』"
  }

  shareText += "\nㆍ" + $('#sido option:selected').text() + " " + $('#gungu option:selected').text()
  shareText += "\nㆍ순위 : " + aptRank_copy

  if(isNaN(last_sales_price)){
    shareText += "\nㆍ최근실거래 : 거래 정보 없음"
  }
  else{
    shareText += "\nㆍ최근실거래\n    : " + last_sales_area + ", " + Math.round(last_sales_price/100)/100 + "억, "+ last_sales_date.substr(2)
  }

  if(apt_type >= "재건축"){
    shareText += "\nㆍ용적률 : " + floor_rate
    shareText += "\nㆍ건폐율 : " + cover_rate
  }else{
    shareText += "\nㆍ세대수 : " + house_num.toLocaleString() + "세대"
    shareText += "\nㆍ주차 : " + parking
  }
  
  if(aptData.data[index]["가까운역이름"] != "NA"){
    shareText += "\nㆍ가장 가까운 역 : " + nearestStation
  }
  shareText += "\nㆍ5km 이내 대형병원 : " + bigHospital_5km
  shareText += "\nㆍ중학교 학업성취도 : " + mSchool_edu
  shareText += "\n"
  shareURL = "https://www.aptrank.kr" + "?reg=" + selectedRegion +"&sub=" + selectedSubRegion + "&mon=" + selectedMonth

  if(broswerInfo.indexOf("inApp")>-1){
    footerHtml += "<div></div>"
    footerHtml += "<div><button type='button' class='goLink' onclick='openNaver(" + searchCode + ")'>네이버 부동산에서 보기</button></div>"
    footerHtml += "<div><button type='button' class='kakaoShare' onClick='kakaoShare(shareTitle, shareText, shareURL)'><i class='fa-solid fa-comment'></i></button></div>"
  }
  else{
    footerHtml += "<div><button type='button' class='goLink' onclick='openNaver(" + searchCode + ")'>네이버 부동산에서 보기</button></div>"
    footerHtml += "<div><button type='button' class='kakaoShare' onClick='kakaoShare(shareTitle, shareText, shareURL)'><i class='fa-solid fa-comment'></i></button></div>"
    footerHtml += "<div><button type='button' class='toShare' onClick='share(shareTitle, shareText, shareURL)' style='background:#ffffff; font-size:1.2em'><i class='fa-solid fa-arrow-up-right-from-square'></i></button></div>"
  }
  footerHtml += "</div>"

  $('#exampleModalLabel').html(titleHtml);
  //$('#aptDetail').html(detailHtml);
  $('#footer').html(footerHtml);

  if(broswerInfo.indexOf("inApp")>-1){
    $('.modal-footer').css({"grid-template-columns" : "0.2fr 1fr 0.2fr", "text-align":"center", "text-align": "-webkit-center"})
  }
  else{
    $('.modal-footer').css({"grid-template-columns" : "1fr 0.15fr 0.15fr", "text-align":"center", "text-align": "-webkit-center"})
  }

  drawChart(aptValue, livingScore, transportScore, infraScore, eduScore)
  drawSubChart(livingScore, avgLivingScore, "주거총점", "TOP300 평균", "#fe4040", "#9f9f9f",  "livingChart")
  if(transportScore != 0){
    drawSubChart(transportScore, avgTransportScore, "교통총점", "TOP300 평균", "#fe4040", "#9f9f9f", "transportChart")
  }
  drawSubChart(infraScore, avgInfraScore, "인프라총점", "TOP300 평균", "#fe4040", "#9f9f9f", "infraChart")
  drawSubChart(eduScore, avgEduScore, "교육총점", "TOP300 평균", "#fe4040", "#9f9f9f", "eduChart")
  //drawSubChart(eduScore, avgEduScore, "인구총점", "일자리총점", "#fe4040", "#fe4040", "regionChart")
}

function livingCard(aptData, index){
  aptData = sortData

  var apt_type = aptData.data[index]["매매타입"]
  var area_info = aptData.data[index]["area_info"]
  var maintainance = aptData.data[index]["maintenance"]
  var rooms = aptData.data[index]["room"]
  var baths = aptData.data[index]["bath"]
  var house_num = aptData.data[index]["세대수.1"]
  var parking = aptData.data[index]["주차"]
  var heating = aptData.data[index]["난방"]
  var entrance = aptData.data[index]["현관구조"]

  var floor_rate = ""
  if(aptData.data[index]["용적률"] == "0"){
    floor_rate = "--%"
  }
  else{
    floor_rate = aptData.data[index]["용적률"] + "%"
  }

  var cover_rate = ""
  if(aptData.data[index]["건폐율"] == "0"){
    cover_rate = "--%"
  }
  else{
    cover_rate = aptData.data[index]["건폐율"] + "%"
  }

  detailHtml = "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-home'></i>&nbsp&nbsp주거</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popLiving'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='livingChart'></canvas></div>"
  detailHtml += "<div class='popTable'>"
  if(aptData.data[index]["한강"] > 0){
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "한강 프리미엄" + "</div>" + "<div class='popResult'>적용</div></div>";
  }    
  if(aptData.data[index]["해운대"] > 0){
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "해운대 프리미엄" + "</div>" + "<div class='popResult'>적용</div></div>";
  }
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "세대수" + "</div>" + "<div class='popResult'>" + house_num.toLocaleString() + "세대</div></div>";

  if(apt_type >= "재건축"){
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "용적률" + "</div>" + "<div class='popResult'>" + floor_rate + "</div></div>";
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "건폐율" + "</div>" + "<div class='popResult'>" + cover_rate + "</div></div>";
  }
  detailHtml += "<div class='popSubTable' id='popSubStation'><div class='popContent'>" + "주차" + "</div>" + "<div class='popResult'>" + parking + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "난방방식" + "</div>" + "<div class='popResult'>" + heating + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "현관구조" + "</div>" + "<div class='popResult'>" + entrance + "</div></div>";

  var area_array = area_info.split(",")
  if(!maintainance){
    var maintainance_array = "---"
  }
  else{
    var maintainance_array = maintainance.split(",")
  }
  var rooms_array = rooms.split(",")
  var baths_array = baths.split(",")
  detailHtml += "<div class='table-responsive' style='max-height: 200px; overflow-y: scroll'>"
  detailHtml += "<table class='table table-striped' style='font-size:0.8em'>"
    detailHtml += "<thead class='table-light' style='position:sticky ;top: 0'>"
      detailHtml += "<tr>"
        detailHtml += "<th scope='col'>" + "평형" + "</th>"
        detailHtml += "<th scope='col'>" + "방수/욕실수" + "</th>"
        detailHtml += "<th scope='col'>" + "평균 관리비" + "</th>"
      detailHtml += "</tr>"
    detailHtml += "</thead>"

    detailHtml += "<tbody>"
        for(var k = 0 ; k < area_array.length ; k++){
          detailHtml += "<tr>"
            detailHtml += "<td>" + area_array[k] + "</td>"
            detailHtml += "<td>" + rooms_array[k] + " / " + baths_array[k] + "</td>"
            if(isNaN(maintainance_array[k]) == true ){
              detailHtml += "<td>" + "---" + "</td>"
            }
            else{
              detailHtml += "<td>" + Number(maintainance_array[k]).toLocaleString() + "원" + "</td>"
            }
          detailHtml += "</tr>"
        }
    detailHtml += "</tbody>"
  detailHtml += "</table>"
  detailHtml += "</div>"

  detailHtml += "<div class='comment2'>주거총점 계산을 위한 정보는 네이버 부동산으로 취득하며, 세대수/평형/난방방식 등의 항목을 상대점수로 산정합니다.</div>"
  detailHtml += "</div></div></div></div>"  

  $('#aptDetail').append(detailHtml);
}

function transCard(aptData, index){
  aptData = sortData

  var nearestStation = aptData.data[index]["가까운역이름"] + "역" + "(" + ( Math.round( aptData.data[index]["가까운역거리"] * 100 ) / 100 ).toFixed()  + "m)"  
  var stationPoint_30m = aptData.data[index]["30분이내주요거점역"]
  var stationPoint_1h = aptData.data[index]["1시간이내주요거점역"]

  detailHtml = "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-bus'></i>&nbsp&nbsp교통</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popTransport'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='transportChart'></canvas></div>"
  detailHtml += "<div class='popTable'>"
  detailHtml += "<div class='popSubTable' id='popSubStation'><div class='popContent'>" + "가장 가까운 역" + "</div>" + "<div class='popResult'>" + nearestStation + "</div></div>";

  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "30분 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'>" + stationPoint_30m + "개</div></div>";
  if(stationPoint_30m != 0 && selectedMonth != "202201"){
    var stations_30m = aptData.data[index]["30분거점역이름"]
    stations_30m = ( ( stations_30m.replace("[", "") ).replace("]", "") ).replace(/\'/g, "")
    detailHtml += "<div class='stationList'><div></div><div class='stationText'>" + stations_30m + "</div></div>";
  }

  detailHtml += "<div class='popSubTable' id='stationTable'><div class='popContent'>" + "1시간 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'>" + stationPoint_1h + "개</div></div>";
  if(stationPoint_1h != 0 && selectedMonth != "202201"){
    var stations_1h = aptData.data[index]["1시간거점역이름"]
    stations_1h = stations_1h.replace("[", "").replace("]", "").replace(/\'/g, "")
    detailHtml += "<div class='stationList'><div></div><div class='stationText'>" + stations_1h + "</div></div><hr style='margin-top: 2px'>";
  }

  detailHtml += "<div class='comment2'>가장 가까운 역은 직선거리로 계산됩니다.<br>주요역은 평일 출근시간대 하차인원이 가장 많은 역을 의미합니다.<br>30분, 1시간 이동 거리는 구글 대중교통 이동 시간 정보를 사용합니다.</div>"
  detailHtml += "</div></div></div></div>"
  
  $('#aptDetail').append(detailHtml);
}

function infraCard(aptData, index){
  aptData = sortData

  var departmentStore_3km = aptData.data[index]["3km이내백화점수"] + "개"
  var OutletMall_5km = aptData.data[index]["5km이내아울렛몰수"] + "개"
  var bigMart_1km = aptData.data[index]["1km이내대형먀트수"] + "개"
  var bank_500m = aptData.data[index]["500m이내은행수"] + "개"
  var hospital_500m = aptData.data[index]["500m이내병원수"] + "개"
  var bigHospital_5km = aptData.data[index]["5km이내대형병원수"] + "개"
  var park_500m = aptData.data[index]["500m이내공원수"] + "개"
  var big_park_1km = aptData.data[index]["800m이내대형공원수"] + "개"
  var harmful_3km = aptData.data[index]["3km이내혐오시설수"] + "개"
  var market_infra = aptData.data[index]["300m이내상권"] + "개" + "(총 " + aptData.data[index]["300m이내점포수"] + "개 지점)"

  detailHtml = "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-hospital-user'></i>&nbsp&nbsp인프라</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popInfra'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='infraChart'></canvas></div>"
  detailHtml += "<div class='popTable'>"    
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 백화점" + "</div>" + "<div class='popResult'>" + departmentStore_3km + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 아울렛/몰" + "</div>" + "<div class='popResult'>" + OutletMall_5km + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형마트" + "</div>" + "<div class='popResult'>" + bigMart_1km + "</div></div>";

  if(aptData.data[index]["300m이내상권"] == '0'){
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 상권" + "</div>" + "<div class='popResult'>0개</div></div>";
  }
  else{
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 상권" + "</div>" + "<div class='popResult'>" + market_infra + "</div></div>";
  }
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 은행" + "</div>" + "<div class='popResult'>" + bank_500m + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 병원" + "</div>" + "<div class='popResult'>" + hospital_500m + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 대형병원" + "</div>" + "<div class='popResult'>" + bigHospital_5km + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 공원" + "</div>" + "<div class='popResult'>" + park_500m + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형공원" + "</div>" + "<div class='popResult'>" + big_park_1km + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 혐오시설" + "</div>" + "<div class='popResult'>" + harmful_3km + "</div></div>";
  detailHtml += "<div class='comment2'>인프라 정보는 각 백화점/마트 홈페이지, 은행연합회, 자원순환정보시스템, 공공데이터 포탈의 정보를 기반으로 산정되며, 상권은 호갱노노 정보를 사용합니다.</div>"
  detailHtml += "</div></div></div></div>"

  $('#aptDetail').append(detailHtml);
}

function eduCard(aptData, index){
  aptData = sortData

  var pSchool_edu = aptData.data[index]["초등학교학업성취도"]
  var pSchool_distance = aptData.data[index]["초등학교거리"]
  var mSchool_edu = aptData.data[index]["중학교학업성취도"] + "%"
  var academy_edu = aptData.data[index]["500m이내학원가"] + "개" + "(총 " + aptData.data[index]["500m이내학원수"] + "개 학원)"
  var drink_pub = aptData.data[index]["300m이내유흥주점"]
  var daran_pub = aptData.data[index]["300m이내단란주점"]
  var motel = aptData.data[index]["300m이내모텔"]
  
  detailHtml = "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-graduation-cap'></i>&nbsp&nbsp교육</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popEducation'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='eduChart'></canvas></div>"
  detailHtml += "<div class='popTable'>"
  if(pSchool_distance-100 < 0){
    minDistance = parseInt(pSchool_distance*0.8)
  }
  else{
    minDistance = parseInt(pSchool_distance - 100)
  }
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 거리" + "</div>" + "<div class='popResult'>" + minDistance + "~" + parseInt(pSchool_distance) + "m</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 학생증감점수" + "</div>" + "<div class='popResult'>" + ( Math.round( pSchool_edu * 100 ) / 100 ).toFixed(2) + "점</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "중학교 학업성취도" + "</div>" + "<div class='popResult'>" + mSchool_edu + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 학원가" + "</div>" + "<div class='popResult'>" + academy_edu + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 유흥시설/모텔" + "</div>" + "<div class='popResult'>" + (drink_pub + daran_pub + motel) + "개</div></div>";
  detailHtml += "<div class='comment2'>교육 정보는 교육통계서비스 정보를 기반으로 산정되며,<br>학원가는 호갱노노의 정보를 사용합니다.<br>초등학교까지의 거리는 직선거리로 계산됩니다.<br>유흥시설과 모텔정보는 교육 감점요소로 적용됩니다.</div>"
  detailHtml += "</div></div></div></div>"

  $('#aptDetail').append(detailHtml);
}