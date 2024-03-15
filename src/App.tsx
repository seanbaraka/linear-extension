import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <section className="m-auto flex min-h-screen w-full max-w-screen-md items-center justify-center">
      <div className="">
        <h1 className="my-2 text-center text-3xl font-light">
          Out goes Linear, in with TLinear
        </h1>
        <div className="flex flex-col items-center">
          <p className="my-4 flex flex-col items-center justify-center gap-2">
            <span className="text-xs uppercase text-gray-400">
              Created Issues
            </span>
            <span className="text-3xl">{count}</span>
          </p>
          <button
            className="cursor-pointer rounded-lg border-none bg-zinc-700 px-6 py-3 text-sm text-zinc-300 shadow shadow-xl transition hover:bg-blue-600 hover:text-white hover:ease-in"
            onClick={() => setCount((count) => count + 1)}
          >
            Create your first Issue
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
