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

            var tableData = [];
            var winnerDate = data[0].date;

            for (var i = 0; i < data.length; ++i) {
                tableData.push("<tr>")
                tableData.push("<td align='center'>" + (i + 1) + "</td>")
                tableData.push("<td>" + data[i].userName + "</td>")    
                tableData.push("<td>" + getDateDiffString(winnerDate, data[i].date) + "</td>")
                tableData.push("</tr>")
            }

            var tableDataString = tableData.join("");

            return callback(tableDataString);
        }
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