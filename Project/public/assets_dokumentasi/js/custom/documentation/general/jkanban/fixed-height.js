"use strict";
var KTJKanbanDemoFixedHeight = (function () {
    var t, s;
    const e = (t) => {
        s.querySelectorAll(".kanban-drag").forEach((t) => {
            const s = t.querySelector(".gu-transit");
            if (!s) return;
            const e = t.getBoundingClientRect(),
                a = s.offsetHeight,
                l = document
                    .querySelector(".gu-mirror")
                    .getBoundingClientRect(),
                n = l.top - e.top,
                o = e.bottom - l.bottom;
            n <= a
                ? t.scroll({ top: t.scrollTop - 3 })
                : o <= a
                ? t.scroll({ top: t.scrollTop + 3 })
                : t.scroll({ top: t.scrollTop });
        });
    };
    return {
        init: function () {
            (t = "#kt_docs_jkanban_fixed_height"),
                (s = document.querySelector(t)),
                (function () {
                    const a = s.getAttribute("data-kt-jkanban-height");
                    new jKanban({
                        element: t,
                        gutter: "0",
                        widthBoard: "250px",
                        boards: [
                            {
                                id: "_fixed_height",
                                title: "Fixed Height",
                                class: "primary",
                                item: [
                                    {
                                        title: '<span class="fw-bold">Item 1</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 2</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 3</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 4</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 5</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 6</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 7</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 8</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 9</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 10</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 11</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 12</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 13</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 14</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 15</span>',
                                    },
                                ],
                            },
                            {
                                id: "_fixed_height2",
                                title: "Fixed Height 2",
                                class: "success",
                                item: [
                                    {
                                        title: '<span class="fw-bold">Item 1</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 2</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 3</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 4</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 5</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 6</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 7</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 8</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 9</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 10</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 11</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 12</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 13</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 14</span>',
                                    },
                                    {
                                        title: '<span class="fw-bold">Item 15</span>',
                                    },
                                ],
                            },
                        ],
                        dragEl: function (t, s) {
                            document.addEventListener("mousemove", e);
                        },
                        dragendEl: function (t) {
                            document.removeEventListener("mousemove", e);
                        },
                    }),
                        s.querySelectorAll(".kanban-drag").forEach((t) => {
                            t.style.maxHeight = a + "px";
                        });
                })();
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTJKanbanDemoFixedHeight.init();
});
