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
                    s001: x[3] == "None" ? null : new Date(x[3]),
                    s002: x[4] == "None" ? null : new Date(x[4]),
                    s003: x[5] == "None" ? null : new Date(x[5]),
                    s004: x[6] == "None" ? null : new Date(x[6]),
                    s005: x[7] == "None" ? null : new Date(x[7]),
                    s006: x[8] == "None" ? null : new Date(x[8]),
                    s007: x[9] == "None" ? null : new Date(x[9]),
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
                    s001: x[3] == "None" ? null : new Date(x[3]),
                    s002: x[4] == "None" ? null : new Date(x[4]),
                    s003: x[5] == "None" ? null : new Date(x[5]),
                    s004: x[6] == "None" ? null : new Date(x[6]),
                    s005: x[7] == "None" ? null : new Date(x[7]),
                    s006: x[8] == "None" ? null : new Date(x[8]),
                    s007: x[9] == "None" ? null : new Date(x[9]),
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
                    s001: x[3] == "None" ? null : new Date(x[3]),
                    s002: x[4] == "None" ? null : new Date(x[4]),
                    s003: x[5] == "None" ? null : new Date(x[5]),
                    s004: x[6] == "None" ? null : new Date(x[6]),
                    s005: x[7] == "None" ? null : new Date(x[7]),
                    s006: x[8] == "None" ? null : new Date(x[8]),
                    s007: x[9] == "None" ? null : new Date(x[9]),
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

function getAnswers(callback) {
    $.ajax({
        type: 'GET',
        url: "data/results/answers.csv",
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
                    s001: x[3] == "None" ? null : new Date(x[3]),
                    s002: x[4] == "None" ? null : new Date(x[4]),
                    s003: x[5] == "None" ? null : new Date(x[5]),
                    s004: x[6] == "None" ? null : new Date(x[6]),
                    s005: x[7] == "None" ? null : new Date(x[7]),
                    s006: x[8] == "None" ? null : new Date(x[8]),
                    s007: x[9] == "None" ? null : new Date(x[9]),
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
            legend: true,
            title: false
        }
    });
}

function getChartData(all, stanoviste, typ) {
    console.log(all)

    // spocitej statistiky uspesnosti stanovist
    var sums = all.map(x => x[stanoviste]).map(x => {
        return {
            anoBezNapovedy:  x.n == null && x.r == null && x[typ] != null,
            anoSNapovedou:   x.n != null && x.r == null && x[typ] != null,
            napovedaIReseni: x.n != null && x.r != null && x[typ] != null,
            reseniRovnou:    x.n == null && x.r != null && x[typ] != null
        }
    });

    console.log(sums)

    var anoBezNapovedy = sums.map(x => x.anoBezNapovedy).reduce((total, num) => total + num);
    var anoSNapovedou = sums.map(x => x.anoSNapovedou).reduce((total, num) => total + num);
    var napovedaIReseni = sums.map(x => x.napovedaIReseni).reduce((total, num) => total + num);
    var reseniRovnou = sums.map(x => x.reseniRovnou).reduce((total, num) => total + num);

    return [
        anoBezNapovedy,
        anoSNapovedou,
        reseniRovnou,
        napovedaIReseni
    ];
}

function createPieChart(elementId, data) {
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    window.chartColors.green,
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    window.chartColors.red
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Vyřešili bez nápovědy',
                'Vyřešili s nápovědou',
                'Vzali si řešení rovnou',
                'Vzali si nápovědu i řešení',
            ]
        },
        options: {
            responsive: true,
            animation: false,
            legend: {
                position: 'bottom',
            }
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

function mergeAll(prolog, start, finish, aCodes, bCodes, hints, answers) {
    var all = [];

    for (var i = 0; i < prolog.length; ++i) {
        var userId = prolog[i].userId;
        var userName = prolog[i].userName;
        var userCode = prolog[i].userCode;
        var prologOrder = prolog[i].order;
        var startTime = start.find(x => x.userCode == userCode).start;
        var finishTime = finish.find(x => x.userCode == userCode).finish;
        var a = aCodes.find(x => x.userCode == userCode);
        var b = bCodes.find(x => x.userCode == userCode);
        var n = hints.find(x => x.userCode == userCode);
        var r = answers.find(x => x.userCode == userCode);

        all.push({
            userId: userId,
            userName: userName,
            userCode: userCode,
            prologOrder: prologOrder,
            startTime: startTime,
            finishTime: finishTime,
            s001: {
                a: a == null ? null : a.s001,
                b: b == null ? null : b.s001,
                n: n == null ? null : n.s001,
                r: r == null ? null : r.s001
            },
            s002: {
                a: a == null ? null : a.s002,
                b: b == null ? null : b.s002,
                n: n == null ? null : n.s002,
                r: r == null ? null : r.s002
            },
            s003: {
                a: a == null ? null : a.s003,
                b: b == null ? null : b.s003,
                n: n == null ? null : n.s003,
                r: r == null ? null : r.s003
            },
            s004: {
                a: a == null ? null : a.s004,
                b: b == null ? null : b.s004,
                n: n == null ? null : n.s004,
                r: r == null ? null : r.s004
            },
            s005: {
                a: a == null ? null : a.s005,
                b: b == null ? null : b.s005,
                n: n == null ? null : n.s005,
                r: r == null ? null : r.s005
            },
            s006: {
                a: a == null ? null : a.s006,
                b: b == null ? null : b.s006,
                n: n == null ? null : n.s006,
                r: r == null ? null : r.s006
            },
            s007: {
                a: a == null ? null : a.s007,
                b: b == null ? null : b.s007,
                n: n == null ? null : n.s007,
                r: r == null ? null : r.s007
            },
            s008: {
                a: a == null ? null : a.s008,
                b: b == null ? null : b.s008,
                n: n == null ? null : n.s008,
                r: r == null ? null : r.s008
            },
            s009: {
                a: a == null ? null : a.s009,
                b: b == null ? null : b.s009,
                n: n == null ? null : n.s009,
                r: r == null ? null : r.s009
            },
            s010: {
                a: a == null ? null : a.s010,
                b: b == null ? null : b.s010,
                n: n == null ? null : n.s010,
                r: r == null ? null : r.s010
            },
            s011: {
                a: a == null ? null : a.s011,
                b: b == null ? null : b.s011,
                n: n == null ? null : n.s011,
                r: r == null ? null : r.s011
            },
            s101: {
                a: a == null ? null : a.s101,
                b: b == null ? null : b.s101,
                n: n == null ? null : n.s101,
                r: r == null ? null : r.s101
            },
            s102: {
                a: a == null ? null : a.s102,
                b: b == null ? null : b.s102,
                n: n == null ? null : n.s102,
                r: r == null ? null : r.s102
            },
            s103: {
                a: a == null ? null : a.s103,
                b: b == null ? null : b.s103,
                n: n == null ? null : n.s103,
                r: r == null ? null : r.s103
            },
            s104: {
                a: a == null ? null : a.s104,
                b: b == null ? null : b.s104,
                n: n == null ? null : n.s104,
                r: r == null ? null : r.s104
            }
        });
    }

    return all;
}