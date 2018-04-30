//This code highlights a row in a SharePoint list based upon the value of
//END DATE column

function getFormattingBasedOnDate(date) {
    var result = '';
    var today = new Date();
    var thirtyDaysOut = new Date().setDate(today.getDate() + 30);
    var fifteenDaysOut = new Date().setDate(today.getDate() + 15);
    var convertedDate = new Date(date);

    if (convertedDate < fifteenDaysOut) {
        result = '#dcabab'; //red
    }
    if (convertedDate < thirtyDaysOut) {
        result = '#f3f35f'; //yellow
    }
    else {
        result = '#ffffff'; //white
    }
    return result;
};

function HighlightRows(ctx) {
    var rows = ctx.List.Row;
    var date;
    var rowId;
    var row;

    for (var i = 0; i < rows.length; i++) {
        date = rows[i]["END_x0020_DATE"];
        rowId = GenerateIIDForListItem(ctx, rows[i]);
        row = document.getElementById(rowId);
        if (row != null) {
            row.style.backgroundColor = getFormattingBasedOnDate(date);
        }
        ctx.skipNextAnimation = true; //This line ensures that formatting will still be present after sort and/or filtering
    }
};

(function () {
    var overrideCurrentContext = {};
    overrideCurrentContext.Templates = {};
    overrideCurrentContext.OnPostRender = HighlightRows;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCurrentContext);
})();


