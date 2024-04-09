/* eslint-disable no-unused-vars */
import { Issue, User, Organization } from "@linear/sdk";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";

export const clientId = import.meta.env.VITE_LINEAR_CLIENT_ID as string;
export const clientSecret = import.meta.env.VITE_LINEAR_CLIENT_SECRET as string;
export const redirectUrl = import.meta.env.PROD
  ? "https://linear-extension.vercel.app/oauth/callback"
  : "http://localhost:5173/oauth/callback";

export enum IssueState {
  Done = "Done",
  Review = "In Review",
  Todo = "Todo",
  Backlog = "Backlog",
  InProgress = "In Progress",
  Cancelled = "Cancelled",
  Duplicate = "Duplicate",
}

export const useLinearAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useLinearAuth must be used within a AuthProvider");
  }
  return { client: context.linearClient };
};

export const useGetIssues = (status?: IssueState) => {
  const [activeIssues, setActiveIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { client: client1 } = useLinearAuth();

  useEffect(() => {
    if (!isLoading) return;
    if (client1) {
      client1
        .issues({
          filter: { state: { name: { contains: status } } },
        })
        .then((data) => {
          setIsLoading(false);
          setActiveIssues(data.nodes);
        });
    }
  }, [activeIssues, isLoading, status, client1]);
  return { activeIssues, isLoading };
};

export const useLinearUser = () => {
  const [user, setUser] = useState<User>();
  const { client: client1 } = useLinearAuth();

  useEffect(() => {
    if (client1) {
      client1.viewer.then((user) => {
        setUser(user);
      });
    }
  }, [user, client1]);

  return user;
};

export const useGetUserAssignedIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { client: client1 } = useLinearAuth();

  useEffect(() => {
    if (!isLoading) return;
    if (client1) {
      client1.viewer.then((user) => {
        client1
          .issues({
            filter: { assignee: { id: { eq: user.id } } },
          })
          .then((data) => {
            setIssues(data.nodes);
            setIsLoading(false);
          });
      });
    }
  }, [issues, isLoading, client1]);
  return { issues, isLoading };
};

export const useLinearOrg = () => {
  const [organization, setOrganization] = useState<Organization>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { client: client1 } = useLinearAuth();

  useEffect(() => {
    if (!isLoading) return;
    if (client1) {
      client1.organization.then((organization) => {
        setIsLoading(false);
        setOrganization(organization);
      });
    }
  }, [organization, isLoading, client1]);
  return { organization, isLoading };
};
