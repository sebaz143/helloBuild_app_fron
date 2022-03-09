let TableTitle = (props) => {

  let titleName = props.name;

  if(props.value){
    titleName += ` (${props.value})`
  }
  
  return(
    <div className="table-title">
      {titleName}
    </div>
  )
}

export default TableTitle