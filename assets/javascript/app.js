//Query Function to Load Page
$(document).ready(function() {
  console.log("Load Page");

  var emotion = [
    "anger", "mildness", "love", "enmity", "fear", "confidence", "fear"
  ];

  //Add buttons and empty buttons area everytime 
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    //Loop to 
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
      console.log(arrayToUse);
    }
  }
});