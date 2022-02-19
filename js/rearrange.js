var rearrangeSelection = "rearrangeScore"

  function showRearrangeBar(){
    if(sortSelection != "sortDefault"){
      updateRegion()
    }
    
    $(".btn-outline-danger").css('font-size', '0.85em')
    $(".btn-outline-danger").css('padding', '6px, 4px, 6px, 4px')
    $(".btn-outline-danger").css('border', '1px solid white')
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
    var rearrangeNotice = "'" + $('#sido option:selected').text() + " " + $('#gungu option:selected').text() + "' 내에서 정렬합니다"
    $('#rearrangeNotice').html(rearrangeNotice)
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

    rearrangeSelection = "rearrangeScore"
    //$(".aptPrice").css({'color': 'rgb(85, 85, 85)', 'font-weight': '400'})
    //$(".aptYear").css({'color': 'gray', 'font-weight': '400'})
    //$(".aptNum").css({'color': 'rgb(85, 85, 85)', 'font-weight': '400'})
    updateRegion()
  }  

  function rearrangeList(e){
    rearrangeSelection = e.id    

    if(rearrangeSelection == "rearrangeScore"){
      key = "가치 총점"
      type = "desc"      
    }    
    if(rearrangeSelection == "rearrangeRank"){
      key = "rank_gap"
      type = "desc"
    }
    if(rearrangeSelection == "rearrangePrice"){
      key = "매매실거래가"
      type = "desc"      
    }
    if(rearrangeSelection == "rearrangeNew"){      
      key = "준공년차"
      type = "asc"
    }
    if(rearrangeSelection == "rearrangeHouse"){      
      key="세대수" 
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
    sortData.data = sortJSON(data, key, type)
    aptSearch()       
  }