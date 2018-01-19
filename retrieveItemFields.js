//Takes a list name "Objectives" and an ID of "2"
//And Returns desired fields
//Consider using var itemId=GetUrlKeyValue("ID", false, location.href);

var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Objectives')/items(2)";

var itemID = "";
var title = "";
var details = "";


$.ajax({
    url: url,
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" },
    async: false,
    success: function (data) {
        if (data.d) {
            itemID = data.d.Id;
            title = data.d.Title;
            details = data.d.Details;
        }
    },
    error: function (data) {
        alert("Error: " + data);
    }
});
console.log(itemID);
console.log(title);
console.log(details);