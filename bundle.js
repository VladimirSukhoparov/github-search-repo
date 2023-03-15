(() => {
    "use strict";
    let e = document.getElementById("container"),
        t = document.getElementById("search");
    async function n() {
        if (t.value.length < 2) return alert("Слишком короткий текст запроса"), !1;
        let n = `https://api.github.com/search/repositories?q=${t.value}`,
            a = await fetch(n),
            r = await a.json(),
            l = document.createElement("div");
        l.id = "resBox";
        let i = document.getElementById("resBox");
        if (i ? (i.remove(), e.append(l)) : e.append(l), r.items.length > 0)
            for (let e of r.items.slice(0, 10)) {
                let t = document.createElement("div");
                t.id = "box", t.className = "box";
                let n = document.createElement("a");
                n.setAttribute("target", "_blank"), n.setAttribute("href", e.svn_url);
                let a = document.createElement("p");
                a.id = "box__link";
                let r = document.createElement("p");
                r.id = "box__str";
                let i = document.createElement("p");
                i.id = "box__str", l.append(t), t.append(a, r, i), a.append(n), n.innerHTML = e.svn_url, r.innerHTML = "Name: " + e.name + ",  language: " + e.language + ",  description: " + e.description;
                let o = new Date(e.created_at);
                i.innerHTML = "Created: " + o.toLocaleDateString() + ", " + o.toLocaleTimeString()
            } else {
                let e = document.createElement("p");
                e.id = "notFound", e.innerHTML = "Ничего не найдено", l.append(e)
            }
        return t.value = "", !1
    }
    t.value = "", t.addEventListener("keydown", (function (e) {
        "Enter" === e.key && n()
    })), document.getElementById("search__btn").onclick = function () {
        n()
    }
})();