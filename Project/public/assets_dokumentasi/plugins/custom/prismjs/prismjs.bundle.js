var _self =
        "undefined" != typeof window
            ? window
            : "undefined" != typeof WorkerGlobalScope &&
              self instanceof WorkerGlobalScope
            ? self
            : {},
    Prism = (function (e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i,
            a = 0,
            n = {},
            s = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler:
                    e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(t) {
                        return t instanceof r
                            ? new r(t.type, e(t.content), t.alias)
                            : Array.isArray(t)
                            ? t.map(e)
                            : t
                                  .replace(/&/g, "&amp;")
                                  .replace(/</g, "&lt;")
                                  .replace(/\u00a0/g, " ");
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1);
                    },
                    objId: function (e) {
                        return (
                            e.__id ||
                                Object.defineProperty(e, "__id", {
                                    value: ++a,
                                }),
                            e.__id
                        );
                    },
                    clone: function e(t, a) {
                        var n, r;
                        switch (((a = a || {}), s.util.type(t))) {
                            case "Object":
                                if (((r = s.util.objId(t)), a[r])) return a[r];
                                for (var i in ((n = {}), (a[r] = n), t))
                                    t.hasOwnProperty(i) && (n[i] = e(t[i], a));
                                return n;
                            case "Array":
                                return (
                                    (r = s.util.objId(t)),
                                    a[r]
                                        ? a[r]
                                        : ((n = []),
                                          (a[r] = n),
                                          t.forEach(function (t, s) {
                                              n[s] = e(t, a);
                                          }),
                                          n)
                                );
                            default:
                                return t;
                        }
                    },
                    getLanguage: function (e) {
                        for (; e && !t.test(e.className); ) e = e.parentElement;
                        return e
                            ? (e.className.match(t) || [
                                  ,
                                  "none",
                              ])[1].toLowerCase()
                            : "none";
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document)
                            return document.currentScript;
                        try {
                            throw new Error();
                        } catch (n) {
                            var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(
                                n.stack
                            ) || [])[1];
                            if (e) {
                                var t = document.getElementsByTagName("script");
                                for (var a in t) if (t[a].src == e) return t[a];
                            }
                            return null;
                        }
                    },
                    isActive: function (e, t, a) {
                        for (var n = "no-" + t; e; ) {
                            var s = e.classList;
                            if (s.contains(t)) return !0;
                            if (s.contains(n)) return !1;
                            e = e.parentElement;
                        }
                        return !!a;
                    },
                },
                languages: {
                    plain: n,
                    plaintext: n,
                    text: n,
                    txt: n,
                    extend: function (e, t) {
                        var a = s.util.clone(s.languages[e]);
                        for (var n in t) a[n] = t[n];
                        return a;
                    },
                    insertBefore: function (e, t, a, n) {
                        var r = (n = n || s.languages)[e],
                            i = {};
                        for (var o in r)
                            if (r.hasOwnProperty(o)) {
                                if (o == t)
                                    for (var l in a)
                                        a.hasOwnProperty(l) && (i[l] = a[l]);
                                a.hasOwnProperty(o) || (i[o] = r[o]);
                            }
                        var u = n[e];
                        return (
                            (n[e] = i),
                            s.languages.DFS(s.languages, function (t, a) {
                                a === u && t != e && (this[t] = i);
                            }),
                            i
                        );
                    },
                    DFS: function e(t, a, n, r) {
                        r = r || {};
                        var i = s.util.objId;
                        for (var o in t)
                            if (t.hasOwnProperty(o)) {
                                a.call(t, o, t[o], n || o);
                                var l = t[o],
                                    u = s.util.type(l);
                                "Object" !== u || r[i(l)]
                                    ? "Array" !== u ||
                                      r[i(l)] ||
                                      ((r[i(l)] = !0), e(l, a, o, r))
                                    : ((r[i(l)] = !0), e(l, a, null, r));
                            }
                    },
                },
                plugins: {},
                highlightAll: function (e, t) {
                    s.highlightAllUnder(document, e, t);
                },
                highlightAllUnder: function (e, t, a) {
                    var n = {
                        callback: a,
                        container: e,
                        selector:
                            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                    };
                    s.hooks.run("before-highlightall", n),
                        (n.elements = Array.prototype.slice.apply(
                            n.container.querySelectorAll(n.selector)
                        )),
                        s.hooks.run("before-all-elements-highlight", n);
                    for (var r, i = 0; (r = n.elements[i++]); )
                        s.highlightElement(r, !0 === t, n.callback);
                },
                highlightElement: function (a, n, r) {
                    var i = s.util.getLanguage(a),
                        o = s.languages[i];
                    a.className =
                        a.className.replace(t, "").replace(/\s+/g, " ") +
                        " language-" +
                        i;
                    var l = a.parentElement;
                    l &&
                        "pre" === l.nodeName.toLowerCase() &&
                        (l.className =
                            l.className.replace(t, "").replace(/\s+/g, " ") +
                            " language-" +
                            i);
                    var u = {
                        element: a,
                        language: i,
                        grammar: o,
                        code: a.textContent,
                    };
                    function c(e) {
                        (u.highlightedCode = e),
                            s.hooks.run("before-insert", u),
                            (u.element.innerHTML = u.highlightedCode),
                            s.hooks.run("after-highlight", u),
                            s.hooks.run("complete", u),
                            r && r.call(u.element);
                    }
                    if (
                        (s.hooks.run("before-sanity-check", u),
                        (l = u.element.parentElement) &&
                            "pre" === l.nodeName.toLowerCase() &&
                            !l.hasAttribute("tabindex") &&
                            l.setAttribute("tabindex", "0"),
                        !u.code)
                    )
                        return (
                            s.hooks.run("complete", u),
                            void (r && r.call(u.element))
                        );
                    if ((s.hooks.run("before-highlight", u), u.grammar))
                        if (n && e.Worker) {
                            var d = new Worker(s.filename);
                            (d.onmessage = function (e) {
                                c(e.data);
                            }),
                                d.postMessage(
                                    JSON.stringify({
                                        language: u.language,
                                        code: u.code,
                                        immediateClose: !0,
                                    })
                                );
                        } else c(s.highlight(u.code, u.grammar, u.language));
                    else c(s.util.encode(u.code));
                },
                highlight: function (e, t, a) {
                    var n = { code: e, grammar: t, language: a };
                    return (
                        s.hooks.run("before-tokenize", n),
                        (n.tokens = s.tokenize(n.code, n.grammar)),
                        s.hooks.run("after-tokenize", n),
                        r.stringify(s.util.encode(n.tokens), n.language)
                    );
                },
                tokenize: function (e, t) {
                    var a = t.rest;
                    if (a) {
                        for (var n in a) t[n] = a[n];
                        delete t.rest;
                    }
                    var s = new l();
                    return (
                        u(s, s.head, e),
                        o(e, s, t, s.head, 0),
                        (function (e) {
                            var t = [],
                                a = e.head.next;
                            for (; a !== e.tail; )
                                t.push(a.value), (a = a.next);
                            return t;
                        })(s)
                    );
                },
                hooks: {
                    all: {},
                    add: function (e, t) {
                        var a = s.hooks.all;
                        (a[e] = a[e] || []), a[e].push(t);
                    },
                    run: function (e, t) {
                        var a = s.hooks.all[e];
                        if (a && a.length)
                            for (var n, r = 0; (n = a[r++]); ) n(t);
                    },
                },
                Token: r,
            };
        function r(e, t, a, n) {
            (this.type = e),
                (this.content = t),
                (this.alias = a),
                (this.length = 0 | (n || "").length);
        }
        function i(e, t, a, n) {
            e.lastIndex = t;
            var s = e.exec(a);
            if (s && n && s[1]) {
                var r = s[1].length;
                (s.index += r), (s[0] = s[0].slice(r));
            }
            return s;
        }
        function o(e, t, a, n, l, d) {
            for (var p in a)
                if (a.hasOwnProperty(p) && a[p]) {
                    var g = a[p];
                    g = Array.isArray(g) ? g : [g];
                    for (var m = 0; m < g.length; ++m) {
                        if (d && d.cause == p + "," + m) return;
                        var f = g[m],
                            h = f.inside,
                            b = !!f.lookbehind,
                            y = !!f.greedy,
                            k = f.alias;
                        if (y && !f.pattern.global) {
                            var v = f.pattern.toString().match(/[imsuy]*$/)[0];
                            f.pattern = RegExp(f.pattern.source, v + "g");
                        }
                        for (
                            var w = f.pattern || f, F = n.next, S = l;
                            F !== t.tail && !(d && S >= d.reach);
                            S += F.value.length, F = F.next
                        ) {
                            var A = F.value;
                            if (t.length > e.length) return;
                            if (!(A instanceof r)) {
                                var P,
                                    x = 1;
                                if (y) {
                                    if (!(P = i(w, S, e, b))) break;
                                    var _ = P.index,
                                        E = P.index + P[0].length,
                                        $ = S;
                                    for ($ += F.value.length; _ >= $; )
                                        $ += (F = F.next).value.length;
                                    if (
                                        ((S = $ -= F.value.length),
                                        F.value instanceof r)
                                    )
                                        continue;
                                    for (
                                        var T = F;
                                        T !== t.tail &&
                                        ($ < E || "string" == typeof T.value);
                                        T = T.next
                                    )
                                        x++, ($ += T.value.length);
                                    x--, (A = e.slice(S, $)), (P.index -= S);
                                } else if (!(P = i(w, 0, A, b))) continue;
                                _ = P.index;
                                var O = P[0],
                                    I = A.slice(0, _),
                                    N = A.slice(_ + O.length),
                                    z = S + A.length;
                                d && z > d.reach && (d.reach = z);
                                var D = F.prev;
                                if (
                                    (I && ((D = u(t, D, I)), (S += I.length)),
                                    c(t, D, x),
                                    (F = u(
                                        t,
                                        D,
                                        new r(p, h ? s.tokenize(O, h) : O, k, O)
                                    )),
                                    N && u(t, F, N),
                                    x > 1)
                                ) {
                                    var C = { cause: p + "," + m, reach: z };
                                    o(e, t, a, F.prev, S, C),
                                        d &&
                                            C.reach > d.reach &&
                                            (d.reach = C.reach);
                                }
                            }
                        }
                    }
                }
        }
        function l() {
            var e = { value: null, prev: null, next: null },
                t = { value: null, prev: e, next: null };
            (e.next = t), (this.head = e), (this.tail = t), (this.length = 0);
        }
        function u(e, t, a) {
            var n = t.next,
                s = { value: a, prev: t, next: n };
            return (t.next = s), (n.prev = s), e.length++, s;
        }
        function c(e, t, a) {
            for (var n = t.next, s = 0; s < a && n !== e.tail; s++) n = n.next;
            (t.next = n), (n.prev = t), (e.length -= s);
        }
        if (
            ((e.Prism = s),
            (r.stringify = function e(t, a) {
                if ("string" == typeof t) return t;
                if (Array.isArray(t)) {
                    var n = "";
                    return (
                        t.forEach(function (t) {
                            n += e(t, a);
                        }),
                        n
                    );
                }
                var r = {
                        type: t.type,
                        content: e(t.content, a),
                        tag: "span",
                        classes: ["token", t.type],
                        attributes: {},
                        language: a,
                    },
                    i = t.alias;
                i &&
                    (Array.isArray(i)
                        ? Array.prototype.push.apply(r.classes, i)
                        : r.classes.push(i)),
                    s.hooks.run("wrap", r);
                var o = "";
                for (var l in r.attributes)
                    o +=
                        " " +
                        l +
                        '="' +
                        (r.attributes[l] || "").replace(/"/g, "&quot;") +
                        '"';
                return (
                    "<" +
                    r.tag +
                    ' class="' +
                    r.classes.join(" ") +
                    '"' +
                    o +
                    ">" +
                    r.content +
                    "</" +
                    r.tag +
                    ">"
                );
            }),
            !e.document)
        )
            return e.addEventListener
                ? (s.disableWorkerMessageHandler ||
                      e.addEventListener(
                          "message",
                          function (t) {
                              var a = JSON.parse(t.data),
                                  n = a.language,
                                  r = a.code,
                                  i = a.immediateClose;
                              e.postMessage(s.highlight(r, s.languages[n], n)),
                                  i && e.close();
                          },
                          !1
                      ),
                  s)
                : s;
        var d = s.util.currentScript();
        function p() {
            s.manual || s.highlightAll();
        }
        if (
            (d &&
                ((s.filename = d.src),
                d.hasAttribute("data-manual") && (s.manual = !0)),
            !s.manual)
        ) {
            var g = document.readyState;
            "loading" === g || ("interactive" === g && d && d.defer)
                ? document.addEventListener("DOMContentLoaded", p)
                : window.requestAnimationFrame
                ? window.requestAnimationFrame(p)
                : window.setTimeout(p, 16);
        }
        return s;
    })(_self);
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */ "undefined" != typeof module && module.exports && (module.exports = Prism),
    "undefined" != typeof global && (global.Prism = Prism),
    (Prism.languages.markup = {
        comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
        prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
        doctype: {
            pattern:
                /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null,
                },
                string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/i,
                name: /[^\s<>'"]+/,
            },
        },
        cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
        tag: {
            pattern:
                /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
                },
                "special-attr": [],
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [
                            { pattern: /^=/, alias: "attr-equals" },
                            /"|'/,
                        ],
                    },
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: { namespace: /^[^\s>\/:]+:/ },
                },
            },
        },
        entity: [
            { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
            /&#x?[\da-f]{1,8};/i,
        ],
    }),
    (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
        Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside["internal-subset"].inside =
        Prism.languages.markup),
    Prism.hooks.add("wrap", function (e) {
        "entity" === e.type &&
            (e.attributes.title = e.content.replace(/&amp;/, "&"));
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (e, t) {
            var a = {};
            (a["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t],
            }),
                (a.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var n = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: a,
                },
            };
            n["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t],
            };
            var s = {};
            (s[e] = {
                pattern: RegExp(
                    /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                        /__/g,
                        function () {
                            return e;
                        }
                    ),
                    "i"
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
            }),
                Prism.languages.insertBefore("markup", "cdata", s);
        },
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function (e, t) {
            Prism.languages.markup.tag.inside["special-attr"].push({
                pattern: RegExp(
                    /(^|["'\s])/.source +
                        "(?:" +
                        e +
                        ")" +
                        /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
                    "i"
                ),
                lookbehind: !0,
                inside: {
                    "attr-name": /^[^\s=]+/,
                    "attr-value": {
                        pattern: /=[\s\S]+/,
                        inside: {
                            value: {
                                pattern:
                                    /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                lookbehind: !0,
                                alias: [t, "language-" + t],
                                inside: Prism.languages[t],
                            },
                            punctuation: [
                                { pattern: /^=/, alias: "attr-equals" },
                                /"|'/,
                            ],
                        },
                    },
                },
            });
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend("markup", {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml),
    (function (e) {
        var t =
            /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern:
                            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector",
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0,
                    },
                },
            },
            url: {
                pattern: RegExp(
                    "\\burl\\((?:" +
                        t.source +
                        "|" +
                        /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                        ")\\)",
                    "i"
                ),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url",
                    },
                },
            },
            selector: {
                pattern: RegExp(
                    "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
                        t.source +
                        ")*(?=\\s*\\{)"
                ),
                lookbehind: !0,
            },
            string: { pattern: t, greedy: !0 },
            property: {
                pattern:
                    /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0,
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0,
            },
            punctuation: /[(){};:,]/,
        }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
        var a = e.languages.markup;
        a &&
            (a.tag.addInlined("style", "css"),
            a.tag.addAttribute("style", "css"));
    })(Prism),
    (Prism.languages.clike = {
        comment: [
            {
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: !0,
                greedy: !0,
            },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
        ],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
        },
        "class-name": {
            pattern:
                /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
        },
        keyword:
            /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\b\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/,
    }),
    (Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [
            Prism.languages.clike["class-name"],
            {
                pattern:
                    /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
                lookbehind: !0,
            },
        ],
        keyword: [
            { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
            {
                pattern:
                    /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                lookbehind: !0,
            },
        ],
        function:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        operator:
            /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
    })),
    (Prism.languages.javascript["class-name"][0].pattern =
        /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern:
                /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex,
                },
                "regex-delimiter": /^\/|\/$/,
                "regex-flags": /^[a-z]+$/,
            },
        },
        "function-variable": {
            pattern:
                /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function",
        },
        parameter: [
            {
                pattern:
                    /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore("javascript", "string", {
        hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
        "template-string": {
            pattern:
                /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": { pattern: /^`|`$/, alias: "string" },
                interpolation: {
                    pattern:
                        /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation",
                        },
                        rest: Prism.languages.javascript,
                    },
                },
                string: /[\s\S]+/,
            },
        },
    }),
    Prism.languages.markup &&
        (Prism.languages.markup.tag.addInlined("script", "javascript"),
        Prism.languages.markup.tag.addAttribute(
            /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
                .source,
            "javascript"
        )),
    (Prism.languages.js = Prism.languages.javascript),
    (function () {
        if (void 0 !== Prism && "undefined" != typeof document) {
            Element.prototype.matches ||
                (Element.prototype.matches =
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector);
            var e = {
                    js: "javascript",
                    py: "python",
                    rb: "ruby",
                    ps1: "powershell",
                    psm1: "powershell",
                    sh: "bash",
                    bat: "batch",
                    h: "c",
                    tex: "latex",
                },
                t = "data-src-status",
                a = "loading",
                n = "loaded",
                s =
                    'pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])',
                r = /\blang(?:uage)?-([\w-]+)\b/i;
            Prism.hooks.add("before-highlightall", function (e) {
                e.selector += ", " + s;
            }),
                Prism.hooks.add("before-sanity-check", function (r) {
                    var i = r.element;
                    if (i.matches(s)) {
                        (r.code = ""), i.setAttribute(t, a);
                        var l = i.appendChild(document.createElement("CODE"));
                        l.textContent = "Loading…";
                        var u = i.getAttribute("data-src"),
                            c = r.language;
                        if ("none" === c) {
                            var d = (/\.(\w+)$/.exec(u) || [, "none"])[1];
                            c = e[d] || d;
                        }
                        o(l, c), o(i, c);
                        var p = Prism.plugins.autoloader;
                        p && p.loadLanguages(c);
                        var g = new XMLHttpRequest();
                        g.open("GET", u, !0),
                            (g.onreadystatechange = function () {
                                var e, a;
                                4 == g.readyState &&
                                    (g.status < 400 && g.responseText
                                        ? (i.setAttribute(t, n),
                                          (l.textContent = g.responseText),
                                          Prism.highlightElement(l))
                                        : (i.setAttribute(t, "failed"),
                                          g.status >= 400
                                              ? (l.textContent =
                                                    ((e = g.status),
                                                    (a = g.statusText),
                                                    "✖ Error " +
                                                        e +
                                                        " while fetching file: " +
                                                        a))
                                              : (l.textContent =
                                                    "✖ Error: File does not exist or is empty")));
                            }),
                            g.send(null);
                    }
                }),
                (Prism.plugins.fileHighlight = {
                    highlight: function (e) {
                        for (
                            var t,
                                a = (e || document).querySelectorAll(s),
                                n = 0;
                            (t = a[n++]);

                        )
                            Prism.highlightElement(t);
                    },
                });
            var i = !1;
            Prism.fileHighlight = function () {
                i ||
                    (console.warn(
                        "Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."
                    ),
                    (i = !0)),
                    Prism.plugins.fileHighlight.highlight.apply(
                        this,
                        arguments
                    );
            };
        }
        function o(e, t) {
            var a = e.className;
            (a = a.replace(r, " ") + " language-" + t),
                (e.className = a.replace(/\s+/g, " ").trim());
        }
    })(),
    (Prism.languages.markup = {
        comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
        prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
        doctype: {
            pattern:
                /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null,
                },
                string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/i,
                name: /[^\s<>'"]+/,
            },
        },
        cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
        tag: {
            pattern:
                /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
                },
                "special-attr": [],
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [
                            { pattern: /^=/, alias: "attr-equals" },
                            /"|'/,
                        ],
                    },
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: { namespace: /^[^\s>\/:]+:/ },
                },
            },
        },
        entity: [
            { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
            /&#x?[\da-f]{1,8};/i,
        ],
    }),
    (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
        Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside["internal-subset"].inside =
        Prism.languages.markup),
    Prism.hooks.add("wrap", function (e) {
        "entity" === e.type &&
            (e.attributes.title = e.content.replace(/&amp;/, "&"));
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (e, t) {
            var a = {};
            (a["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t],
            }),
                (a.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var n = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: a,
                },
            };
            n["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t],
            };
            var s = {};
            (s[e] = {
                pattern: RegExp(
                    /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                        /__/g,
                        function () {
                            return e;
                        }
                    ),
                    "i"
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
            }),
                Prism.languages.insertBefore("markup", "cdata", s);
        },
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function (e, t) {
            Prism.languages.markup.tag.inside["special-attr"].push({
                pattern: RegExp(
                    /(^|["'\s])/.source +
                        "(?:" +
                        e +
                        ")" +
                        /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
                    "i"
                ),
                lookbehind: !0,
                inside: {
                    "attr-name": /^[^\s=]+/,
                    "attr-value": {
                        pattern: /=[\s\S]+/,
                        inside: {
                            value: {
                                pattern:
                                    /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                lookbehind: !0,
                                alias: [t, "language-" + t],
                                inside: Prism.languages[t],
                            },
                            punctuation: [
                                { pattern: /^=/, alias: "attr-equals" },
                                /"|'/,
                            ],
                        },
                    },
                },
            });
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend("markup", {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml),
    (function (e) {
        function t(e, t) {
            return "___" + e.toUpperCase() + t + "___";
        }
        Object.defineProperties((e.languages["markup-templating"] = {}), {
            buildPlaceholders: {
                value: function (a, n, s, r) {
                    if (a.language === n) {
                        var i = (a.tokenStack = []);
                        (a.code = a.code.replace(s, function (e) {
                            if ("function" == typeof r && !r(e)) return e;
                            for (
                                var s, o = i.length;
                                -1 !== a.code.indexOf((s = t(n, o)));

                            )
                                ++o;
                            return (i[o] = e), s;
                        })),
                            (a.grammar = e.languages.markup);
                    }
                },
            },
            tokenizePlaceholders: {
                value: function (a, n) {
                    if (a.language === n && a.tokenStack) {
                        a.grammar = e.languages[n];
                        var s = 0,
                            r = Object.keys(a.tokenStack);
                        !(function i(o) {
                            for (
                                var l = 0;
                                l < o.length && !(s >= r.length);
                                l++
                            ) {
                                var u = o[l];
                                if (
                                    "string" == typeof u ||
                                    (u.content && "string" == typeof u.content)
                                ) {
                                    var c = r[s],
                                        d = a.tokenStack[c],
                                        p =
                                            "string" == typeof u
                                                ? u
                                                : u.content,
                                        g = t(n, c),
                                        m = p.indexOf(g);
                                    if (m > -1) {
                                        ++s;
                                        var f = p.substring(0, m),
                                            h = new e.Token(
                                                n,
                                                e.tokenize(d, a.grammar),
                                                "language-" + n,
                                                d
                                            ),
                                            b = p.substring(m + g.length),
                                            y = [];
                                        f && y.push.apply(y, i([f])),
                                            y.push(h),
                                            b && y.push.apply(y, i([b])),
                                            "string" == typeof u
                                                ? o.splice.apply(
                                                      o,
                                                      [l, 1].concat(y)
                                                  )
                                                : (u.content = y);
                                    }
                                } else u.content && i(u.content);
                            }
                            return o;
                        })(a.tokens);
                    }
                },
            },
        });
    })(Prism),
    (function (e) {
        var t =
                "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
            a = {
                pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
                lookbehind: !0,
                alias: "punctuation",
                inside: null,
            },
            n = {
                bash: a,
                environment: { pattern: RegExp("\\$" + t), alias: "constant" },
                variable: [
                    {
                        pattern: /\$?\(\([\s\S]+?\)\)/,
                        greedy: !0,
                        inside: {
                            variable: [
                                {
                                    pattern: /(^\$\(\([\s\S]+)\)\)/,
                                    lookbehind: !0,
                                },
                                /^\$\(\(/,
                            ],
                            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                            operator:
                                /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
                            punctuation: /\(\(?|\)\)?|,|;/,
                        },
                    },
                    {
                        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                        greedy: !0,
                        inside: { variable: /^\$\(|^`|\)$|`$/ },
                    },
                    {
                        pattern: /\$\{[^}]+\}/,
                        greedy: !0,
                        inside: {
                            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                            punctuation: /[\[\]]/,
                            environment: {
                                pattern: RegExp("(\\{)" + t),
                                lookbehind: !0,
                                alias: "constant",
                            },
                        },
                    },
                    /\$(?:\w+|[#?*!@$])/,
                ],
                entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
            };
        (e.languages.bash = {
            shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
            comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
            "function-name": [
                {
                    pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
                    lookbehind: !0,
                    alias: "function",
                },
                { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
            ],
            "for-or-select": {
                pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
                alias: "variable",
                lookbehind: !0,
            },
            "assign-left": {
                pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
                inside: {
                    environment: {
                        pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
                        lookbehind: !0,
                        alias: "constant",
                    },
                },
                alias: "variable",
                lookbehind: !0,
            },
            string: [
                {
                    pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: n,
                },
                {
                    pattern:
                        /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: { bash: a },
                },
                {
                    pattern:
                        /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: n,
                },
                { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
                {
                    pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
                    greedy: !0,
                    inside: { entity: n.entity },
                },
            ],
            environment: { pattern: RegExp("\\$?" + t), alias: "constant" },
            variable: n.variable,
            function: {
                pattern:
                    /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
                lookbehind: !0,
            },
            keyword: {
                pattern:
                    /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
                lookbehind: !0,
            },
            builtin: {
                pattern:
                    /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
                lookbehind: !0,
                alias: "class-name",
            },
            boolean: {
                pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
                lookbehind: !0,
            },
            "file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
            operator: {
                pattern:
                    /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
                inside: {
                    "file-descriptor": { pattern: /^\d/, alias: "important" },
                },
            },
            punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
            number: {
                pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
                lookbehind: !0,
            },
        }),
            (a.inside = e.languages.bash);
        for (
            var s = [
                    "comment",
                    "function-name",
                    "for-or-select",
                    "assign-left",
                    "string",
                    "environment",
                    "function",
                    "keyword",
                    "builtin",
                    "boolean",
                    "file-descriptor",
                    "operator",
                    "punctuation",
                    "number",
                ],
                r = n.variable[1].inside,
                i = 0;
            i < s.length;
            i++
        )
            r[s[i]] = e.languages.bash[s[i]];
        e.languages.shell = e.languages.bash;
    })(Prism),
    (Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [
            Prism.languages.clike["class-name"],
            {
                pattern:
                    /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
                lookbehind: !0,
            },
        ],
        keyword: [
            { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
            {
                pattern:
                    /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                lookbehind: !0,
            },
        ],
        function:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        operator:
            /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
    })),
    (Prism.languages.javascript["class-name"][0].pattern =
        /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern:
                /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex,
                },
                "regex-delimiter": /^\/|\/$/,
                "regex-flags": /^[a-z]+$/,
            },
        },
        "function-variable": {
            pattern:
                /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function",
        },
        parameter: [
            {
                pattern:
                    /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore("javascript", "string", {
        hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
        "template-string": {
            pattern:
                /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": { pattern: /^`|`$/, alias: "string" },
                interpolation: {
                    pattern:
                        /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation",
                        },
                        rest: Prism.languages.javascript,
                    },
                },
                string: /[\s\S]+/,
            },
        },
    }),
    Prism.languages.markup &&
        (Prism.languages.markup.tag.addInlined("script", "javascript"),
        Prism.languages.markup.tag.addAttribute(
            /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
                .source,
            "javascript"
        )),
    (Prism.languages.js = Prism.languages.javascript),
    (Prism.languages.scss = Prism.languages.extend("css", {
        comment: {
            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
            lookbehind: !0,
        },
        atrule: {
            pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
            inside: { rule: /@[\w-]+/ },
        },
        url: /(?:[-a-z]+-)?url(?=\()/i,
        selector: {
            pattern:
                /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/m,
            inside: {
                parent: { pattern: /&/, alias: "important" },
                placeholder: /%[-\w]+/,
                variable: /\$[-\w]+|#\{\$[-\w]+\}/,
            },
        },
        property: {
            pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
            inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
        },
    })),
    Prism.languages.insertBefore("scss", "atrule", {
        keyword: [
            /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
            { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
        ],
    }),
    Prism.languages.insertBefore("scss", "important", {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    }),
    Prism.languages.insertBefore("scss", "function", {
        "module-modifier": {
            pattern: /\b(?:as|with|show|hide)\b/i,
            alias: "keyword",
        },
        placeholder: { pattern: /%[-\w]+/, alias: "selector" },
        statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
        boolean: /\b(?:true|false)\b/,
        null: { pattern: /\bnull\b/, alias: "keyword" },
        operator: {
            pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
            lookbehind: !0,
        },
    }),
    (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss),
    (function (e) {
        var t =
            /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern:
                            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector",
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0,
                    },
                },
            },
            url: {
                pattern: RegExp(
                    "\\burl\\((?:" +
                        t.source +
                        "|" +
                        /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                        ")\\)",
                    "i"
                ),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url",
                    },
                },
            },
            selector: {
                pattern: RegExp(
                    "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
                        t.source +
                        ")*(?=\\s*\\{)"
                ),
                lookbehind: !0,
            },
            string: { pattern: t, greedy: !0 },
            property: {
                pattern:
                    /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0,
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0,
            },
            punctuation: /[(){};:,]/,
        }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
        var a = e.languages.markup;
        a &&
            (a.tag.addInlined("style", "css"),
            a.tag.addAttribute("style", "css"));
    })(Prism),
    (function (e) {
        var t = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
            a = [
                { pattern: /\b(?:false|true)\b/i, alias: "boolean" },
                {
                    pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
                    greedy: !0,
                    lookbehind: !0,
                },
                /\b(?:null)\b/i,
                /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
            ],
            n =
                /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
            s =
                /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
            r = /[{}\[\](),:;]/;
        e.languages.php = {
            delimiter: {
                pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
                alias: "important",
            },
            comment: t,
            variable: /\$+(?:\w+\b|(?=\{))/i,
            package: {
                pattern:
                    /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            "class-name-definition": {
                pattern:
                    /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
                lookbehind: !0,
                alias: "class-name",
            },
            "function-definition": {
                pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
                lookbehind: !0,
                alias: "function",
            },
            keyword: [
                {
                    pattern:
                        /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
                    alias: "type-casting",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern:
                        /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
                    alias: "type-hint",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern: /([(,?]\s*[\w|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
                    alias: "type-hint",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern:
                        /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
                    alias: "return-type",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern: /(\)\s*:\s*(?:\?\s*)?[\w|]\|\s*)(?:null|false)\b/i,
                    alias: "return-type",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern:
                        /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
                    alias: "type-declaration",
                    greedy: !0,
                },
                {
                    pattern: /(\|\s*)(?:null|false)\b/i,
                    alias: "type-declaration",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern: /\b(?:parent|self|static)(?=\s*::)/i,
                    alias: "static-context",
                    greedy: !0,
                },
                { pattern: /(\byield\s+)from\b/i, lookbehind: !0 },
                /\bclass\b/i,
                {
                    pattern:
                        /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
                    lookbehind: !0,
                },
            ],
            "argument-name": {
                pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i,
                lookbehind: !0,
            },
            "class-name": [
                {
                    pattern:
                        /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
                    greedy: !0,
                    lookbehind: !0,
                },
                { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
                {
                    pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
                    alias: "class-name-fully-qualified",
                    greedy: !0,
                    lookbehind: !0,
                    inside: { punctuation: /\\/ },
                },
                {
                    pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
                    alias: "class-name-fully-qualified",
                    greedy: !0,
                    inside: { punctuation: /\\/ },
                },
                {
                    pattern:
                        /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                    alias: "class-name-fully-qualified",
                    greedy: !0,
                    lookbehind: !0,
                    inside: { punctuation: /\\/ },
                },
                {
                    pattern: /\b[a-z_]\w*(?=\s*\$)/i,
                    alias: "type-declaration",
                    greedy: !0,
                },
                {
                    pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                    alias: ["class-name-fully-qualified", "type-declaration"],
                    greedy: !0,
                    inside: { punctuation: /\\/ },
                },
                {
                    pattern: /\b[a-z_]\w*(?=\s*::)/i,
                    alias: "static-context",
                    greedy: !0,
                },
                {
                    pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
                    alias: ["class-name-fully-qualified", "static-context"],
                    greedy: !0,
                    inside: { punctuation: /\\/ },
                },
                {
                    pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
                    alias: "type-hint",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                    alias: ["class-name-fully-qualified", "type-hint"],
                    greedy: !0,
                    lookbehind: !0,
                    inside: { punctuation: /\\/ },
                },
                {
                    pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
                    alias: "return-type",
                    greedy: !0,
                    lookbehind: !0,
                },
                {
                    pattern:
                        /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                    alias: ["class-name-fully-qualified", "return-type"],
                    greedy: !0,
                    lookbehind: !0,
                    inside: { punctuation: /\\/ },
                },
            ],
            constant: a,
            function: {
                pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            property: { pattern: /(->\s*)\w+/, lookbehind: !0 },
            number: n,
            operator: s,
            punctuation: r,
        };
        var i = {
                pattern:
                    /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
                lookbehind: !0,
                inside: e.languages.php,
            },
            o = [
                {
                    pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
                    alias: "nowdoc-string",
                    greedy: !0,
                    inside: {
                        delimiter: {
                            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                            alias: "symbol",
                            inside: { punctuation: /^<<<'?|[';]$/ },
                        },
                    },
                },
                {
                    pattern:
                        /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
                    alias: "heredoc-string",
                    greedy: !0,
                    inside: {
                        delimiter: {
                            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                            alias: "symbol",
                            inside: { punctuation: /^<<<"?|[";]$/ },
                        },
                        interpolation: i,
                    },
                },
                {
                    pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                    alias: "backtick-quoted-string",
                    greedy: !0,
                },
                {
                    pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                    alias: "single-quoted-string",
                    greedy: !0,
                },
                {
                    pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                    alias: "double-quoted-string",
                    greedy: !0,
                    inside: { interpolation: i },
                },
            ];
        e.languages.insertBefore("php", "variable", {
            string: o,
            attribute: {
                pattern:
                    /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
                greedy: !0,
                inside: {
                    "attribute-content": {
                        pattern: /^(#\[)[\s\S]+(?=\]$)/,
                        lookbehind: !0,
                        inside: {
                            comment: t,
                            string: o,
                            "attribute-class-name": [
                                {
                                    pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                                    alias: "class-name",
                                    greedy: !0,
                                    lookbehind: !0,
                                },
                                {
                                    pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                                    alias: [
                                        "class-name",
                                        "class-name-fully-qualified",
                                    ],
                                    greedy: !0,
                                    lookbehind: !0,
                                    inside: { punctuation: /\\/ },
                                },
                            ],
                            constant: a,
                            number: n,
                            operator: s,
                            punctuation: r,
                        },
                    },
                    delimiter: { pattern: /^#\[|\]$/, alias: "punctuation" },
                },
            },
        }),
            e.hooks.add("before-tokenize", function (t) {
                if (/<\?/.test(t.code)) {
                    e.languages["markup-templating"].buildPlaceholders(
                        t,
                        "php",
                        /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi
                    );
                }
            }),
            e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(t, "php");
            });
    })(Prism),
    Prism.languages.insertBefore("php", "variable", {
        this: /\$this\b/,
        global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
        scope: {
            pattern: /\b[\w\\]+::/,
            inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
        },
    }),
    (function () {
        if (void 0 !== Prism) {
            var e =
                Object.assign ||
                function (e, t) {
                    for (var a in t) t.hasOwnProperty(a) && (e[a] = t[a]);
                    return e;
                };
            (t.prototype = {
                setDefaults: function (t) {
                    this.defaults = e(this.defaults, t);
                },
                normalize: function (t, a) {
                    for (var n in (a = e(this.defaults, a))) {
                        var s = n.replace(/-(\w)/g, function (e, t) {
                            return t.toUpperCase();
                        });
                        "normalize" !== n &&
                            "setDefaults" !== s &&
                            a[n] &&
                            this[s] &&
                            (t = this[s].call(this, t, a[n]));
                    }
                    return t;
                },
                leftTrim: function (e) {
                    return e.replace(/^\s+/, "");
                },
                rightTrim: function (e) {
                    return e.replace(/\s+$/, "");
                },
                tabsToSpaces: function (e, t) {
                    return (
                        (t = 0 | t || 4),
                        e.replace(/\t/g, new Array(++t).join(" "))
                    );
                },
                spacesToTabs: function (e, t) {
                    return (
                        (t = 0 | t || 4),
                        e.replace(RegExp(" {" + t + "}", "g"), "\t")
                    );
                },
                removeTrailing: function (e) {
                    return e.replace(/\s*?$/gm, "");
                },
                removeInitialLineFeed: function (e) {
                    return e.replace(/^(?:\r?\n|\r)/, "");
                },
                removeIndent: function (e) {
                    var t = e.match(/^[^\S\n\r]*(?=\S)/gm);
                    return t && t[0].length
                        ? (t.sort(function (e, t) {
                              return e.length - t.length;
                          }),
                          t[0].length
                              ? e.replace(RegExp("^" + t[0], "gm"), "")
                              : e)
                        : e;
                },
                indent: function (e, t) {
                    return e.replace(
                        /^[^\S\n\r]*(?=\S)/gm,
                        new Array(++t).join("\t") + "$&"
                    );
                },
                breakLines: function (e, t) {
                    t = !0 === t ? 80 : 0 | t || 80;
                    for (var n = e.split("\n"), s = 0; s < n.length; ++s)
                        if (!(a(n[s]) <= t)) {
                            for (
                                var r = n[s].split(/(\s+)/g), i = 0, o = 0;
                                o < r.length;
                                ++o
                            ) {
                                var l = a(r[o]);
                                (i += l) > t && ((r[o] = "\n" + r[o]), (i = l));
                            }
                            n[s] = r.join("");
                        }
                    return n.join("\n");
                },
            }),
                "undefined" != typeof module &&
                    module.exports &&
                    (module.exports = t),
                (Prism.plugins.NormalizeWhitespace = new t({
                    "remove-trailing": !0,
                    "remove-indent": !0,
                    "left-trim": !0,
                    "right-trim": !0,
                })),
                Prism.hooks.add("before-sanity-check", function (e) {
                    var t = Prism.plugins.NormalizeWhitespace;
                    if (
                        (!e.settings ||
                            !1 !== e.settings["whitespace-normalization"]) &&
                        Prism.util.isActive(
                            e.element,
                            "whitespace-normalization",
                            !0
                        )
                    )
                        if ((e.element && e.element.parentNode) || !e.code) {
                            var a = e.element.parentNode;
                            if (
                                e.code &&
                                a &&
                                "pre" === a.nodeName.toLowerCase()
                            ) {
                                for (
                                    var n = a.childNodes,
                                        s = "",
                                        r = "",
                                        i = !1,
                                        o = 0;
                                    o < n.length;
                                    ++o
                                ) {
                                    var l = n[o];
                                    l == e.element
                                        ? (i = !0)
                                        : "#text" === l.nodeName &&
                                          (i
                                              ? (r += l.nodeValue)
                                              : (s += l.nodeValue),
                                          a.removeChild(l),
                                          --o);
                                }
                                if (
                                    e.element.children.length &&
                                    Prism.plugins.KeepMarkup
                                ) {
                                    var u = s + e.element.innerHTML + r;
                                    (e.element.innerHTML = t.normalize(
                                        u,
                                        e.settings
                                    )),
                                        (e.code = e.element.textContent);
                                } else
                                    (e.code = s + e.code + r),
                                        (e.code = t.normalize(
                                            e.code,
                                            e.settings
                                        ));
                            }
                        } else e.code = t.normalize(e.code, e.settings);
                });
        }
        function t(t) {
            this.defaults = e({}, t);
        }
        function a(e) {
            for (var t = 0, a = 0; a < e.length; ++a)
                e.charCodeAt(a) == "\t".charCodeAt(0) && (t += 3);
            return e.length + t;
        }
    })(),
    Prism.plugins.NormalizeWhitespace.setDefaults({
        "remove-trailing": !0,
        "remove-indent": !0,
        "left-trim": !0,
        "right-trim": !0,
    });
