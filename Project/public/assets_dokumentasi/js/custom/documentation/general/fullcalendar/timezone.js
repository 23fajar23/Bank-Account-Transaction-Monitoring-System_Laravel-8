"use strict";
var KTGeneralFullCalendarTimezoneDemos = {
    init: function () {
        !(function () {
            var e = document.getElementById(
                    "kt_docs_fullcalendar_timezone_selector"
                ),
                t = document.getElementById("kt_docs_fullcalendar_timezone"),
                i = moment().startOf("day"),
                n = i.format("YYYY-MM"),
                r = i.clone().subtract(1, "day").format("YYYY-MM-DD"),
                o = i.format("YYYY-MM-DD"),
                a = i.clone().add(1, "day").format("YYYY-MM-DD"),
                s = [
                    {
                        title: "All Day Event",
                        start: n + "-01",
                        description:
                            "Toto lorem ipsum dolor sit incid idunt ut",
                        className: "fc-event-danger fc-event-solid-warning",
                    },
                    {
                        title: "Reporting",
                        start: n + "-14T13:30:00",
                        description: "Lorem ipsum dolor incid idunt ut labore",
                        end: n + "-14",
                        className: "fc-event-success",
                    },
                    {
                        title: "Company Trip",
                        start: n + "-02",
                        description: "Lorem ipsum dolor sit tempor incid",
                        end: n + "-03",
                        className: "fc-event-primary",
                    },
                    {
                        title: "ICT Expo 2017 - Product Release",
                        start: n + "-03",
                        description: "Lorem ipsum dolor sit tempor inci",
                        end: n + "-05",
                        className: "fc-event-light fc-event-solid-primary",
                    },
                    {
                        title: "Dinner",
                        start: n + "-12",
                        description: "Lorem ipsum dolor sit amet, conse ctetur",
                        end: n + "-10",
                    },
                    {
                        id: 999,
                        title: "Repeating Event",
                        start: n + "-09T16:00:00",
                        description:
                            "Lorem ipsum dolor sit ncididunt ut labore",
                        className: "fc-event-danger",
                    },
                    {
                        id: 1e3,
                        title: "Repeating Event",
                        description: "Lorem ipsum dolor sit amet, labore",
                        start: n + "-16T16:00:00",
                    },
                    {
                        title: "Conference",
                        start: r,
                        end: a,
                        description: "Lorem ipsum dolor eius mod tempor labore",
                        className: "fc-event-primary",
                    },
                    {
                        title: "Meeting",
                        start: o + "T10:30:00",
                        end: o + "T12:30:00",
                        description: "Lorem ipsum dolor eiu idunt ut labore",
                    },
                    {
                        title: "Lunch",
                        start: o + "T12:00:00",
                        className: "fc-event-info",
                        description: "Lorem ipsum dolor sit amet, ut labore",
                    },
                    {
                        title: "Meeting",
                        start: o + "T14:30:00",
                        className: "fc-event-warning",
                        description: "Lorem ipsum conse ctetur adipi scing",
                    },
                    {
                        title: "Happy Hour",
                        start: o + "T17:30:00",
                        className: "fc-event-info",
                        description: "Lorem ipsum dolor sit amet, conse ctetur",
                    },
                    {
                        title: "Dinner",
                        start: a + "T05:00:00",
                        className: "fc-event-solid-danger fc-event-light",
                        description: "Lorem ipsum dolor sit ctetur adipi scing",
                    },
                    {
                        title: "Birthday Party",
                        start: a + "T07:00:00",
                        className: "fc-event-primary",
                        description: "Lorem ipsum dolor sit amet, scing",
                    },
                    {
                        title: "Click for Google",
                        url: "http://google.com/",
                        start: n + "-28",
                        className: "fc-event-solid-info fc-event-light",
                        description: "Lorem ipsum dolor sit amet, labore",
                    },
                ],
                l = new FullCalendar.Calendar(t, {
                    timeZone: "local",
                    headerToolbar: {
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    },
                    initialDate: o,
                    navLinks: !0,
                    editable: !0,
                    selectable: !0,
                    dayMaxEvents: !0,
                    eventTimeFormat: {
                        hour: "numeric",
                        minute: "2-digit",
                        timeZoneName: "short",
                    },
                    events: s,
                });
            l.render(),
                $(e).on("change", function () {
                    l.setOption("timeZone", "UTC"),
                        l.getEvents().forEach((e) => {
                            e.remove();
                        }),
                        s.forEach((e) => {
                            var t, i;
                            this.value < 0
                                ? ((t = moment(e.start)
                                      .subtract(
                                          this.value.replace(/\D/g, ""),
                                          "seconds"
                                      )
                                      .format(d(e.start))),
                                  (i = e.end
                                      ? moment(e.end)
                                            .subtract(
                                                this.value.replace(/\D/g, ""),
                                                "seconds"
                                            )
                                            .format(d(e.end))
                                      : t))
                                : ((t = moment(e.start)
                                      .add(this.value, "seconds")
                                      .format(d(e.start))),
                                  (i = e.end
                                      ? moment(e.end)
                                            .add(this.value, "seconds")
                                            .format(d(e.end))
                                      : t)),
                                l.addEvent({
                                    title: e.title,
                                    start: t,
                                    end: i,
                                });
                        }),
                        l.render();
                });
            const d = (e) =>
                e.includes("T") ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD";
        })();
    },
};
KTUtil.onDOMContentLoaded(function () {
    KTGeneralFullCalendarTimezoneDemos.init();
});