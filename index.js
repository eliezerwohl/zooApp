var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});

  connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        };
        // console.log('connected as id ' + connection.threadId);
    });
  var prompt = require('prompt');

prompt.start()

var zoo = {
  welcome:console.log("Welcome to the Zoo And Friends App~!"),
  menu:console.log("Enter (A): ------> to Add a new animal to the Zoo!"),
  menu:console.log("Enter (U): ------> to Update info on an animal in the Zoo!"),
  menu:console.log("Enter (V): ------> to Visit the animals in the Zoo!"),
  menu:console.log("Enter (D): ------> to Adopt an animal from the Zoo!"),
  menu:console.log("Enter (Q): ------> to Quit and exit the Zoo!!"),
  add: function(input_scope){
    this.current_scope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(['name', 'type', 'age'], function (err, result) {
     });
  },
}
zoo.add()