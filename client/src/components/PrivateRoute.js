import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { getCookie } from "./cookie"; 

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => getCookie("token") ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  )}  
  />
);

export const PrivateRouteDoctor = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => getCookie("tokenDoctor") ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  )}  
  />
);

export const PrivateRouteUser = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => getCookie("tokenUser") ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  )}  
  />
);

export const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => getCookie("tokenAdmin") ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  )}  
  />
);