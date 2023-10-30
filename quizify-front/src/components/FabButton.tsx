"use client";
import React from "react";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const FabButton = () => {
  return (
    <Fab alwaysShowTitle={true}>
      <Action text="Notifications" />
      <Action text="New Quiz" />
      <Action text="Theme">
        <i className="fa fa-help" />
      </Action>
    </Fab>
  );
};

export default FabButton;
