"use strict";
var KTLayoutBuilder = (function () {
    var t = document.querySelector("#kt_layout_builder_form"),
        e = document.querySelector("#kt_layout_builder_action"),
        r = document.querySelector("#kt_layout_builder_tab"),
        a = t.getAttribute("action"),
        o = document.querySelector("#kt_layout_builder_preview"),
        i = document.querySelector("#kt_layout_builder_export"),
        n = document.querySelector("#kt_layout_builder_reset");
    return {
        init: function () {
            o.addEventListener("click", function (r) {
                r.preventDefault(),
                    (e.value = "preview"),
                    o.setAttribute("data-kt-indicator", "on");
                var i = $(t).serialize();
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: a,
                    data: i,
                    success: function (t, e, r) {
                        toastr.success(
                            "Preview has been updated with current configured layout.",
                            "Preview updated!",
                            {
                                timeOut: 0,
                                extendedTimeOut: 0,
                                closeButton: !0,
                                closeDuration: 0,
                            }
                        ),
                            setTimeout(function () {
                                location.reload();
                            }, 1500);
                    },
                    error: function (t) {
                        toastr.error(
                            "Please try it again later.",
                            "Something went wrong!",
                            {
                                timeOut: 0,
                                extendedTimeOut: 0,
                                closeButton: !0,
                                closeDuration: 0,
                            }
                        );
                    },
                    complete: function () {
                        o.removeAttribute("data-kt-indicator");
                    },
                });
            }),
                i.addEventListener("click", function (r) {
                    r.preventDefault(),
                        toastr.success(
                            "Process has been started and it may take a while.",
                            "Generating HTML!",
                            {
                                timeOut: 0,
                                extendedTimeOut: 0,
                                closeButton: !0,
                                closeDuration: 0,
                            }
                        ),
                        i.setAttribute("data-kt-indicator", "on"),
                        (e.value = "export");
                    var o = $(t).serialize();
                    $.ajax({
                        type: "POST",
                        dataType: "html",
                        url: a,
                        data: o,
                        success: function (t, e, r) {
                            var o = setInterval(function () {
                                $("<iframe/>")
                                    .attr({
                                        src:
                                            a +
                                            "?layout-builder[action]=export&download=1&output=" +
                                            t,
                                        style: "visibility:hidden;display:none",
                                    })
                                    .ready(function () {
                                        clearInterval(o),
                                            i.removeAttribute(
                                                "data-kt-indicator"
                                            );
                                    })
                                    .appendTo("body");
                            }, 3e3);
                        },
                        error: function (t) {
                            toastr.error(
                                "Please try it again later.",
                                "Something went wrong!",
                                {
                                    timeOut: 0,
                                    extendedTimeOut: 0,
                                    closeButton: !0,
                                    closeDuration: 0,
                                }
                            ),
                                i.removeAttribute("data-kt-indicator");
                        },
                    });
                }),
                n.addEventListener("click", function (r) {
                    r.preventDefault(),
                        n.setAttribute("data-kt-indicator", "on"),
                        (e.value = "reset");
                    var o = $(t).serialize();
                    $.ajax({
                        type: "POST",
                        dataType: "html",
                        url: a,
                        data: o,
                        success: function (t, e, r) {
                            toastr.success(
                                "Preview has been successfully reset and the page will be reloaded.",
                                "Reset Preview!",
                                {
                                    timeOut: 0,
                                    extendedTimeOut: 0,
                                    closeButton: !0,
                                    closeDuration: 0,
                                }
                            ),
                                setTimeout(function () {
                                    location.reload();
                                }, 1500);
                        },
                        error: function (t) {
                            toastr.error(
                                "Please try it again later.",
                                "Something went wrong!",
                                {
                                    timeOut: 0,
                                    extendedTimeOut: 0,
                                    closeButton: !0,
                                    closeDuration: 0,
                                }
                            );
                        },
                        complete: function () {
                            n.removeAttribute("data-kt-indicator");
                        },
                    });
                }),
                [].slice
                    .call(
                        document.querySelectorAll(
                            '#kt_layout_builder_tabs a[data-bs-toggle="tab"]'
                        )
                    )
                    .forEach(function (t) {
                        t.addEventListener("shown.bs.tab", function (e) {
                            r.value = t.getAttribute("href").substring(1);
                        });
                    });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTLayoutBuilder.init();
});