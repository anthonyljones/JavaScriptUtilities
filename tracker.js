var Tracker;
(function (Tracker) {
    "use strict";
    //Tracker application is used to allow users to enter data into a SharePoint list.
    //Functionality includes abilityy to add notes, edit the form and email a list of users.

    //Globals
    Tracker.maxClassificationForEmail = 'TestClassification';
    Tracker.maxClassificationForEmailColor = '#DD0000';

    function openNotesForm(itemID) {
        
        var options = {
            url: 'https://myserver.com/EditOpenForm.aspx?ID=' + itemID + '&source=http://mysever.com/default.aspx',
            title: 'Add Notes',
            showClose: true,
            dialogReturnValueCallback: dialogReturned
        }
        SP.UI.ModalDialog.showModalDialog(options);
    };
    Tracker.openNotesForm = openNotesForm;

    function dialogReturned(dialogResult, returnValue) {
        if (dialogResult === SP.UI.DialogResult.OK) {

            //Refresh the window WITHOUT reposting the data
            window.location = window.location.href;
        }
        else {
            window.close;
        }
    };
    function openEditForm(editItemID) {
        var openEditFormOptions = {
            url: 'http://myserver.com/EditOpenTravelForm.aspx?ID=' + editItemID + '&source=http://myserver.com/default.aspx',
            title: 'Edit Messages',
            showClose: true,
            dialogReturnValueCallback: openEditFormDialogReturned
        }
        SP.UI.ModalDialog.showModalDialog(openEditFormOptions);
    };
    Tracker.openEditForm = openEditForm;

    function openEditFormDialogReturned(dialogResult, returnValue) {
        if (dialogResult === SP.UI.DialogResult.OK) {
            window.location = window.location.href;
        }
        else {
            window.close;
        }
    };
    function submitRequest() {
        var options = {
            url: 'http://myserver.com/SubmitNewRequest.aspx',
            title: 'Submit Request',
            showClose: true,
            dialogReturnValueCallback: submitRequestReturned
        }
        SP.UI.ModalDialog.showModalDialog(options);
    };
    Tracker.submitRequest = submitRequest;

    function submitRequestReturned(dialogResult, returnValue) {
        if (dialogResult === SP.UI.DialogResult.OK) {
            window.location = window.location.href;
        }
        else {
            window.close;
        }
    };
    function openOwnerNewForm() {
        var openOwnerNewFormOptions = {
            url: 'http://myserver.com/OwnersNewSubmitForm.aspx',
            title: 'Submit Request',
            showClose: true,
            dialogReturnValueCallback: openOwnerNewFormDialogReturned
        }
        SP.UI.ModalDialog.showModalDialog(openOwnerNewFormOptions);
    };
    Tracker.openOwnerNewForm = openOwnerNewForm;

    function openOwnerNewFormDialogReturned(dialogResult, returnValue) {
        if (dialogResult === SP.UI.DialogResult.OK) {
            window.location = window.location.href;
        }
        else {
            window.close;
        }
    };

    //Email the contents of an HTML div tag
    //Must have MailSystem.js loaded into the same page
    //Function needs to versatile enough to allow it to be called in various scenarios
    //Function will be invoked with a button placed on the web page
    //Need to be able to email only the person who pushed the button
    //Need to be able to send test emails to a specific group
    //Need to be able to specify the category as this button will be used on multiple pages

    function sendDivAsEmail(divId, selfEmailOnly, isTest, category) {
        var mail = new MailSystem.Mail();
        var localUserEmail = '';
        var mailBody;

        mail.addFromAddress('noreply@myserver.com');

        if ((typeof window._spPageContextInfo !== 'undefined') && (_spPageContextInfo.systemUserKey.indexOf('@') > -1) && (_spPageContextInfo.systemUserKey.indexOf('|') > -1)) {
            localUserEmail = _spPageContextInfo.systemUserKey.substring(_spPageContextInfo.systemUserKey.lastIndexOf('|') + 1)
            mail.addCcAddress(localUserEmail, localUserEmail);
        }
        mail.bodyClassification = Tracker.maxClassificationForEmail;
        mailBody = '<div style="font-size:larger;">**Best Viewed in HTML**<br></div>';
        mailBody += '<div style="font-size:larger;">Target Spreadsheet Released Below<br></div>';
        mailBody += $('#' + divId).html();

        mail.shouldEmbedImages = false;

        if (category === 'Travel') {
            mail.subject = 'Automated Email - Travel Spreadsheet';
        }
        else if (category === 'Final') {
            mail.subject = 'Automated Email - Final Spreadsheet';
        }
        else {
            mail.subject = 'Automated Email - Generic Spreadsheet';
        }

        if (isTest) {
            mail.subject = 'Test Email Ignore/Delete';
            mail.addToAddress('test.user@myserver.com', 'Test User');
            mail.addCcAddress('anthony@myserver.com', 'Anthony');
        }
        else {
            mail.addToAddress('user1@myserver.com', 'User 1');
            mail.addToAddress('user2@server2.com', 'User 2');
            mail.addToAddress('test1@myserver.com', 'Test User');
        }
        if (selfEmailOnly) {
            mail.userTo = null;
            mail.userCc = null;
            mail.addCcAddress(localUserEmail, localUserEmail);

            mail.send(Tracker.sentSelfEmailNotice);
        }
        else {
            mail.send(Tracker.sentEmailNotice);
        }
    };
    Tracker.sendDivAsEmail = sendDivAsEmail;

    //The sendDivAsEmail function can be called from different buttons on the page
    //Each button will have a different element name
    
    function sentEmailNotice() {
        alert("Email has been sent.");
        $('#emailbutton').text('Sent');
    };
    Tracker.sentEmailNotice = sentEmailNotice;

    function sentSelfEmailNotice() {
        alsert("Email has been sent.");
        $('#selfemailbutton').text('Sent');
    };
    Tracker.sentEmailNotice = sentSelfEmailNotice;
    

})(Tracker || (Tracker = {}));
