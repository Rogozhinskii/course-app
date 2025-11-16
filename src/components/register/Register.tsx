import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faCircleCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import "./style.css"
import {NavLink} from "react-router-dom";
import {coursesAPI, parseAxiosError} from "../../state/api";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const Register = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>("");
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);

    const [pwd, setPwd] = useState<string>("")
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);


    const [matchPwd, setMatchPwd] = useState<string>("")
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>();
    const [success, setSuccess] = useState<boolean>();

    useEffect(() => {
        emailRef?.current?.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(email ?? "")
        setValidEmail(result)
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd ?? "")
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("")
    }, [email, pwd, matchPwd]);

    const handleSubmit = async (e: any) => {

        e.preventDefault();
        const v1 = USER_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await coursesAPI.registerUser({
                email: email,
                password: pwd,
            })
            setSuccess(true);
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErrMsg(parseAxiosError(err))
            } else {
                setErrMsg('Ошибка регистрации')
            }
            errRef?.current?.focus();
        }
    }

    return (
        <>
            {success ? (
                <main className="section">
                    <div className="registration-container">
                        <h1 className="registration-title">Success!</h1>
                        <p>
                            <NavLink to="/login">Вход</NavLink>
                        </p>

                    </div>
                </main>
            ) : (
                <main className="section">
                    <div className="registration-container">
                        <p ref={errRef} className={errMsg ? "error-message registration-error" : "hidden"}>{errMsg}</p>
                        <h1 className="registration-title">Регистрация</h1>
                        <form className="registration-form"
                              onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                E-mail:
                                <FontAwesomeIcon icon={faCircleCheck} className={validEmail ? "valid" : "hidden"}/>
                                <FontAwesomeIcon icon={faTimesCircle}
                                                 className={validEmail || !email ? "hidden" : "invalid"}/>
                            </label>
                            <input type="text"
                                   id="email"
                                   ref={emailRef}
                                   autoComplete="off"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required
                                   aria-invalid={validEmail ? "false" : "true"}
                                   onFocus={() => setEmailFocus(true)}
                                   onBlur={() => setEmailFocus(false)}
                                   aria-describedby="uidnote"
                                   className="input-field"/>
                            <p id="uidnote" className={emailFocus && email && !validEmail ? "help" : "hidden"}>
                                <FontAwesomeIcon icon={faCircleInfo}/>
                                Введите корректный email.<br/>
                            </p>

                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCircleCheck} className={validPwd ? "valid" : "hidden"}/>
                                <FontAwesomeIcon icon={faTimesCircle}
                                                 className={validPwd || !pwd ? "hidden" : "invalid"}/>
                            </label>
                            <input type="password"
                                   id="password"
                                   autoComplete="off"
                                   onChange={(e) => setPwd(e.target.value)}
                                   value={pwd}
                                   required
                                   aria-invalid={validPwd ? "false" : "true"}
                                   onFocus={() => setPwdFocus(true)}
                                   onBlur={() => setPwdFocus(false)}
                                   aria-describedby="pwdNote"
                                   className="input-field"/>
                            <p id="pwdNote" className={pwdFocus && !validPwd ? "help" : "hidden"}>
                                <FontAwesomeIcon icon={faCircleInfo}/>
                                Пароль должен быть не меньше 4-х символов<br/>
                                Должен содержать заглавные и прописные буквы<br/>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCircleCheck}
                                                 className={validMatch && matchPwd ? "valid" : "hidden"}/>
                                <FontAwesomeIcon icon={faTimesCircle}
                                                 className={validMatch || !matchPwd ? "hidden" : "invalid"}/>
                            </label>
                            <input type="password"
                                   id="confirm_pwd"
                                   autoComplete="off"
                                   onChange={(e) => setMatchPwd(e.target.value)}
                                   value={matchPwd}
                                   required
                                   aria-invalid={validMatch ? "false" : "true"}
                                   onFocus={() => setMatchFocus(true)}
                                   onBlur={() => setMatchFocus(false)}
                                   aria-describedby="confirmnote"
                                   className="input-field"/>
                            <p id="confirmnote" className={matchFocus && !validMatch ? "help" : "hidden"}>
                                <FontAwesomeIcon icon={faCircleInfo}/>
                                Пароль должны совпадать<br/>
                            </p>

                            <button type="submit" className="btn"
                                    disabled={!validEmail || !validPwd || !validMatch}>Регистрация
                            </button>
                        </form>
                        <p>
                            Уже зарегистрированы?<br/>
                            <span className="line">
                            {/*роукт до входа*/}
                                <NavLink to="/login">Вход</NavLink>
                        </span>
                        </p>
                    </div>

                </main>
            )}
        </>
    )

}