//This code highlights a row in a SharePoint list based upon value of
//START DATE & END DATE column

function getFormattingBasedOnDate(startDate, endDate) {
    var result = '';
    var today = new Date();

    //Dates are converted because they are passed as strings and can't be used to check against 'today'
    var convertedStartDate = new Date(startDate);
    var convertedEndDate = new Date(endDate);

    if ((convertedStartDate < today) && (today < convertedEndDate)) {
        result = '#abd8b5'; //light green
    }
    else {
        result = '#ffffff'; //white
    }
    return result;
};

function HighlightRows(ctx) {
    var rows = ctx.ListData.Row;
    var startDate;
    var endDate;
    var rowId;
    var row;

    for (var i = 0; i < rows.length; i++) {
        startDate = rows[i]["START_x0020_DATE"];
        endDate = rows[i]["END_x0020_DATE"];
        rowId = GenerateIIDForListItem(ctx, rows[i]);
        row = document.getElementById(rowId);
        if (row != null) {
            row.style.backgroundColor = getFormattingBasedOnDate(startDate, endDate);
        }
        ctx.skipNextAnimation = true; //This line ensures that changes are present after sorting and/or filtering
    }
};
(function () {
    var overrideCurrentContext = {};
    overrideCurrentContext.Templates = {};
    overrideCurrentContext.OnPostRender = HighlightRows;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCurrentContext);
})();
