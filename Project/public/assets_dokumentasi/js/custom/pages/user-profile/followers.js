"use strict";
var KTProfileFollowers = (function () {
    var t = document.getElementById("kt_followers_show_more_button"),
        e = document.getElementById("kt_followers_show_more_cards");
    return {
        init: function () {
            t.addEventListener("click", function (o) {
                t.setAttribute("data-kt-indicator", "on"),
                    (t.disabled = !0),
                    setTimeout(function () {
                        t.removeAttribute("data-kt-indicator"),
                            (t.disabled = !1),
                            t.classList.add("d-none"),
                            e.classList.remove("d-none"),
                            KTUtil.scrollTo(e, 200);
                    }, 2e3);
            });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTProfileFollowers.init();
});
