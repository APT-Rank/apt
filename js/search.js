

  function showSearchBar(){    
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
  
  function aptSearch(){
    $('#dataList').html("");
    input = $('#inputSearch').val()
    for(var i = 0 ; i < sortData.data.length ; i++){
          var aptName = sortData.data[i]["아파트명"]
          var searchName = sortData.data[i]["아파트명"] + " " + sortData.data[i]["법정동주소"]

          if(searchName.indexOf(input) >= 0){              
            var aptName = sortData.data[i]["아파트명"]
            var apt_m = sortData.data[i]["전용면적(m2)"]
            var apt_p = sortData.data[i]["전용면적(평)"]
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

            var sortName = ""
            if (sortSelection == "sortLiving"){ sortName = "거주우선" }
            if (sortSelection == "sortTrans"){ sortName = "교통우선" }
            if (sortSelection == "sortInfra"){ sortName = "인프라우선" }
            if (sortSelection == "sortEdu"){ sortName = "학군우선" }
            if (sortSelection == "sortCustom"){ sortName = "커스텀" }

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
                  addon_html += "<div class='rank'>" + rank + "위</div>";
                }

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

                addon_html += "</div>"
              }  
            
            addon_html += "<div class='content'>";
            //addon_html += "<div class='apt_name'>" + aptName + " " + apt_p + "(" + apt_m + ")</div>";          

            addon_html += "<div class='apt_name'>" + aptName;          
            addon_html += "<span class='aptYear'> (" + sortData.data[i]["준공년차"] + "년차)</span></div>";

            if(last_sales_date == "1800-01-01"){
              addon_html += "<div class='apt_info'>" + house_num + "세대 / 거래 정보 없음</div>";
            }
            else{
              addon_html += "<div class='apt_info'>"+ house_num + "세대 / " + Math.round(last_sales_price/100)/100 + "억, " + last_sales_area + ", " + last_sales_date_short + "</div>";
            }            

            addon_html += "<div class='apt_address'>" + aptAddress + "</div>";
            addon_html += "</div>";
            addon_html += "<div class='value_score'>" + ( Math.round( aptValue * 100 ) / 100 ).toFixed(2) + "점"
            addon_html += "</div>"

            $('#dataList').append(addon_html);            
          }
        }
  }