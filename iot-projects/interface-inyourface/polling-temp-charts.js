///////////////////////////////////////////////////////////
////////////////// JAVASCRIPT BEGINS HERE /////////////////
///////////////////////////////////////////////////////////
$(document).ready(function () {
  // Chart initialization code
  var maxDataPoints = 10;

  // Setup to use charts
  google.charts.load("current", { packages: ["corechart"] });
  google.setOnLoadCallback(drawVisualization);
  function drawVisualization() {
    /////////////////////////////////////////////////
    // CHART PREP SECTION: DO NOT TOUCH /////////////
    /////////////////////////////////////////////////
    var jsonChart = new google.visualization.LineChart($("#json-chart")[0]);
    var ajaxChart = new google.visualization.LineChart($("#ajax-chart")[0]);
    var wsChart = new google.visualization.LineChart($("#ws-chart")[0]);
    var jsonData = google.visualization.arrayToDataTable([
      ["Time", "JSON Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Polling Temperature"],
      [getTime(), 0],
    ]);

    var options = {
      title: "Temperature",
      curveType: "function",
      animation: {
        duration: 1000,
        easing: "in",
      },
      legend: { position: "bottom" },
    };
    /////////////////////////////////////////////////
    // END CHART PREP SECTION: //////////////////////
    /////////////////////////////////////////////////

    // Code to add a data point
    function addDataPoint(dataPoint, dataSet, chart) {
      if (dataSet.getNumberOfRows() > maxDataPoints) {
        dataSet.removeRow(0);
      }
      dataSet.addRow([getTime(), dataPoint.value]);
      chart.draw(dataSet, options);
    }

    // TODO 3: Initialize high and low records
    const json = {
      highest: 0,
      lowest: 100,
      highID: "json-highest",
      lowID: "json-lowest",
    };

    const ajax = {
      highest: 0,
      lowest: 100,
      highID: "ajax-highest",
      lowID: "ajax-lowest",
    };
    const ws = {
      highest: 0,
      lowest: 100,
      highID: "ws-highest",
      lowID: "ws-lowest",
    };

    $("#json-chart-container").append(
      `<p id=${json.highID}>Highest recorded JSON value is ${json.highest}</p>`
    );
    $("#ajax-chart-container").append(
      `<p id=${ajax.highID}>Highest recorded ajax value is ${ajax.highest}</p>`
    );
    $("#ws-chart-container").append(
      `<p id=${ws.highID}>Highest recorded ws value is ${ws.highest}</p>`
    );

    $("#json-chart-container").append(
      `<p id=${json.lowID}>Lowest recorded JSON value is ${json.lowest}</p>`
    );
    $("#ajax-chart-container").append(
      `<p id=${ajax.lowID}>Lowest recorded ajax value is ${ajax.lowest}</p>`
    );
    $("#ws-chart-container").append(
      `<p id=${ws.lowID}>Lowest recorded ws value is ${ws.lowest}</p>`
    );
    // TODO 4: Update high and low records
    function updateRecords(value, type) {
      if (value > type.highest) {
        type.highest = value;
        $("#" + type.highID).text(`Highest recorded value is ${type.highest}`);
      }
      if (value < type.lowest) {
        type.lowest = value;
        $("#" + type.lowID).text(`Lowest recorded value is ${type.lowest}`);
      }
    }
    // TODO 5: Regular JSON Polling
    function doJSONPoll() {
      $.getJSON("http://localhost:3333/", function (result) {
        // Callback code will go here in the next steps

        addDataPoint(result, jsonData, jsonChart);
        updateRecords(result.value, json);
      });
    }
    setInterval(doJSONPoll, 2000);

    // TODO 6: AJAX Polling
    function doAjaxPoll() {
      $.ajax({
        url: "http://localhost:3333/",
        method: "GET",
        dataType: "json",
        success: function (result) {
          addDataPoint(result, ajaxData, ajaxChart);
          updateRecords(result.value, ajax);
        },
      });
    }
    setInterval(doAjaxPoll, 2000);
    // TODO 7: WebSocket Polling

    var socket = new WebSocket("ws://localhost:3333/");

    socket.onmessage = function (event) {
      var result = JSON.parse(event.data);
      console.log(result);
      addDataPoint(result, wsData, wsChart);
      updateRecords(result.value, ws);
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    setInterval(function () {
      /* Code to send temperature data will go here */
    }, 1000);
    // Do not work below this line
    function getTime() {
      var d = new Date();
      return d.toLocaleTimeString();
    }
  }
});
