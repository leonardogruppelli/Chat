module.exports = function(ctx) {
	return {
		boot: [
			'guard',
			'socket',
			'validation'
		],

		css: [
			'app.styl'
		],

		extras: [
			'roboto-font',
			'line-awesome'
		],

		framework: {
			iconSet: 'line-awesome',
			lang: 'en-us',
			all: 'auto',
			components: [
			],
			directives: [
			],
			plugins: [
				'Cookies',
				'Notify'
			]
		},

		supportIE: false,

		build: {
			scopeHoisting: true,
			vueRouterMode: 'hash',
			showProgress: true,
			gzip: false,
			analyze: false,
			extendWebpack(cfg) {}
		},

		devServer: {
			https: false,
			port: 8080,
			open: true
		},

		animations: [
		],

		ssr: {
			pwa: false
		},

		pwa: {
			workboxPluginMode: 'GenerateSW',
			workboxOptions: {},
			manifest: {
				name: 'Chat',
				short_name: 'Chat',
				description: 'Chat App',
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#027be3',
				icons: [
					{
						src: 'statics/icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: 'statics/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'statics/icons/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png'
					},
					{
						src: 'statics/icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: 'statics/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		},

		cordova: {
			id: 'org.cordova.chat'
		},

		capacitor: {
			hideSplashscreen: true
		},

		electron: {
			bundler: 'packager',

			packager: {},

			builder: {
				appId: 'chat'
			},

			nodeIntegration: true,

			extendWebpack(cfg) {
				// do something with Electron main process Webpack cfg
				// chainWebpack also available besides this extendWebpack
			}
		}
	}
}
