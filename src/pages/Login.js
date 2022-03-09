import { StyledFormArea, StyledFormButton, StyledTitle, Avatar, colors, ButtonGroup, ExtraText, TextLink, CopyrightText} from "./../components/Styles";
import { TextInput } from "./../components/FormLib";
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
//Logo
import Logo from './../assets/Octocat.png'

//icons
import {FiMail, FiLock} from 'react-icons/fi'

//Loader
import BeatLoader from "react-spinners/BeatLoader";

//auth redux
import { connect } from 'react-redux';
import { loginUser } from "../auth/actions/userActions";
import {useHistory} from 'react-router-dom'


const Login = ({ loginUser }) => {

    const history = useHistory();

    return(
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={20}>Github Login</StyledTitle>
                <Formik
                    initialValues={{
                        email:"",
                        password:""
                    }}

                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid Email Address").required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30,"Password is too long").required("Required")
                        })
                    }
                    onSubmit={(values,{setSubmitting,setFieldError})=>{
                        loginUser(values,history, setFieldError, setSubmitting)
                    }}
                >   
                    
                    {({isSubmitting})=>(
                        <Form>
                            <TextInput 
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="user@example.com"
                                icon={<FiMail/>}
                            />
                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                icon={<FiLock/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting && (
                                    <StyledFormButton type="submit">Login</StyledFormButton>
                                )}

                                {isSubmitting && (
                                    <BeatLoader size={15} margin-top={10} color={colors.theme} loading={true}/>
                                )}
                            </ButtonGroup>
                        </Form>

                    )}
                </Formik>
                <ExtraText>
                    New here? <TextLink to="/signup">SignUp</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy;2022
            </CopyrightText>
        </div>
    )
};

export default connect(null, {loginUser})(Login);