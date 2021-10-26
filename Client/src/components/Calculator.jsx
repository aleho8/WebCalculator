import TextField from "./TextField";
import CalcButton from "./CalcButton";

import { getNumber, setNumber } from "../apiRequests";

import { useState } from "react";

const Calculator = () => {
    const [operand1, setOperand1] = useState("");
    const [operand2, setOperand2] = useState("");
    const [operator, setOperator] = useState("");

    const onButtonClick = (text) => {
        if (text === "." && operand1.indexOf(".") > -1) {
            return;
        }
        if (operand1 === "ZERODIV" || (operand1 === "0" && text !== ".")) {
            setOperand1(text);
            return;
        }
        setOperand1(operand1 + "" + text);
    };

    const onOperatorClick = (text) => {
        setOperator(text);
        if (operand2 === "") setOperand2(operand1);
        setOperand1("");
    };

    const onFunctionClick = (text) => {
        switch (text) {
            case "=":
                let result = "" + evalOperation(operand2, operand1, operator);
                setOperator("");
                setOperand1(result);
                setOperand2("");
                break;
            case "CLR":
                setOperand1("");
                setOperand2("");
                setOperator("");
                break;
            case "MR":
                getNumber().then((res) => {
                    setOperand1(res.number);
                });
                break;
            case "MS":
                setNumber(operand1);
                break;
            default:
                console.error("This should not be possible.");
                break;
        }
    };


    const evalOperation = (op1, op2, oper) => {
        op1 = Number(op1);
        op2 = Number(op2);
        if (isNaN(op1) || isNaN(op2)) return 0;
        switch (oper) {
            case "+":
                return op1 + op2;
            case "-":
                return op1 - op2;
            case "*":
                return op1 * op2;
            case "/":
                return op2 !== 0 ? op1 / op2 : "ZERODIV";
            default:
                return "ERR";
        }
    };

    return (
        <>
            <TextField fontSize="1.5" disabled={true} textValue={operand2 + " " + operator} />
            <TextField fontSize="2" disabled={true} textValue={operand1} />
            <div className="flexContainer" id="operations">
                {
                    ["*", "/", "+", "-"].map((v, i) => {
                        return <CalcButton key={i} text={v} widthPercent="25" onButtonClick={onOperatorClick} />
                    })
                }
            </div>
            <div className="flexContainer">
                <div className="flexContainer" id="numbers">
                    {
                        [...Array(9)].map((v, i) => {
                            return <CalcButton key={i + 1} text={i + 1} widthPercent="33.33" onButtonClick={onButtonClick} />
                        }).reverse()
                    }
                    <CalcButton text="0" widthPercent="66.66" onButtonClick={onButtonClick} />
                    <CalcButton text="." widthPercent="33.33" onButtonClick={onButtonClick} />
                </div>
                <div className="flexContainer" id="functions">
                    {
                        ["CLR", "MS", "MR", "="].map((v, i) => {
                            return <CalcButton key={i} text={v} onButtonClick={onFunctionClick} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calculator;

//MS - Memory Save
//MR - Memory Recall