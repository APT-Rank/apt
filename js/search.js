function showSearchBar(){  
  if(selectedRegion == "Korea"){
    showRegionSearchBar()
  }
  else{
    showAptSearchBar()
  }
}
  function showAptSearchBar(){    
    //$("#searchCard").slideDown();    
    $("#searchCard").animate({
      opacity: 1.0,
      top: '0'
    }, 400, 'easeOutQuad'
    );
    $("#closeSearch_floating").animate({
      opacity: 1.0,
      right: '5'
    }, 700, 'easeOutQuad'
    );

    $('#inputSearch').focus();

    var searchNotice = "'" + $('#sido option:selected').text() + " " + $('#gungu option:selected').text() + "' 내에서 검색합니다"
    $('#searchNotice').html(searchNotice)
  }
  function closeSearch(){    
    $("#searchCard").animate({
      opacity: 0.0,
      top: '-150px'
    }, 400, 'easeInQuad'
    );
    $("#closeSearch_floating").animate({
      opacity: 0.0,
      right: '-200px'
    }, 400, 'easeInQuad'
    );
    $('#inputSearch').val("")    
    aptSearch()
  }
  
  var input = ""
  function checkPrice(last_sales){    
    if(minValue == 0 && maxValue == 60){
      return true
    }
    else if(last_sales >= minValue/2*10000 && last_sales <= maxValue/2*10000){
      return true
    }
    else{
      return false
    }
  }

  function aptSearch(){
    $('#dataList').html("");
    console.log(minValue/2*10000)
    console.log(maxValue/2*10000) 
    input = $('#inputSearch').val()

    if(sortSelection == "sortDefault"){
      sortData = aptData
    }

    for(var i = 0 ; i < sortData.data.length ; i++){
          var aptName = sortData.data[i]["아파트명"]
          var searchName = sortData.data[i]["아파트명"] + " " + sortData.data[i]["법정동주소"]

          if(searchName.indexOf(input) >= 0){              
            var aptName = sortData.data[i]["아파트명"]
            var apt_m = sortData.data[i]["전용면적(m2)"]
            var apt_p = sortData.data[i]["전용면적(평)"]
            var apt_type = sortData.data[i]["매매타입"]
            var aptAddress = sortData.data[i]["도로명주소"]
            var aptValue = Math.round( sortData.data[i]["가치 총점"] * 100 ) / 100
            var house_num = sortData.data[i]["세대수"]
            var rank = sortData.data[i]["rank"].toFixed()
            var last_sales = sortData.data[i]["last_sales"].split(",")
            var last_sales_date = last_sales[0].toString()
            var last_sales_price = last_sales[1].toString()
            var last_sales_area = last_sales[2]
            last_sales_date_short = last_sales_date.substr(2)

            //valueSum += aptData.data[i]["가치 총점"]
            //livingSum += aptData.data[i]["주거총점"]
            //transportSum += aptData.data[i]["교통총점"]
            //infraSum += aptData.data[i]["인프라총점"]
            //eduSum += aptData.data[i]["학군총점"]

            //console.log(valueSum)

            if(checkPrice(last_sales[1])){
              var sortName = ""
              if (sortSelection == "sortDefault"){ sortName = "균형잡힌" }
              if (sortSelection == "sortLiving"){ sortName = "주거우선" }
              if (sortSelection == "sortTrans"){ sortName = "교통우선" }
              if (sortSelection == "sortInfra"){ sortName = "인프라우선" }
              if (sortSelection == "sortEdu"){ sortName = "교육우선" }
              if (sortSelection == "sortCustom"){ sortName = "커스텀" }

              if(rearrangeAPTSelection == "rearrangePrice"){ sortName = "실거래가" }
              if(rearrangeAPTSelection == "rearrangeNew"){ sortName = "신축순" }
              if(rearrangeAPTSelection == "rearrangeHouse"){ sortName = "세대수순" }

              var addon_html = "<div class='listBox' data-bs-toggle='modal' data-bs-target='#exampleModal' id='myModal' onClick='showDetail(" + i + ")'>";

                if(selectedMonth == "202201"){
                  addon_html += "<div class='rank_content'>"

                  if(sortSelection == "sortDefault"){
                    addon_html += "<div class='rank'>" + rank + "위</div>";
                  }
                  else{
                    addon_html += "<div class='rank'>" + (i+1) + "위</div>";
                    addon_html += "<div class='ranksame' style='color:gray'>(" + sortName + ")</div>"
                  }
                  addon_html += "</div>"
                }

                else{
                  addon_html += "<div class='rank_content'>"

                  if(sortSelection != "sortDefault"){
                    addon_html += "<div class='rank'>" + (i+1) + "위</div>";
                  }
                  else{
                    //addon_html += "<div class='rank'>" + rank + "위</div>";
                    addon_html += "<div class='rank'>" + (i+1) + "위</div>";
                  }

                  if(sortSelection == "sortDefault"){
                    if(rearrangeAPTSelection == "rearrangeScore" || rearrangeAPTSelection == "rearrangeRank" ){
                      if(sortData.data[i]["rank_gap"] == 0){
                        addon_html += "<div class='ranksame'> -- </div>"
                      }
                      else if(sortData.data[i]["rank_gap"] == 9999){
                        addon_html += "<div class='ranksame'> NEW! </div>"
                      }
                      else if(sortData.data[i]["rank_gap"] > 0){
                        addon_html += "<div class='rankup'> ▲" + Math.abs(sortData.data[i]["rank_gap"]) + "</div>"
                      }
                      else if(sortData.data[i]["rank_gap"] < 0){
                        addon_html += "<div class='rankdown'> ▼" + Math.abs(sortData.data[i]["rank_gap"]) + "</div>"
                      }
                    }
                    else{
                      addon_html += "<div class='ranksame' style='color:gray'>(" + sortName + ")</div>"
                    }
                  }
                  else{
                    addon_html += "<div class='ranksame' style='color:gray'>(" + sortName + ")</div>"
                  }

                  /*
                  if(sortSelection == "sortDefault"){
                    if(sortData.data[i]["rank_gap"] == 0){
                      addon_html += "<div class='ranksame'> -- </div>"
                    }
                    else if(sortData.data[i]["rank_gap"] == 9999){
                      addon_html += "<div class='ranksame'> NEW! </div>"
                    }
                    else if(sortData.data[i]["rank_gap"] > 0){
                      addon_html += "<div class='rankup'> ▲" + Math.abs(sortData.data[i]["rank_gap"]) + "</div>"
                    }
                    else if(sortData.data[i]["rank_gap"] < 0){
                      addon_html += "<div class='rankdown'> ▼" + Math.abs(sortData.data[i]["rank_gap"]) + "</div>"
                    }
                  }
                  else{
                    addon_html += "<div class='ranksame' style='color:gray'>(" + sortName + ")</div>"
                  }
                  */

                  addon_html += "</div>"
                }  
              
              addon_html += "<div class='content'>";
              //addon_html += "<div class='apt_name'>" + aptName + " " + apt_p + "(" + apt_m + ")</div>"

              addon_html += "<div class='apt_name'>" + aptName;

              if(Number(selectedMonth) > 202203){
                if(apt_type == "아파트"){
                  addon_html += "<span class='aptYear'> (" + sortData.data[i]["준공년차"] + "년차)</span></div>";
                }
                if(apt_type == "재건축"){
                  addon_html += "<span class='aptYear'> (" + sortData.data[i]["준공년차"] + "년차, 재건축)</span></div>";
                }
                if(apt_type == "분양권"){
                  addon_html += "<span class='aptYear'> (분양권, " + sortData.data[i]["준공년월"].substr(0, 7) + " 예정)</span></div>";
                }      
              }
              else{
                addon_html += "<span class='aptYear'> (" + sortData.data[i]["준공년차"] + "년차)</span></div>";
              }
              
              if(last_sales_date == "1800-01-01"){
                addon_html += "<div class='apt_info'><span class='aptNum'>" + house_num.toLocaleString() + "세대</span> / <span class='aptPrice'>거래 정보 없음</span></div>";
              }
              else{
                addon_html += "<div class='apt_info'><span class='aptNum'>"+ house_num.toLocaleString() + "세대</span> / <span class='aptPrice'>" + Math.round(last_sales_price/100)/100 + "억, " + last_sales_area + ", " + last_sales_date_short + "</span></div>";
              }
              if(Number(selectedMonth) > 202203 && apt_type == "분양권"){                
                addon_html += "<div class='apt_address'>" + sortData.data[i]["법정동주소"] + "</div>";
              }
              else{
                addon_html += "<div class='apt_address'>" + aptAddress + "</div>";
              }

              addon_html += "</div>";
              addon_html += "<div class='value_score'>" + ( Math.round( aptValue * 100 ) / 100 ).toFixed(2) + "점</div>"
              addon_html += "</div>"

              $('#dataList').append(addon_html);
            }            
          }
          
          if(rearrangeAPTSelection == "rearrangePrice" || !(minValue == 0 && maxValue == 60)){
            $(".aptPrice").css({'color': '#ff3d38', 'font-weight': '600'})
          }
          if(rearrangeAPTSelection == "rearrangeNew"){
            $(".aptYear").css({'color': '#ff3d38', 'font-weight': '600'})
          }
          if(rearrangeAPTSelection == "rearrangeHouse"){
            $(".aptNum").css({'color': '#ff3d38', 'font-weight': '600'})
          }

        }
      $('#dataList').append("<div style='height: 1.5em'></div>");
      $('html').scrollTop(0)
  }

  function showRegionSearchBar(){     
    $("#regionSearchCard").animate({
      opacity: 1.0,
      top: '0'
    }, 400, 'easeOutQuad'
    );
    $("#closeRegionSearch_floating").animate({
      opacity: 1.0,
      right: '5'
    }, 700, 'easeOutQuad'
    );

    $('#regionInputSearch').focus();    
  }
  function closeRegionSearch(){    
    $("#regionSearchCard").animate({
      opacity: 0.0,
      top: '-150px'
    }, 400, 'easeInQuad'
    );
    $("#closeRegionSearch_floating").animate({
      opacity: 0.0,
      right: '-200px'
    }, 400, 'easeInQuad'
    );
    $('#regionInputSearch').val("")    
    regionSearch()
  }

  var regionInput = ""
  function regionSearch(){
    $('#dataList').html("");
    input = $('#regionInputSearch').val()      
      for(var i = 0 ; i < itemNum ; i++){
        var searchName = regSortData.data[i]["시도"]

        if(searchName.indexOf(input) >= 0){
          var regName = regSortData.data[i]["시도"]
          
          var regSuplyLevel = regSortData.data[i]["공급수준"]
          var regPopChange = regSortData.data[i]["인구증감"]
          var regPop = regSortData.data[i]["인구수"]
          var regIncome = regSortData.data[i]["소득수준"]
          var regValue = Math.round( regSortData.data[i]["가치 총점"] * 100 ) / 100;
          var regRank = regSortData.data[i]["rank"]
          var regJob = regSortData.data[i]["일자리"]

          regValueSum += regSortData.data[i]["가치 총점"]
          regSupplySum += regSortData.data[i]["지역구공급총점"]
          regPopSum += regSortData.data[i]["인구총점"]
          regJobSum += regSortData.data[i]["일자리총점"]

          var addon_html = "<div class='listBox' data-bs-toggle='modal' data-bs-target='#exampleModal' id='myModal' onClick='showRegionDetail(" + i + ")'>";          

          if(selectedMonth == "202201"){
            addon_html += "<div class='rank_content'>"
            addon_html += "<div class='rank'>" + regRank + "위</div>";            
            addon_html += "</div>"
          }
          else{
            addon_html += "<div class='rank_content'>"
            addon_html += "<div class='rank'>" + regRank + "위</div>";
            if(regSortData.data[i]["rank_gap"] == 0){
              addon_html += "<div class='ranksame'> -- </div>"
            }
            else if(regSortData.data[i]["rank_gap"] == 9999){
              addon_html += "<div class='ranksame'> NEW! </div>"
            }
            else if(regSortData.data[i]["rank_gap"] > 0){
              addon_html += "<div class='rankup'> ▲" + Math.abs(regSortData.data[i]["rank_gap"]) + "</div>"
            }
            else if(regSortData.data[i]["rank_gap"] < 0){
              addon_html += "<div class='rankdown'> ▼" + Math.abs(regSortData.data[i]["rank_gap"]) + "</div>"
            }

            addon_html += "</div>"
          }

          addon_html += "<div class='content'>";          
          addon_html += "<div class='apt_name'>" + regName + "</div>";
          addon_html += "<div class='reg_subTable'>";

          addon_html += "<div class='apt_address'>아파트 공급량 <span style='font-weight:900; color:#0f0f0f'>" + regSuplyLevel + "</span></div>";

          var upDown = ""
          var popChange = ""
          if (regPopChange < 0){
            upDown = "감소"
            popChange = "▼" + (Math.abs(regPopChange)).toLocaleString()
          }
          else{
            upDown = "증가"
            popChange = "▲" + (Math.abs(regPopChange)).toLocaleString()
          }        
          addon_html += "<div class='apt_address'><span class='regionPop'>인구 " + (Math.abs(regPop)).toLocaleString() + "명 </span>"
          if(regPopChange >= 0){
            addon_html += "<span class='regionPopUp'>(" + popChange + ")</span></div>";
          }
          else{
            addon_html += "<span class='regionPopDown'>(" + popChange + ")</span></div>";
          }
          addon_html += "<div class='apt_address'><span class='regionJob'>일자리 " + regJob.toLocaleString() + "개</span></div>";
          addon_html += "<div class='apt_address'><span class='regionIncome'>소득 " + regIncome.toLocaleString() + "원</span></div>";          
          addon_html += "</div></div>";
          addon_html += "<div class='value_score'>" + ( Math.round( regValue * 100 ) / 100 ).toFixed(2) + "점</div>"
          addon_html += "</div>"

          $('#dataList').append(addon_html);
        }
        if(rearrangeRegionSelection == "rearrangeRegionPop"){            
          $(".regionPop").css({'color': '#ff3d38', 'font-weight': '600'})
        }
        if(rearrangeRegionSelection == "rearrangeRegionPopUpDown"){
          $(".regionPopUp").css({'color': '#ff3d38', 'font-weight': '600'})
          $(".regionPopDown").css({'color': 'blue', 'font-weight': '600'})
        }
        if(rearrangeRegionSelection == "rearrangeRegionJob"){
          $(".regionJob").css({'color': '#ff3d38', 'font-weight': '600'})
        }
        if(rearrangeRegionSelection == "rearrangeRegionIncome"){
          $(".regionIncome").css({'color': '#ff3d38', 'font-weight': '600'})
        }        
      }
      $('html').scrollTop(0)
    }