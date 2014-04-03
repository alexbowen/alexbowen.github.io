//compare these two code snippets

//---------------------------------------------

var person = (function () {
 
    var name = "Alex Bowen",
        welcome  = "Hey there!";

    function logName() {
        console.log( "Name:" + name );
    };

    function setName( nameString ) {
        name = nameString;
    };

    function getName() {
        logName();
    };

    return {
        setName: setName,
        getName: getName
    };

})();

person.logName(); //what does this do?

//---------------------------------------------

var person = function () {};

person.prototype = {

    name : "Alex Bowen",

    welcome  : "Hey there!",

    setName : function ( nameString ) {
        this.name = nameString;
    },

    getName : function () {
        logName();
    },

    logName : function () {
        console.log( "Name:" + this.name );
    }
}

person.getName();  //what does this do?

//---------------------------------------------

//tell me what you think about this code snippet

for (i = 0; i < rows; i++) {

    $tr = $('<tr></tr>');

    for (j = 0; j < this.data.length; j++) {
        $tr.append('<td>' + this.data[j]['id'] + '</td>');
    }

    $tr.appendTo($tbody);
}

//tell me where you might see this:

return {
    restrict : 'A',
    require : '^ngCity',
    scope : {
      ngCity: '@'
    },
    link : function(scope, element, attrs) {
      // code
    }
}

//tell me about the following code snippets

function myFunction() {
    var myObject = new LargeObject();
    myObject.someCall();
}

var b = myFunction();

//---------------------------------------------

function myFunction() {
    var myObject = new LargeObject();
    myObject.someCall();
    return myObject;
}

var b = myFunction();

//tell me what you think about this code snippet

Array.prototype.join = function (array1, array2) {
    return array1 + array2;
}

//---------------------------------------------

var x = 3, y = 2;

(function (y) {
    console.log(y); //?
})(x);

//---------------------------------------------

var x = 2;

(function (x) {
    var z = x;
})(x);

console.log(z); //?

//---------------------------------------------

var x = 2;

(function (y) {
    z = y;
})(x);

console.log(z); //?

//---------------------------------------------

var x = 2;

var myFunction = function () {
    x++;
};

myFunction();

console.log(x);  //?

//---------------------------------------------

//QUESTIONs

//1. what is event delegation?

//2. describe what the difference between apply and call is?

//3. would you consider it best to load CSS or javascript first and why?