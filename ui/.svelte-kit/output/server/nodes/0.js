import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.5b4e02a7.js","_app/immutable/chunks/0.30a7da82.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/index.9e10714d.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/Link.svelte_svelte_type_style_lang.5eb5f8aa.js","_app/immutable/chunks/singletons.15979d2e.js","_app/immutable/chunks/stores.c82c2886.js","_app/immutable/chunks/Link.eb367cf2.js"];
export const stylesheets = ["_app/immutable/assets/0.39017541.css","_app/immutable/assets/Link.0d396f12.css","_app/immutable/assets/ReloadPrompt.6625b86a.css"];
export const fonts = ["_app/immutable/assets/Dank Mono Regular.20068931.otf","_app/immutable/assets/Dank Mono Italic.53f4f38a.otf"];
