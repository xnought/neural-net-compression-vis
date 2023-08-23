import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { P as PageLayout } from "../../chunks/CopyCode.svelte_svelte_type_style_lang.js";
import "../../chunks/Link.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const fm = {
    "pageType": "md",
    "lastUpdate": "2023/08/22 16:13:31",
    "title": "_",
    "heroImage": "/logo.png",
    "tagline": "Under the underscore",
    "actions": [
      {
        "label": "View Articles",
        "type": "primary",
        "to": "/quant",
        "external": true
      }
    ],
    "anchors": []
  };
  return `${validate_component(PageLayout, "PageLayout").$$render($$result, { fm }, {}, {})}`;
});
export {
  Page as default
};
