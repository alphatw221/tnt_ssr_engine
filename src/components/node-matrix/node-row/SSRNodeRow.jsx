import PropTypes from "prop-types";



import SSRNodeColumn from './node-column/SSRNodeColumn'
import _NodeRow from "./_NodeRow";

const SSRComponentRow = ({ 
    params, 
    searchParams, 
    template_nodes,
    parent_node, 
    row, 
    rowIndex, 
    mode, 
    actions, 
}) => {
    

    return (<_NodeRow 
        params={params} 
        searchParams={searchParams} 
        row={row} 
        rowIndex={rowIndex} 
        template_nodes={template_nodes}
        parent_node={parent_node} 
        mode={mode} 
        actions={actions} 
        NodeColumnComponent={SSRNodeColumn} 
        
        />)

};

SSRComponentRow.propTypes = {

};

export default SSRComponentRow;
