//import {useEffect} from 'react'
import Star from './../../assets/star.png'

let Actions = (props) => {
  
  return(
    <div className="component-table-actions">
      <img src={Star} alt="start" onClick={props.setFav} width={"20"} height={"20"} />
    </div>
  )
}

export default Actions;