$(document).ready(function (){
	$('#search_term').submit(function(event){
		event.preventDefault();
		var searchTerm = $('#query').val();
		get_request(searchTerm);

	});

	function get_request(searchTerm){
		url = 'https://www.googleapis.com/youtube/v3/search/';
		var params = {
			part: 'snippet',
			key: 'AIzaSyBXYblshTbQEPgD1ou1CSWQfg5GW5GQ-So',
			q: searchTerm
		};

		$.getJSON(url, params, function (data){
			showResult(data.items);
		});
	}

	function get_request2(searchTerm){
		$.getJSON('https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyBXYblshTbQEPgD1ou1CSWQfg5GW5GQ-So&q=' + searchTerm, function (data){
				//console.log(data);
			    showResult(data.items);
		});
	}

	function showResult(results){
		var link = '<p class="bolder">The following results are found: </p>';
		$.each(results, function (index, value){
			if(value.id.videoId != undefined){
			    link +='<p> https://www.youtube.com/watch?v=' + value.id.videoId+ '</p><br>';	
			}
			else if(value.id.channelId != undefined ){
				link +='<p> https://www.youtube.com/channel/' + value.id.channelId+ '</p><br>';
			}

			if(value.snippet.thumbnails.default.url != undefined){
				link +='<img src=" ' + value.snippet.thumbnails.default.url + '"><br>';
			}

		})
		$('.search_results').html(link);
	}
});


