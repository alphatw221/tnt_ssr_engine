import style from './NodeRow.module.scss'
import clsx from "clsx";




const _ComponentRow = ({ 
  
  params, 
  searchParams, 
  template_nodes,
  parent_node, 
  row, 
  rowIndex, 
  mode, 
  actions, 
  dropRowRef, 
  isOverCurrent, 
  NodeColumnComponent, 
  hoverStyle,
  // update, 
  // remove,  
  // updateSiblings,
  // updateMatrix
}) => {
    
    return (
      <div ref={dropRowRef} 
          style={{
            justifyContent:parent_node?.data?.row_justify_content||'',
            flexWrap:parent_node?.data?.row_flex_wrap||'',

          }}
          className={clsx(style.component_row_container, isOverCurrent?style.is_over_current:'', style[hoverStyle])}>
          {(row||[]).map((column, columnIndex)=>
              (<NodeColumnComponent 
                params={params} 
                searchParams={searchParams}
                key={columnIndex} 
                template_nodes={template_nodes}
                parent_node={parent_node}

                rowIndex={rowIndex}
                columnIndex={columnIndex} 
                column={column}


                mode={mode} 
                actions={actions}
                // update={update}

                // remove={remove}
                // siblings={row}
                // updateSiblings={updateSiblings}

                // updateMatrix={updateMatrix}
                />)
          )}
      </div>
    );
};

_ComponentRow.propTypes = {
    // parent_array: PropTypes.array,
    // array: PropTypes.array,
    // rowIndex: PropTypes.number,
    // // pageIndex: PropTypes.number,
    // // fragmentIndex: PropTypes.number,
    // parent: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,
    // update: PropTypes.func
};

export default _ComponentRow;
