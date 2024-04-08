import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { clientId, clientSecret, redirectUrl } from "../../hooks/linear";
import { useEffect, useState } from "react";

function OauthCallback() {
  const params: any = Route.useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.code) {
      if (!isLoading) return;
      const linearApi = "https://api.linear.app/oauth/token";
      const body = {
        code: params.code,
        redirect_uri: redirectUrl,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
      };

      fetch(linearApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("linearToken", data.access_token);
            setIsLoading(false);
            navigate({ to: "/" });
          }
        })
        .catch((err) => {
          console.log("An error occured during oauth2.0", err);
          setIsLoading(false);
        });
    }
  }, [isLoading, params.code]);

  return <div> OauthCallback {params.code} </div>;
}

export const Route = createFileRoute("/oauth/callback")({
  component: OauthCallback,
});
