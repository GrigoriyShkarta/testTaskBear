import {FC, memo} from 'react';
import s from "./Button.module.scss"

type ButtonProps = {
    value: string;
    // onclick: () => void
}

const Button:FC<ButtonProps> = ({value}) =>
    <button
        className={s.button}
        // onClick={onclick}
    >{value}</button>

export default memo(Button);