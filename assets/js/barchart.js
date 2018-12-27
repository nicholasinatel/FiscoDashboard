$(document).ready(function(){ 

    barchart = {
        initChartist: function(){

            var data = {
            labels: ['RECEITA BRUTA', '(-) DEDUÇÕES DA RECEITA', '(-) CUSTO DAS VENDAS E SERVIÇOS', '(-) DESPESAS OPERACIONAIS'],
            series: [
                [100, 443, 320, 780, ],
                [412, 243, 280, 580, ]
            ]
            };

            var options = {
                seriesBarDistance: 15,
                axisX: {
                    showGrid: true
                },
                height: "245px"
            };

            var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
                }
            }]
            ];

            Chartist.Bar('#chartActivity', data, options, responsiveOptions);

        },

    }
    barchart.initChartist();
});