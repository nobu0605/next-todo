import { Button, Input } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { mainColor, backGroundColor } from "@constants/colors";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (e: any) {
      alert(e.response.data.message);
    }
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginSection>
          <ServiceName>Todo app</ServiceName>
          <LoginTitle>登録</LoginTitle>
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
                name="name"
                type="text"
                placeholder="Name"
                sx={{ width: "250px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
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
        <Link style={{ marginTop: "15px" }} href="/login">
          既にアカウントをお持ちの方はこちら
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
