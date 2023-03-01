import { useRouter } from "next/router";
import React, { createContext, FC, useEffect, useReducer, ReactNode } from "react";
import AuthReducer from "@reducers/AuthReducer";
import axios from "@utils/axios";

interface IProps {
  children: ReactNode;
}

interface IInitialState {
  user: any;
  isLoading: boolean;
  [key: string]: any;
}

const AuthContext = createContext<any | undefined>({});

const initialState: IInitialState = {
  user: null,
  isLoading: true,
};

// We can add the routes we don't want to check authentication.
const urlsWithoutAuth = ["/signup", "/login"];

const AuthProvider = ({ children }: IProps) => {
  const router = useRouter();
  const [authState, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    checkAuth();
  }, [router.pathname]);

  function checkAuth() {
    if (urlsWithoutAuth.includes(router.pathname)) {
      return;
    }

    const uuid = localStorage.getItem("uuid");
    if (!uuid) {
      return (location.pathname = "/login");
    }

    console.log("uuid: ", uuid);
    axios
      .post(`/getUser`, {
        uuid,
      })
      .then((response: any) => {
        authState["user"] = response.data;
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return <AuthContext.Provider value={{ authState, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
