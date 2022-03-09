import { useEffect, useState } from 'react';
import Table , {TableActions} from '../components/Table'
import { StyledFormArea, StyledTitle,StyledSubTitle, Avatar, StyledButton, ButtonGroup, colors, ExtraText} from "./../components/Styles";
import { useCookies } from 'react-cookie';
import axios from 'axios';

//auth redux
import { connect } from 'react-redux';
import { logoutUser } from "../auth/actions/userActions";
import {useHistory} from 'react-router-dom'


const AllRepos = ({ user }) => {

    const history = useHistory();
    const [cookies, removeCookie] = useCookies(['github-jwt']);
    const [allRepos,setAllRepos] = useState([]);
    const [isError,setError] = useState();
    const [updateComp,setUpdateComp] = useState();

    const oauth_cookie = cookies['github-jwt'];
    console.log('cookies');
    console.log(cookies['github-jwt']);
    

    useEffect(() => {
        const fetchData = async (accessToken) =>{

            try{
                const repo_data = await axios.get(`https://api.github.com/users/${user.gitHubUser}/repos`, { headers: { Authorization: `Bearer ${accessToken}` },})
                const liked_repos = await axios.get(`${process.env.REACT_APP_BACKEND}/user/likes/${user.email}`);
                

                let _local_repos = [];
                _local_repos[0] = repo_data;
                _local_repos[1] = liked_repos;
                console.log("_local_repos");
                console.log(_local_repos);
                setAllRepos(_local_repos);
                
            }catch(err){
                console.error(`Error getting user from GitHub`);
                setError(true)
            }
        }
        fetchData(oauth_cookie);
        
    }, [updateComp,user]);

    
    const setFavoriteRepo = (elementId,favState) =>{

        const fetchData = async (like_body,update_Repos) =>{
            try{
                const res = await axios.put(`${process.env.REACT_APP_BACKEND}/user/likes`,like_body);
                console.log("PUT UPDATE");
                console.log(res);
                setAllRepos(update_Repos);
                setUpdateComp(update_Repos[1].data.data[0].likes.length)
            }catch(err){
                console.error(`Error updating likes`);
                setError(true)
            }
            
        }

        console.log('setFavoriteRepo');
        console.log('elementId');
        console.log(elementId);
        console.log('favState');
        console.log(favState);
        console.log("LIkes");
        console.log(allRepos[1].data.data[0].likes)

        let _temp_allRepos = allRepos;
        
        if(favState){
            //remove from favs
            if(_temp_allRepos[1].data.data[0].likes.length === 1){
                console.log("unito no mas")
                _temp_allRepos[1].data.data[0].likes = [];
            }else{

                for( let i = 0; i < _temp_allRepos[1].data.data[0].likes.length; i++){ 
                    
                    if ( _temp_allRepos[1].data.data[0].likes[i] === elementId.toString()) { 
                        _temp_allRepos[1].data.data[0].likes.splice(i, 1); 
                        i--; 
                    }   
                }
            }
        }else{
            //AGREGAR
            _temp_allRepos[1].data.data[0].likes.push(elementId.toString());
        }

        const body_like ={
            email:user.email,
            likes:_temp_allRepos[1].data.data[0].likes
        }

        console.log("-----------------UPDATE REPOS--------------------");
        console.log(_temp_allRepos)
        console.log("-------------------------------------------------")
        
        fetchData(body_like,_temp_allRepos );
        
        //favState=true;
        //document.getElementById(elementId).style.filter="grayscale(0%)";
    }

    let reposActions = (elementId, favState) => <TableActions
        elementId={elementId}
        favState={favState}
        setFav={() => setFavoriteRepo(elementId,favState)}
    />

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
        },
        {
            "component": reposActions,
            "type": "actions",
            "map_value": "id"
        }
    ]
    console.log("---------------------allRepos[0]----------------------------");
    console.log(allRepos[0]);
    return(
        <div>
            {
                allRepos[0] ? (
                    <Table
                        title="List of Repositories"
                        columns={tableColumns}
                        values={allRepos[0]}
                        likes={allRepos[1].data.data[0].likes}
                        favButton = {true}
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


export default connect(mapStateToProps)(AllRepos);