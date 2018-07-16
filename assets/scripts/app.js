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
        let name2 = this.player2;
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
          $('.rock2').html('<i class="far fa-hand-rock fa-rotate-270"></i>');
          $('.paper2').html('<i class="far fa-hand-paper fa-rotate-270"></i>');
          $('.scissors2').html('<i class="far fa-hand-scissors"></i>');
        }
        // nameInput.val('');
      });
    },
    compare: function() {
      switch (this.choice1) {
        case 'rock':
          if (this.choice2 === 'paper') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({
                choice: '',
                losses: this.losses1 + 1
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: '',
                wins: this.wins2 + 1
              });
            $('.info').html(`<p>${this.player2} Wins!</p>`);
          } else if (this.choice2 === 'scissors') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('one')
              .update({
                choice: '',
                wins: this.wins1 + 1
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: '',
                losses: this.losses2 + 1
              });
            $('.info').html(`<p>${this.player1} Wins!</p>`);
          } else {
            game.choice1 = '';
            game.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({
                choice: ''
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: ''
              });
            $('.info').html('<p>Tie!</p>');
          }
          break;
        case 'paper':
          if (this.choice2 === 'scissors') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({
                choice: '',
                losses: this.losses1 + 1
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: '',
                wins: this.wins2 + 1
              });
            $('.info').html(`<p>${this.player2} Wins!</p>`);
          } else if (this.choice2 === 'rock') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('one')
              .update({
                choice: '',
                wins: this.wins1 + 1
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: '',
                losses: this.losses2 + 1
              });
            $('.info').html(`<p>${this.player1} Wins!</p>`);
          } else {
            game.choice1 = '';
            game.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({
                choice: ''
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: ''
              });
            $('.info').html('<p>Tie!</p>');
          }
          break;
        default:
          if (this.choice2 === 'rock') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({
                choice: '',
                losses: this.losses1 + 1
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: '',
                wins: this.wins2 + 1
              });
            $('.info').html(`<p>${this.player2} Wins!</p>`);
          } else if (this.choice2 === 'paper') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('one')
              .update({
                choice: '',
                wins: this.wins1 + 1
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: '',
                losses: this.losses2 + 1
              });
            $('.info').html(`<p>${this.player1} Wins!</p>`);
          } else {
            game.choice1 = '';
            game.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({
                choice: ''
              });
            database
              .ref('players')
              .child('player2')
              .update({
                choice: ''
              });
            $('.info').html('<p>Tie!</p>');
          }
      }
      console.log('compareChoice:', this.choice1);
    },
    disconnect: function() {
      database.ref().on('value', function() {
        database
          .ref()
          .onDisconnect()
          .set({});
      });
    },
    chat: function() {
      $('button.chat').on('click', function(e) {
        e.preventDefault();
        let message = $('input.chat')
          .val()
          .trim();
        if (message) {
          database.ref('chat').push({
            message: message
          });
          $('input.chat').val('');
        }
      });
      database.ref('chat').on('child_added', childSnap => {
        let childData = childSnap.val();
        let message = childData.message;
        $('.chatBox').prepend(`<p class="message">${message}</p>`);
      });
    },
    play: function() {
      $('.score2').addClass('d-none');
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
          this.losses1 = data.players.player1.losses;
          $('.name1').html(this.player1);
          $('.score1').html(`
            <p class="my-0">Wins: ${this.wins1}</p>
            <p class="my-0">Losses: ${this.losses1}</p>
          `);
        }
        if (
          snapshot
            .child('players')
            .child('player2')
            .exists()
        ) {
          $('.score2').removeClass('d-none');
          let data = snapshot.val();
          console.log(this.player2);
          console.log(data.players.player2.name);
          this.player2 = data.players.player2.name;
          this.wins2 = data.players.player2.wins;
          this.losses2 = data.players.player2.losses;
          $('.name2').html(this.player2);
          $('.score1').html(`
            <p class="my-0">Wins: ${this.wins2}</p>
            <p class="my-0">Losses: ${this.losses2}</p>
          `);
        } else {
          // const score2 = $('.score2');
          // score2.text('Your opponent left - Click to restart.');
          // score2.append(
          //   '<button class="btn btn-success restart">Play Again</button>'
          // );
          // $('.restart').on('click', function() {
          //   location.reload();
          // });
        }
        if (
          snapshot
            .child('players')
            .child('player1')
            .exists() &&
          snapshot
            .child('players')
            .child('player2')
            .exists()
        ) {
          let data = snapshot.val();
          let turn = data.turn;
          console.log('turn:', turn);
          const turnDiv = $('.turn');
          if (turn === 1) {
            turnDiv.html(`<p>${this.player1}'s turn!</p>`);
            $('.choice1').on('click', function() {
              game.choice1 = $(this).attr('data-choice');
              database
                .ref('players')
                .child('player1')
                .update({
                  choice: game.choice1
                });
              database.ref().update({
                turn: 2
              });
              $('.choice1').off('click');
            });
          }
          if (turn === 2) {
            turnDiv.html(`<p>${this.player2}'s turn!</p>`);
            $('.choice2').on('click', function() {
              game.choice2 = $(this).attr('data-choice');
              database
                .ref('players')
                .child('player2')
                .update({
                  choice: game.choice2
                });
              database.ref().update({
                turn: 1
              });
              $('.choice2').off('click');
            });
          }

          this.choice1 = data.players.player1.choice;
          this.choice2 = data.players.player2.choice;

          if (this.choice1 && this.choice2) {
            this.compare();
          }
        }
      });
    }
  };

  game.init();
  game.play();
  game.disconnect();
  game.chat();

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
