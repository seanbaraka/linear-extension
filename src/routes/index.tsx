import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../hooks/userAuth";
import { supabase } from "../utils";
import { useState } from "react";

function Index() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
  };
  // First check if we have an active session
  const { session } = useAuthContext();

  const navigate = useNavigate();
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
        <div className="flex flex-row items-start my-4 mx-8">
          {/* <h1>You are logged in {session.user.email}</h1> */}
          <div className="bg-blue-400 inline-block p-1 text-sm rounded">SW</div>
          <p className="inline-block ml-2">
            <span>Sweep</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a.75.75 0 01-.53-.22l-4.25-4.25a.75.75 0 111.06-1.06L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-.53.22z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>

          <div className="inline-block ml-auto">
            <div className="w-5 h-5 rounded-full border-2 mt-1 border-gray-400"></div>
          </div>
        </div>
        <div className="border-b-2 border-gray-600 mx-8"></div>
        <div className="my-4 mx-8">
          <h2 className="text-gray-400 text-4xl">
            Mon. 18 <span className="text-lg"> 01:32 PM</span>
          </h2>
          <p className="my-4 mx-4 text-2xl text-center">
            Good Afternoon Ethan, here is what’s planned
          </p>
          <div className="flex justify-center flex-col items-center">
            <button type="submit" className="bg-zinc-800 p-1 rounded-lg">
              My issues
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 inline"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a.75.75 0 01-.53-.22l-4.25-4.25a.75.75 0 111.06-1.06L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-.53.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <h1 className="mt-4 text-6xl">10</h1>
            <h2 className="text-xs mt-4 text-gray-300">
              3 Urgent 3 High 4 Low{" "}
            </h2>
          </div>
        </div>
        <div className="flex items-center my-8 mx-8">
          <div className="w-4 h-4 rounded-full border-2 border-green-600 overflow-hidden">
            <div className="h-full bg-green-600 w-3/4"></div>
          </div>
          <button
            type="button"
            className={`text-xs ${clicked ? "bg-zinc-800 p-1 rounded" : ""}`}
            onClick={handleClick}
          >
            In Preview
          </button>
          <div className="flex items-center ml-4">
            <div className="w-4 h-4 rounded-full border-2 border-yellow-400 overflow-hidden">
              <div className="h-full bg-yellow-400 w-1/2"></div>
            </div>
            <button
              type="button"
              className={`text-xs ${clicked ? "bg-zinc-800 p-1 rounded" : ""}`}
              onClick={handleClick}
            >
              In Progress
            </button>
            <div className="flex items-center  ml-4">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 overflow-hidden"></div>
              <button
                type="button"
                className={`text-xs ${clicked ? "bg-zinc-800 p-1 rounded" : ""}`}
                onClick={handleClick}
              >
                To Do
              </button>
              <div className="flex items-center  ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 overflow-hidden"></div>
                <button
                  type="button"
                  className={`text-xs ${clicked ? "bg-zinc-800 p-1 rounded" : ""}`}
                  onClick={handleClick}
                >
                  Back Log
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          className="my-4 bg-zinc-800 px-4 py-2 text-sm ml-2"
          onClick={async () => {
            await supabase.auth.signOut();
            await navigate({ to: "/login" });
          }}
        >
          Logout then
        </button>
      </div>
    );
  }
}

export const Route = createFileRoute("/")({
  component: Index,
});
