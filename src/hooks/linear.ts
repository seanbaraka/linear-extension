/* eslint-disable no-unused-vars */
import { LinearClient, Issue, User, Organization } from "@linear/sdk";
import { useEffect, useState } from "react";

export const client1 = new LinearClient({
  apiKey: import.meta.env.VITE_LINEAR_API_KEY as string,
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

  useEffect(() => {
    client1
      .issues({
        filter: { state: { name: { contains: status } } },
      })
      .then((data) => {
        setActiveIssues(data.nodes);
      });
  }, [activeIssues, status]);
  return activeIssues;
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

export const useLinearOrg = () => {
  const [organization, setOrganization] = useState<Organization>();
  useEffect(() => {
    client1.organization.then((organization) => {
      setOrganization(organization);
    });
  }, [organization]);
  return organization;
};
console.log("linear");
