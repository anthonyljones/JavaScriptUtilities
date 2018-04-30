// This code highlights a row in a SharePoint list column based upon value of
// Status2 column

function getFormattingBasedOnStatus(status) {
    var result = '';

    switch (status) {
        case 'AWAITING REQUEST':
            result = '#FFE7A2'; //pale yellow
            break;
        default:
            result = '#AFB5BD'; //grey
            break;
    }
    return result;
};

function HighlightRows(ctx) {
    var rows = ctx.ListData.Row;
    var status = '';
    var rowId;
    var row;

    for (var i = 0; i < rows.length; i++) {
        status = rows[i]["Status2"][0].lookupValue;
        rowId = GenerateIIDForListItem(ctx, rows[i]);
        row = document.getElementById(rowId);
        if (row != null) {
            row.style.backgroundColor = getFormattingBasedOnStatus(status);
        }
        ctx.skipNextAnimation = true;
    }
};

(function () {
    var overrideCurrentContext = {};
    overrideCurrentContext.Templates = {};
    overrideCurrentContext.OnPostRender = HighlightRows;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCurrentContext);
})();
