import { w as writable } from "./index.js";
import { t as get_store_value, c as create_ssr_component, b as compute_rest_props, f as spread, h as escape_object } from "./ssr.js";
const themeOptions = { "navbar": [], "sidebar": { "quantization": [{ "title": "Articles", "collapsible": false, "items": [{ "title": "Quantization", "to": "/quant" }] }] }, "github": "https://github.com/xnought/entropic", "logo": "/logo.png" };
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var sidebarCollapsed = writable(true);
var tocCollapsed = writable(true);
var navCollapsed = writable(true);
var anchors = writable([]);
var pages = writable([]);
var scrollY = writable(0);
var oldScrollY = writable(0);
var scrollDirection = writable("up");
var sidebar = writable(true);
var resolvedSidebar = writable(Object.entries(themeOptions.sidebar || {}).reduce(function(all, _a) {
  var item = _a[1];
  return __spreadArray(__spreadArray([], all, true), item, true);
}, []));
scrollY.subscribe(function(sy) {
  var nextDirection = sy - get_store_value(oldScrollY) > 0 ? "down" : "up";
  if (nextDirection !== get_store_value(scrollDirection))
    scrollDirection.set(nextDirection);
});
resolvedSidebar.subscribe(function(sidebar2) {
  pages.set(sidebar2.reduce(function(allPages, item) {
    return Array.isArray(item.items) ? __spreadArray(__spreadArray([], allPages, true), item.items, true) : __spreadArray(__spreadArray([], allPages, true), [item], false);
  }, []));
});
sidebarCollapsed.subscribe(function(v) {
  if (!v)
    tocCollapsed.set(true);
});
tocCollapsed.subscribe(function(v) {
  if (!v)
    sidebarCollapsed.set(true);
});
function resolveSidebar(routeId) {
  var _a;
  if (!routeId)
    return;
  var key = Object.keys(themeOptions.sidebar || {}).find(function(key2) {
    return routeId.startsWith(key2);
  });
  if (key)
    resolvedSidebar.set(((_a = themeOptions.sidebar) === null || _a === void 0 ? void 0 : _a[key]) || []);
}
const siteConfig = { "title": "_", "description": " " };
const External = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      escape_object($$restProps),
      { width: "1em" },
      { height: "1em" },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}><g fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2"><path strokedasharray="36" strokedashoffset="36" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="36;0"></animate></path><path strokedasharray="12" strokedashoffset="12" d="M13 11L20 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.3s" values="12;0"></animate></path><path strokedasharray="8" strokedashoffset="8" d="M21 3H15M21 3V9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="8;0"></animate></path></g></svg>`;
});
const Expansion_svelte_svelte_type_style_lang = "";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const beforeNavigate = /* @__PURE__ */ client_method("before_navigate");
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
const Link_svelte_svelte_type_style_lang = "";
export {
  External as E,
  tocCollapsed as a,
  afterNavigate as b,
  sidebarCollapsed as c,
  scrollDirection as d,
  scrollY as e,
  sidebar as f,
  anchors as g,
  resolveSidebar as h,
  beforeNavigate as i,
  navCollapsed as n,
  oldScrollY as o,
  pages as p,
  resolvedSidebar as r,
  siteConfig as s,
  themeOptions as t
};
