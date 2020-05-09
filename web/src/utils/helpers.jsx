async function checkAuthentication() {
  const authenticated = this.props.authState.isAuthenticated;

  console.log("authenticated::::", authenticated)

  if (authenticated !== this.state.authenticated) {
    if (authenticated && !this.state.userinfo) {
      const userinfo = await this.props.authService.getUser();
      this.setState({ authenticated, userinfo });
    } else {
      this.setState({ authenticated });
    }
  }
}

export { checkAuthentication };
