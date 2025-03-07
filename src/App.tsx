import { useState } from "react";

function Index() {
  const [current, setCurrent] = useState("");
  const [prev, setPrev] = useState("");
  var result = 0;
  function calculate(num: string) {
    switch (typeof num) {
      case "number":
        setCurrent(current + num);
        break;
      default:
        switch (num) {
        }
    }
  }
  const calcButtons = [
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];
  return (
    <div className="bg-linear-to-r from-cyan-500 to-blue-500 justify-center items-center flex w-screen h-screen">
      <div>
        <div>{current}</div>
        {/* maybe change this out for a map, adding the col-span is gonna be annoying. */}
        <div className="grid grid-cols-4 grid-rows-4 text-5xl *:border-cyan-900 *:cursor-pointer *:hover:bg-blue-400 *:border-[1px] *:px-4 *:pb-2 *:pt-1 *:text-center">
          {calcButtons.map((buttons, index) => (
            <div
              className={index === 0 || index === 15 ? "col-span-2" : ""}
              key={buttons}
              onClick={() => {
                calculate(buttons);
              }}
            >
              {buttons}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
