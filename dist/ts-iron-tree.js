var g = Object.defineProperty;
var p = (s, t, n) => t in s ? g(s, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[t] = n;
var o = (s, t, n) => (p(s, typeof t != "symbol" ? t + "" : t, n), n);
class h {
  constructor(t) {
    o(this, "_content");
    o(this, "_children");
    o(this, "_length");
    o(this, "_parent", null);
    this._content = t, this._children = [], this._length = 0;
  }
  parent() {
    return this._parent;
  }
  setParent(t) {
    this._parent = t;
  }
  children() {
    return this._children;
  }
  child(t) {
    return this._children[t];
  }
  content() {
    return this._content;
  }
  length() {
    return this._length;
  }
  get(t) {
    if (typeof this._content[t] < "u")
      return this._content[t];
  }
  set(t, n) {
    return !!(this._content[t] = n);
  }
  add(t) {
    const n = t instanceof h ? t : new h(t);
    return n.setParent(this), this._length++, this._children.push(n), n;
  }
  remove(t) {
    const n = this._children.findIndex(t);
    if (n > -1) {
      const e = this._children.splice(n, 1);
      return this._length--, e;
    }
    return [];
  }
  sort(t) {
    return this._children.sort(t);
  }
  traversal(t, n) {
    n !== null && (t = t || (() => !0), this._children.filter(t).forEach(n));
  }
  getPath() {
    const t = [];
    let n = this;
    for (; n; )
      t.push(n), n = n.parent();
    return t.reverse();
  }
}
function c(s, t, n, e) {
  const r = t || s.rootNode();
  if (n && r && n(r))
    return r;
  const l = r == null ? void 0 : r.children();
  let i = null;
  if (!l)
    return null;
  for (let u = 0; u < l.length; u++) {
    const a = l[u];
    if (i = c(s, a, n), i)
      return i;
  }
  return null;
}
function f(s, t, n = null, e) {
  const r = t || s.rootNode();
  t || (typeof n == "function" && r != null && n(r) ? e != null && e(r) : n === null && e != null && r != null && e(r)), r != null && (r.traversal(n, e), ((r == null ? void 0 : r.children()) ?? []).forEach((i) => {
    f(s, i, n, e);
  }));
}
function _(s, t, n, e) {
  const { key_children: r } = e;
  t = t || s.rootNode();
  const l = n.push(
    Object.assign({ [r]: [] }, t == null ? void 0 : t.content())
  );
  return t == null || t.children().forEach((i) => {
    _(s, i, n[l - 1][r], e);
  }), n;
}
function d(s, t, n) {
  const { key_children: e } = n;
  t = t || s[0], t != null && (t[e].length === 0 ? delete t[e] : t[e].forEach((r) => {
    d(s, r, n);
  }));
}
class m {
  constructor(t) {
    o(this, "_rootNode");
    t ? this._rootNode = new h(t) : this._rootNode = null;
  }
  rootNode() {
    return this._rootNode;
  }
  // only for rootNode
  get(t) {
    var n;
    return (n = this._rootNode) == null ? void 0 : n.get(t);
  }
  // only for rootNode
  set(t, n) {
    var e;
    (e = this._rootNode) == null || e.set(t, n);
  }
  // public add(callback: (node: Node) => boolean, object: any) {
  add(t, n) {
    const e = typeof t;
    if (e === "string" && t === "root")
      return this._rootNode = new h(n), this;
    if (e === "function") {
      const r = c(this, null, t);
      if (r && r.add(n))
        return this;
      console.log("Warning", n);
    }
  }
  contains(t) {
    return c(this, null, t);
  }
  remove(t) {
    var e;
    const n = this.contains(t);
    return n ? !!((e = n.parent()) != null && e.remove(t)) : !1;
  }
  move(t, n) {
    const e = this.contains(t);
    if (e && this.remove(t)) {
      const r = this.contains(n);
      return !!(r != null && r.add(e));
    }
    return !1;
  }
  traversal(t, n) {
    f(this, null, t, n);
  }
  sort(t) {
    this.traversal(null, (n) => {
      n.sort(t);
    });
  }
  toJson(t) {
    t = Object.assign({
      key_children: "children",
      empty_children: !0
    }, t);
    const e = _(this, null, [], t);
    if (t.empty_children || d(e, null, t), e && e.length > 0)
      return e[0];
  }
}
export {
  m as IronTree,
  h as IronTreeNode
};
