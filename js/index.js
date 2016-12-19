$(document).ready(function() {
  
	var quote, author;
  function newQuoteAndAuthor() {
		$.ajax({
			url: 'http://api.forismatic.com/api/1.0/', //get quotes from forismatic api in jsonp format
			jsonp: 'jsonp',
			dataType: 'jsonp',
			data: {
				method: 'getQuote',
				lang: 'en',
				format: 'jsonp',
			},
			success: function(response) {
				author = response.quoteAuthor;
				quote = response.quoteText;
				$('#quote').text(quote); //set 'p' id to quote
				if (author) { //if there's an author, set 'footer' id to author
					$('#saidBy').text(author);
				} else { //if no author, set id to author unknown
					$('#saidBy').text('Unknown');
				}
			}
		});
	}
	//Get quote
	$('#getQuote').on('click', function() {

		$('.new').fadeOut(100).fadeIn(800);
		$('#saidBy').fadeOut(100).fadeIn(2000);

		newQuoteAndAuthor();

		var backgroundColorChange = ["#f2d5d5", "#efd5f2", "#d6d5f2", "#d5e5f2", "#c7f9f4", "#c7f9e2", "#c8f9c7", "#ecf9c7", "#f9f5c7", "#f9e4c7", "#f9cfc7"]; //set an array of colors for background change
		var randColor = Math.floor(Math.random() * backgroundColorChange.length); //Randomize color
 
		$('body').css({
      'backgroundColor': backgroundColorChange[randColor]
    });
    //Tweet it
    $('#tweet').on('click', function() { //Open a new window when tweet button is clicked with appropriate variable infromation
			window.open('https://twitter.com/intent/tweet/?text=' + encodeURIComponent(quote + ' -by ' + author), "", 'width=600,height=450');
		});
	});

});
