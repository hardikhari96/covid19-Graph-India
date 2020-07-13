$(document).ready(function() {

    let positive_covid = [];
    let cured_covid = [];
    let dead_covid = [];

    function initchart(chart) {

        $("#total_data").html(chart.total);
        var ctx = document.getElementById(chart.id).getContext('2d');
        var myChart = new Chart(ctx,{
            type: chart.type,
            data: {
                labels: chart.state_name,
                datasets: [{
                    label: chart.title,
                    data: chart.data,
                    backgroundColor: [chart.bgcolor],
                    borderColor: [chart.bordercolor],
                    borderWidth: chart.borderwidth
                }]

            },
            options: {
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    function exchangeData(data) {
        let dstate = [];
        let dpositive = [];
        let dcured = [];
        let ddeath = [];
        let positive_total = 0;
        let cured_total = 0;
        let dead_total = 0;

        for (i in data) {

            dstate[i] = data[i].state_name;

        }
        for (i in data) {

            dpositive[i] = data[i].positive;
            positive_total += parseInt(data[i].positive);
        }
        for (i in data) {

            dcured[i] = data[i].cured;
            cured_total += parseInt(data[i].cured);
        }
        for (i in data) {

            ddeath[i] = data[i].death;
            dead_total += parseInt(data[i].death);
        }

        positive_covid = {
            'id': 'positive',
            'type': 'line',
            'state_name': dstate,
            'title': 'Covid 19 Positive',
            'data': dpositive,
            'bgcolor': 'rgba(193, 66, 66, 0)',
            'bordercolor': '#d39e00',
            'borderwidth': 3,
            'total': positive_total
        };
        cured_covid = {
            'id': 'cured',
            'type': 'line',
            'state_name': dstate,
            'title': 'Covid 19 Cured',
            'data': dcured,
            'bgcolor': 'rgba(193, 66, 66, 0)',
            'bordercolor': '#1e7e34',
            'borderwidth': 3,
            'total': cured_total
        };

        dead_covid = {
            'id': 'dead',
            'type': 'line',
            'state_name': dstate,
            'title': 'Covid 19 Dead',
            'data': ddeath,
            'bgcolor': 'rgba(193, 66, 66, 0)',
            'bordercolor': '#bd2130',
            'borderwidth': 3,
            'total': dead_total
        };

    }

    $.ajax({
        url: 'https://www.mohfw.gov.in/data/data.json',
        type: 'GET',
        dataType: 'json',
        data: {},
    })
    .done(function(data) {
        exchangeData(data);
        initchart(positive_covid);
        $("#positive").show(300);
        $("#cured").hide(300);
        $("#dead").hide(300);
    })

    $("#active_positive").click(function(event) {
        /* Act on the event */
        initchart(positive_covid);
        $("#positive").show(300);
        $("#cured").hide(300);
        $("#dead").hide(300);
    });

    $("#active_cured").click(function(event) {
        /* Act on the event */
        initchart(cured_covid);
        $("#cured").show(300);
        $("#positive").hide(300);
        $("#dead").hide(300);
    });

    $("#active_dead").click(function(event) {
        /* Act on the event */
        initchart(dead_covid);
        $("#dead").show(300);
        $("#positive").hide(300);
        $("#cured").hide(300);
    });

});