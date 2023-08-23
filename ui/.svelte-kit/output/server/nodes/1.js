

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.8ce5b27a.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/index.9e10714d.js","_app/immutable/chunks/stores.5746af85.js","_app/immutable/chunks/singletons.a5297d26.js"];
export const stylesheets = [];
export const fonts = [];
