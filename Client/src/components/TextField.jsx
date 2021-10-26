const TextField = ({fontSize = 1, disabled = false, textValue = ""}) => {
    return (
        <input style={{fontSize: fontSize + "em"}} type="text" disabled={disabled} value={textValue}></input>
    )
}

export default TextField
