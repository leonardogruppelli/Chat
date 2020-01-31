const routes = [
  {
    path: '/auth',
    component: () => import('layouts/guard'),
    children: [
      {
        path: '/auth',
        component: () => import('pages/auth')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/main'),
    children: [
      {
        path: '/',
        component: () => import('pages/index')
      }
    ]
  },
  {
    path: '/chat/:user',
    component: () => import('layouts/chat'),
    children: [
      {
        path: '/chat/:user',
        component: () => import('pages/chat/_user')
      }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error')
  })
}

export default routes
