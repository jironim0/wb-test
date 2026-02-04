import type { FC, InputHTMLAttributes } from "react";
import s from "./MyInput.module.scss";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const MyInput: FC<InputProps> = ({ label, className, ...props }) => {

    const inputClasses = clsx(s.input, className)
    return (
        <div className={s.input__wrapper}>
            {label && <label className={s.label}>{label}</label>}
            <input 
                className={inputClasses} 
                {...props} 
            />
        </div>
    );
};
