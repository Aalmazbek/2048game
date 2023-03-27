import { useEffect } from "react"
import css from "./Square.module.css"

let Square = (props) => {

    const animation = {
        // animation: "0.3s bump",
        backgroundColor: `${props.getColors(props.value)}`
    }

    const squareStyles = {
        backgroundColor: `${props.getColors(props.value)}`
    }

    return(
        <div className={props.value ? `${css.square} square` : `${css.square} ${css.none} square`} style={props.value ? animation : squareStyles}>
            <h1>{props.value}</h1>
        </div>
    )
}


export default Square