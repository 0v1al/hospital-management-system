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