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
    prompt.get(['name', 'type', 'age', ], function (err, result) {      
       if (err) throw err;
       var trainer = Math.floor(Math.random() * 10);
      // need this or else it won't write, use random number generators 
      connection.query('INSERT INTO animals (name, type, age, caretaker_id) VALUES (?,?,?,?)', [result.name, result.type, result.age, trainer], function(err, results){
        if (err) {console.log(err)};
   
        console.log("Sucess written!")
        // currentScope.visit()
        // currentScope.view(currentScope)
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
    // currentScope.visit();
    // currentScope.view(currentScope);
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
        currentScope.type(input_scope)
      }

      else if (result.visit == "I"){
        currentScope.type(input_scope)
      }
      else if (result.visit == "N"){
        currentScope.name(input_scope)
        
      }
      else if (result.visit == "A"){
        currentScope.all(input_scope)
        
      }
      else if (result.visit == "C"){
      currentScope.care(input_scope) 
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
        // currentScope.visit()
        // currentScope.view(currentScope)
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
        // call currentScope.visit()
        // call currentScope.view(currentScope)

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
        // call currentScope.visit()
        // call currentScope.view(currentScope)

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
      })
    })
  },

}

zoo.all()

