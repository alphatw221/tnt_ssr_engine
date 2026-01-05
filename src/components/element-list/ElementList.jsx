import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
// import NodeMenuItem from "./NodeMenuItem";
import style from './ElementList.module.scss'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faP, faPlus } from '@fortawesome/free-solid-svg-icons'


// import { setNodeMenuActive, setNodeMenuQuery, setTargetWebsiteNode} from "@/redux/slices/website-editor-slice"
// import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2.jsx'

import ElementListItem from './ElementListItem'


const ElementList =({
    elements, 
    actions, 
    level,
    ...props
})=> {

    const dispatch = useAppDispatch();

    return (
        <Fragment>
            {
                (elements||[]).length>0
                &&
                (elements||[]).map((element, i)=><ElementListItem key={i} element={element} actions={actions} level={level} {...props}/>)

            }
        </Fragment>

    );
}

ElementList.propTypes = {
};

export default ElementList;