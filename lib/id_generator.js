module.exports = (function() {
  var
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function RandomGenerator() {}

  RandomGenerator.prototype.generateId = function() {
    var
      text = '',
      i;

    for( i = 0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  RandomGenerator.prototype.generateNumber = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  return new RandomGenerator();
})();
