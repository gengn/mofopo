// Sort comparator by date
function compdate(a, b) {
	return Date.parse(a.date) > Date.parse(b.date);
}

// Sort comparator by title
function comptitle(a, b) {
	return a.title > b.title;
}

// Sort comparator by author
function comptitle(a, b) {
	return a.author > b.author;
}

$(document).ready(function() {

	// Parse reading.txt
	$.get('reading.txt', {}, function(data) {

		console.log(data);
		var container = $('#reading-container');
		

		// Build list of readings
		function buildList(comp, ascending) {
			var list = data.sort(comp);

			if (!ascending)															// Reverse list if order is descending
				list = list.reverse();

			for (var i = 0; i < data.length; i++) {
				container.children().slice(1).remove();
				container.append(
					'<tr>' +
						'<td><a href="reading/' + data[i].filename + '">' + data[i].title + '</a></td>' +
						'<td>' + data[i].author + '</td>' +
						'<td>' + data[i].date + '</td>' +
					'</tr>'
				);
			}
		}

		buildList(compdate,true);											// Build initial list sorted by date

		// Handle toggle
		$('#sort').click(function(e) {
			console.log($(e.target).text());

		});

	}, 'json');

});