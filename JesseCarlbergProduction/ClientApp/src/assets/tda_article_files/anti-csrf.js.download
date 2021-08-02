/*
AntiCSRF Implementation Alpha

this implementation will handle all click and submit events
causing to the form
*/
$("form")
    .submit(function (e) {
        var $antiCSRFInput = $("#__antiCSRF");

        if ($antiCSRFInput.val() === "") {
            $.ajax({
                url: "/q4api/v3/anticsrf",
                type: "GET",
                async: false,
                success: function (token) {
                    if (token) {
                        $("#__antiCSRF").val(token);
                        if (typeof (WebForm_OnSubmit) === "function")
                            return WebForm_OnSubmit();
                        return true;
                    }
                    else return false;
                },
                error: function () {
                    return false;
                }
            });
        }
        else {
            if (typeof (WebForm_OnSubmit) === "function")
                return WebForm_OnSubmit();
            return true;
        }
    });

/*
AntiCSRF Implementation Beta

this implementation is for <a href="javascript: __doPostBack .... ></a>
our AntiCSRF Implementation Alpha does not work in this case
*/

if (typeof (__doPostBack) === "function") {
    var _originalDoPostBack = __doPostBack;

    __doPostBack = function (eventTarget, eventArgument) {
        var $antiCSRFInput = $("#__antiCSRF");
        var loadingAttrName = "anti-csrf-loading";
        var loadingAttrValue = "yes";
        var loading = $antiCSRFInput.attr(loadingAttrName) === loadingAttrValue;
        if (!loading) { // need to check in case of multiple clicks
            $antiCSRFInput.attr(loadingAttrName, loadingAttrValue);
            $.ajax({
                url: "/q4api/v3/anticsrf",
                type: "GET",
                async: false,
                success: function (token) {
                    if (token) {
                        $antiCSRFInput.val(token);
                        _originalDoPostBack(eventTarget, eventArgument);
                    }
                },
                complete: function () {
                    $antiCSRFInput.removeAttr(loadingAttrName);
                }
            });
        }
    };
}
