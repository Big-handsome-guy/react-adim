import React from "react";
import MainLayout from "@/layout/index";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function RequireAuth() {
  const { isLogin } = useSelector((state: RootState) => state.user);
  return <div>{isLogin ? <MainLayout /> : <Navigate to="/login" />}</div>;
}
