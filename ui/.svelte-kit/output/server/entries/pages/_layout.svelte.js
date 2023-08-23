import { c as create_ssr_component, o as onDestroy, a as add_attribute, b as compute_rest_props, e as escape, v as validate_component, d as each, f as spread, g as escape_attribute_value, h as escape_object, n as null_to_empty, i as subscribe, j as createEventDispatcher, k as add_styles, l as set_store_value } from "../../chunks/ssr.js";
import { E as External, s as siteConfig, t as themeOptions, n as navCollapsed, a as tocCollapsed, b as afterNavigate, c as sidebarCollapsed, d as scrollDirection, r as resolvedSidebar, o as oldScrollY, e as scrollY, f as sidebar, g as anchors, h as resolveSidebar, i as beforeNavigate } from "../../chunks/Link.svelte_svelte_type_style_lang.js";
import { b as base } from "../../chunks/paths.js";
import { p as page } from "../../chunks/stores.js";
import { L as Link } from "../../chunks/Link.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const __uno = "";
const style$1 = "";
const prebuildIconifyIcons = "";
const style = "";
const AjaxBar_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".ajax-bar.svelte-1l1j860{--at-apply:fixed top-0 left-0 right-0 bottom-0 h-[3px] z-99999}.progress.svelte-1l1j860{--at-apply:transition-width transition-100 bg-svp-primary h-full;width:var(--ajax-bar-width)}",
  map: null
};
const AjaxBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let barWidth = 0;
  let startedFlag;
  let interval = 200;
  onDestroy(() => {
    if (startedFlag)
      clearTimeout(startedFlag);
  });
  function start() {
    if (startedFlag)
      clearTimeout(startedFlag);
    barWidth = 0;
    interval = 200;
    const next = () => {
      barWidth += 1;
      interval += Math.floor(Math.random() * 200);
      startedFlag = setTimeout(next, interval);
    };
    next();
  }
  function end() {
    if (barWidth > 0)
      barWidth = 100;
    if (startedFlag)
      clearInterval(startedFlag);
    setTimeout(
      () => {
        barWidth = 0;
      },
      100
    );
  }
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  $$result.css.add(css$d);
  return `<div class="ajax-bar svelte-1l1j860"${add_attribute("style", `--ajax-bar-width: ${barWidth}%;`, 0)}><div class="progress svelte-1l1j860"></div> </div>`;
});
const NavArrowDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path></svg>`;
});
const NavItem_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".nav-item.svelte-1w19khn.svelte-1w19khn{--at-apply:flex items-center cursor-pointer position-relative z-1\n      cursor-pointer decoration-none px-3}.nav-item--icon.svelte-1w19khn.svelte-1w19khn{--at-apply:text-6}.nav-item--icon.svelte-1w19khn .dropdown.svelte-1w19khn{--uno:'text-4'}.nav-item--icon.svelte-1w19khn.svelte-1w19khn:not(:first-child)::after,.navbar-pc .toggle::after{--uno:'absolute left-0 bg-stone-2 w-[1px] top-[50%] h-[20px] dark:bg-stone-7';transform:translateY(-50%);content:' '}.nav-item--icon.svelte-1w19khn.svelte-1w19khn:first-of-type::after{--uno:'display-none sm:display-unset'}.nav-item--icon.svelte-1w19khn.svelte-1w19khn:hover{--at-apply:opacity-80}:not(.dropdown) > .nav-item:not(.nav-item--icon):hover{--at-apply:svp-gradient-text}.dropdown.svelte-1w19khn.svelte-1w19khn{--at-apply:'transition-transform transition-opacity transition-300 opacity-0 pointer-events-none  absolute top-0 right-0 bg-white dark:bg-[#232323] whitespace-nowrap z-3 rounded shadow-sm p-2';transform:translateY(72px)}.dropdown > .nav-item{--at-apply:'block py-2 px-4 decoration-none rounded hover:bg-svp-primary hover:bg-opacity-20 hover:text-svp-primary text-[#213547] dark:text-[#efefef]'}.dropdown > .nav-item:hover{background-image:none}.nav-item.svelte-1w19khn:hover .dropdown.svelte-1w19khn{--at-apply:opacity-100 pointer-events-initial;transform:translateY(54px)}.arrow.svelte-1w19khn.svelte-1w19khn{--at-apply:'flex items-center transition-transform transition-300 text-6 text-[#213547] dark:text-light-4'}.nav-item.svelte-1w19khn:hover .arrow.svelte-1w19khn{transform:rotate(180deg)}",
  map: null
};
const NavItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, ["title", "to", "items", "icon", "external", "builtInIcon"]);
  let { title = "" } = $$props;
  let { to = "/" } = $$props;
  let { items = [] } = $$props;
  let { icon = false } = $$props;
  let { external = false } = $$props;
  let { builtInIcon = false } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.external === void 0 && $$bindings.external && external !== void 0)
    $$bindings.external(external);
  if ($$props.builtInIcon === void 0 && $$bindings.builtInIcon && builtInIcon !== void 0)
    $$bindings.builtInIcon(builtInIcon);
  $$result.css.add(css$c);
  return `${items && items.length ? `<div class="${[
    "nav-item svelte-1w19khn",
    (builtInIcon ? "built-in-icon" : "") + " " + (icon ? "nav-item--icon" : "") + " " + (icon ? "nav-item--user-icon" : "")
  ].join(" ").trim()}" role="link"${add_attribute("aria-label", title, 0)}>${typeof icon === "string" ? `<!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END -->` : `${escape(title)} <div class="arrow svelte-1w19khn">${validate_component(NavArrowDown, "NavArrowDown").$$render($$result, {}, {}, {})}</div>`} <div class="dropdown svelte-1w19khn">${each(items, (subItem) => {
    return `${validate_component(NavItem, "svelte:self").$$render($$result, Object.assign({}, subItem), {}, {})}`;
  })}</div></div>` : `${((tag) => {
    return tag ? `<${external ? "div" : "a"}${spread(
      [
        { href: escape_attribute_value(to) },
        { class: "nav-item" },
        escape_object(external ? { target: "_blank" } : {}),
        { role: "link" },
        { tabindex: "0" },
        {
          "aria-label": escape_attribute_value(title)
        }
      ],
      {
        classes: (icon ? "nav-item--icon" : "") + " svelte-1w19khn"
      }
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ` ${typeof icon === "string" ? `<!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END -->` : `${escape(title)}`} ${external ? `${validate_component(External, "External").$$render($$result, {}, {}, {})}` : ``} `}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(external ? "div" : "a")}`}`;
});
const Logo_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".logo.svelte-1qc3gua{--at-apply:h-[32px]}.title.svelte-1qc3gua{--at-apply:font-600 ml-2}",
  map: null
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `${validate_component(NavItem, "NavItem").$$render(
    $$result,
    {
      to: base === "" ? "/" : base,
      title: siteConfig.title
    },
    {},
    {
      default: () => {
        return `${`<img class="logo svelte-1qc3gua" height="32"${add_attribute("src", themeOptions.logo, 0)}${add_attribute("alt", siteConfig.title, 0)}> <span class="title svelte-1qc3gua">${escape(siteConfig.title)}</span>`}`;
      }
    }
  )}`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { width: "1em" },
      { height: "1em" },
      { viewBox: "0 0 24 24" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>`;
});
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokedasharray="2" strokedashoffset="2" strokelinecap="round" strokewidth="2"><path d="M0 0"><animate fill="freeze" attributeName="d" begin="1.2s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="2;0"></animate></path><path d="M0 0"><animate fill="freeze" attributeName="d" begin="1.5s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.5s" dur="1.2s" values="2;0"></animate></path><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></g><g fill="currentColor"><path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z"><animate fill="freeze" attributeName="fill-opacity" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.4s" values="1;0"></animate></path></g><g fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2"><path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"></path><set attributeName="opacity" begin="0.6s" to="0"></set></g><mask id="lineMdMoonToSunnyOutlineLoopTransition0"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="12" cy="12" r="8"><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="8;4"></animate></circle><circle cx="18" cy="6" r="12" fill="#fff"><animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="12;3"></animate></circle><circle cx="18" cy="6" r="10"><animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;1"></animate></circle></mask><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#lineMdMoonToSunnyOutlineLoopTransition0)" opacity="0"><set attributeName="opacity" begin="0.6s" to="1"></set><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;6"></animate></circle></svg>`;
});
const ToggleDark_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".toggle.svelte-8qls77{--at-apply:'h-[28px] text-[24px] cursor-pointer px-3 flex items-center h-100% hover:opacity-80 relative'}",
  map: null
};
const key = "SVELTEPRESS_DARK_MODE";
const ToggleDark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const themeColor = themeOptions.themeColor || { light: "#fff", dark: "#000" };
  $$result.css.add(css$a);
  return ` ${$$result.head += `<!-- HEAD_svelte-1pnpowe_START --><meta id="theme-color" name="theme-color"${add_attribute("content", themeColor.light || "#fff", 0)}><!-- HTML_TAG_START -->${`
<script>
  const themeColor = JSON.parse('${JSON.stringify(themeColor)}')
  if (window.localStorage.getItem('${key}') === 'on') {
    document.querySelector('html').classList.add('dark')
    document.getElementById('theme-color').setAttribute('content', themeColor ? themeColor.dark : '#ffffff')
  } else {
    document.querySelector('html').classList.remove('dark')
    document.getElementById('theme-color').setAttribute('content', themeColor ? themeColor.light : '#ffffff')
  }
<\/script>`}<!-- HTML_TAG_END --><!-- HEAD_svelte-1pnpowe_END -->`, ""} <div class="toggle svelte-8qls77" aria-label="Toggle dark mode" role="button" tabindex="0">${`${validate_component(Sun, "Sun").$$render($$result, {}, {}, {})}`} </div>`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, ["appId", "apiKey", "indexName"]);
  let { appId } = $$props;
  let { apiKey } = $$props;
  let { indexName } = $$props;
  if ($$props.appId === void 0 && $$bindings.appId && appId !== void 0)
    $$bindings.appId(appId);
  if ($$props.apiKey === void 0 && $$bindings.apiKey && apiKey !== void 0)
    $$bindings.apiKey(apiKey);
  if ($$props.indexName === void 0 && $$bindings.indexName && indexName !== void 0)
    $$bindings.indexName(indexName);
  return `<div id="docsearch"></div>`;
});
const Discord = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "1em" },
      { height: "1em" },
      { viewBox: "0 0 24 24" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"></path></svg>`;
});
const TocMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokelinecap="round" strokewidth="2"><path d="M5 5L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity="0"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to="1"></set></path><path d="M5 19L19 5"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g></svg>`;
});
const TocClose = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokelinecap="round" strokewidth="2"><path d="M5 5L19 5"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to="0"></set></path><path d="M5 19L19 19"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g></svg>`;
});
const Svelte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M26.1 5.7C23.5 2 18.4.9 14.7 3.2L8.2 7.4c-1.8 1.1-3 2.9-3.4 5c-.3 1.7 0 3.5.8 5.1c-.6.8-.9 1.8-1.1 2.8c-.4 2.1.1 4.3 1.4 6c2.6 3.7 7.7 4.8 11.4 2.5l6.5-4.2c1.8-1.1 3-2.9 3.4-5c.3-1.7 0-3.5-.8-5.1c.6-.8.9-1.8 1.1-2.8c.4-2.1-.1-4.3-1.4-6zM24.3 11c0 .2-.1.4-.2.6l-.1.4l-.3-.2c-.8-.6-1.6-1-2.6-1.3l-.2-.1v-.2c0-.3-.1-.7-.3-1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2L12 12.9c-.3.2-.5.5-.6.9c-.1.4 0 .8.2 1.1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2l2.5-1.6c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1 1 2.4.8 3.6c-.2 1.2-1 2.3-2 3L15.4 26c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.7-1-1-2.4-.8-3.6c0-.2.1-.4.2-.6L8 20l.3.2c.8.6 1.6 1 2.6 1.3l.2.1v.2c0 .3.1.7.3 1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2L20 19c.3-.2.5-.5.6-.9c.1-.4 0-.8-.2-1.1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2l-2.5 1.6c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.8-1-1-2.4-.8-3.6c.2-1.2 1-2.3 2-3l6.5-4.2c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1.1 1 2.4.8 3.6z"></path></svg>`;
});
const SvelteWithColor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="1em" height="1em" viewBox="0 0 32 32"><path fill="#ff3e00" d="M26.47 5.7a8.973 8.973 0 0 0-11.793-2.454L7.96 7.4a7.461 7.461 0 0 0-3.481 5.009a7.686 7.686 0 0 0 .8 5.058a7.358 7.358 0 0 0-1.151 2.8a7.789 7.789 0 0 0 1.4 6.028a8.977 8.977 0 0 0 11.794 2.458L24.04 24.6a7.468 7.468 0 0 0 3.481-5.009a7.673 7.673 0 0 0-.8-5.062a7.348 7.348 0 0 0 1.152-2.8A7.785 7.785 0 0 0 26.47 5.7"></path><path fill="#fff" d="M14.022 26.64A5.413 5.413 0 0 1 8.3 24.581a4.678 4.678 0 0 1-.848-3.625a4.307 4.307 0 0 1 .159-.61l.127-.375l.344.238a8.76 8.76 0 0 0 2.628 1.274l.245.073l-.025.237a1.441 1.441 0 0 0 .271.968a1.63 1.63 0 0 0 1.743.636a1.512 1.512 0 0 0 .411-.175l6.7-4.154a1.366 1.366 0 0 0 .633-.909a1.407 1.407 0 0 0-.244-1.091a1.634 1.634 0 0 0-1.726-.622a1.509 1.509 0 0 0-.413.176l-2.572 1.584a4.934 4.934 0 0 1-1.364.582a5.415 5.415 0 0 1-5.727-2.06a4.678 4.678 0 0 1-.831-3.628A4.507 4.507 0 0 1 9.9 10.09l6.708-4.154a4.932 4.932 0 0 1 1.364-.581A5.413 5.413 0 0 1 23.7 7.414a4.679 4.679 0 0 1 .848 3.625a4.272 4.272 0 0 1-.159.61l-.127.375l-.344-.237a8.713 8.713 0 0 0-2.628-1.274l-.245-.074l.025-.237a1.438 1.438 0 0 0-.272-.968a1.629 1.629 0 0 0-1.725-.622a1.484 1.484 0 0 0-.411.176l-6.722 4.14a1.353 1.353 0 0 0-.631.908a1.394 1.394 0 0 0 .244 1.092a1.634 1.634 0 0 0 1.726.621a1.538 1.538 0 0 0 .413-.175l2.562-1.585a4.9 4.9 0 0 1 1.364-.581a5.417 5.417 0 0 1 5.728 2.059a4.681 4.681 0 0 1 .843 3.625a4.5 4.5 0 0 1-2.089 3.013l-6.707 4.154a4.9 4.9 0 0 1-1.364.581"></path></svg>`;
});
const Markdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41M3.44 6.94c-.26 0-.48.21-.48.47v9.19c0 .25.22.46.48.46h17.12c.26 0 .48-.21.48-.46V7.41c0-.26-.22-.47-.48-.47H3.44m1.45 8.25V8.81h1.92l1.92 2.35l1.92-2.35h1.93v6.38h-1.93v-3.66l-1.92 2.35l-1.92-2.35v3.66H4.89m12.01 0l-2.9-3.1h1.94V8.81h1.92v3.28h1.93l-2.89 3.1"></path></svg>`;
});
const ArrowDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>`;
});
const css$9 = {
  code: ".svp-live-code--container{--at-apply:'mb-8 shadow-sm b-1 b-solid b-gray-2  dark:b-warmgray-8 rounded-lg'}.svp-live-code--demo{--at-apply:p-4}.c-expansion--body .svp-code-block{--at-apply:mb-none}.c-expansion--header.svelte-1cjuqpu{--at-apply:rounded-b flex justify-between px-4 py-2 items-center}.c-expansion--icon.svelte-1cjuqpu{--at-apply:mr-2 text-6 flex items-center}.c-expansion--arrow.svelte-1cjuqpu{--at-apply:text-6 flex items-center}.c-expansion--header-left.svelte-1cjuqpu{--at-apply:flex items-center}.c-expansion--title.svelte-1cjuqpu{--at-apply:text-3.5}",
  map: null
};
const Expansion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { expanded = false } = $$props;
  let { reverse = false } = $$props;
  let { headerStyle = "" } = $$props;
  let { codeType = "svelte" } = $$props;
  let { showIcon = true } = $$props;
  let bodyDom;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.headerStyle === void 0 && $$bindings.headerStyle && headerStyle !== void 0)
    $$bindings.headerStyle(headerStyle);
  if ($$props.codeType === void 0 && $$bindings.codeType && codeType !== void 0)
    $$bindings.codeType(codeType);
  if ($$props.showIcon === void 0 && $$bindings.showIcon && showIcon !== void 0)
    $$bindings.showIcon(showIcon);
  $$result.css.add(css$9);
  return `<div class="${escape(null_to_empty(`c-expansion ${expanded ? "c-expansion--expanded" : ""}`), true) + " svelte-1cjuqpu"}">${reverse ? `<div class="c-expansion--body"${add_attribute("this", bodyDom, 0)}> ${slots.default ? slots.default({}) : ``}</div>` : ``}  <div class="c-expansion--header svelte-1cjuqpu"${add_attribute("style", headerStyle, 0)} role="button" tabindex="0"><div class="c-expansion--header-left svelte-1cjuqpu">${showIcon ? `<div class="c-expansion--icon svelte-1cjuqpu"> ${expanded ? `${slots["icon-expanded"] ? slots["icon-expanded"]({}) : ` ${codeType === "svelte" ? `${validate_component(SvelteWithColor, "SvelteWithColor").$$render($$result, {}, {}, {})}` : `${codeType === "md" ? `<div class="flex items-center text-6 text-svp-primary">${validate_component(Markdown, "Markdown").$$render($$result, {}, {}, {})}</div>` : ``}`} `}` : `${slots["icon-fold"] ? slots["icon-fold"]({}) : ` ${codeType === "svelte" ? `${validate_component(Svelte, "Svelte").$$render($$result, {}, {}, {})}` : `${codeType === "md" ? `<div class="flex items-center text-6">${validate_component(Markdown, "Markdown").$$render($$result, {}, {}, {})}</div>` : ``}`} `}`}</div>` : ``} <div class="c-expansion--title svelte-1cjuqpu"> ${slots.title ? slots.title({}) : ` ${escape(title)} `}</div></div> <div class="${escape(null_to_empty(`c-expansion--arrow ${expanded ? "c-expansion--arrow-expanded" : ""}`), true) + " svelte-1cjuqpu"}"> ${slots.arrow ? slots.arrow({}) : ` ${validate_component(ArrowDown, "ArrowDown").$$render($$result, {}, {}, {})} `}</div></div> ${!reverse ? `<div class="c-expansion--body"${add_attribute("this", bodyDom, 0)}> ${slots.default ? slots.default({}) : ``}</div>` : ``} </div>`;
});
const NavbarMobile_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".nav-trigger.svelte-6d3xbz{--at-apply:'ml-4 text-6 flex items-center sm:display-none'}.navbar-mobile.svelte-6d3xbz{--at-apply:'fixed top-[48px] left-0 right-0 bg-white dark:bg-black z-900 shadow-lg pb-4 dark:shadow-gray-8'}.navbar-mobile .nav-item{--at-apply:'leading-12 px-4'}.navbar-mobile .nav-item--icon{--uno:'h-12'}.navbar-mobile .c-expansion--title{--at-apply:'text-4 font-700'}.navbar-mobile .c-expansion .nav-item{--at-apply:'indent-[1em]'}",
  map: null
};
const NavbarMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navCollapsed, $$unsubscribe_navCollapsed;
  $$unsubscribe_navCollapsed = subscribe(navCollapsed, (value) => $navCollapsed = value);
  $$result.css.add(css$8);
  $$unsubscribe_navCollapsed();
  return `<div class="nav-trigger svelte-6d3xbz" role="menu" tabindex="0">${$navCollapsed ? `${validate_component(TocMenu, "TocMenu").$$render($$result, {}, {}, {})}` : `${validate_component(TocClose, "TocClose").$$render($$result, {}, {}, {})}`}</div> ${!$navCollapsed ? `<nav class="navbar-mobile svelte-6d3xbz" aria-label="Menu">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})} ${each(themeOptions.navbar, (navItem) => {
    return `${navItem.items ? `${validate_component(Expansion, "Expansion").$$render($$result, { title: navItem.title, showIcon: false }, {}, {
      title: () => {
        return `<div slot="title">${navItem.icon ? `<div class="text-6"><!-- HTML_TAG_START -->${navItem.icon}<!-- HTML_TAG_END --> </div>` : `${escape(navItem.title)}`} </div>`;
      },
      default: () => {
        return `${each(navItem.items, (subItem) => {
          return `${validate_component(NavItem, "NavItem").$$render($$result, Object.assign({}, subItem), {}, {})}`;
        })} `;
      }
    })}` : `${validate_component(NavItem, "NavItem").$$render($$result, Object.assign({}, navItem), {}, {})}`}`;
  })}</nav>` : ``}`;
});
const Backdrop_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".backdrop.svelte-112ytuk{--at-apply:'svp-modal-bg'}.show.svelte-112ytuk{--at-apply:'svp-modal-bg-show'}",
  map: null
};
const Backdrop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = false } = $$props;
  let { top = 0 } = $$props;
  let { zIndex = 900 } = $$props;
  createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  $$result.css.add(css$7);
  return `<div class="${["backdrop svelte-112ytuk", show ? "show" : ""].join(" ").trim()}" role="none"${add_styles({ top, "z-index": zIndex })}></div>`;
});
const Toc_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".toc.svelte-1ulaavb.svelte-1ulaavb{--at-apply:'transition-transform transition transition-300 py-4 text-gray-5 dark:text-gray-2 sm:z-3 leading-[2em] bottom-0 right-0 sm:top-[80px] fixed text-3.5 sm:w-[22vw] w-[70vw] bg-white dark:bg-zinc-8 sm:bg-transparent top-0 z-988 sm:dark:bg-transparent'}.toc.svelte-1ulaavb a.svelte-1ulaavb{--uno:'text-[#213547] dark:text-gray-3'}.title.svelte-1ulaavb.svelte-1ulaavb{--at-apply:'font-bold pl-4 text-gray-8 dark:text-gray-2'}.item.svelte-1ulaavb.svelte-1ulaavb{--at-apply:'pl-4 relative z-3 block truncate cursor-default';text-indent:calc((var(--heading-depth) - 2) * 1.2em)}.item.svelte-1ulaavb.svelte-1ulaavb:not(.active){--at-apply:'hover:text-svp-primary cursor-pointer'}.anchors.svelte-1ulaavb.svelte-1ulaavb{--at-apply:'relative z-3 sm:w-[15vw] max-h-[70vh] overflow-y-auto overflow-x-hidden'}.anchors.svelte-1ulaavb.svelte-1ulaavb::after{--at-apply:'absolute left-[1px] top-0 bottom-0 w-[1px] bg-light-7 dark:bg-gray-8 display-none sm:display-block';content:' '}.active-bar.svelte-1ulaavb.svelte-1ulaavb{--at-apply:'absolute z-2 left-0 h-[2em] border-l-[3px] border-l-solid border-svp-primary border-opacity-80 w-full transition-transform transition-300 top-0';transform:translateY(var(--bar-top))}.collapsed.svelte-1ulaavb.svelte-1ulaavb{--at-apply:'sm:translate-x-0';transform:translateX(100%)}",
  map: null
};
const DEFAULT_ON_THIS_PAGE = "On this page";
const Toc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tocCollapsed, $$unsubscribe_tocCollapsed;
  let $$unsubscribe_page;
  $$unsubscribe_tocCollapsed = subscribe(tocCollapsed, (value) => $tocCollapsed = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { anchors: anchors2 = [] } = $$props;
  let activeIdx = 0;
  afterNavigate(() => {
    activeIdx = 0;
  });
  if ($$props.anchors === void 0 && $$bindings.anchors && anchors2 !== void 0)
    $$bindings.anchors(anchors2);
  $$result.css.add(css$6);
  $$unsubscribe_tocCollapsed();
  $$unsubscribe_page();
  return ` ${anchors2.length ? `<div class="${["toc svelte-1ulaavb", $tocCollapsed ? "collapsed" : ""].join(" ").trim()}"><div class="title svelte-1ulaavb">${escape(themeOptions?.i18n?.onThisPage || DEFAULT_ON_THIS_PAGE)}</div> <div class="anchors svelte-1ulaavb"${add_attribute("style", `--bar-top: calc(${activeIdx * 2}em);`, 0)}>${each(anchors2, (an, i) => {
    let active = activeIdx === i;
    return ` <a${add_attribute("href", `#${an.slugId}`, 0)} class="${["item svelte-1ulaavb", active ? "active" : ""].join(" ").trim()}"${add_attribute("style", `--heading-depth: ${an.depth};`, 0)}>${escape(an.title)} </a>`;
  })} <div class="active-bar svelte-1ulaavb"></div></div></div>` : ``} ${validate_component(Backdrop, "Backdrop").$$render($$result, { show: !$tocCollapsed }, {}, {})}`;
});
const MobileSubNav_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".sub-nav.svelte-d6nxno{--uno:'flex items-center justify-between sm:display-none px-4 py-2'}",
  map: null
};
const MobileSubNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_tocCollapsed;
  let $$unsubscribe_sidebarCollapsed;
  $$unsubscribe_tocCollapsed = subscribe(tocCollapsed, (value) => value);
  $$unsubscribe_sidebarCollapsed = subscribe(sidebarCollapsed, (value) => value);
  $$result.css.add(css$5);
  $$unsubscribe_tocCollapsed();
  $$unsubscribe_sidebarCollapsed();
  return `<nav class="sub-nav svelte-d6nxno" aria-label="Browse docs"><div role="button" tabindex="0" class="i-ic-round-menu-open text-6"></div> <div role="button" tabindex="0">${escape(themeOptions?.i18n?.onThisPage || DEFAULT_ON_THIS_PAGE)}</div> </nav>`;
});
const Navbar_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".header.svelte-wxxf5d{--at-apply:'transition-transform fixed top-0 left-0 right-0 sm:h-[73px] z-888 dark:bg-opacity-40';backdrop-filter:blur(5px)}.hidden-in-mobile.svelte-wxxf5d{--uno:'translate-y-[-100%] sm:translate-y-0'}.logo-container.svelte-wxxf5d{--at-apply:'display-none sm:display-block'}.header-inner.svelte-wxxf5d{--at-apply:'sm:w-[80vw] h-full flex items-stretch justify-between mx-auto'}.left.svelte-wxxf5d{--at-apply:flex items-center}.doc-search.svelte-wxxf5d{--at-apply:'flex-grow flex items-center relative transition-500 transition-left'}.doc-search.is-home.svelte-wxxf5d{--at-apply:left-2}.doc-search.move.svelte-wxxf5d{--at-apply:'sm:left-[15.5vw]'}.navbar-pc.svelte-wxxf5d{--at-apply:'items-stretch flex'}.nav-links.svelte-wxxf5d{--at-apply:flex items-stretch flex-grow justify-end}.navbar-pc.svelte-wxxf5d .nav-item:not(.nav-item--icon),.navbar-pc.svelte-wxxf5d .nav-item--user-icon{--uno:'display-none sm:display-flex'}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let routeId;
  let isHome;
  let hasError;
  let $page, $$unsubscribe_page;
  let $scrollDirection, $$unsubscribe_scrollDirection;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_scrollDirection = subscribe(scrollDirection, (value) => $scrollDirection = value);
  $$result.css.add(css$4);
  routeId = $page.route.id;
  isHome = routeId === "/";
  hasError = $page.error;
  $$unsubscribe_page();
  $$unsubscribe_scrollDirection();
  return `<header class="${["header svelte-wxxf5d", $scrollDirection === "down" ? "hidden-in-mobile" : ""].join(" ").trim()}"><div class="header-inner svelte-wxxf5d"><div class="left svelte-wxxf5d">${validate_component(NavbarMobile, "NavbarMobile").$$render($$result, {}, {}, {})} ${hasError || isHome ? `<div class="logo-container svelte-wxxf5d">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div>` : ``}</div> ${themeOptions.docsearch ? `<div class="${[
    "doc-search svelte-wxxf5d",
    (isHome ? "is-home" : "") + " " + (!isHome && !hasError ? "move" : "")
  ].join(" ").trim()}">${validate_component(Search, "Search").$$render($$result, Object.assign({}, themeOptions.docsearch), {}, {})}</div>` : ``} <nav class="nav-links svelte-wxxf5d" aria-label="Menu"><div class="navbar-pc svelte-wxxf5d"><div class="sm:display-contents display-none">${each(themeOptions.navbar, (navItem) => {
    return `${validate_component(NavItem, "NavItem").$$render($$result, Object.assign({}, navItem), {}, {})}`;
  })}</div> ${`${validate_component(NavItem, "NavItem").$$render(
    $$result,
    {
      to: themeOptions.github,
      external: true,
      icon: true,
      builtInIcon: true,
      title: "Github"
    },
    {},
    {
      default: () => {
        return `${validate_component(Github, "Github").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`} ${themeOptions.discord ? `${validate_component(NavItem, "NavItem").$$render(
    $$result,
    {
      to: themeOptions.discord,
      external: true,
      icon: true,
      builtInIcon: true,
      title: "Discord"
    },
    {},
    {
      default: () => {
        return `${validate_component(Discord, "Discord").$$render($$result, {}, {}, {})}`;
      }
    }
  )}` : ``} ${validate_component(ToggleDark, "ToggleDark").$$render($$result, {}, {}, {})}</div></nav></div> ${!isHome ? `${validate_component(MobileSubNav, "MobileSubNav").$$render($$result, {}, {}, {})}` : ``} </header>`;
});
const PointLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M0 220.8C0 266.416 37.765 304 83.2 304h35.647a93.148 93.148 0 0 0 7.929 22.064c-2.507 22.006 3.503 44.978 15.985 62.791C143.9 441.342 180.159 480 242.701 480H264c60.063 0 98.512-40 127.2-40h2.679c5.747 4.952 13.536 8 22.12 8h64c17.673 0 32-12.894 32-28.8V188.8c0-15.906-14.327-28.8-32-28.8h-64c-8.584 0-16.373 3.048-22.12 8H391.2c-6.964 0-14.862-6.193-30.183-23.668l-.129-.148l-.131-.146c-8.856-9.937-18.116-20.841-25.851-33.253C316.202 80.537 304.514 32 259.2 32c-56.928 0-92 35.286-92 83.2c0 8.026.814 15.489 2.176 22.4H83.2C38.101 137.6 0 175.701 0 220.8zm48 0c0-18.7 16.775-35.2 35.2-35.2h158.4c0-17.325-26.4-35.2-26.4-70.4c0-26.4 20.625-35.2 44-35.2c8.794 0 20.445 32.712 34.926 56.1c9.074 14.575 19.524 27.225 30.799 39.875c16.109 18.374 33.836 36.633 59.075 39.596v176.752C341.21 396.087 309.491 432 264 432h-21.299c-40.524 0-57.124-22.197-50.601-61.325c-14.612-8.001-24.151-33.979-12.925-53.625c-19.365-18.225-17.787-46.381-4.95-61.05H83.2C64.225 256 48 239.775 48 220.8zM448 360c13.255 0 24 10.745 24 24s-10.745 24-24 24s-24-10.745-24-24s10.745-24 24-24z"></path></svg>`;
});
const SidebarGroup_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".sidebar-group.svelte-1oujmou:not(:last-of-type){--at-apply:'border-b-solid border-b border-light-8 dark:border-b-gray-7 mb-4 pb-4'}.group-title.svelte-1oujmou{--at-apply:'font-bold text-slate-8 dark:text-slate-2 mb-2 sm:mb-4 flex items-center justify-between'}.links.svelte-1oujmou{--at-apply:leading-8 overflow-hidden}.collapse-control.svelte-1oujmou{--at-apply:'transition transition-200 transition-bg transition-transform cursor-pointer text-5 hover:bg-gray-2 active:bg-gray-3 dark:hover:bg-gray-8 dark:active:bg-gray-7 w-[28px] h-[28px] flex items-center justify-center rounded'}.arrow.svelte-1oujmou{--at-apply:flex items-center transition-300 transition-transform}.collapsed.svelte-1oujmou{--at-apply:rotate--90}.active-icon.svelte-1oujmou{--at-apply:'text-svp-primary ml-4 flex items-center text-5'}",
  map: null
};
const SidebarGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let routeId;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { items = [] } = $$props;
  let { title = "" } = $$props;
  let { collapsible = false } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.collapsible === void 0 && $$bindings.collapsible && collapsible !== void 0)
    $$bindings.collapsible(collapsible);
  $$result.css.add(css$3);
  routeId = $page.route.id;
  $$unsubscribe_page();
  return `<div class="sidebar-group svelte-1oujmou"><div class="group-title svelte-1oujmou"><div>${escape(title)}</div> ${collapsible ? `<div class="collapse-control svelte-1oujmou" role="button" tabindex="0" aria-label="Collapsable button"><div class="${["arrow svelte-1oujmou", ""].join(" ").trim()}">${validate_component(ArrowDown, "ArrowDown").$$render($$result, {}, {}, {})}</div></div>` : ``}</div> ${`<div class="links svelte-1oujmou">${each(items, ({ to, title: title2 }) => {
    let active = routeId.endsWith("/") ? to === routeId : to === `${routeId}/`;
    return ` ${validate_component(Link, "Link").$$render(
      $$result,
      {
        to,
        active,
        label: title2,
        inline: false,
        highlight: false
      },
      {},
      {
        default: () => {
          return `${active ? `<div class="active-icon svelte-1oujmou">${validate_component(PointLeft, "PointLeft").$$render($$result, {}, {}, {})} </div>` : ``} `;
        }
      }
    )}`;
  })}</div>`} </div>`;
});
const Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillrule="evenodd" d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z" cliprule="evenodd"></path></svg>`;
});
const Sidebar_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".is-home.svelte-1j2stt8{--at-apply:'sm:display-none'}.theme-default-sidebar.svelte-1j2stt8{--at-apply:'fixed top-0 left-0 bottom-0 pr-6 pb-4 sm:pb-32 overflow-y-auto bg-light-6 dark:bg-dark-9 z-999 sm:w-[25vw] w-[70vw] pl-4 sm:pl-[5vw] md:pl-[10vw] box-border transition-transform transition-300 shadow-md sm:shadow-none'}.sidebar-logo.svelte-1j2stt8{--at-apply:'sm:h-[72px] flex items-center justify-between mb-4 py-4 sm:py-0 sticky top-0 bg-inherit border-b-solid border-b border-light-8 dark:border-b-gray-7'}.collapsed.svelte-1j2stt8{--at-apply:'sm:translate-x-0';transform:translateX(-100%)}.close.svelte-1j2stt8{--at-apply:'text-5 flex items-center sm:display-none ml-4'}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let routeId;
  let isHome;
  let $sidebarCollapsed, $$unsubscribe_sidebarCollapsed;
  let $page, $$unsubscribe_page;
  let $resolvedSidebar, $$unsubscribe_resolvedSidebar;
  $$unsubscribe_sidebarCollapsed = subscribe(sidebarCollapsed, (value) => $sidebarCollapsed = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_resolvedSidebar = subscribe(resolvedSidebar, (value) => $resolvedSidebar = value);
  $$result.css.add(css$2);
  routeId = $page.route.id;
  isHome = routeId === "/";
  $$unsubscribe_sidebarCollapsed();
  $$unsubscribe_page();
  $$unsubscribe_resolvedSidebar();
  return `<aside class="${[
    "theme-default-sidebar svelte-1j2stt8",
    ($sidebarCollapsed ? "collapsed" : "") + " " + (isHome ? "is-home" : "")
  ].join(" ").trim()}"><div class="sidebar-logo svelte-1j2stt8">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})} <div class="close svelte-1j2stt8" role="button" tabindex="0">${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</div></div> ${each($resolvedSidebar, (sidebarItem) => {
    let hasItems = Array.isArray(sidebarItem.items);
    return ` ${validate_component(SidebarGroup, "SidebarGroup").$$render(
      $$result,
      Object.assign({}, hasItems ? sidebarItem : { title: "", items: [sidebarItem] }),
      {},
      {}
    )}`;
  })}</aside> ${validate_component(Backdrop, "Backdrop").$$render($$result, { show: !$sidebarCollapsed }, {}, {})}`;
});
const GoogleAnalytics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const ga = themeOptions.ga;
  return `${$$result.head += `<!-- HEAD_svelte-ntf23x_START -->${ga ? `<!-- HTML_TAG_START -->${`<script async src="${`https://www.googletagmanager.com/gtag/js?id=${ga}`}"><\/script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        // eslint-disable-next-line prefer-rest-params, no-undef
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      // eslint-disable-next-line no-template-curly-in-string
      gtag('config', '${ga}')
    <\/script>`}<!-- HTML_TAG_END -->` : ``}<!-- HEAD_svelte-ntf23x_END -->`, ""}`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333l-6 5.333zM13 19v-4h-2v4h2z"></path></svg>`;
});
const Error_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".error.svelte-19szbev{--at-apply:'mt-[20vh] max-w-[380px] mx-auto text-center flex flex-col items-center justify-center'}.code.svelte-19szbev{--at-apply:'text-30'}.title.svelte-19szbev{--at-apply:'text-6 text-warm-gray-6 dark:text-warm-gray-4 my-4 leading-10'}.home-icon.svelte-19szbev{--at-apply:'text-6 ml-2 flex items-center'}",
  map: null
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { error = {} } = $$props;
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  $$result.css.add(css$1);
  return `<div class="error svelte-19szbev"><div class="code svelte-19szbev">${escape(error.code || 404)}</div> <div class="title svelte-19szbev">${escape(error.message || "Not Found")}</div> ${validate_component(Link, "Link").$$render($$result, { label: "Take me home", to: "/" }, {}, {
    pre: () => {
      return `<div class="home-icon svelte-19szbev" slot="pre">${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</div>`;
    }
  })} </div>`;
});
const GlobalLayout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1ftdggk{--at-apply:'pt-[76px] sm:pt-[73px]'}html{--at-apply:'scroll-smooth'}body{--at-apply:'bg-light-4 dark:bg-zinc-9 text-[#213547] dark:text-warm-gray-2 scroll-smooth';font-family:'Inter var experimental',\n      'Inter var',\n      'Inter',\n      ui-sans-serif,\n      system-ui,\n      -apple-system,\n      BlinkMacSystemFont,\n      'Segoe UI',\n      Roboto,\n      'Helvetica Neue',\n      Helvetica,\n      Arial,\n      'Noto Sans',\n      sans-serif,\n      'Apple Color Emoji',\n      'Segoe UI Emoji',\n      'Segoe UI Symbol',\n      'Noto Color Emoji'}a{--at-apply:'text-[#002211] dark:text-[#efefef] decoration-none'}sup a{--uno:'c-svp-primary'}p{--at-apply:leading-6}ul{padding-left:1.25rem;margin:16px 0;line-height:1.5em}li + li{margin-top:0.5rem}.dark{color-scheme:dark}code{--at-apply:'bg-[#e9e9e9] dark:bg-[#3a3a3a] dark:text-[#c9def1] text-[#476582] px-[6px] py-[3px] rounded break-all'}pre.shiki code{--at-apply:'bg-transparent dark:bg-transparent p-unset block'}.svp-code-block-wrapper{--at-apply:'bg-white dark:bg-[#011627] sm:rounded-lg text-[14px] mb-8 mx-[-5vw] sm:mx-none'}.svp-live-code--container{--at-apply:'mx-[-5vw] sm:mx-none'}.svp-live-code--container .svp-code-block-wrapper{--at-apply:'mx-none'}.svp-code-block{--at-apply:relative px-[18px] py-[12px]}.svp-code-block--title{--at-apply:'px-[18px] leading-10 font-700 b-b b-b-solid b-b-gray-2 dark:b-b-gray-8'}.svp-code-block--with-line-numbers{--at-apply:pl-10}.svp-code-block--line-numbers{--at-apply:'absolute left-0 top-0 bottom-0 py-inherit text-3 text-right text-gray-4 px-2 leading-[21px] b-r-solid b-r b-r-light-4 dark:b-r-gray-8';font-family:var(--svp-code-font)}.svp-code-block:hover .svp-code-block--lang{--at-apply:opacity-0}.c-expansion--body .svp-code-block{--at-apply:rounded-none}.c-expansion--body .svp-code-block-wrapper{--at-apply:mb-none}.svp-code-block--lang{--at-apply:'absolute top-2 right-3 z-100 text-cool-gray-3 dark:text-cool-gray-7 text-[12px] transition-300 transition-opacity'}.svp-code-block--command-line{--at-apply:absolute left-0 right-0 z-2 h-[1.5em]}.svp-code-block--focus{--at-apply:'bg-white dark:bg-black pointer-events-none bg-opacity-20 dark:bg-opacity-20 absolute left-0 right-0 z-4 transition-300 transition-opacity';backdrop-filter:blur(1.5px)}.svp-code-block--diff-bg-add{--at-apply:'bg-green-4 bg-opacity-20 dark:bg-green-8 dark:bg-opacity-30'}.svp-code-block--diff-bg-sub{--at-apply:'bg-rose-4 bg-opacity-20 dark:bg-red-8 dark:bg-opacity-30'}.svp-code-block--with-line-numbers .svp-code-block--diff-add,.svp-code-block--with-line-numbers .svp-code-block--diff-sub{--at-apply:pl-8}.svp-code-block--diff-add{--at-apply:text-green-4}.svp-code-block--diff-sub{--at-apply:text-rose-4}.svp-code-block--diff-add,.svp-code-block--diff-sub{--at-apply:absolute left-[4px] top-0 bottom-0 leading-[1.5em];font-family:var(--svp-code-font)}.svp-code-block--hl{--at-apply:'bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10'}.svp-code-block:hover .svp-code-block--focus{--at-apply:opacity-0}blockquote{--at-apply:'border-l-[4px] border-l-solid border-gray-4 m-none bg-gray-2 indent-[1em] text-gray-4 py-[4px] my-4 dark:border-l-gray-5 dark:bg-gray-8'}blockquote p{--at-apply:m-none}table{--at-apply:border-collapse w-full}table th{--at-apply:text-left p-2}table tbody tr{--at-apply:'border-t-1 border-t-solid border-gray-2 dark:border-gray-7'}table tbody tr td{--at-apply:p-2}.svp-anchor-item{--at-apply:relative bottom-[100px]}.svp-live-code--demo .svp-code-block-wrapper{--at-apply:'mb-0'}",
  map: null
};
const GlobalLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, []);
  let $navCollapsed, $$unsubscribe_navCollapsed;
  let $sidebarCollapsed, $$unsubscribe_sidebarCollapsed;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_oldScrollY;
  let $$unsubscribe_scrollY;
  let $sidebar, $$unsubscribe_sidebar;
  let $anchors, $$unsubscribe_anchors;
  $$unsubscribe_navCollapsed = subscribe(navCollapsed, (value) => $navCollapsed = value);
  $$unsubscribe_sidebarCollapsed = subscribe(sidebarCollapsed, (value) => $sidebarCollapsed = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_oldScrollY = subscribe(oldScrollY, (value) => value);
  $$unsubscribe_scrollY = subscribe(scrollY, (value) => value);
  $$unsubscribe_sidebar = subscribe(sidebar, (value) => $sidebar = value);
  $$unsubscribe_anchors = subscribe(anchors, (value) => $anchors = value);
  resolveSidebar($page.route.id);
  let ajaxBar;
  beforeNavigate(({ to }) => {
    ajaxBar?.start();
    resolveSidebar(to.route.id);
  });
  afterNavigate(() => {
    ajaxBar?.end();
    set_store_value(sidebarCollapsed, $sidebarCollapsed = true, $sidebarCollapsed);
    set_store_value(navCollapsed, $navCollapsed = true, $navCollapsed);
  });
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = ` ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} ${$page.error ? `${validate_component(Error, "Error").$$render($$result, { error: $page.error }, {}, {})}` : `<main class="svelte-1ftdggk">${validate_component(AjaxBar, "AjaxBar").$$render(
      $$result,
      { this: ajaxBar },
      {
        this: ($$value) => {
          ajaxBar = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${$sidebar ? `${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}` : ``} ${validate_component(Backdrop, "Backdrop").$$render(
      $$result,
      {
        show: !$navCollapsed,
        top: "56px",
        zIndex: 887
      },
      {},
      {}
    )} ${slots.default ? slots.default({}) : ``} ${validate_component(Toc, "Toc").$$render($$result, { anchors: $anchors }, {}, {})} ${validate_component(GoogleAnalytics, "GoogleAnalytics").$$render($$result, {}, {}, {})} ${``}</main>`}`;
  } while (!$$settled);
  $$unsubscribe_navCollapsed();
  $$unsubscribe_sidebarCollapsed();
  $$unsubscribe_page();
  $$unsubscribe_oldScrollY();
  $$unsubscribe_scrollY();
  $$unsubscribe_sidebar();
  $$unsubscribe_anchors();
  return $$rendered;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const fm = {};
  return `${$$result.head += `<!-- HEAD_svelte-1drroyf_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous"><!-- HEAD_svelte-1drroyf_END -->`, ""} ${validate_component(GlobalLayout, "PageLayout").$$render($$result, { fm }, {}, {
    default: () => {
      return ` ${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export {
  Layout as default
};
