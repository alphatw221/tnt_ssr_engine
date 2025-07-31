import PropTypes from "prop-types";

import SSRNodeColumnRow from "./node-column-row/SSRNodeColumnRow "
import _NodeColumn from "./_NodeColumn";

const SSRNodeColumn = ({  
    params, 
    searchParams, 
    template_nodes,
    parent_node, 
    rowIndex, 
    columnIndex, 
    column, 
    mode, 
    actions
    
}) => {

    

    return (<_NodeColumn 
        params={params} searchParams={searchParams}
        template_nodes={template_nodes}
        parent_node={parent_node} 

        rowIndex={rowIndex} 
        columnIndex={columnIndex} 

        column={column} 

        mode={mode} 
        actions={actions} 
        NodeColumnRowComponent={SSRNodeColumnRow}
      />)

   

};

SSRNodeColumn.propTypes = {
    // parent_array: PropTypes.array,
    // array: PropTypes.array,
    // rowIndex: PropTypes.number,
    // columnIndex: PropTypes.number,
    // parent: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,
    // update: PropTypes.func,
    // remove: PropTypes.func,
};

export default SSRNodeColumn;
