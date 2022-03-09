import { StyledFormArea, StyledFormButton, StyledTitle, Avatar, colors, ButtonGroup, ExtraText, TextLink, CopyrightText} from "./../components/Styles";
import { TextInput } from "./../components/FormLib";
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
//Logo
import Logo from './../assets/Octocat.png'

//icons
import {FiMail, FiLock, FiGithub, FiUser} from 'react-icons/fi'

//Loader
import BeatLoader from "react-spinners/BeatLoader";

//auth redux
import { connect } from 'react-redux';
import { signupUser } from "../auth/actions/userActions";
import {useHistory} from 'react-router-dom'

const Signup = ({signupUser}) => {

    const history = useHistory();
    return(
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={20}>App Signup</StyledTitle>
                <Formik
                    initialValues={{
                        name:"",
                        email:"",
                        password:"",
                        repeatPassword:"",
                        gitHubUser: "",
                    }}

                    validationSchema={
                        Yup.object({
                            name: Yup.string().required("Required"),
                            email: Yup.string().email("Invalid Email Address").required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30,"Password is too long").required("Required"),
                            gitHubUser: Yup.string().required("Required"),
                            repeatPassword: Yup.string().required("Required").oneOf([Yup.ref("password")],"Password must match")
                        })
                    }
                    onSubmit={(values,{setSubmitting,setFieldError})=>{
                        signupUser(values,history, setFieldError, setSubmitting)
                    }}
                >   
                    
                    {({isSubmitting})=>(
                        <Form>
                            <TextInput 
                                name="name"
                                type="text"
                                label="User name"
                                icon={<FiUser/>}
                            />

                            <TextInput 
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="user@example.com"
                                icon={<FiMail/>}
                            />

                            <TextInput 
                                name="gitHubUser"
                                type="text"
                                label="Github User"
                                icon={<FiGithub/>}
                            />

                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                icon={<FiLock/>}
                            />

                            <TextInput
                                name="repeatPassword"
                                type="password"
                                label="Repeat Password"
                                icon={<FiLock/>}
                            />

                            <ButtonGroup>
                                {!isSubmitting && (
                                    <StyledFormButton type="submit">SignUp</StyledFormButton>
                                )}

                                {isSubmitting && (
                                    <BeatLoader size={15} margin-top={10} color={colors.theme} loading={true}/>
                                )}
                            </ButtonGroup>
                        </Form>

                    )}
                </Formik>
                <ExtraText>
                    Already have an account? <TextLink to="/login">Login</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy;2022
            </CopyrightText>
        </div>
    )
};

export default connect(null, {signupUser})(Signup);