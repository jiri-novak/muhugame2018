window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var end = moment("15/09/2018 20:30", "DD/MM/YYYY HH:mm:ss");
var totalEnd = moment("15/09/2018 21:00", "DD/MM/YYYY HH:mm:ss");

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

            data = data.filter(x => x.userName != "Sovy v mazutu");

            // sort by date
            data = data.sort(function (a, b) {
                return a.date - b.date;
            });

            // asign order
            for (var i = 0; i < data.length; ++i) {
                data[i].order = i + 1;
            }

            // asign duration from winner
            var winnerDate = data[0].date;
            for (var i = 0; i < data.length; ++i) {
                data[i].fromWinner = getDateDiffString(data[i].date, winnerDate);
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

function getPrologDataAsHtml(data) {
    var tableData = [];

    for (var i = 0; i < data.length; ++i) {
        tableData.push("<tr>")
        tableData.push("<td align='center'>" + data[i].order + "</td>")
        tableData.push("<td>" + data[i].userName + "</td>")
        tableData.push("<td>" + data[i].fromWinner + "</td>")
        tableData.push("</tr>")
    }

    var tableDataString = tableData.join("");
    return tableDataString;
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

function getChartAData(all, stanoviste, typ) {
    var sums = all.map(x => x[stanoviste]).map(x => {
        return {
            anoBezNapovedy: x.n == null && x.r == null && x[typ] != null,
            anoSNapovedou: x.n != null && x.r == null && x[typ] != null,
            napovedaIReseni: x.n != null && x.r != null && x[typ] != null,
            reseniRovnou: x.n == null && x.r != null && x[typ] != null
        }
    });

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

function getChartBData(all, stanoviste, typ) {
    var sums = all.map(x => x[stanoviste]).map(x => {
        return {
            ano: x[typ] != null,
            ne: x[typ] == null
        }
    });

    var ano = sums.map(x => x.ano).reduce((total, num) => total + num);
    var ne = sums.map(x => x.ne).reduce((total, num) => total + num);

    return [
        ano,
        ne
    ];
}

function getChartBonData(all, stanoviste, typ) {
    var sums = all.map(x => x[stanoviste]).filter(x => !(!x.n && !x.r && !x.a && !x.b)).map(x => {
        return {
            anoBezNapovedy: x.n == null && x[typ] != null,
            anoSNapovedou: x.n != null && x[typ] != null,
            neSNapovedou: x.n != null && x[typ] == null
        }
    });

    var anoBezNapovedy = sums.map(x => x.anoBezNapovedy).reduce((total, num) => total + num);
    var anoSNapovedou = sums.map(x => x.anoSNapovedou).reduce((total, num) => total + num);
    var neSNapovedou = sums.map(x => x.neSNapovedou).reduce((total, num) => total + num);

    return [
        anoBezNapovedy,
        anoSNapovedou,
        neSNapovedou
    ];
}

function getChartFinalData(all, stanoviste, typ) {
    var sums = all.map(x => x[stanoviste]).filter(x => !(!x.n && !x.r && !x.a && !x.b)).map(x => {
        return {
            ano: x[typ] != null,
            ne: x[typ] == null
        }
    });

    var ano = sums.map(x => x.ano).reduce((total, num) => total + num);
    var ne = sums.map(x => x.ne).reduce((total, num) => total + num);

    return [
        ano,
        ne
    ];
}

function createPieChartA(elementId, data) {
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

function createPieChartBon(elementId, data) {
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
                'Nevyřešili s nápovědou'
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

function createPieChartFinal(elementId, data) {
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    window.chartColors.green,
                    window.chartColors.red
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Vyřešili',
                'Nevyřešili'
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

function createPieChartB(elementId, data) {
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    window.chartColors.green,
                    window.chartColors.red
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Splnili',
                'Nesplnili'
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
            legend: {
                display: false
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
                        max: 140,
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

function getDateDiffString(end, startTime) {
    if (end == null || startTime == null) {
        return "n/a"
    }

    if (end == startTime)
        return ""

    var duration = moment.duration(moment(end).diff(moment(startTime)));
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
}

function getDateDiffMs(end, startTime) {
    if (end == null || startTime == null) {
        return "n/a"
    }

    if (end == startTime)
        return ""

    var duration = moment.duration(moment(end).diff(moment(startTime)));
    return duration.asMilliseconds();
}

function getDateDiffInMinutes(now, then) {
    if (then == null || now == null) {
        return null
    }

    if (now == then) {
        return 0
    }

    var ms = moment(now).diff(moment(then));
    var duration = moment.duration(ms);
    return duration.asMinutes();
}

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
        var time = getDateDiffString(finishTime, startTime);
        var timeMs = getDateDiffMs(finishTime, startTime);

        var entry = {
            userId: userId,
            userName: userName,
            userCode: userCode,
            prologOrder: prologOrder,
            startTime: startTime,
            finishTime: finishTime,
            time: time,
            timeMs: timeMs,
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
        };

        var _stan = [
            entry.s001, entry.s002, entry.s003,
            entry.s004, entry.s005, entry.s006,
            entry.s007, entry.s008, entry.s009,
            entry.s010, entry.s011
        ];

        var _bon1 = entry.s101;
        var _bon2 = entry.s102;
        var _bon3 = entry.s103;
        var _bon4 = entry.s104;

        entry.points_a = _stan.map(x => {
            if (x.r != null)
                return 0;
            else if (x.n != null && x.r == null)
                return 5;
            else
                return 10;
        }).reduce(sum);
        entry.points_n = _stan.map(x => x.n).map(x => x == null ? 0 : 1).reduce(sum);
        entry.points_r = _stan.map(x => x.r).map(x => x == null ? 0 : 1).reduce(sum);
        entry.points_b = _stan.map(x => x.b).map(x => x == null ? 0 : 1).reduce(sum) * 5;
        entry.points_b1 = evaluateBonus(_bon1);
        entry.points_b2 = evaluateBonus(_bon2);
        entry.points_b3 = evaluateBonus(_bon3);
        entry.points_b4 = evaluateMegaBonus(_bon4);
        entry.penaltyTime = evaluatePenaltyTime(entry);
        entry.penaltyEnvelopes = evaluatePenaltyEnvelopes(entry);
        entry.penaltyWrong = evaluatePenaltyWrong(entry);

        entry.points_all =
            entry.points_a +
            //entry.points_n +
            //entry.points_r +
            entry.points_b +
            entry.points_b1 +
            entry.points_b2 +
            entry.points_b3 +
            entry.points_b4 +
            entry.penaltyTime +
            entry.penaltyEnvelopes +
            entry.penaltyWrong;

        if (entry.userName != "Sovy v mazutu")
            all.push(entry);
    }

    // TADY
    all = all.sort(function (a, b) {
        //return b.points_all - a.points_all

        // if (a.points_all > b.points_all) {
        //     return 1;
        // } else if (a.points_all < a.points_all) { 
        //     return -1;
        // }
    
        // if (a.timeMs < b.timeMs) { 
        //     return -1;
        // } else if (a.timeMs > b.timeMs) {
        //     return 1
        // } else {
        //     return 0;
        // }
        return orderDesc(a.points_all, b.points_all) 
            || orderAsc(a.timeMs, b.timeMs)
    });

    return all;
}

function orderDesc(a, b) {
    if (a > b) return -1;
    if (a < b) return +1;
    return 0;
}

function orderAsc(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
}

function evaluatePenaltyEnvelopes(entry) {
    if (entry.userCode == "BARVIVO" || entry.userCode == "FLOTILA") {
        return -200;
    }
    else {
        return 0;
    }
}

function evaluatePenaltyWrong(entry) {
    if (entry.userCode == "SADISTA") {
        return -4;
    }
    else {
        return 0;
    }
}

function evaluatePenaltyTime(entry) {
    if (entry.finishTime == null || moment(entry.finishTime).isAfter(totalEnd)) {
        return -200;
    }
    else if (moment(entry.finishTime).isAfter(end) && moment(entry.finishTime).isBefore(totalEnd)) {
        var diffMins = getDateDiffInMinutes(entry.finishTime, end);
        return -Math.round(diffMins / 2, 0)
    } else {
        return 0;
    }
}

function evaluateBonus(stan) {
    var a = stan.a == null ? 0 : 1;
    var n = stan.n == null ? 0 : 1;

    if (a != 1 && n == 1) {
        return 0;
    } else {
        return a * 15 + n * -5;
    }
}

function evaluateMegaBonus(stan) {
    var a = stan.a == null ? 0 : 1;
    var n = stan.n == null ? 0 : 1;

    return a * 20 + n * -10;
}

function sum(t, a) {
    return t + a;
}

function statsAsHtml(data) {
    var tableData = [];

    for (var i = 0; i < data.length; ++i) {
        if (i < 3) {
            tableData.push("<tr style='background:red'>")
        }
        else {
            tableData.push("<tr>")
        }
        tableData.push("<td align='center'>" + (i + 1) + ".</td>")
        tableData.push("<td>" + data[i].userName + "</td>")
        tableData.push("<td align='right'>" + data[i].time + "</td>")
        tableData.push("<td align='right'>" + data[i].points_a + "</td>")
        tableData.push("<td align='right'>" + data[i].points_n + "x</td>")
        tableData.push("<td align='right'>" + data[i].points_r + "x</td>")
        tableData.push("<td align='right'>" + data[i].points_b + "</td>")
        tableData.push("<td align='right'>" + data[i].points_b1 + "</td>")
        tableData.push("<td align='right'>" + data[i].points_b2 + "</td>")
        tableData.push("<td align='right'>" + data[i].points_b3 + "</td>")
        tableData.push("<td align='right'>" + data[i].points_b4 + "</td>")
        // tableData.push("<td align='right'>" + data[i].prologOrder + ".</td>")
        tableData.push("<td align='right'>" + data[i].penaltyTime + "</td>")
        tableData.push("<td align='right'>" + data[i].penaltyEnvelopes + "</td>")
        tableData.push("<td align='right'>" + data[i].penaltyWrong + "</td>")
        tableData.push("<td align='right'>" + data[i].points_all + "</td>")
        // tableData.push("<td align='right'>" + data[i].timeMs + "</td>")
        tableData.push("</tr>")
    }

    var tableDataString = tableData.join("");
    return tableDataString;
}