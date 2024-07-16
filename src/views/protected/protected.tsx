"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {  useEffect } from "react";
import { RootState } from "@/helpers/hooks/useStoreHooks";

const ProtectedRoute = ({ children }:any) => {
  const router = useRouter();
  const token = useSelector((state:RootState)=> state.Auth);

  useEffect(() => {
    if (!token) {
      // Redirect to login page if user is not authenticated
      router.push('/auth/login');
    }
  }, [token]);

  return <>{children}</>
};

export default ProtectedRoute;
