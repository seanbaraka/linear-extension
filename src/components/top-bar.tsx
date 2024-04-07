import { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useLinearOrg } from "../hooks/linear";

export default function TopBarNav() {
  const [OpenProfile, setOpenProfile] = useState(false);
  const org = useLinearOrg();

  return (
    <>
      <div className="flex flex-row items-start my-4 mx-8 py-2 border-b-2 border-gray-600">
        {/* <h1>You are logged in {session.user.email}</h1> */}
        <div className="bg-blue-400 inline-block p-1 text-sm rounded">
          {org && <img src={org?.logoUrl} alt="logo" />}
        </div>
        <h2
          className="inline-block ml-2"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          {org && org.name}
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
    </>
  );
}
