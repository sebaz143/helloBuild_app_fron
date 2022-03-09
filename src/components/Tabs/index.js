let Tabs = (props) => {

  let options = [];
  if(props.options){
    options = props.options 
  }else{

    options = null;
  } 

  let handleClick = (option) => {
    if(option !== props.selected){
      if(props.onChange){
        props.onChange(option); 
      }
    }
  }

  return(
    <>
      <div className="tabs-component">
        <div className="tabs-container">
  
          {
            options.map((option, idx) => {
              
              let optionClasses = "tab-element";
              
              if(option === props.selected){
                optionClasses += " selected";
              }
              
              return(
                <div
                  className={optionClasses}
                  key={idx}
                  onClick={() => handleClick(option)}
                >
                  {option}
                </div>
              )
            })
          }
        </div>
        {props.button ? props.button : null}
      </div>
    </>
  )
}

export default Tabs