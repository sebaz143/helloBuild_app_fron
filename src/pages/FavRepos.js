import { useEffect, useState } from 'react';
import Table from '../components/Table'
import { StyledFormArea, StyledTitle,StyledSubTitle, Avatar, StyledButton, ButtonGroup, colors, ExtraText} from "./../components/Styles";
import { useCookies } from 'react-cookie';
import axios from 'axios';

//auth redux
import { connect } from 'react-redux';
import { logoutUser } from "../auth/actions/userActions";
import {useHistory} from 'react-router-dom'

const tableColumns = [
    {
        "label": "ID",
        "type": "regular",
        "map_value": "id"
    },
    {
        "label": "Name",
        "type": "regular",
        "map_value": "name"
    },
    {
        "label": "URL",
        "type": "regular",
        "map_value": "html_url"
    }
]

const FavRepos = ({ user }) => {

    const history = useHistory();
    const [cookies, removeCookie] = useCookies(['github-jwt']);
    const [tableValues,setTableValues] = useState([]);
    const [isError,setError] = useState()

    const oauth_cookie = cookies['github-jwt'];
    console.log('cookies');
    console.log(cookies['github-jwt']);
    
    

    useEffect(() => {
        const fetchData = async (accessToken) =>{
            console.log("use effect fav repos!!!!!!!!!")

            try{
                const repo_data = await axios.get(`https://api.github.com/users/${user.gitHubUser}/repos`, { headers: { Authorization: `Bearer ${accessToken}` },})
                const liked_repos = await axios.get(`${process.env.REACT_APP_BACKEND}/user/likes/${user.email}`)

                console.log('repo_data');
                console.log(repo_data);
                console.log('liked_repos');
                console.log(liked_repos);

                const likes = {
                    data:[]
                }
                let x=0;
                for(let i = 0; i<repo_data.data.length;i++){
                    console.log('REPO')
                    console.log(repo_data.data[i].id)
                    for(let j = 0; j<liked_repos.data.data[0].likes.length;j++){
                        console.log('LIKES')
                        console.log(liked_repos.data.data[0].likes[j])
                        if(repo_data.data[i].id === parseInt(liked_repos.data.data[0].likes[j])){
                            likes.data[x++] = repo_data.data[i];
                        }
                    }
                }

                setTableValues(likes);
    
            }catch(err){
                console.error(`Error getting user from GitHub`);
                setError(true)
            }
        }
        fetchData(oauth_cookie);
        
    }, [user]);

    return(
        <div>
            {
                tableValues ? (
                    <Table
                        title="List of Repositories"
                        columns={tableColumns}
                        values={tableValues}
                    ></Table>
                ):
                (
                    <span>Cargando...</span>
                )
            }
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user,
});


export default connect(mapStateToProps)(FavRepos);