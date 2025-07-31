"use client"
import PropTypes from "prop-types";
import React, { Fragment } from "react";



import CSRChildren from '@/components/node-matrix/CSRChildren'


import _DropDownList from "./_DropDownList";
import DropDownListDev from "./DropDownListDev";

const DropDownListCSR = ({  

    template_nodes, hideNodeDict, node,  mode, actions, update, children, hierarchy, ...props}) => {


    return (
        <Fragment>
            <_DropDownList 
                template_nodes={template_nodes}
                hideNodeDict={hideNodeDict}
                node={node} 
                mode={mode} 
                actions={actions} 
                ChildrenComponent={CSRChildren}
                hierarchy={hierarchy}
                {...props}
                >
                <DropDownListDev
                node={node} 
                mode={mode} actions={actions} 
                />
                {children}
            </_DropDownList>
        </Fragment>
      )
};

DropDownListCSR.propTypes = {
};

export default DropDownListCSR;




