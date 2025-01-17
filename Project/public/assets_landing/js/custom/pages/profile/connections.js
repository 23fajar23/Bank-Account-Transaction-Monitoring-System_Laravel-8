"use strict";
var KTProfileConnections = (function () {
    var t = document.getElementById("kt_connections_show_more_button"),
        n = document.getElementById("kt_connections_show_more_cards");
    return {
        init: function () {
            t.addEventListener("click", function (e) {
                t.setAttribute("data-kt-indicator", "on"),
                    (t.disabled = !0),
                    setTimeout(function () {
                        t.removeAttribute("data-kt-indicator"),
                            (t.disabled = !1),
                            t.classList.add("d-none"),
                            n.classList.remove("d-none"),
                            KTUtil.scrollTo(n, 200);
                    }, 2e3);
            });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTProfileConnections.init();
});
