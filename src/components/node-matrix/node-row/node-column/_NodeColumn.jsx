


import style from './NodeColumn.module.scss'


import clsx from "clsx";


const _NodeColumn = ({  
  params, 
  searchParams, 
  template_nodes,
  parent_node,
  rowIndex, 
  columnIndex, 
  column, 

  mode, 
  actions , 
  dropColumnRef, 
  isOverCurrent, 
  NodeColumnRowComponent, 
  hoverStyle,

  // update,
  // remove,
  // updateSiblings,
  // updateMatrix
}) => {


    return (
      <div ref={dropColumnRef} 
          style={{
            justifyContent:parent_node?.data?.column_justify_content||'',
          }}
          className={clsx(style.component_column_container, isOverCurrent?style.is_over_current:'', style[hoverStyle])}>
          {(column||[]).map((node, columnRowIndex)=>
              (<NodeColumnRowComponent
                params={params} searchParams={searchParams}
                key={columnRowIndex} 
                // parent_array={array} 
                node={node}
                rowIndex={rowIndex} 
                columnIndex={columnIndex} 
                columnRowIndex={columnRowIndex}
                template_nodes={template_nodes}
                parent_node= {parent_node}
                mode={mode} 
                actions={actions}
                // update={update}
                // remove={remove}

                siblings={column}
                // updateSiblings={updateSiblings}
                // updateMatrix={updateMatrix}
                />)
          )}
      </div>
    );
};

_NodeColumn.propTypes = {
};

export default _NodeColumn;
