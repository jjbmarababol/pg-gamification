import React, { FunctionComponent } from "react";
import loading from "../ui/images/loading-whale.gif";

interface ILoadingPage {}

export const LoadingPage: FunctionComponent<ILoadingPage> = props => {
  return (
    <div style={{ backgroundImage: `url(${loading})`, height: "100vh" }}></div>
  );
};
