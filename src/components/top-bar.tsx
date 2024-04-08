import { useState } from "react";
import { useLinearOrg } from "../hooks/linear";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TopBarNav() {
  const [openProfile, setOpenProfile] = useState(false);
  const { organization } = useLinearOrg();

  return (
    <>
      {organization ? (
        <div className="flex gap-2 items-center my-4 mx-8 py-2 border-b-2 border-gray-600">
          {/* <h1>You are logged in {session.user.email}</h1> */}

          {organization && organization.logoUrl ? (
            <img src={organization.logoUrl} alt="logo" />
          ) : (
            <div className="bg-blue-400 flex justify-center items-center w-10 h-10 uppercase text-base font-semibold rounded-lg">
              <span>{organization?.name.slice(0, 2)}</span>
            </div>
          )}
          <h2
            className="flex gap-2"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            <span className="text-base uppercase font-medium">
              {organization.name}
            </span>
            {openProfile ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )}
            {/* dropdown */}
            <div
              className={`rounded-lg absolute top-16 ${openProfile ? "" : "hidden"} bg-zinc-800`}
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
      ) : null}
    </>
  );
}
