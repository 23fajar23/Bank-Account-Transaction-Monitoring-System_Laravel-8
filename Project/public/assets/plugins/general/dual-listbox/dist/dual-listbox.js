!(function (t, e) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var i = e();
        for (var s in i) ("object" == typeof exports ? exports : t)[s] = i[s];
    }
})(this, function () {
    return (function (t) {
        function e(s) {
            if (i[s]) return i[s].exports;
            var n = (i[s] = { exports: {}, id: s, loaded: !1 });
            return (
                t[s].call(n.exports, n, n.exports, e),
                (n.loaded = !0),
                n.exports
            );
        }
        var i = {};
        return (e.m = t), (e.c = i), (e.p = ""), e(0);
    })([
        function (t, e) {
            "use strict";
            function i(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e, "__esModule", { value: !0 });
            var s =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                        ? function (t) {
                              return typeof t;
                          }
                        : function (t) {
                              return t &&
                                  "function" == typeof Symbol &&
                                  t.constructor === Symbol &&
                                  t !== Symbol.prototype
                                  ? "symbol"
                                  : typeof t;
                          },
                n = (function () {
                    function t(t, e) {
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i];
                            (s.enumerable = s.enumerable || !1),
                                (s.configurable = !0),
                                "value" in s && (s.writable = !0),
                                Object.defineProperty(t, s.key, s);
                        }
                    }
                    return function (e, i, s) {
                        return i && t(e.prototype, i), s && t(e, s), e;
                    };
                })(),
                a = "dual-listbox",
                l = "dual-listbox__container",
                o = "dual-listbox__available",
                d = "dual-listbox__selected",
                u = "dual-listbox__title",
                c = "dual-listbox__item",
                r = "dual-listbox__buttons",
                h = "dual-listbox__button",
                v = "dual-listbox__search",
                f = "dual-listbox__item--selected",
                b = (function () {
                    function t(e) {
                        var s =
                            arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : {};
                        i(this, t),
                            this.setDefaults(),
                            (this.selected = []),
                            (this.available = []),
                            t.isDomElement(e)
                                ? (this.select = e)
                                : (this.select = document.querySelector(e)),
                            this._initOptions(s),
                            this._initReusableElements(),
                            this._splitOptions(this.select.options),
                            void 0 !== s.options &&
                                this._splitOptions(s.options),
                            this._buildDualListbox(this.select.parentNode),
                            this._addActions(),
                            this.redraw();
                    }
                    return (
                        n(
                            t,
                            [
                                {
                                    key: "setDefaults",
                                    value: function () {
                                        (this.addEvent = null),
                                            (this.removeEvent = null),
                                            (this.availableTitle =
                                                "Available options"),
                                            (this.selectedTitle =
                                                "Selected options"),
                                            (this.addButtonText = "add"),
                                            (this.removeButtonText = "remove"),
                                            (this.addAllButtonText = "add all"),
                                            (this.removeAllButtonText =
                                                "remove all"),
                                            (this.searchPlaceholder = "Search");
                                    },
                                },
                                {
                                    key: "addEventListener",
                                    value: function (t, e) {
                                        this.dualListbox.addEventListener(t, e);
                                    },
                                },
                                {
                                    key: "addSelected",
                                    value: function (t) {
                                        var e = this,
                                            i = this.available.indexOf(t);
                                        i > -1 &&
                                            (this.available.splice(i, 1),
                                            this.selected.push(t),
                                            this._selectOption(t.dataset.id),
                                            this.redraw(),
                                            setTimeout(function () {
                                                var i =
                                                    document.createEvent(
                                                        "HTMLEvents"
                                                    );
                                                i.initEvent("added", !1, !0),
                                                    (i.addedElement = t),
                                                    e.dualListbox.dispatchEvent(
                                                        i
                                                    );
                                            }, 0));
                                    },
                                },
                                {
                                    key: "redraw",
                                    value: function () {
                                        this.updateAvailableListbox(),
                                            this.updateSelectedListbox();
                                    },
                                },
                                {
                                    key: "removeSelected",
                                    value: function (t) {
                                        var e = this,
                                            i = this.selected.indexOf(t);
                                        i > -1 &&
                                            (this.selected.splice(i, 1),
                                            this.available.push(t),
                                            this._deselectOption(t.dataset.id),
                                            this.redraw(),
                                            setTimeout(function () {
                                                var i =
                                                    document.createEvent(
                                                        "HTMLEvents"
                                                    );
                                                i.initEvent("removed", !1, !0),
                                                    (i.removedElement = t),
                                                    e.dualListbox.dispatchEvent(
                                                        i
                                                    );
                                            }, 0));
                                    },
                                },
                                {
                                    key: "searchLists",
                                    value: function (t, e) {
                                        for (
                                            var i = e.querySelectorAll("." + c),
                                                s = t.toLowerCase(),
                                                n = 0;
                                            n < i.length;
                                            n++
                                        ) {
                                            var a = i[n];
                                            a.textContent
                                                .toLowerCase()
                                                .indexOf(s) === -1
                                                ? (a.style.display = "none")
                                                : (a.style.display =
                                                      "list-item");
                                        }
                                    },
                                },
                                {
                                    key: "updateAvailableListbox",
                                    value: function () {
                                        this._updateListbox(
                                            this.availableList,
                                            this.available
                                        );
                                    },
                                },
                                {
                                    key: "updateSelectedListbox",
                                    value: function () {
                                        this._updateListbox(
                                            this.selectedList,
                                            this.selected
                                        );
                                    },
                                },
                                {
                                    key: "_actionAllSelected",
                                    value: function (t) {
                                        var e = this;
                                        t.preventDefault(),
                                            this.available
                                                .filter(function (t) {
                                                    return (
                                                        "none" !==
                                                        t.style.display
                                                    );
                                                })
                                                .forEach(function (t) {
                                                    return e.addSelected(t);
                                                });
                                    },
                                },
                                {
                                    key: "_updateListbox",
                                    value: function (t, e) {
                                        for (; t.firstChild; )
                                            t.removeChild(t.firstChild);
                                        for (var i = 0; i < e.length; i++) {
                                            var s = e[i];
                                            t.appendChild(s);
                                        }
                                    },
                                },
                                {
                                    key: "_actionItemSelected",
                                    value: function (t) {
                                        t.preventDefault();
                                        var e = this.dualListbox.querySelector(
                                            "." + f
                                        );
                                        e && this.addSelected(e);
                                    },
                                },
                                {
                                    key: "_actionAllDeselected",
                                    value: function (t) {
                                        var e = this;
                                        t.preventDefault(),
                                            this.selected
                                                .filter(function (t) {
                                                    return (
                                                        "none" !==
                                                        t.style.display
                                                    );
                                                })
                                                .forEach(function (t) {
                                                    return e.removeSelected(t);
                                                });
                                    },
                                },
                                {
                                    key: "_actionItemDeselected",
                                    value: function (t) {
                                        t.preventDefault();
                                        var e = this.dualListbox.querySelector(
                                            "." + f
                                        );
                                        e && this.removeSelected(e);
                                    },
                                },
                                {
                                    key: "_actionItemDoubleClick",
                                    value: function (t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : null;
                                        e &&
                                            (e.preventDefault(),
                                            e.stopPropagation()),
                                            this.selected.indexOf(t) > -1
                                                ? this.removeSelected(t)
                                                : this.addSelected(t);
                                    },
                                },
                                {
                                    key: "_actionItemClick",
                                    value: function (t, e) {
                                        var i =
                                            arguments.length > 2 &&
                                            void 0 !== arguments[2]
                                                ? arguments[2]
                                                : null;
                                        i && i.preventDefault();
                                        for (
                                            var s = e.querySelectorAll("." + c),
                                                n = 0;
                                            n < s.length;
                                            n++
                                        ) {
                                            var a = s[n];
                                            a !== t && a.classList.remove(f);
                                        }
                                        t.classList.contains(f)
                                            ? t.classList.remove(f)
                                            : t.classList.add(f);
                                    },
                                },
                                {
                                    key: "_addActions",
                                    value: function () {
                                        this._addButtonActions(),
                                            this._addSearchActions();
                                    },
                                },
                                {
                                    key: "_addButtonActions",
                                    value: function () {
                                        var t = this;
                                        this.add_all_button.addEventListener(
                                            "click",
                                            function (e) {
                                                return t._actionAllSelected(e);
                                            }
                                        ),
                                            this.add_button.addEventListener(
                                                "click",
                                                function (e) {
                                                    return t._actionItemSelected(
                                                        e
                                                    );
                                                }
                                            ),
                                            this.remove_button.addEventListener(
                                                "click",
                                                function (e) {
                                                    return t._actionItemDeselected(
                                                        e
                                                    );
                                                }
                                            ),
                                            this.remove_all_button.addEventListener(
                                                "click",
                                                function (e) {
                                                    return t._actionAllDeselected(
                                                        e
                                                    );
                                                }
                                            );
                                    },
                                },
                                {
                                    key: "_addClickActions",
                                    value: function (t) {
                                        var e = this;
                                        return (
                                            t.addEventListener(
                                                "dblclick",
                                                function (i) {
                                                    return e._actionItemDoubleClick(
                                                        t,
                                                        i
                                                    );
                                                }
                                            ),
                                            t.addEventListener(
                                                "click",
                                                function (i) {
                                                    return e._actionItemClick(
                                                        t,
                                                        e.dualListbox,
                                                        i
                                                    );
                                                }
                                            ),
                                            t
                                        );
                                    },
                                },
                                {
                                    key: "_addSearchActions",
                                    value: function () {
                                        var t = this;
                                        this.search.addEventListener(
                                            "change",
                                            function (e) {
                                                return t.searchLists(
                                                    e.target.value,
                                                    t.dualListbox
                                                );
                                            }
                                        ),
                                            this.search.addEventListener(
                                                "keyup",
                                                function (e) {
                                                    return t.searchLists(
                                                        e.target.value,
                                                        t.dualListbox
                                                    );
                                                }
                                            );
                                    },
                                },
                                {
                                    key: "_buildDualListbox",
                                    value: function (t) {
                                        (this.select.style.display = "none"),
                                            this.dualListBoxContainer.appendChild(
                                                this._createList(
                                                    this.availableListTitle,
                                                    this.availableList
                                                )
                                            ),
                                            this.dualListBoxContainer.appendChild(
                                                this.buttons
                                            ),
                                            this.dualListBoxContainer.appendChild(
                                                this._createList(
                                                    this.selectedListTitle,
                                                    this.selectedList
                                                )
                                            ),
                                            this.dualListbox.appendChild(
                                                this.search
                                            ),
                                            this.dualListbox.appendChild(
                                                this.dualListBoxContainer
                                            ),
                                            t.insertBefore(
                                                this.dualListbox,
                                                this.select
                                            );
                                    },
                                },
                                {
                                    key: "_createList",
                                    value: function (t, e) {
                                        var i = document.createElement("div");
                                        return (
                                            i.appendChild(t),
                                            i.appendChild(e),
                                            i
                                        );
                                    },
                                },
                                {
                                    key: "_createButtons",
                                    value: function () {
                                        (this.buttons =
                                            document.createElement("div")),
                                            this.buttons.classList.add(r),
                                            (this.add_all_button =
                                                document.createElement(
                                                    "button"
                                                )),
                                            this.add_all_button.classList.add(
                                                h
                                            ),
                                            (this.add_all_button.innerHTML =
                                                this.addAllButtonText),
                                            (this.add_button =
                                                document.createElement(
                                                    "button"
                                                )),
                                            this.add_button.classList.add(h),
                                            (this.add_button.innerHTML =
                                                this.addButtonText),
                                            (this.remove_button =
                                                document.createElement(
                                                    "button"
                                                )),
                                            this.remove_button.classList.add(h),
                                            (this.remove_button.innerHTML =
                                                this.removeButtonText),
                                            (this.remove_all_button =
                                                document.createElement(
                                                    "button"
                                                )),
                                            this.remove_all_button.classList.add(
                                                h
                                            ),
                                            (this.remove_all_button.innerHTML =
                                                this.removeAllButtonText),
                                            this.buttons.appendChild(
                                                this.add_all_button
                                            ),
                                            this.buttons.appendChild(
                                                this.add_button
                                            ),
                                            this.buttons.appendChild(
                                                this.remove_button
                                            ),
                                            this.buttons.appendChild(
                                                this.remove_all_button
                                            );
                                    },
                                },
                                {
                                    key: "_createListItem",
                                    value: function (t) {
                                        var e = document.createElement("li");
                                        return (
                                            e.classList.add(c),
                                            (e.innerHTML = t.text),
                                            (e.dataset.id = t.value),
                                            this._addClickActions(e),
                                            e
                                        );
                                    },
                                },
                                {
                                    key: "_createSearch",
                                    value: function () {
                                        (this.search =
                                            document.createElement("input")),
                                            this.search.classList.add(v),
                                            (this.search.placeholder =
                                                this.searchPlaceholder);
                                    },
                                },
                                {
                                    key: "_deselectOption",
                                    value: function (t) {
                                        for (
                                            var e = this.select.options, i = 0;
                                            i < e.length;
                                            i++
                                        ) {
                                            var s = e[i];
                                            s.value === t && (s.selected = !1);
                                        }
                                        this.removeEvent && this.removeEvent(t);
                                    },
                                },
                                {
                                    key: "_initOptions",
                                    value: function (t) {
                                        for (var e in t)
                                            t.hasOwnProperty(e) &&
                                                (this[e] = t[e]);
                                    },
                                },
                                {
                                    key: "_initReusableElements",
                                    value: function () {
                                        (this.dualListbox =
                                            document.createElement("div")),
                                            this.dualListbox.classList.add(a),
                                            this.select.id &&
                                                this.dualListbox.classList.add(
                                                    this.select.id
                                                ),
                                            (this.dualListBoxContainer =
                                                document.createElement("div")),
                                            this.dualListBoxContainer.classList.add(
                                                l
                                            ),
                                            (this.availableList =
                                                document.createElement("ul")),
                                            this.availableList.classList.add(o),
                                            (this.selectedList =
                                                document.createElement("ul")),
                                            this.selectedList.classList.add(d),
                                            (this.availableListTitle =
                                                document.createElement("div")),
                                            this.availableListTitle.classList.add(
                                                u
                                            ),
                                            (this.availableListTitle.innerText =
                                                this.availableTitle),
                                            (this.selectedListTitle =
                                                document.createElement("div")),
                                            this.selectedListTitle.classList.add(
                                                u
                                            ),
                                            (this.selectedListTitle.innerText =
                                                this.selectedTitle),
                                            this._createButtons(),
                                            this._createSearch();
                                    },
                                },
                                {
                                    key: "_selectOption",
                                    value: function (t) {
                                        for (
                                            var e = this.select.options, i = 0;
                                            i < e.length;
                                            i++
                                        ) {
                                            var s = e[i];
                                            s.value === t && (s.selected = !0);
                                        }
                                        this.addEvent && this.addEvent(t);
                                    },
                                },
                                {
                                    key: "_splitOptions",
                                    value: function (e) {
                                        for (var i = 0; i < e.length; i++) {
                                            var s = e[i];
                                            t.isDomElement(s)
                                                ? this._addOption({
                                                      text: s.innerHTML,
                                                      value: s.value,
                                                      selected:
                                                          s.attributes.selected,
                                                  })
                                                : this._addOption(s);
                                        }
                                    },
                                },
                                {
                                    key: "_addOption",
                                    value: function (t) {
                                        var e = this._createListItem(t);
                                        t.selected
                                            ? this.selected.push(e)
                                            : this.available.push(e);
                                    },
                                },
                            ],
                            [
                                {
                                    key: "isDomElement",
                                    value: function (t) {
                                        return "object" ===
                                            ("undefined" == typeof HTMLElement
                                                ? "undefined"
                                                : s(HTMLElement))
                                            ? t instanceof HTMLElement
                                            : t &&
                                                  "object" ===
                                                      (void 0 === t
                                                          ? "undefined"
                                                          : s(t)) &&
                                                  null !== t &&
                                                  1 === t.nodeType &&
                                                  "string" == typeof t.nodeName;
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
            (e.default = b), (e.DualListbox = b);
        },
    ]);
});
