// Configuracion de las rutas
import React from 'react'
import {
	Route,
	Switch,
} from 'react-router-dom';

import Home from './Home.jsx';
import Post from './Post.jsx';
import Error404 from './Error404.jsx';
import Profile from './Profile.jsx';

function Pages() {
  return (
    <main role="application">

      <Switch>
        {/* Home list posts */}
        <Route
          path="/"
          exact
          component={Home}
        />
      {/* Post detail */}
        <Route
          path="/post/:id"
          exact
          component={Post}
        />
        {/* User Profile */}
        <Route
          path="/user/:id"
          exact
          component={Profile}
        />
        {/* Page 404 */}
        <Route component={Error404} />
      </Switch>
    </main>
  )

}

export default Pages
