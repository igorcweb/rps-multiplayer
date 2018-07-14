(function() {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyBruLbGknFMwFcOEIyPEbEtwp6jCapJmzU',
    authDomain: 'rps-multiplayer-f084c.firebaseapp.com',
    databaseURL: 'https://rps-multiplayer-f084c.firebaseio.com',
    projectId: 'rps-multiplayer-f084c',
    storageBucket: '',
    messagingSenderId: '358801366927'
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  const join = $('.join');
  const nameInput = $('#inputName');
  const joinForm = $('form.join');

  let data;
  let numPlayers;
  let game;

  database.ref().on('value', function(snap) {
    data = snap.val();
    //console.log(data);
    numPlayers = 0;
    //127.0.0.1:5500/index.html?
    http: if (data) {
      for (player in data.players) {
        numPlayers++;
        // console.log(player);
        // console.log(numPlayers);
      }
    }
  });

  join.on('click', function(e) {
    e.preventDefault();
    player = nameInput.val().trim();
    // console.log(player);
    // console.log('numFromButton: ', numPlayers);
    nameInput.val('');
    if (player) {
      // if (numPlayers < 2) {
      //   database.ref('/players').push({
      //     name: player,
      //     wins: 0,
      //     losses: 0
      //   });
      //   joinForm.addClass('d-none');
      // } else {
      //   console.log(
      //     'Two players are currently playing.  Please wait when someone leaves.'
      //   );
      // }
      numPlayers = 1;
      if (numPlayers % 2 === 0) {
        database.ref().push({
          game: {
            players: {
              name: player,
              wins: 0,
              losses: 0
            }
          }
        });
        joinForm.addClass('d-none');
        console.log(data);
      } else {
        database.ref('/game/players').push({
          name: player,
          wins: 0,
          losses: 0
        });
      }
    }
  });
})();
