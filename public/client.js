var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var yourVote = document.getElementById('your-vote');
var $tally = $('#tally');
var buttons = document.querySelectorAll('#choices button');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
  $tally.children().remove();
  $('table').show();
  for (var vote in votes) {
    $tally.append(`<td>${votes[vote]}</td>`);
  }
});

socket.on('vote', function (vote) {
  $(`#${vote}`).addClass('btn-danger');
  $('button').prop('disabled', true);
  yourVote.innerText = `Your vote for ${vote} has been counted!`;
});


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
