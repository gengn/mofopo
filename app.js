// Sort comparator by title
function comptitle(a, b) {
  return a.title > b.title;
}

// Sort comparator by author
function compauthor(a, b) {
  return a.author > b.author;
}

// Build list of readings
function buildList(list, comp, column, ascending) {
  $('tr').remove(':not(:first-child)');
  console.log($('#reading-container').children().length);
  list = list.sort(comp);
  console.log(list[0]);
  $('.icon').removeClass('up down');

  if (ascending) {                                         // Reverse list if order is descending
    list = list.reverse();
    $('#' + column).addClass('up');
  }
  else {
    $('#' + column).addClass('down');
  }

  for (var i = 0; i < list.length; i++) {
    $('#reading-container').append(
      '<tr>' +
        '<td>' +
          '<a target="_blank" href="reading/' + list[i].filename + '">' + list[i].title + '</a>' +
        '</td>' +
        '<td>' + list[i].author + '</td>' +
      '</tr>'
    );
  }
}

$(document).ready(function() {

  var column    = 'author';                                // Ordering column
  var ascending = false;                                   // Default ordering column
  var list      = [];                                      // List of reading items

  // Parse reading.txt
  $.get('reading.txt', function(data) {
               list = data;
               console.log(list);
               buildList(list, compauthor, column, false); // Build initial list sorted by author
    }, 'json');


  // Handle reading list sort toggle
  $('#sort').click(function(e) {
    switch ($(e.target).text()) {
      case 'Title':
        console.log('title');

        if (column === 'title') {
          buildList(list, comptitle, 'title', ascending = !ascending);
        }
        else {
          buildList(list, comptitle, 'title', ascending = false);
        }
        column = 'title';
        break;
      case 'Author':
        console.log('author');

        if (column === 'author') {
          buildList(list, compauthor, 'author', ascending = !ascending);
        }
        else {
          buildList(list, compauthor, 'author', ascending = false);
        }
        column = 'author';
        break;
    }
  });

  // Handle modal toggle
  $('#buttons').click(function(e) {
    var button = $(e.target).attr('id');
    console.log(button);

    $('#modal-' + button).toggle();
  });

  // handle close click
  $('.close').click(function(e) {
    $('.modal').hide();
  });
});