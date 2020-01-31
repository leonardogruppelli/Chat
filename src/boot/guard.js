export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    to.matched.some(route => {
      const logged = store.getters.logged

      if (!logged && route.path != '/auth') {
        next({
          path: '/auth',
          replace: true
        })

        return
      }

      next()
    })
  })
}
