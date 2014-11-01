function myFunction() {
    
    console.log("Number of arguments = " + arguments.length);

    //We have different rezult using typeof() and Object.prototype.
    //*************EXAMPLE*******************
    //typeof null                 // 'object'
    //typeof []                   // 'object'
    //typeof 'Gosho'                // 'string'
    //typeof new String('Gosho')    // 'object'
    //'Gosho' == new String('Gosho')  // true
    //Object.prototype.toString.call(null)               // '[object Null]'
    //Object.prototype.toString.call([])                 // '[object Array]'
    //Object.prototype.toString.call('Gosho')              // '[object String]'
    //Object.prototype.toString.call(new String('Gosho'))  // '[object String]'

    for (var item = 0; item < arguments.length; item ++){
        console.log("/" + arguments[item] + "/" + " is " +
            Object.prototype.toString.call(arguments[item]));
    }         
}

myFunction(2);
myFunction(["mimi", "gosho"], 55, "something");

function callMe(arg1, arg2) {
    var s = "";

    s += "this value: " + this;
    s += "<br />";
    for (i in callMe.arguments) {
        s += "arguments: " + callMe.arguments[i];
        s += "<br />";
    }
    return s;
}
document.write("*****Play with call and apply*****<br/>")
document.write("Original function: <br/>");
document.write(callMe(1, 2));
document.write("<br/>");

document.write("Function called with apply: <br/>");
document.write(callMe.apply(3, [4, 5]));
document.write("<br/>");

document.write("Function called with call: <br/>");
document.write(callMe.call(4, 1, 2, 3, 4));
document.write("<br/>");

document.write("Check at the console for the other part of solution....")
