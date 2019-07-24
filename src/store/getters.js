const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  route: state => state.user.currentRoute,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  position: state => state.user.position,
  authorities: state => state.user.authorities,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  crud_level: state => state.user.crud_level,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
