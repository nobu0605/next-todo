import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Accordion, Icon, CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import Loading from "@components/atoms/loading";
import { mainColor, backGroundColor } from "@constants/colors";

type OwnPros = {
  language: string;
};
type Props = OwnPros;
type State = {
  loginInput: {
    password: string;
    email: string;
    [key: string]: any;
  };
  loginError: string;
  activeIndex: number;
  isLoading: boolean;
};

export default function Login() {
  const [res, setRes] = useState(false);
  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     loginInput: {
  //       password: "",
  //       email: "",
  //     },
  //     loginError: "",
  //     activeIndex: 0,
  //     isLoading: false,
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, accordionProps: any) => {
  //   const { index } = accordionProps;
  //   const { activeIndex } = this.state;
  //   const newIndex = activeIndex === index ? -1 : index;

  //   this.setState({ activeIndex: newIndex });
  // };

  // handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
  //   const loginInput = { ...this.state.loginInput };
  //   loginInput[e.target.name] = e.target.value;
  //   this.setState({ loginInput });
  // }

  // handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   this.setState({ isLoading: true });

  //   axios
  //     .post("/api/login", {
  //       email: this.state.loginInput.email,
  //       password: this.state.loginInput.password,
  //     })
  //     .then((response: any) => {
  //       localStorage.setItem("token", response.data.token);
  //       this.setState({ isLoading: false });
  //       this.props.history.push("/home");
  //     })
  //     .catch((error: any) => {
  //       this.setState({ isLoading: false });
  //       if (error.response.status === 401) {
  //         return this.setState({
  //           loginError: this.props.intl.formatMessage({
  //             id: "login.login401Error",
  //             defaultMessage: "パスワードかメールアドレスが間違っています。",
  //           }),
  //         });
  //       }
  //       return this.setState({
  //         loginError: this.props.intl.formatMessage({
  //           id: "error.serverError",
  //           defaultMessage: "何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。",
  //         }),
  //       });
  //     });
  // }

  // const { activeIndex, loginError, isLoading } = this.state;

  // if (isLoading === true) {
  //   return <Loading isDataFetching={true} />;
  // }

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginSection>
          <ServiceName>Todo app</ServiceName>
          <LoginTitle>ログイン</LoginTitle>
          <br />
          <form
          // onSubmit={this.handleSubmit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Input
                name="email"
                type="email"
                placeholder="E-mail address"
                // onChange={(e: any) => this.handleChange(e)}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                // onChange={(e) => this.handleChange(e)}
                style={{ marginTop: "15px" }}
              />
              {/* {loginError && <span style={{ color: "red", marginTop: "10px" }}>{loginError}</span>} */}
              <Button type="submit" style={{ color: "black", marginTop: "25px" }} size="large">
                送信
              </Button>
            </div>
          </form>
        </LoginSection>
        <Link style={{ marginTop: "15px" }} href="/register">
          登録がお済みでない方はこちら
        </Link>
      </LoginContainer>
    </LoginWrapper>
  );
}

const ServiceName = styled.h1`
  font-size: 50px;
  text-align: left;
  margin-right: 20px;
  margin-bottom: 45px;
  font-family: Pacifico;
  color: ${mainColor};
`;

const LoginTitle = styled.span`
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
  font-weight: bold;
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${backGroundColor};
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90%;
`;

const LoginSection = styled.div`
  width: 30%;
  height: 75%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;
