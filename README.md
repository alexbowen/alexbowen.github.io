Javascript coding standards
===========================

minimum jshint options
----------------------

{
    'forin'       	: true, 
    'eqeqeq'      	: true, 
    'bitwise'     	: true, 
    'browser'     	: true,
    'expr'        	: true,
    'boss'		  	: true,
    'camelcase'		: true
}

- line endings must end in a semicolon
- constructor variable must start with a capital letter
- variables must be camelcased
- comparison must be done with === or !==
- for in loops must be protected with hasOwnProperty
- assignments should not be used in cases where comparisons are expected

http://www.jshint.com/docs/options/


Functions
---------

spacing must be used correctly

```var myFunction = function (arg1, arg2) { ... };```

global scope variables are considered a bad idea unless an absolute necessity and then they could be namespaced.


return
------

the following is ok

```if (variable === true) return false;```

this is not

```if (variable === true) console.info(variable); return;```

you must always return something, this is not ok

```if (variable === true) return;```

