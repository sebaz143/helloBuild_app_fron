import { StyledTitle,StyledSubTitle, Avatar, StyledButton, ButtonGroup} from "./../components/Styles";

//Logo
import Logo from './../assets/Octocat.png'

const Home = () => {
    return(
        <div>
            <div style={{position:"absolute",top:0,left:0,backgroundColor:"transparent",width:"100%",padding:"15px",display:"flex",justifyContent:"flex-start"}}>
                <Avatar image={Logo} />
            </div>
            <StyledTitle size={65}>
                Welcome to GitHub Fav Repos!
            </StyledTitle>

            <StyledSubTitle size={27}>
                Mark your favorite github repos here
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton to="login">Login</StyledButton>
                <StyledButton to="signup">Signup</StyledButton>
            </ButtonGroup>
        </div>
    )
}

export default Home;