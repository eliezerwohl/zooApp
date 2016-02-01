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
prompt.start();
prompt.message="";
// I have no idea why var.message is required.  it was in the homework.
var zoo = {
  welcome: function(){
  console.log("Welcome to the Zoo And Friends App~!")
  }, 
  menu: function(){
  console.log("Enter (A): ------> to Add a new animal to the Zoo!");
  console.log("Enter (U): ------> to Update info on an animal in the Zoo!");
  console.log("Enter (V): ------> to Visit the animals in the Zoo!");
  console.log("Enter (D): ------> to Adopt an animal from the Zoo!");
  console.log("Enter (Q): ------> to Quit and exit the Zoo!!");
  },
  add: function(input_scope){
    this.current_scope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(['name', 'type', 'age', ], function (err, result) {      
      if (err) throw err;
      var trainer = Math.floor(Math.random() * 10);
    // need this or else it won't write, use random number generators 
      connection.query('INSERT INTO animals (name, type, age, caretaker_id) VALUES (?,?,?,?)', [result.name, result.type, result.age, trainer], function(err, results){
        if (err) {console.log(err)};
        console.log("Sucess written!")
        zoo.menu();
        zoo.promptUser()
      })
    })
  },
  visit: function(){
    console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
    console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal!");
    console.log("Enter (A): ------> here's the count for all animals in all locations!");
    console.log("Enter (C): ------> here's the count for all animals in this one city!");
    console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
    console.log("Enter (Q): ------> Quits to the main menu");
  },
  view: function(input_scope){
    this.currentScope = input_scope;
    console.log("Please choice what you like to visit");
     prompt.get(['visit'], function (err, result) { 
      if (result.visit == "Q"){
        currentScope.menu()
        console.log(result.visit) 
      }
      else if (result.visit == "O"){
        zoo.type();
      }
      else if (result.visit == "I"){
        zoo. animId();
      }
      else if (result.visit == "N"){
        zoo.name()
      }
      else if (result.visit == "A"){
        zoo.all()        
      }
      else if (result.visit == "C"){
        zoo.care()
      }
      else{
        console.log("sorry, didn't understand that.  COME ON BRUH!")
      }
    })   
  },
  type: function(input_scope){
    this.currentScope = input_scope;
    console.log ("Enter animal type to find how many animals we have of those type.")
    prompt.get(['animal_type'], function (err, result) { 
      console.log(result.animal_type);
      if (err) {console.log(err)};
      connection.query('select * from animals  where type=?', [result.animal_type], function(err, results){
        if (err) {console.log(err)};
        console.log("there are this many of that type of animal:" + results.length)
        zoo.menu();
        zoo.promptUser();
      })
    })  
  },
  care: function(input_scope){
    this.currentScope = input_scope;
    console.log ("enter city name.  NY/SF");
    prompt.get(['city_name'], function (err, result) { 
    console.log(result.city_name);
      if (err) {console.log(err)};
      connection.query('SELECT * FROM caretakers LEFT JOIN animals ON caretakers.id = animals.caretaker_id WHERE CITY = ?', [result.city_name], function(err, results){
        if (err) {console.log(err)};
        console.log("this many animals in " + result.city_name +": " + results.length)
        zoo.menu();
        zoo.promptUser();
      })
    })   
  },
  animId: function(input_scope){
    this.currentScope = input_scope;
    console.log ("Enter In ID of the Animal you'd like to visit")
    prompt.get(['animal_id'], function (err, result) { 
      if (err) throw err;
      connection.query('SELECT * FROM animals WHERE ID = ?', [result.animal_id], function(err, results){
        if (err) {console.log(err)};
        console.log(results)
        zoo.menu();
        zoo.promptUser();
      })
    })   
  },
   name: function(input_scope){
    this.currentScope = input_scope;
    console.log ("Enter In the Name of the Animal you'd like to visit")
    prompt.get(['name_id'], function (err, result) { 
      if (err) throw err;
      connection.query('SELECT * FROM animals WHERE name = ?', [result.name_id], function(err, results){
        if (err) {console.log(err)};
        console.log(results)   
          zoo.menu();
        zoo.promptUser();
      })
    }) 
  },
   all: function(input_scope){
    this.currentScope = input_scope;
    console.log ("Wanna see how many animals there are total?")
    prompt.get(['yes'], function (err, result) { 
      if (err) throw err;
      connection.query('SELECT * FROM animals', function(err, results){
        if (err) {console.log(err)};
        console.log("there are this many animals in the zoo: " +results.length) 
          zoo.menu();
        zoo.promptUser(); 
      })
    })
  },
  update: function (input_scope){
    prompt.get(['id', 'new_name', 'new_age', 'new_caretaker_id'], function (err, result) {
      if (err) throw err;
      connection.query('UPDATE animals SET name = ?, age = ?,  caretaker_id = ? WHERE id = ?', [result.new_name, result.new_age, result.new_caretaker_id, result.id], function(err, results){
        if (err) {console.log("this is error" + err)};
        console.log("you have changed the info!")
          zoo.menu();
        zoo.promptUser();
      })
    })
  },
  adopt: function(input_scope){
      this.currentScope = input_scope;
      prompt.get(['animal_id'], function (err, result) {
        if (err) throw err;
        connection.query('delete from animals where id = ?', [result.animal_id], function(err, results){
        if (err) {console.log("this is error" + err)};
        console.log("You have adopted this animal!  there is no record of this transaction  No backsies!")
        zoo.menu();
        zoo.promptUser();
      });
    });
  },
  promptUser: function(input_scope){
    prompt.get(['input'], function (err, result) {
      if (err) throw err;
      else if (result.input == "Q"){
        zoo.exit();
      }
        else if (result.input == "A"){
        zoo.add();
      }
        else if (result.input == "V"){
        zoo.visit();
        zoo.view();
      }
        else if (result.input == "D"){
        zoo.adopt();
      }
      else{
        console.log("I'm sorry Dave, I'm afraid I can't do that. Please enter another selection");
        zoo.promptUser();
      }
    });
  },
  exit: function(){
    console.log("thanks for visiting.  goodbye.  no refunds!");
    process.exit();
  },
  open: function(){
    zoo.welcome();
    zoo.menu();
    zoo.promptUser();
  }
}
zoo.open()

