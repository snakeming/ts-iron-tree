(function(i,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(i=typeof globalThis<"u"?globalThis:i||self,s(i["ts-iron-tree"]={}))})(this,function(i){"use strict";var m=Object.defineProperty;var v=(i,s,l)=>s in i?m(i,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[s]=l;var f=(i,s,l)=>(v(i,typeof s!="symbol"?s+"":s,l),l);class s{constructor(t){f(this,"_content");f(this,"_children");f(this,"_length");f(this,"_parent",null);this._content=t,this._children=[],this._length=0}parent(){return this._parent}setParent(t){this._parent=t}children(){return this._children}child(t){return this._children[t]}content(){return this._content}length(){return this._length}get(t){if(typeof this._content[t]<"u")return this._content[t]}set(t,e){return!!(this._content[t]=e)}add(t){const e=t instanceof s?t:new s(t);return e.setParent(this),this._length++,this._children.push(e),e}remove(t){const e=this._children.findIndex(t);if(e>-1){const n=this._children.splice(e,1);return this._length--,n}return[]}sort(t){return this._children.sort(t)}traversal(t,e){e!==null&&(t=t||(()=>!0),this._children.filter(t).forEach(e))}getPath(){const t=[];let e=this;for(;e;)t.push(e),e=e.parent();return t.reverse()}}function l(o,t,e,n){const r=t||o.rootNode();if(e&&r&&e(r))return r;const u=r==null?void 0:r.children();let h=null;if(!u)return null;for(let c=0;c<u.length;c++){const a=u[c];if(h=l(o,a,e),h)return h}return null}function d(o,t,e=null,n){const r=t||o.rootNode();t||(typeof e=="function"&&r!=null&&e(r)?n!=null&&n(r):e===null&&n!=null&&r!=null&&n(r)),r!=null&&(r.traversal(e,n),((r==null?void 0:r.children())??[]).forEach(h=>{d(o,h,e,n)}))}function _(o,t,e,n){const{key_children:r}=n;t=t||o.rootNode();const u=e.push(Object.assign({[r]:[]},t==null?void 0:t.content()));return t==null||t.children().forEach(h=>{_(o,h,e[u-1][r],n)}),e}function g(o,t,e){const{key_children:n}=e;t=t||o[0],t!=null&&(t[n].length===0?delete t[n]:t[n].forEach(r=>{g(o,r,e)}))}class p{constructor(t){f(this,"_rootNode");t?this._rootNode=new s(t):this._rootNode=null}rootNode(){return this._rootNode}get(t){var e;return(e=this._rootNode)==null?void 0:e.get(t)}set(t,e){var n;(n=this._rootNode)==null||n.set(t,e)}add(t,e){const n=typeof t;if(n==="string"&&t==="root")return this._rootNode=new s(e),this;if(n==="function"){const r=l(this,null,t);if(r&&r.add(e))return this;console.log("Warning",e)}}contains(t){return l(this,null,t)}remove(t){var n;const e=this.contains(t);return e?!!((n=e.parent())!=null&&n.remove(t)):!1}move(t,e){const n=this.contains(t);if(n&&this.remove(t)){const r=this.contains(e);return!!(r!=null&&r.add(n))}return!1}traversal(t,e){d(this,null,t,e)}sort(t){this.traversal(null,e=>{e.sort(t)})}toJson(t){t=Object.assign({key_children:"children",empty_children:!0},t);const n=_(this,null,[],t);if(t.empty_children||g(n,null,t),n&&n.length>0)return n[0]}}i.IronTree=p,i.IronTreeNode=s,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});