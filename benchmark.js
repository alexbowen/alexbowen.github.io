Storage.prototype.addToArray = function(key, value) {
  var oldArray = this.getItem(key) ? this.getItem(key).split(',') : [];
  oldArray.push(value);
  this.setArray(key, oldArray.join(','));
}

Storage.prototype.setArray = function(key, str) {
    return this.setItem(key, str)
}

Storage.prototype.getArray = function(key) {
    return JSON.parse(this.getItem(key))
}

Storage.prototype.getAverage = function (key) {
  if (!this.getItem(key)) return false;

  var resultsArray = this.getItem(key).split(',');

  var sum = 0;

  for(var i = 0; i < resultsArray.length; i++){
      sum += parseInt(resultsArray[i]);
  }

  return sum/resultsArray.length;
}

var drawGraph = function () {
    $(document).ready(function () { 
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Basket JS Benchmark'
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
}

var teardown = function() {
  basket.remove("basket-jquery.js");
};

var setup = function() {

    var url = "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status === 200) {

      localStorage.setItem("basket-jquery", xhr.responseText);

      var cacheTest = function () {

        var now = new Date().getTime(), xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.onreadystatechange = function(xhrEvent) {

          if (xhr.readyState === 4 && xhr.status === 200) {

            var timeCache = xhrEvent.timeStamp - now;

            window.localStorage.addToArray("cacheResults", timeCache);

            drawGraph();
          }
        };
        xhr.send();
      }

      var basketTest = function () {

        var now = new Date().getTime();

        basket.require({ url: "jquery.js"}).then(function() {

            var endBasket = new Date().getTime(), timeBasket = endBasket - now;

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