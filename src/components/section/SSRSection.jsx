import PropTypes from "prop-types";
import _Section from "./_Section"


import SSRChildren from '@/components/node-matrix/SSRChildren'
import { getNodeAfterApplyTemplate } from "@/lib/utils/nodeHelper"

const SSRSection = ({  
    params, searchParams, 
    template_nodes,
    // nodeIndex,
    node,
    
    mode, actions,
    hierarchy,
    isSudoNode
}) => {


    var templateAppliedNode = getNodeAfterApplyTemplate(node, template_nodes, isSudoNode, hierarchy);
    

    // SSR
    const pageName = params?.page_name==undefined?'/':params?.page_name
    if(templateAppliedNode?.data?.visable_on_webpage_logic==='include'  ){
      if(!(templateAppliedNode?.data?.target_webpages||'').split(',').includes(decodeURI(pageName))){
          return null
      }
    }else if(templateAppliedNode?.data?.visable_on_webpage_logic==='exclude' ){
        if((templateAppliedNode?.data?.target_webpages||'').split(',').includes(decodeURI(pageName))){
            return null
        }
    }
    
    

    //build node matrix 3d
    return (



        <_Section 
            params={params} 
            searchParams={searchParams}
            template_nodes={template_nodes}
            node={templateAppliedNode}
            mode={mode} 
            actions={actions} 
            ChildrenComponent={SSRChildren} 
            isSudoNode={isSudoNode}

        />


    )


};

SSRSection.propTypes = {

    // nodeIndex: PropTypes.number,
    // node: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,


};

export default SSRSection;
