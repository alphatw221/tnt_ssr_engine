"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect,  } from "react";
import {
    buildNode3DMatrix, 
  } from '@/lib/utils/nodeMatrix3D.js';
  import {customer_retrieve_node} from '@/api/node.js'

import SideBarClient from './SideBarClient'
import { getNodeAfterApplyTemplate } from "@/lib/utils/nodeHelper"

const SideBarAsync = ({node_uuid, isSudoNode}) => {


    const [node, setNode] = useState({})

    useEffect(()=>{
        customer_retrieve_node(node_uuid).then(res=>{

            // buildNode3DMatrix(res.data)
            // setNode(res.data)

            console.log(res.data)
            const _node = getNodeAfterApplyTemplate(res.data, res.data?.template_nodes||{}, isSudoNode);
            setNode(_node)

        })
    },[])


    return (<SideBarClient template_nodes={node?.template_nodes} node={node} mode={'prod'} isSudoNode={isSudoNode}/>)
};

SideBarAsync.propTypes = {
};

export default SideBarAsync;




