var dataTable2 = null;

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
function test() {
    alert("Hellor");
    return 1;
}

function genTable(dataJson, count) {
    // https://stackoverflow.com/questions/38222011/open-window-and-run-function-on-that-window
    console.log("child Window Load: " + count);
    dataTable2 = jQuery("#dataTable-launch").raytable({
        datasource: {
            data: [],
            keyfield: 'date_launch'
        },
        columns: [{
                field: "date_launch",
                title: "Data"
            },
            {
                field: "description",
                title: "Descrição"
            },
            {
                field: "value",
                title: "Valor R$"
            }
        ],
        pagesize: count,
        maxPageButtons: 5,
        rowNumbers: false,

    });
    jQuery(".glyphicon").css('cursor', 'pointer');
    dataTable2.data(dataJson, 'date_launch');
}