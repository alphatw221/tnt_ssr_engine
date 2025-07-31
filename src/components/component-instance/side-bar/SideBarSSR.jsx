import React, { Fragment } from "react";
import clsx from "clsx";


// import _SideBar from "./_SideBar";

// import { Providers, PersistProvider } from '@/redux/provider'
// import SideBarClient from "./SideBarClient";
// import SideBarAsync from './SideBarAsync'

// import CustomSliderClientSSR from "./CustomSliderClientSSR";
import SSRChildren from "@/components/node-matrix/SSRChildren";

const SideBarSSR = ({  

  template_nodes, node,  mode, actions, update, isSudoNode, ...props}) => {



    return (
    <Fragment>
      {/* <_SideBar template_nodes={template_nodes} node={node}  mode={mode} actions={actions} update={update} {...props}>

        <Providers >
          <PersistProvider>
            <SideBarAsync node_uuid={node?.uuid} isSudoNode={isSudoNode}/>
          </PersistProvider>
        </Providers>

      </_SideBar> */}
      <div  
          id={`html_data_${node?.uuid}`}
          className={clsx('html-data')}
          style={{display:'none'}}
          >
          <SSRChildren
                template_nodes={template_nodes}
                parent_node={node} 
                mode={mode}
                actions={actions}
                {...props}
              />
        </div>
    </Fragment>
    )
};

SideBarSSR.propTypes = {
};

export default SideBarSSR;




