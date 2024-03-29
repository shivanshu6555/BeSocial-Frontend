import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";

import  EditOutlinedIcon  from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        //
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch(
            `${serverUrl}/auth/register`,
            {
                method : "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    }

    const login = async( values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            `${serverUrl}/auth/login`,
            {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify(values), 
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        console.log(loggedIn);
        if (loggedIn) {
            dispatch(
                setLogin({
                    user : loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

    return(
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div" : { gridColumn : isNonMobile ? undefined : "span 4"}
                        }}>
                            {isRegister && (
                                <>
                                <TextField
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                errors={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                label="last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                errors={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                label="location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                errorsr={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                label="occupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                errors={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{ gridColumn: "span 2"}}
                                />
                                <Dropzone
                                fullWidth
                                acceptedFiles = ".jpg, .jpeg, .png"
                                multiple= {false}
                                onDrop={(acceptedFiles => 
                                    setFieldValue("picture", acceptedFiles[0]))}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer"} }}>

                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add picture here</p>
                                                ) : (<FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon/>
                                                </FlexBetween>)}
                                        </Box>
                                    )}
                                </Dropzone>
                                </>
                            )}
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                errors={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4"}}
                            />
                            <TextField
                                label="Password"
                                type = {passwordVisible ? "text" : "password"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                errors={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4"}}
                            />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1 rem",
                            backgroudColor: palette.primary.main,
                            color: palette.background.dark,
                            "&:hover" : {color: palette.primary.dark },

                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"} 
                        </Button>
                        <Typography
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                        }}
                        sx={{
                            textDecoration : "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.dark,
                            },  
                        }}
                        >
                            { isLogin ? "Don't have an account? Sign Up Here" :
                             "Already have an account? Login Here"} 
                        </Typography>
                    </Box>
                </form>
            )}
            
        </Formik>
    )
}

export default Form;