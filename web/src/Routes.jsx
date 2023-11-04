// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {Router, Route, Private} from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated={'landing'}>
        <Route path="/game" page={NotFoundPage} name="game" />
      </Private>
      <Route path="/" page={LandingPage} name="landing" prerender/>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
