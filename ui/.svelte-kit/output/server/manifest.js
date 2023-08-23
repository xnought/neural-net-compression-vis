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
		client: {"start":"_app/immutable/entry/start.16bcb2ca.js","app":"_app/immutable/entry/app.b6e1340e.js","imports":["_app/immutable/entry/start.16bcb2ca.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/singletons.a5297d26.js","_app/immutable/entry/app.b6e1340e.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.655c61ae.js","_app/immutable/chunks/index.9e10714d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
