var dataTable = null;
var childWindow = null;

//Measure Performance
console.time('doLoad');
console.time('AJAX');

// Global Variables
var count = 0;
// GLobal
// console.log("number of Script delcarations");

// Detect local storage for browser
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function maxMin(array1, array2) {
    var object = {
        max: 0,
        min: 0
    };
    array1.forEach(function (element, index, array) {
        if (element > object.max) {
            object.max = element;

        }
        if (element < object.min) {
            object.min = element;

        }
    });
    array2.forEach(function (element, index, array) {
        if (element > object.max) {
            object.max = element;

        }
        if (element < object.min) {
            object.min = element;

        }
    });
    console.log('%c maxMin function return', 'color: yellow; font-weight: 500;');
    console.table([object]);
    return object;
}
// icon clicked event handler
function iconAction(event) {
    // jquery to get the record ID back out
    var data = jQuery(event.target).data('ray-data');
    alert('glyph icon data is ' + data);
    //alert('You clicked the icon with data = ' + event.data.id + ' on row ' + event.data.rowIdx );
}

// row clicked handler
function rowAction(event) {
    // jquery to get the record ID back out
    //var id = jQuery(event.target).data('ray-key');
    //alert('You clicked row ' + event.data.rowIdx + ' with object ID ' + event.data.id );
    //alert(event.data.);
}

// boolean handler to determine if the cell content is rendered
function isManager(item) {
    return (item.grade > 4);
}

// custom format handler
function parseDate(item) {
    // source is ISO 8601
    var d = new Date(item.birthDate);
    return d.toDateString();
}

// load some data
function doLoad(sender, req) {
    // req = 0 -> dre-mensal
    // req = 1 -> dre-periodo
    // req = 2 -> balanco
    // req = 3 -> Login

  
    if (req === 0) {
        //Date Picker Formatter - Variables
        var dateStart = $('#date-start').val();
        var dateEnd = $('#date-end').val();
        //-------------------------------------------------------------------
        // dateStart = dateStartMes + "/" + dateStartAno;
        // dateEnd = dateEndMes + "/" + dateEndAno;
        // AJAX Request Variables
        var Url = 'http://200.98.145.91:5000/dashboard/api/v1.0/dre/mensal';
        var data_json = {
            "date_start": "mm/yyyy",
            "date_end": "mm/yyyy",
            "token": ""
        };
        //-------------------------------------------------------------------
        //AJAX Request Date Set
        dateStart = dateStart.replace(",", "/");
        dateEnd = dateEnd.replace(",", "/");
        data_json.date_start = dateStart;
        data_json.date_end = dateEnd;
        data_json.token = localStorage.getItem("token");
    } else if (req === 1) {
        //Date Picker Formatter - Variables
        var dateStart1 = $('#date-start-1').val();
        var dateEnd1 = $('#date-end-1').val();
        var dateStart2 = $('#date-start-2').val();
        var dateEnd2 = $('#date-end-2').val();
        //-------------------------------------------------------------------
        dateStart1 = dateStart1.replace(",", "/");
        dateEnd1 = dateEnd1.replace(",", "/");
        dateStart2 = dateStart2.replace(",", "/");
        dateEnd2 = dateEnd2.replace(",", "/");
        // AJAX Request Variables
        var Url = 'http://200.98.145.91:5000/dashboard/api/v1.0/dre/periodo';
        var data_json = {
            "date_start1": "mm/yyyy",
            "date_end1": "mm/yyyy",
            "date_start2": "mm/yyyy",
            "date_end2": "mm/yyyy",
            "token": ""
        }
        //-------------------------------------------------------------------
        //AJAX Request Date Set
        data_json.date_start1 = dateStart1;
        data_json.date_end1 = dateEnd1;
        data_json.date_start2 = dateStart2;
        data_json.date_end2 = dateEnd2;
        data_json.token = localStorage.getItem("token");

    } else if (req === 2) {
        //Date Picker Formatter - Variables
        var dateStartBal = $('#date-start-bal').val();
        var dateEndBal = $('#date-end-bal').val();
        //-------------------------------------------------------------------
        var Url = 'http://200.98.145.91:5000/dashboard/api/v1.0/balanco';
        var data_json = {
            "date_start": "mm/yyyy",
            "date_end": "mm/yyyy",
            "token": ""
        };
        //-------------------------------------------------------------------
        //AJAX Request Date Set
        dateStartBal = dateStartBal.replace(",", "/");
        dateEndBal = dateEndBal.replace(",", "/");
        data_json.date_start = dateStartBal;
        data_json.date_end = dateEndBal;
        data_json.token = localStorage.getItem("token");
    } else if (req === 3) {
        //Login
        console.log("doLoad called: ");
        var user_entry = $('#user-input').val();
        var password_entry = $('#password-input').val();
        var Url = 'http://200.98.145.91:5000/dashboard/api/v1.0/auth/login';
        var data_json = {
            "user": "teste",
            "password": "teste"
        }
        data_json.user = user_entry;
        data_json.password = password_entry;
    }

    console.log('%c data_json', 'color: orange; font-weight: 700;');
    console.log({
        data_json
    });
    // Convert data_json to string because Fifi did not know what he was doing with JSON
    data_json = JSON.stringify(data_json);
    console.log('%c Url', 'color: orange; font-weight: 500;');
    console.log({
        Url
    });

    console.trace("AJAX Request");
    //-------------------------------------------------------------------
    //AJAX Request
    $.ajax({
        url: Url,
        method: "POST",
        data: data_json,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        // Response Job
        success: function (json) {
            count = Object.keys(json.data).length;
            console.log("Resposta AJAX Request JSON: Count " + count +" " + JSON.stringify(json.data));

            if(json.cod_return == 200) {
                console.log("cod return succesfull");
                // console.log(count + " :Size of response - AJAX request");
            if (req === 0 || req === 1) {
                dataTable.data(json.data, 'description');
                barchart.initChartist(json.data);
            } else if (req === 2) {
                dataTable.data(json.data, 'description');
                barchart.initChartist(json.data);
            } else if (req === 3) {
                if (json.cod_return == 200) {
                    console.log("resposta JSON:" + JSON.stringify(json));
                    console.log(json.name_company);
                    localStorage.setItem("name_company", json.data.name_company);
                    localStorage.setItem("cnpj_company", json.data.cnpj_company);
                    localStorage.setItem("type_company", json.data.type_company);
                    localStorage.setItem("token", json.data.token);
                    window.open("dashboard.html", "_self");

                    // $("#company-name").append("<p>TESTE</p>");
                } else if (json.cod_return != 200) {
                    alert("Usuario ou senha incorretos");
                    console.log("Error Messa: " + json);
                }
            }
            //Timer End for Performance
            console.log('%c AJAX() Performance', 'color: #00F7DD; font-weight: 600;');
            console.timeEnd('AJAX');
            } else if(json.cod_return == 401 || json.cod_return == 402) {
                console.log("Token not authenticated");
                window.open("index.html", "top");
            }
            
        },
        error: function (xhr, status, error) {
            console.log("Resultado: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });
    //-------------------------------------------------------------------
    // Dynamic Table
    if (req === 0) {
        dataTable = jQuery("#dataTable").raytable({
            datasource: {
                data: [],
                keyfield: 'description'
            },
            columns: [{
                    field: "description",
                    title: "Descrição"
                },
                {
                    field: "value_date_start",
                    title: dateStart
                },
                {
                    field: "value_date_end",
                    title: dateEnd
                },
                {
                    field: "var_percent",
                    title: "Variação %"
                },
                {
                    field: "var_value",
                    title: "Variação R$"
                }
            ],
            pagesize: count,
            maxPageButtons: 5,
            rowNumbers: false,
            rowClickHandler: rowAction

        });
        jQuery(".glyphicon").css('cursor', 'pointer');
    } else if (req === 1) {
        dataTable = jQuery("#dataTable").raytable({
            datasource: {
                data: [],
                keyfield: 'description'
            },
            columns: [{
                    field: "description",
                    title: "Descrição"
                },
                {
                    field: "value_date_start",
                    title: dateStart1
                },
                {
                    field: "value_date_end",
                    title: dateStart2
                },
                {
                    field: "var_percent",
                    title: "Variação %"
                },
                {
                    field: "var_value",
                    title: "Variação R$"
                }
            ],
            pagesize: count,
            maxPageButtons: 5,
            rowNumbers: false,
            rowClickHandler: rowAction

        });
        jQuery(".glyphicon").css('cursor', 'pointer');
    } else if (req === 2) {
        dataTable = jQuery("#dataTable").raytable({
            datasource: {
                data: [],
                keyfield: 'description'
            },
            columns: [{
                    field: "description",
                    title: "Descrição"
                },
                {
                    field: "value_date_start",
                    title: dateStartBal
                },
                {
                    field: "value_date_end",
                    title: dateEndBal
                },
                {
                    field: "var_percent",
                    title: "Variação %"
                },
                {
                    field: "var_value",
                    title: "Variação R$"
                }
            ],
            pagesize: count,
            maxPageButtons: 5,
            rowNumbers: false,
            rowClickHandler: rowAction

        });
        jQuery(".glyphicon").css('cursor', 'pointer');
    }

    //-------------------------------------------------------------------
    // BAR CHART
    barchart = {

        initChartist: function (chartData) {
            legendData = JSON.parse(data_json);
            if (req === 0) {
                $("#insert-data-1").replaceWith("<span id=\"insert-data-1\">" + legendData.date_start + "</span>");
                $("#insert-data-2").replaceWith("<span id=\"insert-data-2\">" + legendData.date_end + "</span>");
            } else if (req === 1) {
                $("#insert-data-1").replaceWith("<span id=\"insert-data-1\">" + legendData.date_start1 + "</span>");
                $("#insert-data-2").replaceWith("<span id=\"insert-data-2\">" + legendData.date_start2 + "</span>");
            }

            var seriesA = [];
            var seriesX = [];
            // console.log("chartData : " + JSON.stringify(chartData));
            // console.log("chartData: " + chartData);
            var j = 0;
            chartData.forEach(function (element, index, array) {
                if (element.description === "RECEITA BRUTA" ||
                    element.description === "(-) DEDUÇÕES DA RECEITA" ||
                    element.description === "(-) CUSTO DAS VENDAS E SERVIÇOS" ||
                    element.description === "(-) DESPESAS OPERACIONAIS"
                ) {
                    // console.log("Element: ", element);
                    // console.log("Index", index);
                    // console.log(element.value_date_start);
                    element.value_date_start = element.value_date_start.replace("R$", '');
                    element.value_date_end = element.value_date_end.replace("R$", '');
                    seriesA[j] = parseFloat(element.value_date_start);
                    seriesX[j] = parseFloat(element.value_date_end);
                    j++;
                }
            });
            var data = {
                labels: ['RECEITA BRUTA', '(-) DEDUÇÕES DA RECEITA', '(-) CUSTO DAS VENDAS E SERVIÇOS', '(-) DESPESAS OPERACIONAIS'],
                series: [
                    [seriesA[0], seriesA[1], seriesA[2], seriesA[3], ],
                    [seriesX[0], seriesX[1], seriesX[2], seriesX[3], ]
                ]
            };
            // Call to my function for maxMin
            var mami = maxMin(seriesA, seriesX);
            // console.log("maxValue: " + mami[0]);
            // console.log("minValue: " + mami[1]);

            var options = {
                seriesBarDistance: 50,
                axisX: {
                    showGrid: true
                },
                axisY: {
                    offset: 50,
                    // The label interpolation function enables you to modify the values
                    // used for the labels on each axis. Here we are converting the
                    // values into million pound.
                    labelInterpolationFnc: function (value) {
                        return '$' + value / 1000000 + 'm';
                    }
                },
                height: "420px",
                high: mami.max,
                low: mami.min,
                divisor: 4
            };
            console.log('%c options', 'color: red; font-weight: 400;');
            console.log({
                options
            });

            var responsiveOptions = [
                ['screen and (max-width: 1550px)', {
                    seriesBarDistance: 20
                }],
                ['screen and (max-width: 1280px)', {
                    seriesBarDistance: 10
                }],
                ['screen and (max-width: 992px)', {
                    seriesBarDistance: 20
                }],
                ['screen and (max-width: 768)', {
                    seriesBarDistance: 10,
                    height: "300px"
                }]
            ];
            if (req === 0) {
                Chartist.Bar('#chartActivity', data, options, responsiveOptions);
            } else if (req === 1) {
                Chartist.Bar('#chartHours', data, options, responsiveOptions);
            }
        }
    }; // BAR CHART - END
    //-------------------------------------------------------------------
    // LINE CHART
    linechart = {
        initChartist: function (chartData) {

            var seriesA = [];
            var seriesX = [];
            var j = 0;
            chartData.forEach(function (element, index, array) {
                if (element.description === "RECEITA BRUTA" ||
                    element.description === "(-) DEDUÇÕES DA RECEITA" ||
                    element.description === "(-) CUSTO DAS VENDAS E SERVIÇOS" ||
                    element.description === "(-) DESPESAS OPERACIONAIS"
                ) {
                    element.value_date_start = element.value_date_start.replace("R$", '');
                    element.value_date_end = element.value_date_end.replace("R$", '');
                    seriesA[j] = parseFloat(element.value_date_start);
                    seriesX[j] = parseFloat(element.value_date_end);
                    j++;
                }
            });
            // CSS on console.log style
            console.log('%c Line Chart Values', 'color: orange; font-weight: 400');
            //Computed Property Name - Shows entire object with variable name and length
            console.log({
                seriesA,
                seriesX
            });

            for (var i = 0; i < seriesA.length; i++) {
                seriesA[i] = Math.abs(seriesA[i]);
                seriesX[i] = Math.abs(seriesX[i]);
            }
            var mami = maxMin(seriesA, seriesX);

            var dataSales = {
                labels: ['Periodo 1 -> Periodo 2'],
                series: [
                    [seriesA[0], seriesX[0]],
                    [seriesA[1], seriesX[1]],
                    [seriesA[2], seriesX[2]],
                    [seriesA[3], seriesX[3]]
                ]
            };

            var optionsSales = {
                fullWidth: true,
                seriesBarDistance: 0,
                lineSmooth: false,
                low: 0,
                high: mami[0],
                showArea: true,
                height: "520px",
                axisX: {
                    showGrid: true,
                },
                axisY: {
                    offset: 60,
                    labelInterpolationFnc: function (value) {
                        return '$' + value / 1000000 + 'm';
                    }
                },
                lineSmooth: Chartist.Interpolation.simple({
                    divisor: 100
                }),
                showLine: true,
                showPoint: true,
            };

            var responsiveSales = [
                ['screen and (max-width: 640px)', {
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];

            new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

        }
    }; // LINE CHART
    //Timer End for Performance
    console.log('%c doLoad() Performance', 'color: #00F7DD; font-weight: 600;');
    console.timeEnd('doLoad');

} //doLoad() END
var iFrame1;
var iFrame2;
var iFrame3;

// Wait for the entire DOM to load
jQuery(document).ready(function () {
    /*
    $(window).scrollTop(15);
    // Returns height of browser viewport
    console.log("window heigh: " + $(window).height());
    // Returns height of HTML document
    console.log("document heigh: " + $(document).height());

    $(window).scroll(function () {
        console.log("scrollNOW!!! : " + $(window).scrollTop())
        if ($(window).scrollTop() < 15) {
            $(window).scrollTop(15);
            // console.log("ScrollTop Threshold Reached: " + $(window).scrollTop());
        } else if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $(window).scrollTop($(document).height() - 150);
            // console.log("ScrollBottom Threshold Reached: " + $(window).scrollTop());
        }
    });
    */

    if (supports_html5_storage() == true) {
        console.log("Support for local sotrage is true ");
    } else {
        alert("Your browser does not support local storage, please use last version of google chrome or safari or firefox");
    }
    var companyName = localStorage.getItem("name_company");
    $('<p>').appendTo('#company-name').append(companyName);
    //Iframe Manager
    $('#iframe-dre-mensal').hide();
    $('#iframe-dre-periodo').hide();
    $('#iframe-balanco').hide();
    $('#iframe-lancamento').hide();


    iFrame1 = function showIframe1() {
        console.trace("iframe 1");
        $('#iframe-dre-mensal').show();
        $('#iframe-dre-periodo').hide();
        $('#iframe-balanco').hide();
        // Returns height of iFrame document
        console.log("iFrame height: " + $("#iframe-dre-mensal").height());
        maxHeight = $("#iframe-dre-mensal").height();
    }

    iFrame2 = function showIframe2() {
        console.trace("iframe 2");
        $('#iframe-dre-mensal').hide();
        $('#iframe-dre-periodo').show();
        $('#iframe-balanco').hide();

    }

    iFrame3 = function showIframe3() {
        console.trace("iframe 3");
        $('#iframe-dre-mensal').hide();
        $('#iframe-dre-periodo').hide();
        $('#iframe-balanco').show();
    }

    $('#upload-modal').modal({
        show: false
    });
    $('#upload-modal-aviso').modal({
        show: false
    });
    $('#upload-modal-chegou').modal({
        show: false
    });
    $('#upload-modal-falhou').modal({
        show: false
    });

    $('#upload-modal-btn').click(function () {
        $('#upload-modal').modal('show');
    });

    //https://stackoverflow.com/questions/18334717/how-to-upload-a-file-using-an-ajax-call-in-flask
    $('#upload-file-btn').click(function () {
        $("#upload-modal").modal('hide');
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        var form_data = new FormData($('#upload-file')[0]);
        var fileName = $('#file').val().replace(/C:\\fakepath\\/i, '');
        // alert("Obrigado! O envio pode demorar alguns minutos assim como o processamento do arquivo");

        $("#upload-modal-aviso").modal('show');

        $.ajax({
            headers: {
                // "file_name": fileName,
                "file_type": "AlterData",
                //https://www.w3schools.com/jsref/prop_win_localstorage.asp
                "token": localStorage.getItem("token")
            },
            type: 'POST',
            url: 'http://200.98.145.91:5000/dashboard/api/v1.0/upload',
            data: form_data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                console.log('Success!');
                console.log("dat success upload: " + data);
                $("#upload-modal-aviso").modal('hide');
                $("#upload-modal-chegou").modal('show');
                // alert("Envio do arquivo concluido com sucesso");
            },
            error: function (xhr, status, error) {
                console.log("Resultado: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                $("#upload-modal-aviso").modal('hide');
                $("#upload-modal-falhou").modal('show');
                // alert("Envio do arquivo falhou");
            }
        });
    }); //Upload End



    // DOcument Ready End    
});


$(document).on("click", "#dynamic-table tbody tr td .launch-btn-1", function () {
    var Url = "http://200.98.145.91:5000/dashboard/api/v1.0/dre/launchs";
    var rowNum = 0;
    var dataJsonLaunch = {
        "date": "teste",
        "description": "teste",
        "token": "teste"
    };
    rowNum = $(this).closest('tr').index() + 1;
    console.log("rowNum: " + rowNum);
    var description = $("table tbody tr:nth-child(" + rowNum + ")").text();
    description = description.substring(0, description.indexOf('R$'));
    console.log("rowNum Return: " + description);
    dataJsonLaunch.description = description;

    var columNum = 2;
    dataJsonLaunch.date = $("#table-header-1 th:nth-child(" + columNum + ")").text();
    dataJsonLaunch.token = localStorage.getItem("token");
    console.log(dataJsonLaunch);

    dataJsonLaunch = JSON.stringify(dataJsonLaunch);
    //AJAX Request
    $.ajax({
        url: Url,
        method: "POST",
        data: dataJsonLaunch,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        // Response Job
        success: function (json) {
            count = Object.keys(json.data).length;
            console.log("Resposta em JSON: " + count +  [JSON.stringify(json.data)]);
            childWindow = window.open("lancamento.html");
            childWindow.onload = function() {
                // https://stackoverflow.com/questions/38222011/open-window-and-run-function-on-that-window
                childWindow.window.genTable(json.data, count);
            };
        },
        error: function (xhr, status, error) {
            console.log("Resultado: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });        
});


$(document).on("click", "#dynamic-table tbody tr td .launch-btn-2", function () {
    var Url = "http://200.98.145.91:5000/dashboard/api/v1.0/dre/launchs";
    var rowNum = 0;
    var dataJsonLaunch = {
        "date": "teste",
        "description": "teste",
        "token": "teste"
    };

    rowNum = $(this).closest('tr').index() + 1;
    console.log("rowNum: " + rowNum);
    var description = $("table tbody tr:nth-child(" + rowNum + ")").text();
    description = description.substring(0, description.indexOf('R$'));
    console.log("rowNum Return: " + description);
    dataJsonLaunch.description = description;

    var columNum = 3;
    dataJsonLaunch.date = $("#table-header-1 th:nth-child(" + columNum + ")").text();
    dataJsonLaunch.token = localStorage.getItem("token");
    console.log(dataJsonLaunch);

    dataJsonLaunch = JSON.stringify(dataJsonLaunch);
    //AJAX Request
    $.ajax({
        url: Url,
        method: "POST",
        data: dataJsonLaunch,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        // Response Job
        success: function (json) {
            count = Object.keys(json.data).length;
            console.log("Resposta em JSON: " + count +  [JSON.stringify(json.data)]);
            childWindow = window.open("lancamento.html");
            childWindow.onload = function() {
                // https://stackoverflow.com/questions/38222011/open-window-and-run-function-on-that-window
                childWindow.window.genTable(json.data, count);
            };
        },
        error: function (xhr, status, error) {
            console.log("Resultado: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });  
});