"use client"
// import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import clsx from "clsx";
// import style from './AbsolutePositionNodeBox.module.scss'



// import { useAppSelector } from "@/redux/hooks";         

// import {dragItems, dragItemTypes} from '../../lib/dragItems'


// import CSRNode from '@/components/node/CSRNode'
import _AbsolutePositionNodeBox from "./_AbsolutePositionNodeBox";
import AbsolutePositionNodeBoxDev from "./AbsolutePositionNodeBoxDev";

import CSRChildren from '@/components/node-matrix/CSRChildren'

// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"


const AbsolutePositionNodeBoxCSR = ({  

  template_nodes, hideNodeDict, node,  mode, actions, children, hierarchy, ...props}) => {
        


        return (
            <Fragment>
              <_AbsolutePositionNodeBox 
                template_nodes={template_nodes} 
                hideNodeDict={hideNodeDict}
                node={node}  
                mode={mode} 
                actions={actions} 
                ChildrenComponent={CSRChildren}
                // NodeComponent={CSRNode} 
                hierarchy={hierarchy}
                {...props}
              >
                {children}
              </_AbsolutePositionNodeBox>
              <AbsolutePositionNodeBoxDev node={node}  mode={mode} actions={actions} />
            </Fragment>
          )

};

AbsolutePositionNodeBoxCSR.propTypes = {
};

export default AbsolutePositionNodeBoxCSR;




