"use client";

import Loading from "./loading";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { setAuth } from "@/context/slice/auth.slice";
import { logout } from "@/service/auth.service";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
// import Login from "@/components/layouts/LoginForm";

export default function Root({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    const user = localStorage.getItem("user");
    const loginAt = localStorage.getItem("loginAt");

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    if (token && user && loginAt) {
      if (Date.now() - new Date(loginAt).getTime() >= THIRTY_DAYS) {
        logout();
        window.location.href = "/login";
        return;
      }

      dispatch(
        setAuth({
          accessToken: token,
          user: JSON.parse(user),
        })
      );
    }

    setTimeout(() => {
      setChecking(false);
    }, 0);
  }, [dispatch]);

  // if (checking) return <Loading />;
  // if (!accessToken) return <Login />;

  return (
    <>
      <Header />
      <main className="min-h-[92.3vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
