function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
  function deg2rad(deg) {
      return deg * (Math.PI/180)
  }

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lng2-lng1);
  var aa = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
  var dd = R * cc; // Distance in km
  return dd;
}

function makeDistanceList(points){
  returnArray = []
  if(points.length == 0){}
  else{
    temp_points = points.slice()    

    returnArray.push([points[0][0], points[0][1], points[0][2], 0, points[0][3], points[0][4], points[0][5], points[0][6]])
    temp_points.splice(0, 1)  

    for (var k = 0; k < points.length-1; k++){
      distanceArray = []    

      for(var i = 0; i < temp_points.length; i++){      
        distance = getDistanceFromLatLonInKm(temp_points[i][1], temp_points[i][2], returnArray[returnArray.length-1][1], returnArray[returnArray.length-1][2]) * 1000
        distanceArray.push(distance)
      }  

      minValue = Math.min(...distanceArray)
      findIndex = distanceArray.indexOf(minValue)    

      returnArray.push([temp_points[findIndex][0], temp_points[findIndex][1], temp_points[findIndex][2], minValue, temp_points[findIndex][3], temp_points[findIndex][4], temp_points[findIndex][5], temp_points[findIndex][6]])
      if(temp_points.length == 1){
        //console.log(temp_points[0][0], "-", points[0][0])
        distance = getDistanceFromLatLonInKm(points[0][1], points[0][2], temp_points[0][1], temp_points[0][2]) * 1000
        returnArray.push([points[0][0], points[0][1], points[0][2], distance, points[0][3], points[0][4], points[0][5], points[0][6]])
      }
      temp_points.splice(findIndex, 1)
    }
  }
  return returnArray
}