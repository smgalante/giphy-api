$(document).ready(function() {
    var heroes = ['thor', 'iron man', 'hulk', 'captain america', 'black widow', 'hawkeye'];

    function renderButtons() { 
        $('#heroesView').empty();
        for (var i = 0; i < heroes.length; i++){
            var a = $('<button>')
            a.addClass('hero');
            a.attr('data-name', heroes[i]);
            a.text(heroes[i]);
            $('#heroesView').append(a);
        }
    };

    renderButtons();

    $('#addComedian').on('click', function() {
        var comedy = $('#comedy-input').val().trim();
        comedy = comedy.toLowerCase();
        if(comedians.indexOf(comedy) == -1) {
            comedians.push(comedy);
            renderButtons();
            return false;
        } else {
            return false;
        }
    });

    $(document).on('click', '.comedy', function() {
        $('#gifSpace').empty();
        var comedy = this.getAttribute('data-name').replace(" ", "+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedy + "&limit=10&api_key=dc6zaTOxFJmzC";
        $.ajax({url: queryURL, method: 'GET'})
         .done(function(response) {
            console.log(response);
            var gifs = response.data;
            for(i = 0; i < gifs.length; i++){
                var $comedyDiv = $('<div>');
                var $p = $('<p>').text("Rating: " + gifs[i].rating.toUpperCase());
                var $gifImage = $('<img class="gifImage">');
                $gifImage.attr("src", gifs[i].images.fixed_height_still.url);
                $gifImage.attr("data-still", gifs[i].images.fixed_height_still.url);
                $gifImage.attr("data-animate", gifs[i].images.fixed_height.url);
                $gifImage.attr("data-state", "still");
                $comedyDiv.append($p);
                $comedyDiv.append($gifImage);
                $('#gifSpace').prepend($comedyDiv);
            }
        });
    });
    $(document).on('click', '.gifImage', function(){
        var state = $(this).attr('data-state'); 
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});