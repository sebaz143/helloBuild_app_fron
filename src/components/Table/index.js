import Title from './title';
import EmptyState from './emptyState';

let Table = (props) => {

  console.log("props.favButton");
  console.log(props.likes);
  
  if(props.values && typeof(props.values.data) != "undefined"){
    console.log(props.values.data[0]);
    console.log(props.values.data.length);
  }

  return(
    <>
      <Title 
        name={props.title}
      />

      <div className="component-table">
        <div className="component-table__header">
          {props.columns ? props.columns.map((column, idx) => {
            return(<p key={idx}>{column.label}</p>)
          }) : null}
        </div>

        {!props.values || props.values.length === 0 ? <EmptyState /> : null}

        {
          
          props.values && typeof(props.values.data) != "undefined" ? 
          
          props.values.data.map((value,values_idx) => (
            <div key={values_idx} className="component-table__row">
              {props.columns ? props.columns.map((column, column_idx) => {
                if(column.type === "regular"){
                  
                  return(
                    <p key={column_idx}>{value[column.map_value]}</p>
                  )
                }else if(column.type === "actions") {

                  if(props.likes){
                    if(props.likes.includes(value[column.map_value].toString())){
                      return(  
                        <a id={value[column.map_value]} key={column_idx} style={{filter:"grayscale(0%)"}}>{column.component(value[column.map_value],true)}</a>
                      )
                    }else{
                      return(  
                        <a id={value[column.map_value]} key={column_idx} style={{filter:"grayscale(100%)"}}>{column.component(value[column.map_value],false)}</a>
                      )
                    }

                  }else{
                    return(<></>)
                  }
                  
                  
                }else{
                  return(<></>)
                } 
              }) : null}
            </div>
          )) : null
        }
      </div>
    </>
  )
}

export default Table
export {default as TableActions} from './actions'