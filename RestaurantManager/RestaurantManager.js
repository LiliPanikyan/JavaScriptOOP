function processRestaurantManagerCommands(commands) {
    'use strict';

    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };

    var RestaurantEngine = (function () {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        var Restaurant = (function () {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this.setRecipes();
            };

            Restaurant.prototype.getName = function () {
                return this._name;
            };

            Restaurant.prototype.setName = function (name) {
                if (!isValidString(name)) {
                    throw new Error('Name is required!');
                }

                this._name = name;
            };

            Restaurant.prototype.getLocation = function () {
                return this._location;
            };

            Restaurant.prototype.setLocation = function (location) {
                if (!isValidString(location)) {
                    throw new Error('Location is required!');
                }

                this._location = location;
            };

            Restaurant.prototype.getRecipes = function () {
                return this._recipes;
            };

            Restaurant.prototype.setRecipes = function () {
                this._recipes = [];
            };

            Restaurant.prototype.addRecipe = function (recipe) {
                if (this._recipes.indexOf(recipe) == -1) {
                    this._recipes.push(recipe);
                };

            };

            Restaurant.prototype.removeRecipe = function (recipe) {
                var index = this._recipes.indexOf(recipe);
                if (index !== -1) {
                    this._recipes.splice(index, 1);
                }
            };

            Restaurant.prototype.printRestaurantMenu = function () {
                var output = '***** ' + this.getName() + ' - ' + this.getLocation() + ' *****\n';
                if (this._recipes.length !== 0) {

                    var drinks = [];
                    var salads = [];
                    var courses = [];
                    var desserts = [];

                    this._recipes.forEach(function (recipe) {
                        if (recipe instanceof Drink) {
                            drinks.push(recipe);
                        } else if (recipe instanceof Salad) {
                            salads.push(recipe);
                        } else if (recipe instanceof MainCourse) {
                            courses.push(recipe);
                        } else if (recipe instanceof Dessert) {
                            desserts.push(recipe);
                        }
                    });

                    if (drinks.length !== 0) {
                        drinks.sort(sortRecipes());

                        output += '~~~~~ DRINKS ~~~~~\n' + getAllRecipes(drinks);
                    }

                    if (salads.length !== 0) {
                        salads.sort(sortRecipes());
                        output += '~~~~~ SALADS ~~~~~\n' + getAllRecipes(salads);
                    }

                    if (courses.length !== 0) {
                        courses.sort(sortRecipes());
                        output += '~~~~~ MAIN COURSES ~~~~~\n' + getAllRecipes(courses);

                    }

                    if (desserts.length !== 0) {
                        desserts.sort(sortRecipes());
                        output += '~~~~~ DESSERTS ~~~~~\n' + getAllRecipes(desserts);
                    }

                } else {
                    output += 'No recipes... yet\n';
                }

                return output;
            };

            function sortRecipes() {
                return function (a, b) {
                    return a.getName().localeCompare(b.getName());
                }
            }

            function getAllRecipes(arr) {
                var outputString = "";
                arr.forEach(function (item) {
                    outputString += item;
                });

                return outputString;
            }

            return Restaurant;
        }());

        var Recipe = (function () {
            function Recipe(name, price, calories, quantity, timeToPrepare, unit) {
                if (this.constructor === Recipe) {
                    throw {
                        message: "Can't instantiate abstract class Recipe"
                    }
                }
                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this.setTimeToPrepare(timeToPrepare);
                this._unit = unit;
            };

            Recipe.prototype.getName = function () {
                return this._name;
            };

            Recipe.prototype.setName = function (name) {
                if (!isValidString(name)) {
                    throw new Error('The name is required!');
                }

                this._name = name;
            };

            Recipe.prototype.getPrice = function () {
                return this._price;
            };

            Recipe.prototype.setPrice = function (price) {
                if (!isValidNumber(price)) {
                    throw new Error('The price should be positive number!');
                }

                this._price = price;
            };

            Recipe.prototype.getCalories = function () {
                return this._calories;
            };

            Recipe.prototype.setCalories = function (calories) {
                if (!isValidNumber(calories)) {
                    throw new Error('The calories should be positive number!');
                }

                this._calories = calories;
            };

            Recipe.prototype.getQuantity = function () {
                return this._quantity;
            };

            Recipe.prototype.setQuantity = function (quantity) {
                if (!isValidNumber(quantity)) {
                    throw new Error('The quantity should be positive number!');
                }

                this._quantity = quantity;
            };

            Recipe.prototype.getTimeToPrepare = function () {
                return this._timeToPrepare;
            };

            Recipe.prototype.setTimeToPrepare = function (timeToPrepare) {
                if (!isValidNumber(timeToPrepare)) {
                    throw new Error('The timeToPrepare should be positive number!');
                }

                this._timeToPrepare = timeToPrepare;
            };

            Recipe.prototype.toString = function () {
                var output = '==  ' + this.getName() + ' == $' + this.getPrice().toFixed(2);
                output += '\nPer serving: ' + this.getQuantity() + ' ' + this._unit + ', ' + this.getCalories() + ' kcal';
                output += '\nReady in ' + this.getTimeToPrepare() + ' minutes';
                return output;
            };
            return Recipe;
        }());

        var Drink = (function () {
            function Drink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
                Recipe.call(this, name, price, calories, quantity, timeToPrepare, 'ml');
                this.setIsCarbonated(isCarbonated);
            };

            Drink.extends(Recipe);

            var MAX_CALORIES_VALUE = 100;
            var MAX_PREPARATIONTIME_VALUE = 20;

            Drink.prototype.setCalories = function (calories) {
                Recipe.prototype.setCalories.call(this, calories);

                if (calories > MAX_CALORIES_VALUE) {
                    throw new Error('The calories must be under 101.')
                }
            };

            Drink.prototype.setTimeToPrepare = function (timeToPrepare) {
                Recipe.prototype.setTimeToPrepare.call(this, timeToPrepare);

                if (timeToPrepare > MAX_PREPARATIONTIME_VALUE) {
                    throw new Error('The timeToPrepare must be under 20 minutes.')
                };
            };

            Drink.prototype.getIsCarbonated = function () {
                return this._isCarbonated;
            };

            Drink.prototype.setIsCarbonated = function (isCarbonated) {
                if (!isValidBoolean(isCarbonated)) {
                    throw new Error('The isCarbonated should be boolean value!');
                };
                this._isCarbonated = isCarbonated;
            };

            Drink.prototype.toString = function () {
                var output = Recipe.prototype.toString.call(this);
                output += '\nCarbonated: ' + (this.getIsCarbonated() ? 'yes' : 'no');
                return output + '\n';
            };

            return Drink;
        }());

        var Meal = (function () {
            function Meal(name, price, calories, quantity, timeToPrepare, isVegan) {
                if (this.constructor === Meal) {
                    throw {
                        message: "Can't instantiate abstract class Meal"
                    }
                }
                Recipe.call(this, name, price, calories, quantity, timeToPrepare, 'g');
                this.setIsVegan(isVegan);
            };

            Meal.extends(Recipe);

            Meal.prototype.getIsVegan = function () {
                return this._isVegan;
            };

            Meal.prototype.setIsVegan = function (isVegan) {
                if (!isValidBoolean(isVegan)) {
                    throw new Error('The isVegan should be boolean value!');
                };
                this._isVegan = isVegan;
            };

            Meal.prototype.toggleVegan = function () {
                this.setIsVegan(!(this.getIsVegan()));
            };

            Meal.prototype.toString = function () {
                var output = Recipe.prototype.toString.call(this);
                var veg = ((this.getIsVegan() === true) ? '[VEGAN] ' : '')

                return veg + output;
            };

            return Meal;
        }());

        var Salad = (function () {
            function Salad(name, price, calories, quantity, timeToPrepare, containsPasta) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, true);
                this.setContainsPasta(containsPasta);
            };

            Salad.extends(Meal);

            Salad.prototype.getContainsPasta = function () {
                return this._containsPasta;
            };

            Salad.prototype.setContainsPasta = function (containsPasta) {
                if (!isValidBoolean(containsPasta)) {
                    throw new Error('The containsPasta should be boolean value!');
                }

                this._containsPasta = containsPasta;
            };

            Salad.prototype.toString = function () {
                var base = Meal.prototype.toString.call(this);
                var pastaIn = (this.getContainsPasta() ? 'yes' : 'no')
                return base + '\nContains pasta: ' + pastaIn + '\n';
            };

            return Salad;
        }());

        var MainCourse = (function () {
            function MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.setType(type);
            };

            MainCourse.extends(Meal);

            MainCourse.prototype.getType = function () {
                return this._type;
            };

            MainCourse.prototype.setType = function (type) {
                if (!isValidString(type)) {
                    throw new Error('The type cannot be empty string!');
                };
                this._type = type;
            };

            MainCourse.prototype.toString = function () {
                var base = Meal.prototype.toString.call(this);
                return base + '\nType: ' + this.getType() + '\n';
            };

            return MainCourse;
        }());

        var Dessert = (function () {
            function Dessert(name, price, calories, quantity, timeToPrepare, isVegan) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this._withSugar = true;
            };

            Dessert.extends(Meal);

            Dessert.prototype.getWithSugar = function () {
                return this._withSugar;
            };

            Dessert.prototype.SetWithSugar = function (withSugar) {
                if (!isValidBoolean(withSugar)) {
                    throw new Error('The withSugar should be boolean value!');
                }

                this._withSugar = withSugar;
            };

            Dessert.prototype.toggleSugar = function () {
                this.SetWithSugar(!(this.getWithSugar()));
            };

            Dessert.prototype.toString = function () {
                var base = Meal.prototype.toString.call(this);
                var isFree = (this.getWithSugar() === false ? '[NO SUGAR] ' : '');
                return isFree + base + '\n';
            };

            return Dessert;
        }());

        var Command = (function () {

            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function (commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function (e) {
                        return true
                    });

                parametersKeysAndValues.forEach(function (p) {
                    var split = p
                        .split("=")
                        .filter(function (e) {
                            return true;
                        });
                    self._params[split[0]] = split[1];
                });
            }

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };

        function isValidString(value) {
            if (value == "" || value == undefined || value == null) {
                return false;
            } else {
                return true;
            }
        }

        function isValidNumber(value) {
            if (isNaN(parseFloat(value)) && isFinite(value) && value >= 0) {
                return false
            } else {
                return true;
            }

        }

        function isValidBoolean(inputValue) {
            if (!isNullOrUndefind(inputValue)) {
                return inputValue.constructor === Boolean;
            } else {
                return false;
            }

            function isNullOrUndefind(inputValue) {
                switch (inputValue) {
                    case null:
                    case undefined:
                        return true;
                    default:
                        return false;
                }
            };
        }
    }());


    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
            }
        }
    });

    return results.trim();
}

// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

//(function () {
//    var arr = [];
//    if (typeof (require) == 'function') {
//        // We are in node.js --> read the console input and process it
//        require('readline').createInterface({
//            input: process.stdin,
//            output: process.stdout
//        }).on('line', function (line) {
//            arr.push(line);
//        }).on('close', function () {
//            console.log(processRestaurantManagerCommands(arr));
//        });
//    }
//})();