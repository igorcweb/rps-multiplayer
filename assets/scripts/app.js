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

  const game = {
    player1: '',
    wins1: 0,
    losses1: 0,
    player2: '',
    wins2: 0,
    losses2: 0,
    rps1: '',
    rps2: '',
    choice1record: '',
    choice2record: '',
    choice: '',
    rock1: '<i class="game1 far fa-hand-rock fa-rotate-90"></i>',
    paper1: '<i class="game1 far fa-hand-paper fa-rotate-90"></i>',
    scissors1: '<i class="game1 far fa-hand-scissors fa-flip-horizontal"></i>',
    rock2: '<i class="game2 far fa-hand-rock fa-rotate-270"></i>',
    paper2: '<i class="game2 far fa-hand-paper fa-rotate-270"></i>',
    scissors2: '<i class="game2 far fa-hand-scissors"></i>',

    init: function() {
      $('.btn.join').on('click', e => {
        e.preventDefault();
        const nameInput = $('#inputName');
        const name = nameInput.val().trim();
        const joinForm = $('form.join');
        let name1 = this.player1;
        let name2 = this.player2;
        if (name1 === '') {
          name1 = name;
          joinForm.addClass('d-none');
          $('button.leave').removeClass('d-none');
          database.ref().set({
            chat: '',
            players: {
              choice1: this.choice1record,
              choice2: this.choice2record,
              player1: {
                name: name1,
                choice: '',
                wins: this.wins1,
                losses: this.losses1
              }
            }
          });
          $('.rock1').html(this.rock1);
          $('.paper1').html(this.paper1);
          $('.scissors1').html(this.scissors1);
        } else if (name2 === '') {
          name2 = name;
          joinForm.addClass('d-none');
          $('button.leave').removeClass('d-none');
          database.ref('/players').update({
            player2: {
              name: name2,
              choice: '',
              wins: this.wins2,
              losses: this.losses2
            }
          });

          database.ref().update({ turn: 1 });

          $('.rock2').html(this.rock2);
          $('.paper2').html(this.paper2);
          $('.scissors2').html(this.scissors2);
        } else {
          $('.turn').html(
            '<p>Two players are currently playing. Please wait until someone leaves.</p>'
          );
        }
      });
    },
    compare: function() {
      $('.resultIcons').removeClass('d-none');
      switch (this.choice1) {
        case 'rock':
          if (this.choice2 === 'paper') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '', losses: this.losses1 + 1 });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '', wins: this.wins2 + 1 });
            $('.info').html(`<h2>${this.player2} Wins!</h2>`);
          } else if (this.choice2 === 'scissors') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '', wins: this.wins1 + 1 });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '', losses: this.losses2 + 1 });
            $('.info').html(`<h2>${this.player1} Wins!</h2>`);
          } else {
            game.choice1 = '';
            game.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '' });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '' });
            $('.info').html('<h2>Tie!</h2>');
          }
          break;
        case 'paper':
          if (this.choice2 === 'scissors') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '', losses: this.losses1 + 1 });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '', wins: this.wins2 + 1 });
            $('.info').html(`<h2>${this.player2} Wins!</h2>`);
          } else if (this.choice2 === 'rock') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '', wins: this.wins1 + 1 });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '', losses: this.losses2 + 1 });
            $('.info').html(`<h2>${this.player1} Wins!</h2>`);
          } else {
            game.choice1 = '';
            game.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '' });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '' });
            $('.info').html('<h2>Tie!</h2>');
          }
          break;
        default:
          if (this.choice2 === 'rock') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '', losses: this.losses1 + 1 });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '', wins: this.wins2 + 1 });
            $('.info').html(`<h2>${this.player2} Wins!</h2>`);
          } else if (this.choice2 === 'paper') {
            this.choice1 = '';
            this.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '', wins: this.wins1 + 1 });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '', losses: this.losses2 + 1 });
            $('.info').html(`<h2>${this.player1} Wins!</h2>`);
          } else {
            game.choice1 = '';
            game.choice2 = '';
            database
              .ref('players')
              .child('player1')
              .update({ choice: '' });
            database
              .ref('players')
              .child('player2')
              .update({ choice: '' });
            $('.info').html('<h2>Tie!</h2>');
          }
          break;
      }
      game.choice.removeClass('active');
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
          database.ref('chat').push({ message: message });
          $('input.chat').val('');
        }
      });

      database.ref('chat').on('child_added', childSnap => {
        let childData = childSnap.val();
        let message = childData.message;
        $('.chatBox').prepend(`<p class="message">${message}</p>`);
      });
    },

    renderChoices: function() {
      database.ref().on('value', function(snap) {
        let data = snap.val();
        if (
          snap
            .child('players')
            .child('choice1')
            .exists() &&
          snap
            .child('players')
            .child('choice2')
            .exists()
        ) {
          console.log('render is running');
          console.log('choice1: ', data.players.choice1);
          console.log('choice2: ', data.players.choice2);
          $('.resultIcon1').html(data.players.choice1);
          $('.resultIcon2').html(data.players.choice2);
        }
      });
    },
    play: function() {
      $('.score2').addClass('d-none');
      database.ref().on('value', snapshot => {
        if (
          snapshot
            .child('players')
            .child('player1')
            .child('choice')
            .exists()
        ) {
          let data = snapshot.val();
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
          this.player2 = data.players.player2.name;
          this.wins2 = data.players.player2.wins;
          this.losses2 = data.players.player2.losses;
          $('.name2').html(this.player2);
          $('.score2').html(`
            <p class="my-0 text-right">Wins: ${this.wins2}</p>
            <p class="my-0 text-right">Losses: ${this.losses2}</p>
          `);
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
          const turnDiv = $('.turn');
          if (turn === 1) {
            turnDiv.html(`<p>${this.player1}'s turn!</p>`);
            $('.player1').on('click', '.choice1', function() {
              game.choice = $(this);
              game.choice.addClass('active');
              game.choice1 = $(this).attr('data-choice');
              game.choice1record = game.choice1;
              database
                .ref('players')
                .child('player1')
                .update({ choice: game.choice1 });
              $('.player1').off('click');
              database.ref().update({ turn: 2 });
              database.ref('players').update({
                choice1: game.choice1record
              });
            });
          }
          if (turn === 2) {
            turnDiv.html(`<p>${this.player2}'s turn!</p>`);
            $('.player2').on('click', '.choice2', function() {
              game.choice = $(this);
              game.choice.addClass('active');
              game.choice2 = $(this).attr('data-choice');
              game.choice2record = game.choice2;
              database
                .ref('players')
                .child('player2')
                .update({ choice: game.choice2 });
              $('.player2').off('click');
              database.ref().update({ turn: 1 });
              database.ref('players').update({
                choice2: game.choice2record
              });
            });
          }

          this.choice1 = data.players.player1.choice;
          this.choice2 = data.players.player2.choice;

          if (this.choice1 && this.choice2) {
            this.compare();
          }
        }
      });

      $('.btn.leave').on('click', function() {
        location.reload();
      });
    }
  };

  game.init();
  game.play();
  game.disconnect();
  game.chat();
  game.renderChoices();

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
