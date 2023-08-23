

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.91483b13.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/index.9e10714d.js","_app/immutable/chunks/stores.c82c2886.js","_app/immutable/chunks/singletons.15979d2e.js"];
export const stylesheets = [];
export const fonts = [];
