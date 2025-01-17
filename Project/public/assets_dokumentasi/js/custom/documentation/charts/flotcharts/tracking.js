"use strict";
var KTFlotDemoTracking = {
    init: function () {
        !(function () {
            for (var a = [], t = [], i = 0; i < 14; i += 0.1)
                a.push([i, Math.sin(i)]), t.push([i, Math.cos(i)]);
            var e = $.plot(
                    $("#kt_docs_flot_tracking"),
                    [
                        {
                            data: a,
                            label: "sin(x) = -0.00",
                            lines: { lineWidth: 1 },
                            shadowSize: 0,
                        },
                        {
                            data: t,
                            label: "cos(x) = -0.00",
                            lines: { lineWidth: 1 },
                            shadowSize: 0,
                        },
                    ],
                    {
                        colors: [
                            KTUtil.getCssVariableValue("--bs-active-primary"),
                            KTUtil.getCssVariableValue("--bs-active-warning"),
                        ],
                        series: { lines: { show: !0 } },
                        crosshair: { mode: "x" },
                        grid: {
                            hoverable: !0,
                            autoHighlight: !1,
                            tickColor:
                                KTUtil.getCssVariableValue("--bs-light-dark"),
                            borderColor:
                                KTUtil.getCssVariableValue("--bs-light-dark"),
                            borderWidth: 1,
                        },
                        yaxis: { min: -1.2, max: 1.2 },
                    }
                ),
                l = $("#kt_docs_flot_tracking .legendLabel");
            l.each(function () {
                $(this).css("width", $(this).width());
            });
            var s = null,
                o = null;
            function n() {
                s = null;
                var a = o,
                    t = e.getAxes();
                if (
                    !(
                        a.x < t.xaxis.min ||
                        a.x > t.xaxis.max ||
                        a.y < t.yaxis.min ||
                        a.y > t.yaxis.max
                    )
                ) {
                    var i,
                        n,
                        r = e.getData();
                    for (i = 0; i < r.length; ++i) {
                        var d = r[i];
                        for (
                            n = 0;
                            n < d.data.length && !(d.data[n][0] > a.x);
                            ++n
                        );
                        var c,
                            h = d.data[n - 1],
                            g = d.data[n];
                        (c =
                            null == h
                                ? g[1]
                                : null == g
                                ? h[1]
                                : h[1] +
                                  ((g[1] - h[1]) * (a.x - h[0])) /
                                      (g[0] - h[0])),
                            l
                                .eq(i)
                                .text(
                                    d.label.replace(/=.*/, "= " + c.toFixed(2))
                                );
                    }
                }
            }
            $("#kt_docs_flot_tracking").bind("plothover", function (a, t, i) {
                (o = t), s || (s = setTimeout(n, 50));
            });
        })();
    },
};
KTUtil.onDOMContentLoaded(function () {
    KTFlotDemoTracking.init();
});
