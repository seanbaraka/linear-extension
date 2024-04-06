import { Link, createFileRoute } from "@tanstack/react-router";
import { useAuthContext } from "../hooks/userAuth";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useState } from "react";

function Index() {
  const [inPreview, setInPreview] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [toDo, setToDo] = useState(false);
  const [backLog, setBackLog] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);

  // First check if we have an active session
  const { session } = useAuthContext();

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
          <h2
            className="inline-block ml-2"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            Sweep
            {OpenProfile ? (
              <FaSortUp className="inline ml-1" />
            ) : (
              <FaSortDown className="inline ml-1 mb-2" />
            )}
            {/* dropdown */}
            <div
              className={`rounded-lg absolute ${OpenProfile ? "" : "hidden"} bg-zinc-800`}
            >
              <div className="mr-24">
                <div className="m-2">
                  <label className="text-sm text-gray-400">
                    Select a workspace
                  </label>
                </div>
                <div className="m-2">
                  <ul>
                    <li>
                      <a href="/yooh/1">
                        <div className="bg-blue-400 inline-block p-1 text-sm rounded mb-4">
                          SW
                        </div>
                        <h2 className="inline-block ml-2">Sweep</h2>
                      </a>
                    </li>
                    <li>
                      <a href="/yooh/2">
                        <div className="bg-orange-400 inline-block px-3 py-1 text-sm rounded mb-4">
                          T
                        </div>
                        <h2 className="inline-block ml-2">Tashie</h2>
                      </a>
                    </li>
                    <li>
                      <a href="/yooh/3">
                        <div className="bg-purple-500 inline-block px-2 py-1 text-sm rounded mb-4">
                          LA
                        </div>
                        <h2 className="inline-block ml-2">Legends Assemble</h2>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </h2>

          <div className="inline-block ml-auto">
            <div className="w-5 h-5 rounded-full border-2 mt-1 border-gray-400"></div>
          </div>
        </div>
        <div className="border-b-2 border-gray-600 mx-8"></div>
        <div className="my-4 mx-8">
          <h2 className="text-gray-400 text-4xl">
            Mon. 18 <span className="text-lg"> 01:32 PM</span>
          </h2>
          <p className="my-4 mx-4 text-2xl text-center mt-6 mb-8">
            Good Afternoon Ethan, here is what’s planned
          </p>
          <div className="flex justify-center flex-col items-center">
            <button type="submit" className="bg-zinc-800 p-2 rounded-lg m-2">
              My issues
              <FaSortDown className="inline ml-1 mb-2" />
            </button>
            <h1 className="mt-4 text-6xl">10</h1>
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
