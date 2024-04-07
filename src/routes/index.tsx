import { Link, createFileRoute } from "@tanstack/react-router";
import { useAuthContext } from "../hooks/userAuth";
import { FaSortDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import TopBarNav from "../components/top-bar";
import { useLinearUser } from "../hooks/linear";
import { Issue } from "@linear/sdk";

// Api key authentication


function Index() {
  const [inPreview, setInPreview] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [toDo, setToDo] = useState(false);
  const [backLog, setBackLog] = useState(false);
  const [myIssues, setMyIssues] = useState<Issue[]>([]);

  const [seconds, setSeconds] = useState(Date.now());
  const [dayDate, setDayDate] = useState("");
  const [timeNow, setTimeNow] = useState(
    new Date(Date.now()).toLocaleTimeString(),
  );
  // const [pending, setPending] = useState(false);
  // const [preview, setPreview] = useGetIssues(IssueState.Review);
  // const [inTodo, setInTodo] = useState(false);
  // const [inBacklog, setInBacklog] = useState(false);

  useEffect(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    setInterval(() => {
      setSeconds(Date.now());
      // calculate the day and time
      const date = new Date(Date.now());
      const day = days[date.getDay()];
      const dateString = date.getDate();
      setDayDate(day + " " + dateString);
      setTimeNow(date.toLocaleTimeString());
    }, 1000);
  }, [seconds, dayDate, timeNow]);

  // First check if we have an active session
  const { session } = useAuthContext();
  // const allIssues = useGetIssues();

  // const pendingIssues = useGetIssues(IssueState.InProgress);
  // const inPreviewIssues = useGetIssues(IssueState.Review);
  // const toDoIssues = useGetIssues(IssueState.Todo);
  // const Backlog = useGetIssues(IssueState.Backlog);

  const me = useLinearUser();
  if (me) {
    me.assignedIssues().then((data) => {
      setMyIssues(data.nodes);
    });
  }

  // If we don't have a session recorded, prompt the user to login
  if (!session) {
    return (
      <div className="flex flex-col items-start">
        <p className="my-4 text-xl">Oopsie, you need to log back in</p>
        <Link to="/login" className="rounded-md bg-zinc-800 px-8 py-2 text-sm">
          Let's Go
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <TopBarNav />
        <div className="my-4 mx-8">
          <h2 className="text-gray-400 text-4xl">
            {dayDate}
            <span className="text-lg"> {timeNow}</span>
          </h2>
          {me && (
            <p className="my-4 mx-4 text-2xl text-center mt-6 mb-8">
              Good Afternoon {me.displayName}, here is what’s planned
            </p>
          )}
          <div className="flex justify-center flex-col items-center">
            <button type="submit" className="bg-zinc-800 p-2 rounded-lg m-2">
              My issues
              <FaSortDown className="inline ml-1 mb-2" />
            </button>
            {myIssues.length > 0 && (
              <>
                <h1 className="mt-4 text-6xl">{myIssues.length}</h1>
                {/* {myIssues.map((issue) => (
                  <p key={issue.id}>
                    {issue.number} {issue.title}
                  </p>
                ))} */}
              </>
            )}
            <h2 className="text-sm mt-4 text-gray-300">
              3 Urgent 3 High 4 Low
            </h2>
          </div>
        </div>
        <div className="flex items-center my-8 mx-8">
          <button
            className={`flex items-center ${
              inPreview ? "bg-zinc-800" : ""
            } text-sm rounded-lg px-1 py-1`}
            onClick={() => {
              setInPreview(true);
              setInProgress(false);
              setToDo(false);
              setBackLog(false);
            }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-green-600 overflow-hidden mr-1">
              <div className="h-full bg-green-600 w-3/4"></div>
            </div>
            In Preview
          </button>
          <button
            className={`flex items-center ${
              inProgress ? "bg-zinc-800" : ""
            } text-sm rounded-lg ml-1 px-1 py-1`}
            onClick={() => {
              setInPreview(false);
              setInProgress(true);
              setToDo(false);
              setBackLog(false);
            }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-yellow-400 overflow-hidden mr-1">
              <div className="h-full bg-yellow-400 w-1/2"></div>
            </div>
            In Progress
          </button>
          <button
            className={`flex items-center ${
              toDo ? "bg-zinc-800" : ""
            } text-sm rounded-lg ml-1 px-1 py-1`}
            onClick={() => {
              setInPreview(false);
              setInProgress(false);
              setToDo(true);
              setBackLog(false);
            }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 overflow-hidden mr-1"></div>
            To Do
          </button>
          <button
            className={`flex items-center ${
              backLog ? "bg-zinc-800" : ""
            } text-sm rounded-lg ml-1 px-1 py-1`}
            onClick={() => {
              setInPreview(false);
              setInProgress(false);
              setToDo(false);
              setBackLog(true);
            }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 border-dotted overflow-hidden mr-1"></div>
            Backlog
          </button>
        </div>
        <div>
          <div className="flex items-center mx-8 my-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded ml-1 mr-1"
            />
            <span className="m-4">---</span>
            <h2 className="text-sm">End To End Twitch Support</h2>
          </div>
          <div className="flex items-center mx-8 my-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded ml-1 mr-1"
            />
            <span className="m-4">---</span>
            <h2 className="text-sm">Language Switcher</h2>
          </div>
          <div className="flex items-center mx-8 my-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded ml-1 mr-1"
            />
            <span className="m-4">---</span>
            <h2 className="text-sm">Revamp the Home page to include the ...</h2>
          </div>
          <div className="flex items-center mx-8 my-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded ml-1 mr-1"
            />
            <span className="m-4">---</span>
            <h2 className="text-sm">Support Multiple Languages</h2>
          </div>
        </div>
      </div>
    );
  }
}

export const Route = createFileRoute("/")({
  component: Index,
});
