import * as universal from '../entries/pages/quant/_layout.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/quant/+layout.js";
export const imports = ["_app/immutable/nodes/2.09c8edfb.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/index.9e10714d.js"];
export const stylesheets = [];
export const fonts = [];
