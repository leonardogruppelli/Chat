import guard from 'layouts/guard'
import main from 'layouts/main'
import chat from 'layouts/chat'
import communications from 'layouts/communication'
import notifications from 'layouts/notification'

import auth from 'pages/auth'
import home from 'pages/index'
import users from 'pages/users'
import room from 'pages/chat/_user'
import profile from 'pages/profile'
import communication from 'pages/communication/_id'
import notification from 'pages/notification/_id'
import error from 'pages/error'

const routes = [
	{
		path: '/auth',
		component: guard,
		children: [
			{
				path: '/auth',
				component: auth
			}
		]
	},
	{
		path: '/',
		component: main,
		children: [
			{
				path: '/',
				component: home
			},
			{
				path: '/users',
				component: users
			},
			{
				path: '/profile',
				component: profile
			}
		]
	},
	{
		path: '/communication/:id',
		component: communications,
		children: [
			{
				path: '/communication/:id',
				component: communication
			},
		]
	},
	{
		path: '/notification/:id',
		component: notifications,
		children: [
			{
				path: '/notification/:id',
				component: notification
			}
		]
	},
	{
		path: '/chat/:user',
		component: chat,
		children: [
			{
				path: '/chat/:user',
				component: room
			}
		]
	}
]

if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: error
	})
}

export default routes
