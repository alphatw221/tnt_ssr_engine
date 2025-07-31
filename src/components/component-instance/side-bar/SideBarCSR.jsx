"use client"

import React, { Fragment } from "react";

import SideBarDev from "./SideBarDev.jsx";
import _SideBar from "./_SideBar";

import SideBarClient from "./SideBarClient.jsx";
import CSRChildren from '@/components/node-matrix/CSRChildren'

const SideBarCSR = ({  

  template_nodes, hideNodeDict, node,  mode, actions, update, children, isSudoNode, ...props}) => {



    return (
    <Fragment>
      <_SideBar  node={node}  mode={mode} actions={actions} update={update} ChildrenComponent={CSRChildren} {...props}>
        <SideBarDev node={node}  mode={mode} actions={actions} update={update}/>
        <SideBarClient template_nodes={template_nodes} hideNodeDict={hideNodeDict} node={node} mode={mode} actions={actions} update={update} isSudoNode={isSudoNode}/>
        {children}
      </_SideBar>
    </Fragment>
    )
};

SideBarCSR.propTypes = {
};

export default SideBarCSR;




