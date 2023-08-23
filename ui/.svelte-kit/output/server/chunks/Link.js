import { c as create_ssr_component, f as spread, g as escape_attribute_value, h as escape_object, e as escape, v as validate_component } from "./ssr.js";
import { E as External } from "./Link.svelte_svelte_type_style_lang.js";
import { b as base } from "./paths.js";
const css = {
  code: ".highlight.svelte-1rl6eur{--at-apply:text-svp-primary}.link.svelte-1rl6eur{--at-apply:'inline-flex hover:text-svp-hover cursor-pointer items-center transition-200 transition-color'}.link.no-inline.svelte-1rl6eur{--at-apply:'flex'}.active.svelte-1rl6eur{--at-apply:'svp-gradient-text hover:svp-gradient-text cursor-default'}.admonition .highlight{--uno:'text-[var(--admonition-color)]'}.admonition .link{--uno:'hover:text-[var(--admonition-color)] hover:opacity-80'}",
  map: null
};
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isExternal;
  let toWithBase;
  let { label = "" } = $$props;
  let { to = "" } = $$props;
  let { inline = true } = $$props;
  let { active = false } = $$props;
  let { highlight = true } = $$props;
  let { withBase = true } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.highlight === void 0 && $$bindings.highlight && highlight !== void 0)
    $$bindings.highlight(highlight);
  if ($$props.withBase === void 0 && $$bindings.withBase && withBase !== void 0)
    $$bindings.withBase(withBase);
  $$result.css.add(css);
  isExternal = /^https?/.test(to);
  toWithBase = isExternal ? to : `${base}${to}`;
  return `<a${spread(
    [
      {
        href: escape_attribute_value(withBase ? toWithBase : to)
      },
      { class: "link" },
      escape_object(isExternal ? { target: "_blank" } : {}),
      {
        "aria-label": escape_attribute_value(label)
      }
    ],
    {
      classes: (!inline ? "no-inline" : "") + " " + (active ? "active" : "") + " " + (highlight ? "highlight" : "") + " svelte-1rl6eur"
    }
  )}>${slots.pre ? slots.pre({}) : ``} <div>${escape(label)}</div> ${isExternal ? `${validate_component(External, "External").$$render($$result, {}, {}, {})}` : ``} ${slots.default ? slots.default({}) : ``} </a>`;
});
export {
  Link as L
};
