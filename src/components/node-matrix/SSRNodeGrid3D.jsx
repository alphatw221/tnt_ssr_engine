import PropTypes from "prop-types";


import SSRNodeRow from "./node-row/SSRNodeRow"
import SSRNode from "@/components/node/SSRNode"
import _NodeGrid3D from "./_NodeGrid3D";
import _NodeGrid0D from './_NodeGrid0D'
import _NodeGrid1D from './_NodeGrid1D'
import _NodeGrid2D from './_NodeGrid2D'

import {getChildrenMatrixDimension} from '@/lib/utils/nodeMatrix3D'

const SSRNodeGrid3D = ({  params, searchParams,
    template_nodes,
    parent_node, mode, 
    actions, update
}) => {

    const dimension = getChildrenMatrixDimension(parent_node)

    if (dimension==0){
        return (<_NodeGrid0D
            params={params} 
            searchParams={searchParams} 
            template_nodes={template_nodes}
            parent_node={parent_node} 
            mode={mode} 
            actions={actions} 
            update={update} 
            NodeComponent = {SSRNode}
        
        />)
    }else if(dimension==1){
        return (<_NodeGrid1D
            params={params} 
            searchParams={searchParams} 
            template_nodes={template_nodes}
            parent_node={parent_node} 
            mode={mode} 
            actions={actions} 
            update={update} 
            NodeComponent = {SSRNode}
        
        />)
    }else if(dimension==2){
        return (<_NodeGrid2D
            params={params} 
            searchParams={searchParams} 
            template_nodes={template_nodes}
            parent_node={parent_node} 
            mode={mode} 
            actions={actions} 
            update={update} 
            NodeComponent = {SSRNode}
        
        />)
    }
    return (<_NodeGrid3D 
        params={params} 
        searchParams={searchParams} 
        template_nodes={template_nodes}
        parent_node={parent_node} 
        mode={mode} 
        actions={actions} 
        update={update} 
        NodeRowComponent={SSRNodeRow}
        
        />)


};

SSRNodeGrid3D.propTypes = {
    parent: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default SSRNodeGrid3D;
