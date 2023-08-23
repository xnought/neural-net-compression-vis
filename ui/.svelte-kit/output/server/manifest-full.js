export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["1.png","128.png","16.png","2.png","256.png","32.png","4.png","64.png","8.png","dog.png","logo.png","stable.png","sveltepress.svg","sveltepress@3x.png","taller.png","woman.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.84ad1282.js","app":"_app/immutable/entry/app.d5765a94.js","imports":["_app/immutable/entry/start.84ad1282.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/singletons.07303d39.js","_app/immutable/entry/app.d5765a94.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/index.9e10714d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/quant",
				pattern: /^\/quant\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
