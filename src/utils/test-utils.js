function findRouteById(routes, id) {
  for (const route of routes) {
    if (route.id === id) return route;
    if (route.children) {
      const found = findRouteById(route.children, id);
      return found;
    }
  }
}

export default findRouteById;
