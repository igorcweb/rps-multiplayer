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

  // const join = $('.join');
  // const nameInput = $('#inputName');
  // const joinForm = $('form.join');

  // let data;
  // let numPlayers;
  // let playerRef;

  // database.ref().on('value', function(snap) {
  //   data = snap.val();
  //   if (data) console.log(data.rps.players);
  //   console.log('data: ', data);
  //   numPlayers = 0;
  //   if (data) {
  //     for (player in data.rps.players) {
  //       numPlayers++;
  //       //Remove disconnected player
  //       playerRef = database.ref(`data/rps/players/${player}`);
  //     }
  //     playerRef.onDisconnect().remove();
  //   }
  // });

  const game = {
    player1: '',
    wins1: 0,
    losses1: 0,
    player2: '',
    wins2: 0,
    losses2: 0,
    rps1: '',
    rps2: '',

    init: function() {
      $('button.join').on('click', e => {
        e.preventDefault();
        const nameInput = $('#inputName');
        const name = nameInput.val().trim();
        const joinForm = $('form.join');
        let name1 = this.player1;
        if (name1 === '') {
          name1 = name;
          joinForm.addClass('d-none');
          database.ref().set({
            chat: '',
            players: {
              player1: {
                name: name1,
                choice: '',
                wins: 0,
                losses: 0
              }
            }
          });
          $('.rock1').html('<i class="far fa-hand-rock fa-rotate-90"></i>');
          $('.paper1').html('<i class="far fa-hand-paper fa-rotate-90"></i>');
          $('.scissors1').html(
            '<i class="far fa-hand-scissors fa-flip-horizontal"></i>'
          );
        } else if (name2 === '') {
          name2 = name;
          joinForm.addClass('d-none');
          database.ref('/players').update({
            player2: {
              name: name2,
              choice: '',
              wins: 0,
              losses: 0
            }
          });
          database.ref().update({
            turn: 1
          });
          //change direction
          $('.rock2').html('<i class="far fa-hand-rock fa-rotate-90"></i>');
          $('.paper2').html('<i class="far fa-hand-paper fa-rotate-90"></i>');
          $('.scissors2').html(
            '<i class="far fa-hand-scissors fa-flip-horizontal"></i>'
          );
        }
        nameInput.val('');
      });
    },
    play: function() {
      $('.score1').addClass('d-none');
      database.ref().on('value', snapshot => {
        if (
          snapshot
            .child('players')
            .child('player1')
            .exists()
        ) {
          let data = snapshot.val();
          console.log(this.player1);
          console.log(data.players.player1.name);
          this.player1 = data.players.player1.name;
          this.wins1 = data.players.player1.wins;
          this.player1 = data.players.player1.losses;
        }
      });
    }
  };

  game.init();

  game.play();

  // join.on('click', function(e) {
  //   e.preventDefault();
  //   player = nameInput.val().trim();
  //   nameInput.val('');
  //   console.log(numPlayers);
  //   if (player) {
  //     if (numPlayers < 2) {
  //       database.ref('rps/players').push({
  //         name: player,
  //         wins: 0,
  //         losses: 0
  //       });
  //       joinForm.addClass('d-none');
  //     } else {
  //       console.log(
  //         'Two players are currently playing.  Please wait when someone leaves.'
  //       );
  //     }
  //   }
  // });
})();
