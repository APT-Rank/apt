var rearrangeSelection = "rearrangeName"

function showRearrangeBar(){  
  if(selectedTheme == "under100M"){
    rearrangeMenu = "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeName' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeName'>이름순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeYear' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeYear'>연차순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeHouse' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeHouse'>세대수순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangePrice' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangePrice'>공시가순</label></div>"
  }
  else if(selectedTheme == "under300M"){
    rearrangeMenu = "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeName' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeName'>이름순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeYear' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeYear'>연차순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeHouse' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeHouse'>세대수순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangePrice' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangePrice'>공시가순</label></div>"
  }
  else if(selectedTheme == "under5floor"){
    rearrangeMenu = "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeName' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeName'>이름순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeYear' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeYear'>연차순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeHouse' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeHouse'>세대수순</label></div>"    
  }
  else if(selectedTheme == "over30year"){
    rearrangeMenu = "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeName' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeName'>이름순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeOld' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeOld'>오래된순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeHouse' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeHouse'>세대수순</label></div>"    
  }
  else if(selectedTheme == "newApt"){
    rearrangeMenu = "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeName' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeName'>이름순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeEnter' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeEnter'>입주예정순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeHouse' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeHouse'>세대수순</label></div>"    
  }
  else if(selectedTheme == "rebuild"){
    rearrangeMenu = "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeName' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeName'>이름순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeOld' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeOld'>오래된순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeRatio' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeRatio'>용적률순</label></div>"
    rearrangeMenu += "<div><input type='radio' class='btn-check' name='btnRearrange' autocomplete='off' id='rearrangeHouse' onClick='rearrangeList(this)'><label class='btn btn-outline-danger' for='rearrangeHouse'>세대수순</label></div>"
  }

  $('.rearrangeArea').html(rearrangeMenu);
  showAPTRearrangeBar()
}

  function showAPTRearrangeBar(){    
    $(".btn-outline-danger").css('font-size', '0.85em')
    $(".btn-outline-danger").css('padding', '6px, 4px, 6px, 4px')
    $(".btn-outline-danger").css('border', '1px solid white')
    $('.rearrangeArea').css('grid-template-rows', '2.2em 2.2em')
    $('.rearrangeArea').css('padding-top', '5px')
    $('#rearrangeName').prop("checked", true)  

    $("#rearrangeCard").animate({
      opacity: 1.0,
      top: '0'
    }, 400, 'easeOutQuad'
    );
    $("#closeRearrange_floating").animate({
      opacity: 1.0,
      right: '5'
    }, 700, 'easeOutQuad'
    );
    var rearrangeAPTNotice = "'" + $('#sido option:selected').text() + " " + $('#gungu option:selected').text() + "'"
    if(selectedTheme == "under100M"){
      rearrangeAPTNotice += " 공시가격 1억 이하 아파트"
    }
    if(selectedTheme == "under300M"){
      rearrangeAPTNotice += " 공시가격 3억 이하 아파트"
    }
    if(selectedTheme == "under5floor"){
      rearrangeAPTNotice += " 5층 이하 아파트"
    }
    if(selectedTheme == "over30year"){
      rearrangeAPTNotice += " 30년 이상 아파트"
    }
    if(selectedTheme == "newApt"){
      rearrangeAPTNotice += " 분양권 아파트"
    }
    if(selectedTheme == "rebuild"){
      rearrangeAPTNotice += " 재건축 아파트"
    }

    $('#rearrangeNotice').html(rearrangeAPTNotice)
  }

  function closeRearrange(){    
    $("#rearrangeCard").animate({
      opacity: 0.0,
      top: '-150px'
    }, 400, 'easeInQuad'
    );
    $("#closeRearrange_floating").animate({
      opacity: 0.0,
      right: '-200px'
    }, 400, 'easeInQuad'
    );

    rearrangeSelection = "rearrangeName"
    //$(".aptPrice").css({'color': 'rgb(85, 85, 85)', 'font-weight': '400'})
    //$(".aptYear").css({'color': 'gray', 'font-weight': '400'})
    //$(".aptNum").css({'color': 'rgb(85, 85, 85)', 'font-weight': '400'})
    //updateRegion()
    updateTable(selectedTheme, selectedSubRegion)
  }

  function rearrangeList(e){
    rearrangeSelection = e.id    

    if(rearrangeSelection == "rearrangeName"){
      key = "아파트명"
      type = "asc"      
    }    
    if(rearrangeSelection == "rearrangeYear"){
      key = "준공년차"
      type = "asc"
    }
    if(rearrangeSelection == "rearrangeHouse"){
      key = "세대수"
      type = "desc"      
    }
    if(rearrangeSelection == "rearrangePrice"){      
      key = "최대공지가"
      type = "desc"
    }
    if(rearrangeSelection == "rearrangeOld"){      
      key="준공년차" 
      type = "desc"       
    }
    if(rearrangeSelection == "rearrangeEnter"){      
      key="준공년월" 
      type = "asc"       
    }
    if(rearrangeSelection == "rearrangeRatio"){      
      key="용적률" 
      type = "desc"       
    }

    data = aptData.data    
    
    var sortJSON = function(data, key, type) {
      if (type == undefined) {
        type = "desc";
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
    sortData = sortJSON(data, key, type)
    ListUp(sortData, selectedTheme)
  }