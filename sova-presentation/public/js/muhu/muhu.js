window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function getPrologData(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/prolog.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                var entry = {
                    userId: x[0],
                    userName: x[1],
                    userCode: x[2],
                    date: x[3] == "None" ? null : new Date(x[3])
                }
                return entry;
            });

            // sort by date
            data = data.sort(function (a, b) {
                if (a === b)
                    return 0;
                if (a === null && b !== null)
                    return -1;
                if (a !== null && b === null)
                    return 1;
                return new Date(a.date) < new Date(b.date);
            });

            // asign order
            for (var i = 0; i < data.length; ++i) {
                data[i].order = i + 1;
            }

            // asign duration from winner
            var winnerDate = data[0].date;
            for (var i = 0; i < data.length; ++i) {
                data[i].fromWinner = getDateDiffString(winnerDate, data[i].date);
            }

            return callback(data);
        }
    });
}

function getFinishData(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/finish.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                var entry = {
                    userId: x[0],
                    userName: x[1],
                    userCode: x[2],
                    finish: x[3] == "None" ? null : new Date(x[3])
                }
                return entry;
            });

            return callback(data);
        }
    });
}

function getStartData(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/start.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                var entry = {
                    userId: x[0],
                    userName: x[1],
                    userCode: x[2],
                    start: x[3] == "None" ? null : new Date(x[3])
                }
                return entry;
            });

            return callback(data);
        }
    });
}

function getPrologDataAsHtml(callback) {
    getPrologData(data => {
        var tableData = [];

        for (var i = 0; i < data.length; ++i) {
            tableData.push("<tr>")
            tableData.push("<td align='center'>" + data[i].order + "</td>")
            tableData.push("<td>" + data[i].userName + "</td>")    
            tableData.push("<td>" + data[i].fromWinner + "</td>")
            tableData.push("</tr>")
        }

        var tableDataString = tableData.join("");
        callback(tableDataString);
    });
}

function getTeamNames(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/prolog.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                return x[1]
            });

            return callback(data);
        }
    });
}

function getACodes(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/acodes.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                var entry = {
                    userId: x[0],
                    userName: x[1],
                    userCode: x[2],
                    s001: x[3]  == "None" ? null : new Date(x[3]),
                    s002: x[4]  == "None" ? null : new Date(x[4]),
                    s003: x[5]  == "None" ? null : new Date(x[5]),
                    s004: x[6]  == "None" ? null : new Date(x[6]),
                    s005: x[7]  == "None" ? null : new Date(x[7]),
                    s006: x[8]  == "None" ? null : new Date(x[8]),
                    s007: x[9]  == "None" ? null : new Date(x[9]),
                    s008: x[10] == "None" ? null : new Date(x[10]),
                    s009: x[11] == "None" ? null : new Date(x[11]),
                    s010: x[12] == "None" ? null : new Date(x[12]),
                    s011: x[13] == "None" ? null : new Date(x[13]),
                    s101: x[14] == "None" ? null : new Date(x[14]),
                    s102: x[15] == "None" ? null : new Date(x[15]),
                    s103: x[16] == "None" ? null : new Date(x[16]),
                    s104: x[17] == "None" ? null : new Date(x[17])
                }
                return entry;
            });

            return callback(data);
        }
    });
}

function getBCodes(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/bcodes.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                var entry = {
                    userId: x[0],
                    userName: x[1],
                    userCode: x[2],
                    s001: x[3]  == "None" ? null : new Date(x[3]),
                    s002: x[4]  == "None" ? null : new Date(x[4]),
                    s003: x[5]  == "None" ? null : new Date(x[5]),
                    s004: x[6]  == "None" ? null : new Date(x[6]),
                    s005: x[7]  == "None" ? null : new Date(x[7]),
                    s006: x[8]  == "None" ? null : new Date(x[8]),
                    s007: x[9]  == "None" ? null : new Date(x[9]),
                    s008: x[10] == "None" ? null : new Date(x[10]),
                    s009: x[11] == "None" ? null : new Date(x[11]),
                    s010: x[12] == "None" ? null : new Date(x[12]),
                    s011: x[13] == "None" ? null : new Date(x[13]),
                    s101: x[14] == "None" ? null : new Date(x[14]),
                    s102: x[15] == "None" ? null : new Date(x[15]),
                    s103: x[16] == "None" ? null : new Date(x[16]),
                    s104: x[17] == "None" ? null : new Date(x[17])
                }
                return entry;
            });

            return callback(data);
        }
    });
}

function getHints(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/hints.csv",
        dataType: 'text',
        success: function (data) {
            // read csv data
            var data = CSVToArray(data, ';');

            // get rid of first and last line
            data = data.slice(1, -1);

            // map to object
            data = data.map(x => {
                var entry = {
                    userId: x[0],
                    userName: x[1],
                    userCode: x[2],
                    s001: x[3]  == "None" ? null : new Date(x[3]),
                    s002: x[4]  == "None" ? null : new Date(x[4]),
                    s003: x[5]  == "None" ? null : new Date(x[5]),
                    s004: x[6]  == "None" ? null : new Date(x[6]),
                    s005: x[7]  == "None" ? null : new Date(x[7]),
                    s006: x[8]  == "None" ? null : new Date(x[8]),
                    s007: x[9]  == "None" ? null : new Date(x[9]),
                    s008: x[10] == "None" ? null : new Date(x[10]),
                    s009: x[11] == "None" ? null : new Date(x[11]),
                    s010: x[12] == "None" ? null : new Date(x[12]),
                    s011: x[13] == "None" ? null : new Date(x[13]),
                    s101: x[14] == "None" ? null : new Date(x[14]),
                    s102: x[15] == "None" ? null : new Date(x[15]),
                    s103: x[16] == "None" ? null : new Date(x[16]),
                    s104: x[17] == "None" ? null : new Date(x[17])
                }
                return entry;
            });

            return callback(data);
        }
    });
}

function chartJsDefaults() {
    Chart.helpers.merge(Chart.defaults.global, {
        //aspectRatio: 4 / 3,
        fragments: true,
        tooltips: false,
        layout: {
            padding: {
                top: 42,
                right: 16,
                bottom: 32,
                left: 8
            }
        },
        elements: {
            line: {
                fill: false
            },
            point: {
                hoverRadius: 7,
                radius: 5
            }
        },
        animation: false,
        plugins: {
            legend: false,
            title: false
        }
    });
}

function createPieChart(elementId) {
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
    };

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    window.chartColors.green,
                    window.chartColors.blue,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue'
            ]
        },
        options: {
            responsive: true,
            animation: false
        }
    };

    var ctx = document.getElementById(elementId).getContext('2d');
    return new Chart(ctx, config);
}

function createFinalChart(elementId, labels, data) {
    return new Chart(elementId, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: Samples.color(0),
                datalabels: {
                    align: 'center',
                    anchor: 'center',
                    rotation: -90
                },
                data: data
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    color: 'white',
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] > 0;
                    },
                    font: {
                        weight: 'bold'
                    },
                    formatter: Math.round
                }
            },
            scales: {
                xAxes: [{
                    maxBarThickness: 20,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                    stacked: true,
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        display: false,
                        max: 1000,
                        min: 0
                    }
                }]
            }
        }
    });
}

function finalChartAddData(chart, index, label, data) {
    chart.data.labels[index] = label;
    chart.data.datasets.forEach(function (dataset, i) {
        dataset.data[index] = data;
    });

    chart.update();
}

function finalChartRemoveData(chart, index) {
    chart.data.labels[index] = "";
    chart.data.datasets.forEach(function (dataset, i) {
        dataset.data[index] = [0];
    });

    chart.update();
}

function getDateDiffString(now, then) {
    if (then == null || now == null) {
        return "n/a"
    }

    if (now == then)
        return ""

    var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
    var duration = moment.duration(ms);
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
}

// function showMap() {
//     var center = SMap.Coords.fromWGS84(14.400307, 50.071853);
//     var m = new SMap(JAK.gel("m"), center, 5);
//     m.addDefaultLayer(SMap.DEF_TURIST).enable();

//     $.get('https://pro.mapy.cz/mapybox-export/v1/gpx?tid=5b8c5eab0abe93ae2fe73cc2&rand=0.462882540798113', function (data) {
//         var gpx = new SMap.Layer.GPX(data, null, { maxPoints: 500 });
//         m.addLayer(gpx);
//         gpx.enable();
//         gpx.fit();
//     });
// }