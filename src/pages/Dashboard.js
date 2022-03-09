import { useState } from 'react';
import Tabs from '../components/Tabs'
import AllRepos from './AllRepos';
import FavRepos from './FavRepos';
import { StyledFormArea, StyledTitle,StyledSubTitle, Avatar, StyledButton, ButtonGroup, colors, ExtraText} from "./../components/Styles";
import { useCookies } from 'react-cookie';


//auth redux
import { connect } from 'react-redux';
import { logoutUser } from "../auth/actions/userActions";
import {useHistory} from 'react-router-dom'

//Logo
import Logo from './../assets/Octocat.png'

const Dashboard = ({ logoutUser, user }) => {

    const history = useHistory();
    const pages = ["AllRepos", "FavRepos"];
    const [subpage, setSubpage] = useState();
    const [cookies, removeCookie] = useCookies(['github-jwt']);
    
    let content;
    
    switch(subpage){
        case "AllRepos":
            content = <AllRepos 
                User={user}
            />;
        break;
        case "FavRepos":
            content = <FavRepos
                User={user}
            />;
        break;
        default:
            
    }

    let handleTabChange = (value) => {
        setSubpage(value);
    };

    function handleRemoveCookie() {
        removeCookie('github-jwt');
        logoutUser(history);
    }

    return(
        <div>
            <div style={{position:"absolute",top:0,left:0,backgroundColor:"transparent",width:"100%",padding:"15px",display:"flex",justifyContent:"flex-start"}}>
                <Avatar image={Logo} />
            </div>
            <StyledFormArea bg={colors.dark2}>
                <StyledTitle size={40}>
                    Welcome, {user.name}!
                </StyledTitle>

                <StyledSubTitle size={27}>
                    Mark your favorite github repos
                </StyledSubTitle>

                <ExtraText color={colors.light1}>Yuor GitHub user is: {user.gitHubUser}</ExtraText>
                <ButtonGroup>
                    <StyledButton to="/" onClick={handleRemoveCookie}>LogOut</StyledButton>
                </ButtonGroup>

                <Tabs 
                    options={pages}
                    selected={subpage}
                    onChange={handleTabChange}
                ></Tabs>
                {content}

            </StyledFormArea>

            
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user,
});


export default connect(mapStateToProps, { logoutUser })(Dashboard);