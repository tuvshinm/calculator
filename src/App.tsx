import { useState } from "react";

function Index() {
  const [current, setCurrent] = useState<(string | number)[]>([]);
  const [result, setResult] = useState("");
  const [MD, setMD] = useState<{ index: number; action: string }[]>([]);
  const [PM, setPM] = useState<{ index: number; action: string }[]>([]);
  const [prev, setPrev] = useState("");
  function calculate(num: string | number) {
    switch (typeof num) {
      case "number":
        if (num === 0 && result === "") {
          break;
        } else {
          setResult(result + num.toString());
          break;
        }
      default:
        switch (num) {
          case "X":
            setCurrent((prevCurrent) => [...prevCurrent, result]);
            setResult("");
            setCurrent((prevCurrent) => [...prevCurrent, num]);
            setMD((prevMD) => [
              ...prevMD,
              { index: current.length + 1, action: "multiply" },
            ]);
            break;
          case "/":
            setCurrent((prevCurrent) => [...prevCurrent, result]);
            setResult("");
            setCurrent((prevCurrent) => [...prevCurrent, num]);
            setMD((prevMD) => [
              ...prevMD,
              { index: current.length + 1, action: "divide" },
            ]);
            break;
          case "-":
            setCurrent((prevCurrent) => [...prevCurrent, result]);
            setResult("");
            setCurrent((prevCurrent) => [...prevCurrent, num]);
            setPM((prevPM) => [
              ...prevPM,
              { index: current.length + 1, action: "minus" },
            ]);
            break;
          case "+":
            setCurrent((prevCurrent) => [...prevCurrent, result]);
            setResult("");
            setCurrent((prevCurrent) => [...prevCurrent, num]);
            setPM((prevPM) => [
              ...prevPM,
              { index: current.length + 1, action: "plus" },
            ]);
            break;
          case "CE":
            if (result !== "") {
              setResult(result.slice(0, -1));
            } else if (current.length > 0) {
              const lastItem = current[current.length - 1];
              setCurrent((prevCurrent) => prevCurrent.slice(0, -1));
              if (typeof lastItem === "string" && !isNaN(Number(lastItem))) {
                setResult(lastItem);
              }
            }
            break;
          case ".":
            if (result === "") {
              break;
            } else {
              setResult(result + ".");
              break;
            }
          case "=":
            if (result === "") {
              console.error("Please finish the equation or C");
            } else {
              const updatedCurrent = [...current, result];
              setResult("");
              const fullArray = MD.concat(PM);
              let offset = 0;
              fullArray.forEach((actionItem) => {
                actionItem.index -= offset;
                let b4 = actionItem.index - 1;
                let a4 = actionItem.index + 1;
                if (b4 >= 0 && a4 < updatedCurrent.length) {
                  const numB4 = Number(updatedCurrent[b4]);
                  const numA4 = Number(updatedCurrent[a4]);
                  if (!isNaN(numB4) && !isNaN(numA4)) {
                    let opResult = 0;
                    switch (actionItem.action) {
                      case "multiply":
                        opResult = numB4 * numA4;
                        break;
                      case "divide":
                        opResult = numB4 / numA4;
                        break;
                      case "plus":
                        opResult = numB4 + numA4;
                        break;
                      case "minus":
                        opResult = numB4 - numA4;
                        break;
                      default:
                        break;
                    }
                    updatedCurrent.splice(b4, a4 - b4 + 1, opResult);
                    offset += 2;
                  }
                }
              });
              if (updatedCurrent.length > 1) {
                const [left, operator, right] = updatedCurrent;
                let finalResult = 0;
                switch (operator) {
                  case "-":
                    finalResult = Number(left) - Number(right);
                    break;
                  case "+":
                    finalResult = Number(left) + Number(right);
                    break;
                  default:
                    console.error("fuck this operator is fucked:", operator);
                }
                setCurrent([]);
                setResult(finalResult.toString());
              } else {
                setCurrent([]);
                setResult(updatedCurrent.join(""));
              }
              setMD([]);
              setPM([]);
            }
            break;
        }
    }
  }
  const calcButtons = [
    "CE",
    "%",
    "/",
    7,
    8,
    9,
    "X",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "=",
  ];
  return (
    <div className="bg-linear-to-r from-cyan-500 to-blue-500 justify-center items-center flex w-screen h-screen">
      <div>
        <button
          onClick={() => {
            console.log(current);
          }}
        >
          Test
        </button>
        <div className="flex flex-row gap-2">
          {current.map((num, index) =>
            num !== "" ? <h1 key={index}>{num}</h1> : null
          )}
          {result && <h1>{result}</h1>}{" "}
        </div>
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
