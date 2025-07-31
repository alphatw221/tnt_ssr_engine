
// import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import clsx from "clsx";
// import style from './AbsolutePositionNodeBox.module.scss'



// import { useAppSelector } from "@/redux/hooks";         

// import {dragItems, dragItemTypes} from '../../lib/dragItems'


// import SSRNode from '@/components/node/SSRNode'
import _AbsolutePositionNodeBox from "./_AbsolutePositionNodeBox";
// import AbsolutePositionNodeBoxDev from "./AbsolutePositionNodeBoxDev";


// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"
import SSRChildren from '@/components/node-matrix/SSRChildren'


const AbsolutePositionNodeBoxSSR = ({  

  template_nodes, node,  mode, actions, update, ...props}) => {
        


        return (
            <Fragment>
              <_AbsolutePositionNodeBox 
              template_nodes={template_nodes} 
              node={node}  
              mode={mode} 
              actions={actions} 
              update={update} 
              ChildrenComponent={SSRChildren}
              // NodeComponent={SSRNode} 
              {...props}/>
            </Fragment>
          )

};

AbsolutePositionNodeBoxSSR.propTypes = {
};

export default AbsolutePositionNodeBoxSSR;
