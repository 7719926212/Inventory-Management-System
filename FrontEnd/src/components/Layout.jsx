import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return <><Navbar /><main className="container-fluid px-3 px-lg-5 py-4 ims-page">{children}</main></>;
}
