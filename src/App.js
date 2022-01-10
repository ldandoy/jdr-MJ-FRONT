import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Default from './Layouts/Default'
import Auth from './Layouts/Auth'
import Admin from "./Layouts/Admin"

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
import SenariiNew from './pages/account/senarii/New'

import List from './pages/senarii/List'
import Start from './pages/senarii/Start'
import Section from './pages/senarii/Section'

import HomeAdmin from './pages/admin/Home'
import BugsIndexAdmin from './pages/admin/bugs/Index'

import Toast from './components/Toast/Toast'

import { setUserPending, setUserSuccess, setUserFail } from './redux/slices/authSlice'
// import { refreshToken } from './redux/actions/authActions'
import { getAPI } from './services/FetchData'

function App() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth)

  const getUser = useCallback( async() => {
    try {
      dispatch(setUserPending())
      const res = await getAPI("refresh_token")
      dispatch(setUserSuccess(res.data))
    } catch(err) {
      dispatch(setUserFail("Vous n'êtes pas authentifié"))
    }
  }, [dispatch] )

  useEffect(() => {
    if(!isAuth) {
      console.log("Not loggin !")
      getUser()
      // dispatch(refreshToken())
    } else {
      console.log("loggin !")
    }
  
  }, [dispatch, getUser, isAuth])

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
        <Route exact path="/scenarii/:scenarii_id/sections/:sections_index">
          <Default isPrivate={true}>
            <Section />
          </Default>
        </Route>
        <Route exact path="/scenarii/:scenarii_id">
          <Default>
            <Start />
          </Default>
        </Route>
        <Route exact path="/scenarii">
          <Default>
            <List />
          </Default>
        </Route>
        <Route exact path="/account/scenarii/new">
          <Default isPrivate={true}>
            <SenariiNew />
          </Default>
        </Route>
        <Route exact path="/account/scenarii">
          <Default isPrivate={true}>
            <Senarii />
          </Default>
        </Route>
        <Route exact path="/account/scenarii/:senarii_id/edit">
          <Default isPrivate={true}>
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

        <Route exact path="/admin">
          <Admin>
            <HomeAdmin />
          </Admin>
        </Route>
        <Route exact path="/admin/bugs">
          <Admin>
            <BugsIndexAdmin />
          </Admin>
        </Route>
      </Switch>
      <Toast />
    </Router>
  );
}

export default App;
