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

  console.log(database);
})();
