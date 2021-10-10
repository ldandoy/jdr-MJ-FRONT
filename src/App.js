import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Default from './Layouts/Default'
import Auth from './Layouts/Auth'

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Active from './pages/Active'

import MyAccount from './pages/account/Show'

import Senarii from './pages/account/senarii/List'
import SenariiEdit from './pages/account/senarii/Edit'

import List from './pages/senarii/List'
import Start from './pages/senarii/Start'
import Section from './pages/senarii/Section'

import Toast from './components/Toast/Toast'

import { refreshToken } from './redux/actions/authActions'

function App() {
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state)

  useEffect(() => {
    if(!auth || !auth.access_token || !auth.user) {
      dispatch(refreshToken())
    }
  }, [dispatch, auth])

  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path="/">
          <Default>
            <Home />
          </Default>
        </Route>
        <Route exact path="/my-account">
          <Default isPrivate={true}>
            <MyAccount />
          </Default>
        </Route>
        <Route exact path="/senarii">
          <Default>
            <List />
          </Default>
        </Route>
        <Route exact path="/senarii/:senarii_id">
          <Default>
            <Start />
          </Default>
        </Route>
        <Route exact path="/senarii/:senarii_id/sections/:sections_index">
          <Default isPrivate={true}>
            <Section />
          </Default>
        </Route>
        <Route exact path="/account/senarii">
          <Default>
            <Senarii />
          </Default>
        </Route>
        <Route exact path="/account/senarii/:senarii_id/edit">
          <Default>
            <SenariiEdit />
          </Default>
        </Route>
        <Route path="/login">
          <Auth>
            <Login />
          </Auth>
        </Route>
        <Route path="/logout">
          <Auth>
            <Logout />
          </Auth>
        </Route>
        <Route path="/register">
          <Auth>
            <Register />
          </Auth>
        </Route>
        <Route path="/forgot_password">
          <Auth>
            <ForgotPassword />
          </Auth>
        </Route>
        <Route path="/reset_password/:reset_token">
          <Auth>
            <ResetPassword />
          </Auth>
        </Route>
        <Route path="/active/:slug">
          <Auth>
            <Active />
          </Auth>
        </Route>
      </Switch>
      <Toast />
    </Router>
  );
}

export default App;
