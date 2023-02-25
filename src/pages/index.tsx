import axios from "axios";
import { useEffect, useState } from "react";
import Template from "@components/templates/template";

export default function Home() {
  const [res, setRes] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL || "")
      .then((response: any) => {
        setRes(response.data);
      })
      .catch(() => {
        console.log("hoge");
      });
  }, []);

  return (
    <Template>
      <div>{res}</div>
    </Template>
  );
}
