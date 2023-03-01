import { Button, Input } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import Loading from "@components/atoms/loading";
import { mainColor, backGroundColor } from "@constants/colors";
// import axios from "@utils/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/authenticate`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res: any) => {
          localStorage.setItem("uuid", res.data.uuid);
          router.push("/");
        });
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginSection>
          <ServiceName>Todo app</ServiceName>
          <LoginTitle>ログイン</LoginTitle>
          <br />
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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
                sx={{ width: "250px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                sx={{ width: "250px", marginTop: "15px" }}
              />
              <Button variant="contained" type="submit" sx={{ marginTop: "25px" }} size="large">
                送信
              </Button>
            </div>
          </form>
        </LoginSection>
        <Link style={{ marginTop: "15px" }} href="/signup">
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
  height: 800px;
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
