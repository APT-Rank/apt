simul_living_score = []
simul_trans_score = []
simul_infra_score = []
simul_edu_score = []

// 로딩창 키는 함수
function openLoading() {
  console.log("LOADING!!!")
  //화면 높이와 너비를 구합니다.
  let maskHeight = window.document.body.clientHeight;
  let maskWidth = window.document.body.clientWidth;
  //출력할 마스크를 설정해준다.
  let mask ="<div id='loadingMask' style='position:absolute; z-index:2500; background-color:#000000; left:0; top:0;'></div>";
  // 로딩 이미지 주소 및 옵션
  let loadingImg ='';
  loadingImg += "<div id='loadingContainer' style='position:absolute; top: 250px; width:100%; z-index:3000; display: block; margin: 0px auto'>"
  loadingImg += "<div id='loadingImg' style='text-align: center' ><img src='https://aptrank.kr/loading_block.gif' width=70px height=70px/></div>";
  loadingImg += "<div id='loadingTxt' style='text-align: center; color: white; font-size: 1.2em; font-weight: 600; margin-top: 10px'>열심히 분석 중이예요!</div>"  
  loadingImg += "</div>"; 
  //레이어 추가
  $('body')
      .append(mask)
      .append(loadingImg)      
  //마스크의 높이와 너비로 전체 화면을 채운다.
  $('#loadingMask').css({
          'width' : maskWidth,
          'height': maskHeight,
          'opacity' :'0.7'
  });
  //마스크 표시
  $('#loadingMask').show();  
  //로딩 이미지 표시
  $('#loadingContainer').show();
}

// 로딩창 끄는 함수
function closeLoading() {
  $('#loadingMask, #loadingContainer').hide();
  $('#loadingMask, #loadingContainer').empty(); 
}

function openSimulation(arr, index){
  $('#exampleModal').modal("hide");  

  titleHtml = "";
  detailHtml = "";
  footerHtml = "";

  var aptName = arr[index]["아파트명"]
  var apt_m = arr[index]["전용면적(m2)"]
  var apt_p = arr[index]["전용면적(평)"]
  var apt_type = arr[index]["매매타입"]
  var aptAddress = arr[index]["도로명주소"]
  var aptValue = Math.round( arr[index]["가치 총점"] * 100 ) / 100;
  var aptDuration = arr[index]["준공년차"]
  var aptYear = ""
  var nearestStation = arr[index]["가까운역이름"] + "역" + "(" + ( Math.round( arr[index]["가까운역거리"] * 100 ) / 100 ).toFixed()  + "m)"
  var stationArea = arr[index]["역세권여부"]
  var stationPoint_30m = arr[index]["30분이내주요거점역"]
  var stationPoint_1h = arr[index]["1시간이내주요거점역"]  
  var departmentStore_3km = arr[index]["3km이내백화점수"] + "개"
  var OutletMall_5km = arr[index]["5km이내아울렛몰수"] + "개"
  var bigMart_1km = arr[index]["1km이내대형먀트수"] + "개"
  var bank_500m = arr[index]["500m이내은행수"] + "개"
  var hospital_500m = arr[index]["500m이내병원수"] + "개"
  var bigHospital_5km = arr[index]["5km이내대형병원수"] + "개"
  var park_500m = arr[index]["500m이내공원수"] + "개"
  var big_park_1km = arr[index]["800m이내대형공원수"] + "개"
  var harmful_3km = arr[index]["3km이내혐오시설수"] + "개"
  var pSchool_edu = arr[index]["초등학교학업성취도"]
  var pSchool_distance = arr[index]["초등학교거리"]
  var mSchool_edu = arr[index]["중학교학업성취도"] + "%"
  var academy_edu = arr[index]["500m이내학원가"] + "개" + "(총 " + arr[index]["500m이내학원수"] + "개 학원)"
  var market_infra = arr[index]["300m이내상권"] + "개" + "(총 " + arr[index]["300m이내점포수"] + "개 지점)"
  var livingScore = ( Math.round( arr[index]["주거총점"] * 100 ) / 100 ).toFixed(2)
  var transportScore = ( Math.round( arr[index]["교통총점"] * 100 ) / 100 ).toFixed(2)
  var infraScore = ( Math.round( arr[index]["인프라총점"] * 100 ) / 100 ).toFixed(2)
  var eduScore = ( Math.round( arr[index]["학군총점"] * 100 ) / 100 ).toFixed(2)
  var area_info = arr[index]["area_info"]
  var maintainance = arr[index]["maintenance"]
  var rooms = arr[index]["room"]
  var baths = arr[index]["bath"]
  var house_num = arr[index]["세대수"]
  var parking = arr[index]["주차"]
  var heating = arr[index]["난방"]
  var entrance = arr[index]["현관구조"]
  var sales_info = arr[index]["sales_info"]
  var price_per = arr[index]["price_per"]  

  var last_sales = arr[index]["last_sales"].split(",")
  var last_sales_date = last_sales[0].toString()
  var last_sales_price = last_sales[1].toString()
  var last_sales_area = last_sales[2]

  //타이틀
  //titleHtml += "<div class='popupTitle'>" + aptName + " " + apt_p + "(" + apt_m + ")</div>";
  //titleHtml += "<div class='popupTitle' style='color: #fff; font-size: 0.6em; text-align: center; border-radius: 10px; background: #ff3d38; margin-bottom: 3px'>랭크 시뮬레이션</div>";
  titleHtml += "<div class='popupTitle' style='color: #ff3d38; font-size: 0.6em; text-align: center; border-bottom: 1px solid #ff3d38; border-top: 1px solid #ff3d38;margin-bottom: 3px'>랭크 시뮬레이션</div>";
  //titleHtml += "<div class='popupSubtitle' style='font-size: 0.5em; font-weight:600; color:#ff3d38; text-align: center; margin-bottom: 5px'>시뮬레이션은 기존 결과와 다소 상이할 수 있습니다.</div>";
  titleHtml += "<div class='popupTitle' style='text-align: center'>" + aptName + "</div>";  

  if(apt_type == "분양권"){
    titleHtml += "<div class='popupSubtitle' style='font-size: 0.6em; text-align: center'>" + arr[index]["법정동주소"] + "</div>";
  }
  else{    
    titleHtml += "<div class='popupSubtitle' style='font-size: 0.6em; text-align: center'>" + arr[index]["법정동주소"] + "</div>";
  }
  

  //주거
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-home'></i>&nbsp&nbsp주거</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popLiving'>"  
  detailHtml += "<div class='popTable'>"

  //조망 프리미엄 선택
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "조망 프리미엄" + "</div>" + "<div class='popResult'><select class='optionSelect' id='viewOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < premiumOption.length ; i++){
    detailHtml += "<option value=" + i + ">" + premiumOption[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "연차" + "</div>" + "<div class='popResult'>" + aptDuration + "년차</div></div>";

  //연차선택
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "연차" + "</div>" + "<div class='popResult'><select class='optionSelect' id='yearOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < yearOption.length ; i++){
    detailHtml += "<option value=" + i + ">" + yearOption[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "세대수" + "</div>" + "<div class='popResult'>" + house_num.toLocaleString() + "세대</div></div>";
  //세대수선택
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "세대수" + "</div>" + "<div class='popResult'><select class='optionSelect' id='houseNumOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < houseOption.length ; i++){
    detailHtml += "<option value=" + i + ">" + houseOption[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable' id='popSubStation'><div class='popContent'>" + "주차" + "</div>" + "<div class='popResult'>" + parking + "</div></div>";
  //주차선택
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "세대당 주차수" + "</div>" + "<div class='popResult'><select class='optionSelect' id='parkingOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < parkingOption.length ; i++){
    detailHtml += "<option value=" + i + ">" + parkingOption[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "난방방식" + "</div>" + "<div class='popResult'>" + heating + "</div></div>";
  //난방선택
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "난방방식" + "</div>" + "<div class='popResult'><select class='optionSelect' id='heatingOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < heatingOption.length ; i++){
    detailHtml += "<option value=" + i + ">" + heatingOption[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "현관구조" + "</div>" + "<div class='popResult'>" + entrance + "</div></div>";
  //현관선택
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "현관구조" + "</div>" + "<div class='popResult'><select class='optionSelect' id='entranceOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < entranceOption.length ; i++){
    detailHtml += "<option value=" + i + ">" + entranceOption[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //추가 주거 가점
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 주거 가점 주기" + "</div>" + "<div class='popResult'><select class='optionSelect' id='livingAddOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < add_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + add_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  /*
  var area_array = area_info.split(",")
  var maintainance_array = maintainance.split(",")
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
  */

  detailHtml += "</div></div></div></div>"
  avgLivingScore = Math.round( livingSum/itemNum * 100 ) / 100

  if(isNaN(transportScore) == false){
    //교통
    detailHtml += "<div class='card'>";
    detailHtml += "<div class='card-header'>";
    detailHtml += "<div class='popTitle'><i class='fas fa-bus'></i>&nbsp&nbsp교통</div>"
    detailHtml += "</div>";
    detailHtml += "<div class='card-body'>";
    detailHtml += "<div id='popTransport'>"    
    detailHtml += "<div class='popTable'>"

    //detailHtml += "<div class='popSubTable' id='popSubStation'><div class='popContent'>" + "가장 가까운 역 거리" + "</div>" + "<div class='popResult'>" + nearestStation + "</div></div>";
    //가까운역선택
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "역세권 여부" + "</div>" + "<div class='popResult'><select class='optionSelect' id='subwayOption' onChange='putVal(this)'>"
    for(var i = 0 ; i < cloestStationOption.length ; i++){
      detailHtml += "<option value=" + i + ">" + cloestStationOption[i][0] + "</option>"
    }
    detailHtml += "</select></div></div>"

    //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "30분 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'>" + stationPoint_30m + "개</div></div>";
    //30분 이내 도착 가능
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "30분 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'><select class='optionSelect' id='min30Option' onChange='putVal(this)'>"
    for(var i = 0 ; i < station_30m_Option.length ; i++){
      detailHtml += "<option value=" + i + ">" + station_30m_Option[i][0] + "개</option>"
    }
    detailHtml += "</select></div></div>"

    //detailHtml += "<div class='popSubTable' id='stationTable'><div class='popContent'>" + "1시간 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'>" + stationPoint_1h + "개</div></div>";
    //30분 이내 도착 가능
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1시간 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'><select class='optionSelect' id='hour1Option' onChange='putVal(this)'>"
    for(var i = 0 ; i < station_1h_Option.length ; i++){
      detailHtml += "<option value=" + i + ">" + station_1h_Option[i][0] + "개</option>"
    }
    detailHtml += "</select></div></div>"    

    //추가 교통 가점
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 교통 가점 주기" + "</div>" + "<div class='popResult'><select class='optionSelect' id='transAddOption' onChange='putVal(this)'>"
    for(var i = 0 ; i < add_option.length ; i++){
      detailHtml += "<option value=" + i + ">" + add_option[i][0] + "</option>"
    }
    detailHtml += "</select></div></div>"

    detailHtml += "</div></div></div></div>";

    avgTransportScore = ( Math.round( transportSum/itemNum * 100 ) / 100 ).toFixed(2)
  }

  //인프라
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-hospital-user'></i>&nbsp&nbsp인프라</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popInfra'>"  
  detailHtml += "<div class='popTable'>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 백화점" + "</div>" + "<div class='popResult'>" + departmentStore_3km + "</div></div>";
  //백화점
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 백화점" + "</div>" + "<div class='popResult'><select class='optionSelect' id='departmentOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < department_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + department_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 아울렛/몰" + "</div>" + "<div class='popResult'>" + OutletMall_5km + "</div></div>";
  //아울렛/몰
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 아울렛/몰" + "</div>" + "<div class='popResult'><select class='optionSelect' id='outletOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < outlet_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + outlet_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형마트" + "</div>" + "<div class='popResult'>" + bigMart_1km + "</div></div>";
  //대형마트
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형마트" + "</div>" + "<div class='popResult'><select class='optionSelect' id='bigMartOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < bigMart_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + bigMart_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  
  /*
  if(arr[index]["300m이내상권"] == '0'){
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 상권" + "</div>" + "<div class='popResult'>0개</div></div>";
  }
  else{
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 상권" + "</div>" + "<div class='popResult'>" + market_infra + "</div></div>";
  }
  */
  //상권
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 상점" + "</div>" + "<div class='popResult'><select class='optionSelect' id='marketOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < market_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + market_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 은행" + "</div>" + "<div class='popResult'>" + bank_500m + "</div></div>";
  //은행
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 은행" + "</div>" + "<div class='popResult'><select class='optionSelect' id='bankOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < bank_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + bank_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 병원" + "</div>" + "<div class='popResult'>" + hospital_500m + "</div></div>";
  //병원
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 병원" + "</div>" + "<div class='popResult'><select class='optionSelect' id='hospitalOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < hospital_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + hospital_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 대형병원" + "</div>" + "<div class='popResult'>" + bigHospital_5km + "</div></div>";
  //대형병원
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 대형병원" + "</div>" + "<div class='popResult'><select class='optionSelect' id='bigHospitalOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < bigHospital_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + bigHospital_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 공원" + "</div>" + "<div class='popResult'>" + park_500m + "</div></div>";
  //공원
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 공원" + "</div>" + "<div class='popResult'><select class='optionSelect' id='parkOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < park_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + park_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형공원" + "</div>" + "<div class='popResult'>" + big_park_1km + "</div></div>";
  //대형공원
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형공원" + "</div>" + "<div class='popResult'><select class='optionSelect' id='bigParkOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < bigPark_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + bigPark_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 혐오시설" + "</div>" + "<div class='popResult'>" + harmful_3km + "</div></div>";
  //혐오시설
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 혐오시설" + "</div>" + "<div class='popResult'><select class='optionSelect' id='harmfulOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < harmful_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + harmful_option[i][0] + "개</option>"
  }
  detailHtml += "</select></div></div>"

  //추가 인프라 가점
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 인프라 가점 주기" + "</div>" + "<div class='popResult'><select class='optionSelect' id='infraAddOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < add_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + add_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  detailHtml += "</div></div></div></div>"
  avgInfraScore = ( Math.round( infraSum/itemNum * 100 ) / 100 ).toFixed(2)

  //교육
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-graduation-cap'></i>&nbsp&nbsp교육</div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popEducation'>"  
  detailHtml += "<div class='popTable'>"
  if(pSchool_distance-100 < 0){
    minDistance = parseInt(pSchool_distance*0.8)
  }
  else{
    minDistance = parseInt(pSchool_distance - 100)
  }
  
  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 거리" + "</div>" + "<div class='popResult'>" + minDistance + "~" + parseInt(pSchool_distance) + "m</div></div>";
  //초등학교 거리
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 거리" + "</div>" + "<div class='popResult'><select class='optionSelect' id='pSchoolDistOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < pSchool_dist_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + pSchool_dist_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 학생증감점수" + "</div>" + "<div class='popResult'>" + ( Math.round( pSchool_edu * 100 ) / 100 ).toFixed(2) + "점</div></div>";
  //초등학교 학생증감
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 학생증감" + "</div>" + "<div class='popResult'><select class='optionSelect' id='pSchoolEduOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < pSchool_edu_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + pSchool_edu_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "중학교 학업성취도" + "</div>" + "<div class='popResult'>" + mSchool_edu + "</div></div>";
  //중학교 성취도
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "중학교 학업성취도" + "</div>" + "<div class='popResult'><select class='optionSelect' id='mSchoolEduOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < mSchool_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + mSchool_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 학원가" + "</div>" + "<div class='popResult'>" + academy_edu + "</div></div>";  
  //학원
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 학원" + "</div>" + "<div class='popResult'><select class='optionSelect' id='academyOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < academy_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + academy_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  //추가 교육 가점
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 교육 가점 주기" + "</div>" + "<div class='popResult'><select class='optionSelect' id='eduAddOption' onChange='putVal(this)'>"
  for(var i = 0 ; i < add_option.length ; i++){
    detailHtml += "<option value=" + i + ">" + add_option[i][0] + "</option>"
  }
  detailHtml += "</select></div></div>"

  detailHtml += "</div></div></div></div>"
  avgEduScore = ( Math.round( eduSum/itemNum * 100 ) / 100 ).toFixed(2)

  /*
  //실거래가
  if(Number(selectedMonth) > 202203){
    var sales_info_array = sales_info.split(",")
    var price_per_array = price_per.split(",")

    detailHtml += "<div class='card'>";
    detailHtml += "<div class='card-header'>";
    detailHtml += "<div class='popTitle'><i class='fa-solid fa-coins'></i>&nbsp&nbsp실거래가</div>"
    detailHtml += "</div>";
    detailHtml += "<div class='card-body' style='padding-left: 5px ; padding-right: 5px; padding-top: 5px;'>";
    detailHtml += "<div id='popEducation'>"
    detailHtml += "<div class='popTable'>"
    detailHtml += "<div id='popSubStation' style='grid-template-columns: 0.3fr 1fr; margin-left: 5px ; margin-right: 5px; margin-top: 10px;'>"
    detailHtml += "<div class='popContent'>최근 실거래</div>"
    if(isNaN(last_sales_price)){
      detailHtml += "<div class='popResult'>거래 정보 없음</div></div>"
    }
    else{
      detailHtml += "<div class='popResult'>" + last_sales_area + ", " + Math.round(last_sales_price/100)/100 + "억, "+ last_sales_date.substr(2) + "</div></div>"
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
              detailHtml += "<td>" + area_array[k] + "</td>"
              if(sales_info_array[k] == "거래 정보 없음"){
                detailHtml += "<td>" + "거래 정보 없음" + "</td>"
              }
              else{
                var sales_info_split = sales_info_array[k].split("억")
                detailHtml += "<td>" + ( Math.round( sales_info_split[0] * 100 ) / 100 ).toFixed(2) + "억" + "<span style='font-size: 0.85em'>" + sales_info_split[1] + "</span></td>"
              }
              if(price_per_array[k] == "nan" ){
                detailHtml += "<td>" + "---" + "</td>"
              }
              else{
                detailHtml += "<td>" + Number(price_per_array[k]).toLocaleString() + "만원" + "</td>"
              }
            detailHtml += "</tr>"
          }
      detailHtml += "</tbody>"
    detailHtml += "</table>"
    detailHtml += "<div class='comment2'>&nbsp&nbsp실거래가 정보는 네이버 부동산으로 취득합니다.</div>"
    detailHtml += "</div></div></div></div>"    
  }
  */

  arrrr = arr[index]

  //Footer에 네이버 부동산 버튼
  footerHtml += "<div class='modal-footer'>"
  footerHtml += "<div></div>"
  footerHtml += "<div><button type='button' class='goApt' onclick='calValue(arrrr," + arr.length + ")'>결과 보기</button></div>"
  footerHtml += "<div></div>"
  footerHtml += "</div>"

  $('#toggleModalLabel').html(titleHtml);
  $('#simulDetail').html(detailHtml);
  $('#toggle1footer').html(footerHtml);

  $('.modal-footer').css({"grid-template-columns" : "0.2fr 1fr 0.2fr", "text-align":"center"})

  simul_living_score = []
  simul_trans_score = []
  simul_infra_score = []
  simul_edu_score = []

  livingSelections(arr[index]["한강"], arr[index]["해운대"], aptDuration, house_num, parking, heating, entrance)

  if(isNaN(transportScore) == false){
    transSelections(arr[index]["가까운역거리"], stationPoint_30m, stationPoint_1h)
  }
  infraSelections(arr[index]["3km이내백화점수"], arr[index]["5km이내아울렛몰수"], arr[index]["1km이내대형먀트수"], arr[index]["300m이내점포수"], arr[index]["500m이내은행수"], arr[index]["500m이내병원수"], arr[index]["5km이내대형병원수"], arr[index]["500m이내공원수"], arr[index]["800m이내대형공원수"], arr[index]["3km이내혐오시설수"])
  eduSelections(arr[index]["초등학교거리"], arr[index]["초등학교학업성취도"], arr[index]["중학교학업성취도"], arr[index]["500m이내학원수"])  

  $('.popContent').css({"line-height" : "2.4em"})
  $('.popSubTable').css({"height" : "2.5em"})
  $('.modal-title').css({"width" : "100%"})

  $('#toggleModal1').modal("show");
}

function livingSelections(premium1, premium2, aptDuration, house_num, parking, heating, entrance){
  premium_value = 0
  if(premium1 > 0 || premium2 <= 0){
    premium_value = 1
  }
  else{
    premium_value = 0
  }
  $('#viewOption').val(premium_value).prop('selected', true)
  simul_living_score.push([premiumOption[premium_value][0], premiumOption[premium_value][1]])
  //console.log(premiumOption[premium_value][0], " : ", premiumOption[premium_value][1])

  duration_value = 0;
  if(aptDuration >= 0 && aptDuration <= 4 ){
    duration_value = 0
  }
  else if(aptDuration >= 5 && aptDuration <= 9 ){
    duration_value = 1
  }
  else if(aptDuration >= 10 && aptDuration <= 14 ){
    duration_value = 2
  }
  else if(aptDuration >= 15 && aptDuration <= 19 ){
    duration_value = 3
  }
  else if(aptDuration >= 20 && aptDuration <= 24 ){
    duration_value = 4
  }
  else if(aptDuration >= 25 && aptDuration <= 29 ){
    duration_value = 5
  }
  else{
    duration_value = 6
  }
  $('#yearOption').val(duration_value).prop('selected', true)
  simul_living_score.push([yearOption[duration_value][0], yearOption[duration_value][1]])
  //console.log(yearOption[duration_value][0], " : ", yearOption[duration_value][1])

  house_num_value = 0;
  if(house_num >= 0 && house_num <= 99 ){
    house_num_value = 0
  }
  else if(house_num >= 100 && house_num <= 199 ){
    house_num_value = 1
  }
  else if(house_num >= 200 && house_num <= 299 ){
    house_num_value = 2
  }
  else if(house_num >= 300 && house_num <= 399 ){
    house_num_value = 3
  }
  else if(house_num >= 400 && house_num <= 499 ){
    house_num_value = 4
  }
  else if(house_num >= 500 && house_num <= 599 ){
    house_num_value = 5
  }
  else if(house_num >= 600 && house_num <= 699 ){
    house_num_value = 6
  }
  else if(house_num >= 700 && house_num <= 799 ){
    house_num_value = 7
  }
  else if(house_num >= 800 && house_num <= 899 ){
    house_num_value = 8
  }
  else if(house_num >= 900 && house_num <= 999 ){
    house_num_value = 9
  }
  else if(house_num >= 1000 && house_num <= 1099 ){
    house_num_value = 10
  }
  else if(house_num >= 1100 && house_num <= 1199 ){
    house_num_value = 11
  }
  else if(house_num >= 1200 && house_num <= 1299 ){
    house_num_value = 12
  }
  else if(house_num >= 1300 && house_num <= 1399 ){
    house_num_value = 13
  }
  else if(house_num >= 1400 && house_num <= 1499 ){
    house_num_value = 14
  }
  else{
    house_num_value = 15
  }
  $('#houseNumOption').val(house_num_value).prop('selected', true)
  simul_living_score.push([houseOption[house_num_value][0], houseOption[house_num_value][1]])
  //console.log(houseOption[house_num_value][0], " : ", houseOption[house_num_value][1])

  parking_value = 0
  var start = parking.indexOf("당 ")+2
  var end = parking.indexOf("대)")
  parking_per = parking.substring(start, end)  

  if(parking_per >= 0 && parking_per <= 0.5 ){
    parking_value = 0
  }
  else if(parking_per > 0.5 && parking_per <= 1.0 ){
    parking_value = 1
  }
  else if(parking_per > 1.0 && parking_per <= 1.3 ){
    parking_value = 2
  }
  else if(parking_per > 1.3 && parking_per <= 1.7 ){
    parking_value = 3
  }
  else if(parking_per > 1.7 && parking_per <= 2.5 ){
    parking_value = 4
  }
  else{
    parking_value = 5    
  }
  $('#parkingOption').val(parking_value).prop('selected', true)
  simul_living_score.push([parkingOption[parking_value][0], parkingOption[parking_value][1]])
  //console.log(parkingOption[parking_value][0], " : ", parkingOption[parking_value][1])

  heating_value = 0
  if(heating == "지역난방"){
    heating_value = 0
  }
  else if(heating == "개별난방"){
    heating_value = 1
  }
  else if(heating == "개별냉난방"){
    heating_value = 2
  }
  else if(heating == "중앙난방"){
    heating_value = 3
  }
  else if(heating == "혼합난방"){
    heating_value = 4
  }
  else{
    heating_value = 4
  }
  $('#heatingOption').val(heating_value).prop('selected', true)
  simul_living_score.push([heatingOption[heating_value][0], heatingOption[heating_value][1]])
  //console.log(heatingOption[heating_value][0], " : ", heatingOption[heating_value][1])

  entrance_value = 0
  if(entrance == "계단식"){
    entrance_value = 0
  }
  else if(entrance == "복합식"){
    entrance_value = 1
  }
  else if(entrance == "복도식"){
    entrance_value = 2
  }
  else{
    entrance_value = 2
  }
  $('#entranceOption').val(entrance_value).prop('selected', true)
  simul_living_score.push([entranceOption[entrance_value][0], entranceOption[entrance_value][1]])
  //console.log(entranceOption[entrance_value][0], " : ", entranceOption[entrance_value][1])

  $('#livingAddOption').val(0).prop('selected', true)
  simul_living_score.push([add_option[0][0], add_option[0][1]])
}
  
function transSelections(stationArea, stationPoint_30m, stationPoint_1h){
  station_value = 0
  if(stationArea >= 0 && stationArea <= 100){
    station_value = 0
  }
  else if(stationArea > 100 && stationArea <= 500){
    station_value = 1
  }
  else if(stationArea > 500 && stationArea <= 1000){
    station_value = 2
  }
  else{
    station_value = 3
  }
  $('#subwayOption').val(station_value).prop('selected', true)
  simul_trans_score.push([cloestStationOption[station_value][0], cloestStationOption[station_value][1]])
  //console.log(cloestStationOption[station_value][0], " : ", cloestStationOption[station_value][1])

  stationPoint_30m_value = 0
  if(stationPoint_30m > station_30m_Option.length){
    stationPoint_30m_value = station_30m_Option.length
  }
  else{
    stationPoint_30m_value = stationPoint_30m
  }
  $('#min30Option').val(stationPoint_30m_value).prop('selected', true)
  simul_trans_score.push([station_30m_Option[stationPoint_30m_value][0], station_30m_Option[stationPoint_30m_value][1]])
  //console.log(station_30m_Option[stationPoint_30m_value][0], " : ", station_30m_Option[stationPoint_30m_value][1])

  stationPoint_1h_value = 0
  if(stationPoint_1h > station_1h_Option.length){
    stationPoint_1h_value = station_1h_Option.length
  }
  else{
    stationPoint_1h_value = stationPoint_1h
  }
  $('#hour1Option').val(stationPoint_1h_value).prop('selected', true)
  simul_trans_score.push([station_1h_Option[stationPoint_1h_value][0], station_1h_Option[stationPoint_1h_value][1]])
  //console.log(station_1h_Option[stationPoint_1h_value][0], " : ", station_1h_Option[stationPoint_1h_value][1])

  $('#transAddOption').val(0).prop('selected', true)
  simul_trans_score.push([add_option[0][0], add_option[0][1]])
}
function infraSelections(department, outlet, bigMart, market, bank, hospital, bigHospital, park, bigPark, harmful){
  department_value = 0
  if(department > department_option.length){
    department_value = department_option.length
  }
  else{
    department_value = department
  }
  $('#departmentOption').val(department_value).prop('selected', true)
  simul_infra_score.push([department_option[department_value][0], department_option[department_value][1]])
  //console.log(department_option[department_value][0], " : ", department_option[department_value][1])

  outlet_value = 0
  if(outlet > outlet_option.length){
    outlet_value = outlet_option.length
  }
  else{
    outlet_value = outlet
  }
  $('#outletOption').val(outlet_value).prop('selected', true)
  simul_infra_score.push([outlet_option[outlet_value][0], outlet_option[outlet_value][1]])
  //console.log(outlet_option[outlet_value][0], " : ", outlet_option[outlet_value][1])

  bigMart_value = 0
  if(bigMart > bigMart_option.length){
    bigMart_value = bigMart_option.length
  }
  else{
    bigMart_value = bigMart
  }
  $('#bigMartOption').val(bigMart_value).prop('selected', true)
  simul_infra_score.push([bigMart_option[bigMart_value][0], bigMart_option[bigMart_value][1]])
  //console.log(bigMart_option[bigMart_value][0], " : ", bigMart_option[bigMart_value][1])

  market_value = 0
  if(market >= 0 && market <= 49 ){
    market_value = 0
  }
  else if(market >= 50 && market <= 99 ){
    market_value = 1
  }
  else if(market >= 100 && market <= 149 ){
    market_value = 2
  }
  else if(market >= 150 && market <= 199 ){
    market_value = 3
  }
  else if(market >= 200 && market <= 249 ){
    market_value = 4
  }
  else if(market >= 250 && market <= 299 ){
    market_value = 5
  }
  else if(market >= 300 && market <= 349 ){
    market_value = 6
  }
  else{
    market_value = 7
  }

  $('#marketOption').val(market_value).prop('selected', true)
  simul_infra_score.push([market_option[market_value][0], market_option[market_value][1]])
  //console.log(market_option[market_value][0], " : ", market_option[market_value][1])

  bank_value = 0
  if(bank > bank_option.length){
    bank_value = bank_option.length
  }
  else{
    bank_value = bank
  }
  $('#bankOption').val(bank_value).prop('selected', true)
  simul_infra_score.push([bank_option[bank_value][0], bank_option[bank_value][1]])
  //console.log(bank_option[bank_value][0], " : ", bank_option[bank_value][1])

  hospital_value = 0
  if(hospital >= 0 && hospital <= 9 ){
    hospital_value = 0
  }
  else if(hospital >= 10 && hospital <= 19 ){
    hospital_value = 1
  }
  else if(hospital >= 20 && hospital <= 29 ){
    hospital_value = 2
  }
  else if(hospital >= 30 && hospital <= 39 ){
    hospital_value = 3
  }
  else if(hospital >= 40 && hospital <= 49 ){
    hospital_value = 4
  }
  else if(hospital >= 50 && hospital <= 59 ){
    hospital_value = 5
  }
  else if(hospital >= 60 && hospital <= 69 ){
    hospital_value = 6
  }
  else if(hospital >= 70 && hospital <= 79 ){
    hospital_value = 7
  }
  else if(hospital >= 80 && hospital <= 89 ){
    hospital_value = 8
  }
  else if(hospital >= 90 && hospital <= 99 ){
    hospital_value = 9
  }
  else{
    hospital_value = 10
  }
  $('#hospitalOption').val(hospital_value).prop('selected', true)
  simul_infra_score.push([hospital_option[hospital_value][0], hospital_option[hospital_value][1]])
  //console.log(hospital_option[hospital_value][0], " : ", hospital_option[hospital_value][1])

  bigHospital_value = 0
  if(bigHospital > bigHospital_option.length){
    bigHospital_value = bigHospital_option.length
  }
  else{
    bigHospital_value = bigHospital
  }
  $('#bigHospitalOption').val(bigHospital_value).prop('selected', true)
  simul_infra_score.push([bigHospital_option[bigHospital_value][0], bigHospital_option[bigHospital_value][1]])
  //console.log(bigHospital_option[bigHospital_value][0], " : ", bigHospital_option[bigHospital_value][1])

  park_value = 0
  if(park > park_option.length){
    park_value = park_option.length
  }
  else{
    park_value = park
  }
  $('#parkOption').val(park_value).prop('selected', true)
  simul_infra_score.push([park_option[park_value][0], park_option[park_value][1]])
  //console.log(park_option[park_value][0], " : ", park_option[park_value][1])

  bigPark_value = 0
  if(bigPark > bigPark_option.length){
    bigPark_value = bigPark_option.length
  }
  else{
    bigPark_value = bigPark
  }
  $('#bigParkOption').val(bigPark_value).prop('selected', true)
  simul_infra_score.push([bigPark_option[bigPark_value][0], bigPark_option[bigPark_value][1]])
  //console.log(bigPark_option[bigPark_value][0], " : ", bigPark_option[bigPark_value][1])

  harmful_value = 0
  if(harmful > harmful_option.length){
    harmful_value = harmful_option.length
  }
  else{
    harmful_value = harmful
  }
  $('#harmfulOption').val(harmful_value).prop('selected', true)
  simul_infra_score.push([harmful_option[harmful_value][0], harmful_option[harmful_value][1]])
  //console.log(harmful_option[harmful_value][0], " : ", harmful_option[harmful_value][1])

  $('#infraAddOption').val(0).prop('selected', true)
  simul_infra_score.push([add_option[0][0], add_option[0][1]])
}
  
function eduSelections(pSchool_dist, pSchool_edu, mSchool_edu, academy){
  pSchool_dist_value = 0
  if(pSchool_dist >= 0 && pSchool_dist < 100 ){
    pSchool_dist_value = 0
  }
  else if(pSchool_dist >= 100 && pSchool_dist < 200 ){
    pSchool_dist_value = 1
  }
  else if(pSchool_dist >= 200 && pSchool_dist < 300 ){
    pSchool_dist_value = 2
  }
  else if(pSchool_dist >= 300 && pSchool_dist < 400 ){
    pSchool_dist_value = 3
  }
  else if(pSchool_dist >= 400 && pSchool_dist < 500 ){
    pSchool_dist_value = 4
  }
  else if(pSchool_dist >= 500 && pSchool_dist < 600 ){
    pSchool_dist_value = 5
  }
  else if(pSchool_dist >= 600 && pSchool_dist < 700 ){
    pSchool_dist_value = 6
  }
  else{
    pSchool_dist_value = 7
  }
  $('#pSchoolDistOption').val(pSchool_dist_value).prop('selected', true)
  simul_edu_score.push([pSchool_dist_option[pSchool_dist_value][0], pSchool_dist_option[pSchool_dist_value][1]])
  //console.log(pSchool_dist_option[pSchool_dist_value][0], " : ", pSchool_dist_option[pSchool_dist_value][1])

  pSchool_edu_value = 0
  if(pSchool_edu > 95 && pSchool_edu <= 100 ){
    pSchool_edu_value = 0
  }
  else if(pSchool_edu >= 92 && pSchool_edu <= 95 ){
    pSchool_edu_value = 1
  }
  else if(pSchool_edu >= 88 && pSchool_edu < 92 ){
    pSchool_edu_value = 2
  }
  else if(pSchool_edu >= 85 && pSchool_edu < 88 ){
    pSchool_edu_value = 3
  }
  else{
    pSchool_edu_value = 4
  }
  $('#pSchoolEduOption').val(pSchool_edu_value).prop('selected', true)
  simul_edu_score.push([pSchool_edu_option[pSchool_edu_value][0], pSchool_edu_option[pSchool_edu_value][1]])
  //console.log(pSchool_edu_option[pSchool_edu_value][0], " : ", pSchool_edu_option[pSchool_edu_value][1])

  mSchool_edu_value = 0
  if(mSchool_edu >= 50 && mSchool_edu < 60 ){
    mSchool_edu_value = 0
  }
  else if(mSchool_edu >= 60 && mSchool_edu < 70 ){
    mSchool_edu_value = 1
  }
  else if(mSchool_edu >= 70 && mSchool_edu < 80 ){
    mSchool_edu_value = 2
  }
  else if(mSchool_edu >= 80 && mSchool_edu < 90 ){
    mSchool_edu_value = 3
  }
  else if(mSchool_edu >= 90 && mSchool_edu < 95 ){
    mSchool_edu_value = 4
  }
  else if(mSchool_edu >= 95 && mSchool_edu < 100 ){
    mSchool_edu_value = 5
  }
  else{
    mSchool_edu = 0
  }
  $('#mSchoolEduOption').val(mSchool_edu_value).prop('selected', true)
  simul_edu_score.push([mSchool_option[mSchool_edu_value][0], mSchool_option[mSchool_edu_value][1]])
  //console.log(mSchool_option[mSchool_edu_value][0], " : ", mSchool_option[mSchool_edu_value][1])

  academy_value = 0
  if(academy >= 0 && academy <= 19 ){
    academy_value = 0
  }
  else if(academy >= 20 && academy <= 39 ){
    academy_value = 1
  }
  else if(academy >= 40 && academy <= 59 ){
    academy_value = 2
  }
  else if(academy >= 60 && academy <= 79 ){
    academy_value = 3
  }
  else if(academy >= 80 && academy <= 99 ){
    academy_value = 4
  }
  else if(academy >= 100 && academy <= 119 ){
    academy_value = 5
  }
  else if(academy >= 120 && academy <= 139 ){
    academy_value = 6
  }
  else if(academy >= 140 && academy <= 159 ){
    academy_value = 7
  }
  else{
    academy_value = 8
  }
  $('#academyOption').val(academy_value).prop('selected', true)
  simul_edu_score.push([academy_option[academy_value][0], academy_option[academy_value][1]])
  //console.log(academy_option[academy_value][0], " : ", academy_option[academy_value][1])

  $('#eduAddOption').val(0).prop('selected', true)
  simul_edu_score.push([add_option[0][0], add_option[0][1]])
}

function putVal(e){  
  //주거 점수 반영
  if(e.id == "viewOption"){
    simul_living_score[0][0] = premiumOption[e.value][0]
    simul_living_score[0][1] = premiumOption[e.value][1]
  }
  if(e.id == "yearOption"){
    simul_living_score[1][0] = yearOption[e.value][0]
    simul_living_score[1][1] = yearOption[e.value][1]
  }
  if(e.id == "houseNumOption"){
    simul_living_score[2][0] = houseOption[e.value][0]
    simul_living_score[2][1] = houseOption[e.value][1]
  }
  if(e.id == "parkingOption"){
    simul_living_score[3][0] = parkingOption[e.value][0]
    simul_living_score[3][1] = parkingOption[e.value][1]
  }
  if(e.id == "heatingOption"){
    simul_living_score[4][0] = heatingOption[e.value][0]
    simul_living_score[4][0] = heatingOption[e.value][1]
  }
  if(e.id == "entranceOption"){
    simul_living_score[5][0] = entranceOption[e.value][0]
    simul_living_score[5][1] = entranceOption[e.value][1]
  }
  if(e.id == "livingAddOption"){
    simul_living_score[6][0] = add_option[e.value][0]
    simul_living_score[6][1] = add_option[e.value][1]
  }

  //교통 점수 반영
  if(e.id == "subwayOption"){
    simul_trans_score[0][0] = cloestStationOption[e.value][0]
    simul_trans_score[0][1] = cloestStationOption[e.value][1]
  }
  if(e.id == "min30Option"){
    simul_trans_score[1][0] = station_30m_Option[e.value][0]
    simul_trans_score[1][1] = station_30m_Option[e.value][1]
  }
  if(e.id == "hour1Option"){
    simul_trans_score[2][0] = station_1h_Option[e.value][0]
    simul_trans_score[2][1] = station_1h_Option[e.value][1]
  }
  if(e.id == "transAddOption"){
    simul_trans_score[3][0] = add_option[e.value][0]
    simul_trans_score[3][1] = add_option[e.value][1]
  }

  //인프라 점수 반영
  if(e.id == "departmentOption"){
    simul_infra_score[0][0] = department_option[e.value][0]
    simul_infra_score[0][1] = department_option[e.value][1]
  }
  if(e.id == "outletOption"){
    simul_infra_score[1][0] = outlet_option[e.value][0]
    simul_infra_score[1][1] = outlet_option[e.value][1]
  }
  if(e.id == "bigMartOption"){
    simul_infra_score[2][0] = bigMart_option[e.value][0]
    simul_infra_score[2][1] = bigMart_option[e.value][1]
  }
  if(e.id == "marketOption"){
    simul_infra_score[3][0] = market_option[e.value][0]
    simul_infra_score[3][1] = market_option[e.value][1]
  }
  if(e.id == "bankOption"){
    simul_infra_score[4][0] = bank_option[e.value][0]
    simul_infra_score[4][1] = bank_option[e.value][1]
  }
  if(e.id == "hospitalOption"){
    simul_infra_score[5][0] = hospital_option[e.value][0]
    simul_infra_score[5][1] = hospital_option[e.value][1]
  }
  if(e.id == "bigHospitalOption"){
    simul_infra_score[6][0] = bigHospital_option[e.value][0]
    simul_infra_score[6][1] = bigHospital_option[e.value][1]
  }
  if(e.id == "parkOption"){
    simul_infra_score[7][0] = park_option[e.value][0]
    simul_infra_score[7][1] = park_option[e.value][1]
  }
  if(e.id == "bigParkOption"){
    simul_infra_score[8][0] = bigPark_option[e.value][0]
    simul_infra_score[8][1] = bigPark_option[e.value][1]
  }
  if(e.id == "harmfulOption"){
    simul_infra_score[9][0] = harmful_option[e.value][0]
    simul_infra_score[9][1] = harmful_option[e.value][1]
  }
  if(e.id == "infraAddOption"){
    simul_infra_score[10][0] = add_option[e.value][0]
    simul_infra_score[10][1] = add_option[e.value][1]
  }

  //교육 점수 반영
  if(e.id == "pSchoolDistOption"){
    simul_edu_score[0][0] = pSchool_dist_option[e.value][0]
    simul_edu_score[0][1] = pSchool_dist_option[e.value][1]
  }
  if(e.id == "pSchoolEduOption"){
    simul_edu_score[1][0] = pSchool_edu_option[e.value][0]
    simul_edu_score[1][1] = pSchool_edu_option[e.value][1]
  }
  if(e.id == "mSchoolEduOption"){
    simul_edu_score[2][0] = mSchool_option[e.value][0]
    simul_edu_score[2][1] = mSchool_option[e.value][1]
  }
  if(e.id == "academyOption"){
    simul_edu_score[3][0] = academy_option[e.value][0]
    simul_edu_score[3][1] = academy_option[e.value][1]
  }
  if(e.id == "eduAddOption"){
    simul_edu_score[4][0] = add_option[e.value][0]
    simul_edu_score[4][1] = add_option[e.value][1]
  }
}

function calValue(arr, length){
  openLoading() 
  console.log(arr)
  address = arr["법정동주소"].split(" ")
  console.log("주소: ", arr["법정동주소"])
  console.log("시도: ", address[0])  
  //console.log("주거 :", simul_living_score)
  //console.log("교통 :", simul_trans_score)
  //console.log("인프라 :", simul_infra_score)
  //console.log("교육 :", simul_edu_score)  

  var living_score = 0
  var trans_score = 0
  var infra_score = 0
  var edu_score = 0
  var value_total = 0

  living_score = (  (simul_living_score[1][1] * live_rate['years']) + (simul_living_score[2][1] * live_rate['housenum']) + (simul_living_score[3][1] * live_rate['parking_per_house']) +
                    (simul_living_score[4][1] * live_rate['heating']) + (100 * live_rate['bathroom']) + (simul_living_score[5][1] * live_rate['entrance']) + simul_living_score[6][1])

  if(address[0] == "서울시" || address[0] == "인천시" || address[0] == "경기도" || address[0] == "부산시" || address[0] == "대구시" || address[0] == "대전시" || address[0] == "광주시"){
    trans_score = ( (simul_trans_score[0][1] * transport_rate['subway_area'] ) +
                    (simul_trans_score[1][1] * transport_rate['30min_points']) + (simul_trans_score[2][1] * transport_rate['1hour_points']) + simul_trans_score[3][1]  )
  }
  else{
    trans_score = 0
  }

  if(address[0] == "서울시" || address[0] == "인천시" || address[0] == "경기도" || address[0] == "부산시" || address[0] == "대구시" || address[0] == "대전시" || address[0] == "광주시"){
      infra_score = ( (simul_infra_score[0][1] * infra_rate_metro['department_store']) + (simul_infra_score[1][1] * infra_rate_metro['outlet_mall']) + (simul_infra_score[2][1] * infra_rate_metro['big_mart']) +
                      (simul_infra_score[3][1] * infra_rate_metro['market']) + (simul_infra_score[4][1] * infra_rate_metro['bank']) + (simul_infra_score[5][1] * infra_rate_metro['hospital']) + 
                      (simul_infra_score[6][1] * infra_rate_metro['big_hospital']) + (simul_infra_score[7][1] * infra_rate_metro['park']) + (simul_infra_score[8][1] * infra_rate_metro['big_park']) +
                      (simul_infra_score[9][1] * infra_rate_metro['harmful']) + simul_infra_score[10][1]  )
  }
  else{
      infra_score = ( (simul_infra_score[0][1] * infra_rate['department_store']) + (simul_infra_score[1][1] * infra_rate['outlet_mall']) + (simul_infra_score[2][1] * infra_rate['big_mart']) +
                      (simul_infra_score[3][1] * infra_rate['market']) + (simul_infra_score[4][1] * infra_rate['bank']) + (simul_infra_score[5][1] * infra_rate['hospital']) + 
                      (simul_infra_score[6][1] * infra_rate['big_hospital']) + (simul_infra_score[7][1] * infra_rate['park']) + (simul_infra_score[8][1] * infra_rate['big_park']) +
                      (simul_infra_score[9][1] * infra_rate['harmful']) + simul_infra_score[10][1]  )
  }

  pSchool_score = (simul_edu_score[0][1] * 0.65) + (simul_edu_score[1][1] * 0.35)
  edu_score = ( (pSchool_score * education_rate['primary_school']) + (simul_edu_score[2][1] * education_rate['middle_school']) + (simul_edu_score[3][1] * education_rate['academy']) + simul_edu_score[4][1]  )

  if(address[0] == "서울시" || address[0] == "부산시"){            
      value_total = ( (living_score * total_rate_seoul['live']) + (trans_score * total_rate_seoul['transport']) + (infra_score * total_rate_seoul['infra']) + (edu_score * total_rate_seoul['education'])  )
  }
  else if(address[0] == "인천시" || address[0] == "경기도"){
      if(address[1] == "과천시" || address[1] == "광명시"){
          value_total = ( (living_score * total_rate_seoul['live']) + (trans_score * total_rate_seoul['transport']) + (infra_score * total_rate_seoul['infra']) + (edu_score * total_rate_seoul['education']) )
      }
      else{
          value_total = ( (living_score * total_rate_metropolitan['live']) + (trans_score * total_rate_metropolitan['transport']) + (infra_score * total_rate_metropolitan['infra']) + (edu_score * total_rate_metropolitan['education'])  )
      }
  }
  else if(address[0] == "대구시" || address[0] == "대전시" || address[0] == "광주시"){
      value_total = ( (living_score * total_rate_middle['live']) + (trans_score * total_rate_middle['transport']) + (infra_score * total_rate_middle['infra']) + (edu_score * total_rate_middle['education'])  )
  }
  else{
      value_total = ( (living_score * total_rate_urban['live']) + (infra_score * total_rate_urban['infra']) + (edu_score * total_rate_urban['education']) )
  }

  living_score += simul_living_score[0][1]
  value_total += simul_living_score[0][1]  

  if(living_score > 100){
    living_score = 100
  }
  if(trans_score > 100){
    trans_score = 100
  }
  if(infra_score > 100){
    infra_score = 100
  }
  if(edu_score > 100){
    edu_score = 100
  }
  if(value_total > 100){
    value_total = 100
  }

  ranks = makeRate(value_total, living_score, trans_score, infra_score, edu_score)
  resultValue = [[value_total, ranks[0]], [living_score, ranks[1]], [trans_score, ranks[2]], [infra_score, ranks[3]], [edu_score, ranks[4]]]

  //console.log("주거점수 : ", living_score)
  //console.log("교통점수 : ", trans_score)
  //console.log("인프라점수 : ", infra_score)
  //console.log("교육점수 : ", edu_score)
  //console.log("총점 : ", value_total)
  setTimeout(waiting, 3000, resultValue, arr, length);
  //showSimulResult(resultValue, arr, length)  
}

function waiting(resultValue, arr, length){
  showSimulResult(resultValue, arr, length)
}

function makeRate(value_total, living_score, trans_score, infra_score, edu_score){
  var balanced_rate = []
  var living_rate = []  
  var trans_rate = []
  var infra_rate = []
  var edu_rate = []

  for(var i = 0 ; i < aptData_original.data.length ; i++){    
    livingRate = aptData_original.data[i]["주거총점"]
    transRate = aptData_original.data[i]["교통총점"]
    infraRate = aptData_original.data[i]["인프라총점"]
    eduRate = aptData_original.data[i]["학군총점"]

    balanced_rate.push(aptData_original.data[i]["가치 총점"])

    if(selectedRegion == 'Seoul' || selectedRegion == 'Incheon' || selectedRegion == 'Gyeonggi' || selectedRegion == 'Busan' || selectedRegion == 'Daegu' || selectedRegion == 'Daejeon' || selectedRegion == 'Gwangju'){
      total = 10+2+4+4
      living_rate_score = (livingRate * 10/total) + (transRate * 2/total) + (infraRate * 4/total) + (eduRate * 4/total)
      living_rate.push(living_rate_score)

      total = 3+10+4+3
      trans_rate_score = (livingRate * 3/total) + (transRate * 10/total) + (infraRate * 4/total) + (eduRate * 3/total)
      trans_rate.push(trans_rate_score)

      total = 2+3+10+5
      infra_rate_score = (livingRate * 2/total) + (transRate * 3/total) + (infraRate * 10/total) + (eduRate * 5/total)
      infra_rate.push(infra_rate_score)

      total = 4+2+4+10
      edu_rate_score = (livingRate * 4/total) + (transRate * 2/total) + (infraRate * 4/total) + (eduRate * 10/total)
      edu_rate.push(edu_rate_score)
    }
    else{
      total = 10+5+5
      living_rate_score = (livingRate * 10/total) + (infraRate * 5/total) + (eduRate * 5/total)
      living_rate.push(living_rate_score)

      total = 3+10+6
      infra_rate_score = (livingRate * 3/total) + (infraRate * 10/total) + (eduRate * 6/total)
      infra_rate.push(infra_rate_score)

      total = 5+5+10
      edu_rate_score = (livingRate * 5/total) + (infraRate * 5/total) + (eduRate * 10/total)
      edu_rate.push(edu_rate_score)
    }
  }

  living_rate.sort(function(a, b)  {
    return b - a;
  });
  trans_rate.sort(function(a, b)  {
    return b - a;
  });
  infra_rate.sort(function(a, b)  {
    return b - a;
  });
  edu_rate.sort(function(a, b)  {
    return b - a;
  }); 

  //console.log(balanced_rate)
  //console.log(living_rate)
  //console.log(trans_rate)
  //console.log(infra_rate)
  //console.log(edu_rate)

  balanced_rank = 0
  living_rank = 0
  trans_rank = 0
  infra_rank = 0
  edu_rank = 0

  //예상 순위 리턴하는 내용 작성
  for(var k = 0 ; k < balanced_rate.length ; k++){
    if(balanced_rate[k] - value_total <= 0){
      balanced_rank = k+1
      break
    }
  }
  for(var k = 0 ; k < living_rate.length ; k++){
    if(living_rate[k] - living_score <= 0){
      living_rank = k+1
      break
    }
  }
  for(var k = 0 ; k < trans_rate.length ; k++){
    if(trans_rate[k] - trans_score <= 0){      
      trans_rank = k+1
      break
    }
  }
  for(var k = 0 ; k < infra_rate.length ; k++){
    if(infra_rate[k] - infra_score <= 0){
      infra_rank = k+1
      break
    }
  }
  for(var k = 0 ; k < edu_rate.length ; k++){
    if(edu_rate[k] - edu_score <= 0){
      edu_rank = k+1
      break
    }
  }

  //console.log("균형잡힌 랭크 : ", balanced_rank, " : ", value_total)
  //console.log("주거우선 랭크 : ", living_rank, " : ", living_score)
  //console.log("교통우선 랭크 : ", trans_rank, " : ", trans_score)
  //console.log("인프라우선 랭크 : ", infra_rank, " : ", infra_score)
  //console.log("교육우선 랭크 : ", edu_rank, " : ", edu_score)

  return [balanced_rank, living_rank, trans_rank, infra_rank, edu_rank]
}

function showSimulResult(resultValue, arr, length){
  closeLoading()

  titleHtml = "";
  detailHtml = "";
  footerHtml = "";

  //타이틀
  //titleHtml += "<div class='popupTitle'>" + aptName + " " + apt_p + "(" + apt_m + ")</div>";
  titleHtml += "<div class='popupTitle' style='color: #ff3d38; font-size: 0.6em; text-align: center; border-bottom: 1px solid #ff3d38; border-top: 1px solid #ff3d38;margin-bottom: 3px'>랭크 시뮬레이션 결과</div>";
  titleHtml += "<div class='popupTitle' style='text-align: center'>" + arr["아파트명"] + "</div>";
  titleHtml += "<div class='popupSubtitle' style='font-size: 0.6em; text-align: center'>" + arr["법정동주소"] + "</div>";

  //종합
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";  
  detailHtml += "<div class='popTitle'><i class='fas fa-trophy'></i>&nbsp&nbsp종합 " + resultValue[0][1] + "위 예상 <span style='font-size:0.7em'>(전체 " + length + "개 단지 중)</span></div></div>"
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='simulBalancedChart'></canvas></div>"
  detailHtml += "</div></div>";

  //주거
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-home'></i>&nbsp&nbsp주거 " + resultValue[1][1] + "위 예상 <span style='font-size:0.7em'>(전체 " + length + "개 단지 중)</span></div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popLiving'>"  
  detailHtml += "<div class='popTable'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='simulLivingChart'></canvas></div>"
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "조망 프리미엄" + "</div>" + "<div class='popResult'>" + simul_living_score[0][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "연차" + "</div>" + "<div class='popResult'>" + simul_living_score[1][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "세대수" + "</div>" + "<div class='popResult'>" + simul_living_score[2][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "세대당 주차수" + "</div>" + "<div class='popResult'>" + simul_living_score[3][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "난방방식" + "</div>" + "<div class='popResult'>" + simul_living_score[4][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "현관구조" + "</div>" + "<div class='popResult'>" + simul_living_score[5][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 주거 가점" + "</div>" + "<div class='popResult'>" + simul_living_score[6][0] + "</div></div>";
  detailHtml += "</div></div></div></div>";

  if(resultValue[2][0] != 0){
    //교통
    detailHtml += "<div class='card'>";
    detailHtml += "<div class='card-header'>";
    detailHtml += "<div class='popTitle'><i class='fas fa-bus'></i>&nbsp&nbsp교통 " + resultValue[2][1] + "위 예상 <span style='font-size:0.7em'>(전체 " + length + "개 단지 중)</span></div>"
    detailHtml += "</div>";
    detailHtml += "<div class='card-body'>";
    detailHtml += "<div id='popTransport'>"    
    detailHtml += "<div class='popTable'>"
    detailHtml += "<div class='graph' style='height: 120px'> <canvas id='simulTransChart'></canvas></div>"
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "가장 가까운 역 거리" + "</div>" + "<div class='popResult'>" + simul_trans_score[0][0] + "</div></div>";
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "30분 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'>" + simul_trans_score[1][0] + "개</div></div>";
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1시간 이내 도착 가능 주요역" + "</div>" + "<div class='popResult'>" + simul_trans_score[2][0] + "개</div></div>";
    detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 교통 가점" + "</div>" + "<div class='popResult'>" + simul_trans_score[3][0] + "</div></div>";
    detailHtml += "</div></div></div></div>";
  }

  //인프라
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-hospital-user'></i>&nbsp&nbsp인프라 " + resultValue[3][1] + "위 예상 <span style='font-size:0.7em'>(전체 " + length + "개 단지 중)</span></div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popInfra'>"  
  detailHtml += "<div class='popTable'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='simulInfraChart'></canvas></div>"
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 백화점" + "</div>" + "<div class='popResult'>" + simul_infra_score[0][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 아울렛/몰" + "</div>" + "<div class='popResult'>" + simul_infra_score[1][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형마트" + "</div>" + "<div class='popResult'>" + simul_infra_score[2][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "300m 이내 상점" + "</div>" + "<div class='popResult'> " + simul_infra_score[3][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 은행" + "</div>" + "<div class='popResult'>" + simul_infra_score[4][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 병원" + "</div>" + "<div class='popResult'>" + simul_infra_score[5][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "5km 이내 대형병원" + "</div>" + "<div class='popResult'>" + simul_infra_score[6][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 공원" + "</div>" + "<div class='popResult'>" + simul_infra_score[7][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "1km 이내 대형공원" + "</div>" + "<div class='popResult'>" + simul_infra_score[8][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "3km 이내 혐오시설" + "</div>" + "<div class='popResult'>" + simul_infra_score[9][0] + "개</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 인프라 가점" + "</div>" + "<div class='popResult'>" + simul_infra_score[10][0] + "</div></div>";
  detailHtml += "</div></div></div></div>"  

  //교육
  detailHtml += "<div class='card'>";
  detailHtml += "<div class='card-header'>";
  detailHtml += "<div class='popTitle'><i class='fas fa-graduation-cap'></i>&nbsp&nbsp교육 " + resultValue[4][1] + "위 예상 <span style='font-size:0.7em'>(전체 " + length + "개 단지 중)</span></div>"
  detailHtml += "</div>";
  detailHtml += "<div class='card-body'>";
  detailHtml += "<div id='popEducation'>"  
  detailHtml += "<div class='popTable'>"
  detailHtml += "<div class='graph' style='height: 120px'> <canvas id='simulEduChart'></canvas></div>"
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 거리" + "</div>" + "<div class='popResult'>" + simul_edu_score[0][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "초등학교 학생증감" + "</div>" + "<div class='popResult'>" + simul_edu_score[1][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "중학교 학업성취도" + "</div>" + "<div class='popResult'>" + simul_edu_score[2][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "500m 이내 학원" + "</div>" + "<div class='popResult'>" + simul_edu_score[3][0] + "</div></div>";
  detailHtml += "<div class='popSubTable'><div class='popContent'>" + "내맘대로 교육 가점" + "</div>" + "<div class='popResult'>" + simul_edu_score[4][0] + "</div></div>";
  detailHtml += "</div></div></div></div>"

  $('#toggleModalLabe2').html(titleHtml);
  $('#simulResult').html(detailHtml);
  $('#toggle2footer').html(footerHtml);

//  $('.popContent').css({"line-height" : "2.4em"})  
  $('.modal-title').css({"width" : "100%"})
  drawSimulSubChart(resultValue[0][0].toFixed(2), arr["가치 총점"].toFixed(2), "시뮬레이션", "기존", "#ff3d38", "#9f9f9f", "simulBalancedChart")
  drawSimulSubChart(resultValue[1][0].toFixed(2), arr["주거총점"].toFixed(2), "시뮬레이션", "기존", "#ff3d38", "#9f9f9f", "simulLivingChart")
  if(resultValue[2][0] != 0){
    drawSimulSubChart(resultValue[2][0].toFixed(2), arr["교통총점"].toFixed(2), "시뮬레이션", "기존", "#ff3d38", "#9f9f9f", "simulTransChart")
  }
  drawSimulSubChart(resultValue[3][0].toFixed(2), arr["인프라총점"].toFixed(2), "시뮬레이션", "기존", "#ff3d38", "#9f9f9f", "simulInfraChart")
  drawSimulSubChart(resultValue[4][0].toFixed(2), arr["학군총점"].toFixed(2), "시뮬레이션", "기존", "#ff3d38", "#9f9f9f", "simulEduChart")
  
  $('#toggleModal2').modal("show");
}