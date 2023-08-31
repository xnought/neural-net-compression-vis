import{w as f,j as E}from"./singletons.59473dd1.js";import{a3 as A,s as L,z as w,w as h,x as v,h as g,d,j as a,N as z,i as T,r as p,u as S,y as q,A as V}from"./scheduler.655c61ae.js";import{S as Y,i as H}from"./index.9e10714d.js";function X(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function W(t,e){const s={},r={},i={$$scope:1};let n=t.length;for(;n--;){const u=t[n],l=e[n];if(l){for(const o in u)o in l||(r[o]=1);for(const o in l)i[o]||(s[o]=l[o],i[o]=1);t[n]=l}else for(const o in u)i[o]=1}for(const u in r)u in s||(s[u]=void 0);return s}function Z(t){return typeof t=="object"&&t!==null?t:{}}const x={navbar:[],sidebar:{quantization:[{title:"Articles",collapsible:!0,items:[{title:"Visualizing Neural Network Compression",to:"quant"}]}]},github:"https://github.com/xnought/docs",logo:"logo.png"};var m=globalThis&&globalThis.__spreadArray||function(t,e,s){if(s||arguments.length===2)for(var r=0,i=e.length,n;r<i;r++)(n||!(r in e))&&(n||(n=Array.prototype.slice.call(e,0,r)),n[r]=e[r]);return t.concat(n||Array.prototype.slice.call(e))},B=f(!0),D=f(!0),$=f(!0),I=f([]),F=f([]),G=f(0),J=f(0),M=f("up"),ee=f(!1),te=f(!0),O=f(Object.entries(x.sidebar||{}).reduce(function(t,e){var s=e[1];return m(m([],t,!0),s,!0)},[]));G.subscribe(function(t){var e=t-A(J)>0?"down":"up";e!==A(M)&&M.set(e)});O.subscribe(function(t){F.set(t.reduce(function(e,s){return Array.isArray(s.items)?m(m([],e,!0),s.items,!0):m(m([],e,!0),[s],!1)},[]))});B.subscribe(function(t){t||D.set(!0)});D.subscribe(function(t){t||B.set(!0)});function se(t){var e;if(t){var s=Object.keys(x.sidebar||{}).find(function(r){return t.startsWith(r)});s&&O.set(((e=x.sidebar)===null||e===void 0?void 0:e[s])||[])}}const ae={title:" ",description:" "};function K(t){let e,s,r,i,n,u,l,o,y=[t[0],{width:"1em"},{height:"1em"},{viewBox:"0 0 24 24"}],_={};for(let c=0;c<y.length;c+=1)_=w(_,y[c]);return{c(){e=h("svg"),s=h("g"),r=h("path"),i=h("animate"),n=h("path"),u=h("animate"),l=h("path"),o=h("animate"),this.h()},l(c){e=v(c,"svg",{width:!0,height:!0,viewBox:!0});var b=g(e);s=v(b,"g",{fill:!0,stroke:!0,strokelinecap:!0,strokelinejoin:!0,strokewidth:!0});var k=g(s);r=v(k,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var N=g(r);i=v(N,"animate",{fill:!0,attributeName:!0,dur:!0,values:!0}),g(i).forEach(d),N.forEach(d),n=v(k,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var C=g(n);u=v(C,"animate",{fill:!0,attributeName:!0,begin:!0,dur:!0,values:!0}),g(u).forEach(d),C.forEach(d),l=v(k,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var j=g(l);o=v(j,"animate",{fill:!0,attributeName:!0,begin:!0,dur:!0,values:!0}),g(o).forEach(d),j.forEach(d),k.forEach(d),b.forEach(d),this.h()},h(){a(i,"fill","freeze"),a(i,"attributeName","stroke-dashoffset"),a(i,"dur","0.6s"),a(i,"values","36;0"),a(r,"strokedasharray","36"),a(r,"strokedashoffset","36"),a(r,"d","M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"),a(u,"fill","freeze"),a(u,"attributeName","stroke-dashoffset"),a(u,"begin","0.6s"),a(u,"dur","0.3s"),a(u,"values","12;0"),a(n,"strokedasharray","12"),a(n,"strokedashoffset","12"),a(n,"d","M13 11L20 4"),a(o,"fill","freeze"),a(o,"attributeName","stroke-dashoffset"),a(o,"begin","0.9s"),a(o,"dur","0.2s"),a(o,"values","8;0"),a(l,"strokedasharray","8"),a(l,"strokedashoffset","8"),a(l,"d","M21 3H15M21 3V9"),a(s,"fill","none"),a(s,"stroke","currentColor"),a(s,"strokelinecap","round"),a(s,"strokelinejoin","round"),a(s,"strokewidth","2"),z(e,_)},m(c,b){T(c,e,b),p(e,s),p(s,r),p(r,i),p(s,n),p(n,u),p(s,l),p(l,o)},p(c,[b]){z(e,_=W(y,[b&1&&c[0],{width:"1em"},{height:"1em"},{viewBox:"0 0 24 24"}]))},i:S,o:S,d(c){c&&d(e)}}}function P(t,e,s){const r=[];let i=q(e,r);return t.$$set=n=>{e=w(w({},e),V(n)),s(0,i=q(e,r))},[i]}class re extends Y{constructor(e){super(),H(this,e,P,K,L,{})}}const ne=E("goto"),oe=E("before_navigate"),ie=E("after_navigate");export{re as E,Z as a,D as b,ie as c,B as d,X as e,M as f,W as g,G as h,te as i,I as j,se as k,oe as l,ne as m,$ as n,J as o,F as p,ee as q,O as r,ae as s,x as t};
