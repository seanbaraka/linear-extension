/* eslint-disable no-unused-vars */
import { LinearClient, Issue, User, Organization } from "@linear/sdk";
import { useEffect, useState } from "react";

export const clientId = import.meta.env.VITE_LINEAR_CLIENT_ID as string;
export const clientSecret = import.meta.env.VITE_LINEAR_CLIENT_SECRET as string;
export const redirectUrl = import.meta.env.PROD
  ? "https://linear-extension.vercel.app/oauth/callback"
  : "http://localhost:5173/oauth/callback";

export const client1 = new LinearClient({
  accessToken: localStorage.getItem("linearToken") || "",
});

export enum IssueState {
  Done = "Done",
  Review = "In Review",
  Todo = "Todo",
  Backlog = "Backlog",
  InProgress = "In Progress",
  Cancelled = "Cancelled",
  Duplicate = "Duplicate",
}

export const useGetIssues = (status?: IssueState) => {
  const [activeIssues, setActiveIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading) return;
    client1
      .issues({
        filter: { state: { name: { contains: status } } },
      })
      .then((data) => {
        setIsLoading(false);
        setActiveIssues(data.nodes);
      });
  }, [activeIssues, isLoading, status]);
  return { activeIssues, isLoading };
};

export const useLinearUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    client1.viewer.then((user) => {
      setUser(user);
    });
  }, [user]);

  return user;
};

export const useGetUserAssignedIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading) return;
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
  }, [issues, isLoading]);
  return { issues, isLoading };
};

export const useLinearOrg = () => {
  const [organization, setOrganization] = useState<Organization>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!isLoading) return;
    client1.organization.then((organization) => {
      setIsLoading(false);
      setOrganization(organization);
    });
  }, [organization, isLoading]);
  return { organization, isLoading };
};
