import React, {useEffect, useRef, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/useAuth";
import {coursesAPI, parseAxiosError} from "../../state/api";
import axios from "axios";

export const Login = () => {

    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("")


    const [errMsg, setErrMsg] = useState<string>();

    useEffect(() => {
        emailRef?.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [email, pwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await coursesAPI.login({
                email: email,
                password: pwd,
            })
            setAuth({
                email: email,
                roles: response?.roles
            })
            setPwd("")
            setEmail("")
            navigate(from, {replace: true})
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErrMsg(parseAxiosError(err))
            } else {
                setErrMsg('Неправильные email или пароль')
            }
            errRef?.current?.focus();
        }


    }

    return (
        <>
            <main className="section">
                <div className="registration-container">
                    {errMsg && (
                        <p ref={errRef} className="error-message registration-error">
                            {errMsg}
                        </p>
                    )}
                    <h1 className="registration-title">Вход</h1>
                    <form className="registration-form"
                          onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            E-mail:
                        </label>
                        <input type="text"
                               id="email"
                               ref={emailRef}
                               autoComplete="off"
                               onChange={(e) => setEmail(e.target.value)}
                               value={email}
                               required
                               className="input-field"/>

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="password"
                               id="password"
                               autoComplete="off"
                               onChange={(e) => setPwd(e.target.value)}
                               value={pwd}
                               required
                               className="input-field"/>
                        <button type="submit" className="btn">Вход</button>
                    </form>
                    <p>
                        Зарегистрироваться<br/>
                        <span className="line">
                            <NavLink to="/register">Регистрация</NavLink>
                        </span>
                    </p>
                </div>

            </main>

        </>
    )
}