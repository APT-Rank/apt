var rearrangeAPTSelection = "rearrangeScore"
var rearrangeRegionSelection = "rearrangeRegionScore"

function showRearrangeBar(){  
  if(selectedRegion == "Korea"){
    showRegionRearrangeBar()
  }
  else{
    showAPTRearrangeBar()
  }
}

  function showAPTRearrangeBar(){
    if(sortSelection != "sortDefault"){
      //updateRegion()
      //updateTable(selectedMonth, selectedSubRegion)
      $("#rearrangeRank").prop("disabled", true)    
      applySorting()      
    }
    else{
      $("#rearrangeRank").prop("disabled", false)
    }
    
    $(".btn-outline-danger").css('font-size', '0.85em')
    $(".btn-outline-danger").css('padding', '6px, 4px, 6px, 4px')
    $(".btn-outline-danger").css('border', '1px solid white')
    $('.rearrangeArea').css('grid-template-rows', '2.2em 2.2em')
    $('.rearrangeArea').css('padding-top', '5px')
    $('#rearrangeScore').prop("checked", true)  

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
    var rearrangeAPTNotice = "'" + $('#sido option:selected').text() + " " + $('#gungu option:selected').text() + "' 내에서 정렬합니다"
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

    rearrangeAPTSelection = "rearrangeScore"
    //$(".aptPrice").css({'color': 'rgb(85, 85, 85)', 'font-weight': '400'})
    //$(".aptYear").css({'color': 'gray', 'font-weight': '400'})
    //$(".aptNum").css({'color': 'rgb(85, 85, 85)', 'font-weight': '400'})
    //updateRegion()
    applySorting()
  }

  function showRegionRearrangeBar(){
    $(".btn-outline-danger").css('font-size', '0.85em')    
    $(".btn-outline-danger").css('padding', '1px, 1px, 1px, 1px')
    $(".btn-outline-danger").css('border', '1px solid white')
    $('.rearrangeArea').css('grid-template-rows', '2em 2em')
    $('.rearrangeArea').css('padding-top', '3px')
    $('#rearrangeRegionScore').prop("checked", true)

    $("#rearrangeRegionCard").animate({
      opacity: 1.0,
      top: '0'
    }, 400, 'easeOutQuad'
    );
    $("#closeRegionRearrange_floating").animate({
      opacity: 1.0,
      right: '5'
    }, 700, 'easeOutQuad'
    );
    var rearrangeRegionNotice = "전국 시군구 내에서 정렬합니다"
    $('#rearrangeRegionNotice').html(rearrangeRegionNotice)
  }

  function closeRegionRearrange(){    
    $("#rearrangeRegionCard").animate({
      opacity: 0.0,
      top: '-150px'
    }, 400, 'easeInQuad'
    );
    $("#closeRegionRearrange_floating").animate({
      opacity: 0.0,
      right: '-200px'
    }, 400, 'easeInQuad'
    );

    rearrangeRegionSelection = "rearrangeRegionScore"    
    updateRegion()
  }  

  function rearrangeAPTList(e){
    rearrangeAPTSelection = e.id    

    if(rearrangeAPTSelection == "rearrangeScore"){
      key = "가치 총점"
      type = "desc"      
    }    
    if(rearrangeAPTSelection == "rearrangeRank"){
      key = "rank_gap"
      type = "desc"
    }
    if(rearrangeAPTSelection == "rearrangePrice"){
      key = "매매실거래가"
      type = "desc"      
    }
    if(rearrangeAPTSelection == "rearrangeNew"){      
      key = "준공년차"
      type = "asc"
    }
    if(rearrangeAPTSelection == "rearrangeHouse"){      
      key="세대수" 
      type = "desc"       
    }

    if(sortSelection != "sortDefault"){
      data = sortData.data
    }
    else{
      data = aptData.data
    }
    
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
    sortData.data = sortJSON(data, key, type)
    aptSearch()       
  }

  function rearrangeRegionList(e){
    rearrangeRegionSelection = e.id    

    if(rearrangeRegionSelection == "rearrangeRegionScore"){
      key = "가치 총점"
      type = "desc"      
    }    
    if(rearrangeRegionSelection == "rearrangeRegionRank"){
      key = "rank_gap"
      type = "desc"
    }
    if(rearrangeRegionSelection == "rearrangeRegionPop"){
      key = "인구수"
      type = "desc"      
    }
    if(rearrangeRegionSelection == "rearrangeRegionPopUpDown"){
      key = "인구증감"
      type = "desc"      
    }
    if(rearrangeRegionSelection == "rearrangeRegionJob"){
      key = "일자리"
      type = "desc"      
    }
    if(rearrangeRegionSelection == "rearrangeRegionIncome"){      
      key = "소득수준"
      type = "desc"
    }

    data = regData.data
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
    regSortData.data = sortJSON(data, key, type)
    regionSearch()       
  }