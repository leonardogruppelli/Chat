import guard from 'layouts/guard'
import main from 'layouts/main'
import chat from 'layouts/chat'

import auth from 'pages/auth'
import users from 'pages/index'
import room from 'pages/chat/_user'
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
        component: users
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
