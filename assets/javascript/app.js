//Query Function to Load Page
$(document).ready(function() {
  console.log("Load Page");

  var emotions = [
    "Anger", "Mildness", "Love", "Enmity", "Fear", "Confidence", "Shame", 
    "Shamelessness", "Pity", "Indignation", "Envy", "Contempt"
  ];

  //Add buttons and empty buttons area everytime 
  function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    //Loop to make buttons
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
      console.log(a);
    }
  }
//Reference class buttons
  $(document).on("click", ".emotion-button", function() {
    $("#emotions").empty();
    $(".emotion-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8PBlJOoZGwkxo2lmVrNqjxdyxiX9184X&&limit=10";
     console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
      })
     
    .then(function(response) {
       console.log(response);
      var results = response.data;
     

      for (var i = 0; i < results.length; i++) {
        var emotionDiv = $('<div class="emotion-item">');

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var emotionImage = $("<img>");
        emotionImage.attr("src", still);
        emotionImage.attr("data-still", still);
        emotionImage.attr("data-animate", animated);
        emotionImage.attr("data-state", "still");
        emotionImage.addClass("emotion-image");

        emotionDiv.append(p);
        emotionDiv.append(emotionImage);

        $("#emotions").append(emotionDiv);
      }
    });
  });

  $(document).on("click", ".emotion-image", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-emotion").on("click", function(event) {
    event.preventDefault();
    var newEmotion = $("input")
      .eq(0)
      .val();

    if (newEmotion.length > 2) {
      emotions.push(newEmotion);
    }

    populateButtons(emotions, "emotion-button", "#emotion-buttons");
  });

  populateButtons(emotions, "emotion-button", "#emotion-buttons");

});