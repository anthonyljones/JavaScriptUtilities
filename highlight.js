(function () {
    var overrideCurrentContext = {};
    overrideCurrentContext.Templates = {};
    overrideCurrentContext.OnPostRender = HighlightProductRows;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCurrentContext);
})();


function HighlightProductRows(ctx) {
    var statusColors = {
        'Long way to target !': '#FFF1AD',
        'Reaching Target': '#FFD800',
        'On Target': '#01DF3A'
    };

    var rows = ctx.ListData.Row;
    for (var i = 0; i < rows.length; i++) {
        var status = rows[i]["Status"];
        var date = rows[i]["End_x0020_Date"];
        var rowId = GenerateIIDForListItem(ctx, rows[i]);
        var row = document.getElementById(rowId);
        row.style.backgroundColor = getFormattingBasedOnDate(date);
    }
}
function getFormattingBasedOnDate(date) {
    var result = '';
    var today = new Date();
    var thirtyDaysOut = new Date().setDate(today.getDate() + 30);
    var fifteenDaysOut = new Date().setDate(today.getDate() + 15);
    var convertedDate = new Date(date);

    if (convertedDate < fifteenDaysOut) {
        result = '#E50000'; //red
    }
    else if (convertedDate < thirtyDaysOut) {
        result = '#ffff00'; //yellow
    }
    else {
        result = '#ffffff'; //white
    }
    return result;
}
