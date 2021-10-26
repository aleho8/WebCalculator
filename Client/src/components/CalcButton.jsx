
const CalcButton = ({ text, widthPercent = 100, onButtonClick }) => {
    return (
        <button onClick={() => { onButtonClick(text) } } style={{width: widthPercent + "%" }}>{text}</button>
    )
}

export default CalcButton
