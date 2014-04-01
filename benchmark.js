Storage.prototype.addToArray = function(key, value) {
  var oldArray = this.getItem(key) ? this.getItem(key).split(',') : [];
  oldArray.push(value);
  this.setItem(key, oldArray.join(','));
};

Storage.prototype.getArray = function(key) {
    return JSON.parse(this.getItem(key))
};

Storage.prototype.getAverage = function (key) {

  if (!this.getItem(key)) return false;

  var resultsArray = this.getItem(key).split(',');

  var sum = 0;

  for(var i = 0; i < resultsArray.length; i++){
      sum += parseInt(resultsArray[i]);
  }

  return sum/resultsArray.length;
};

var drawGraph = function () {
    $(document).ready(function () { 
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Mechanism']
            },
            yAxis: {
                title: {
                    text: 'Average time to load jQuery'
                }
            },
            series: [{
                name: 'Browser Cache',
                data: [window.localStorage.getAverage('cacheResults')]
            }, {
                name: 'BasketJS',
                data: [window.localStorage.getAverage('basketResults')]
            }]
        });
    });
};

var teardown = function() {
  basket.remove("basket-jquery.js");
};

var getTime = function () {
  return window.performance.webkitNow ? window.performance.webkitNow() : new Date().getTime();       
};

var setup = function() {

    var url = "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status === 200) {

      localStorage.setItem("basket-jquery", xhr.responseText);

      var cacheTest = function () {

        var now = getTime();
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.onreadystatechange = function(xhrEvent) {

          if (xhr.readyState === 4 && xhr.status === 200) {

            var timeCache = getTime() - now;

            window.localStorage.addToArray("cacheResults", timeCache);

            drawGraph();
          }
        };
        xhr.send();
      }

      var basketTest = function () {

        var now = getTime();

        basket.require({ url: "jquery.js"}).then(function() {

            var endBasket = getTime(), timeBasket = endBasket - now;

            window.localStorage.addToArray("basketResults", timeBasket);

            drawGraph();

          }, function (error) {
            console.log('error', error);
          });
      }

      basketTest();
      cacheTest();
    }
};

setup();