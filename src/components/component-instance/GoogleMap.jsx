
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './GoogleMap.module.scss'


// import { useAppSelector } from "@/redux/hooks";         

// import { getRWDStyles} from "@/lib/utils/rwdHelper"
import GoogleMapComponent from "../google-map"

const GoogleMap = ({  
    element, 
    elementProps,
    mode,
    ...props}) => {
        

        // const websiteEditorState = useAppSelector((state) => state.website_editor);


    
        // const [width, setWidth] = useState('')
        // const [height, setHeight] = useState('')
        
        // useEffect(()=>{
        //     rwdHelper(
        //         websiteEditorState.windowWidth, 
        //         websiteEditorState.sideMenuActive, 
        //         [
        //             new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
        //             new RWDPropHandler(node?.data, 'rwd_height', 'height_unit', setHeight),
        //         ]
        //     )
            
    
    
        // },[ websiteEditorState.windowWidth,  websiteEditorState.sideMenuActive, setWidth, setHeight, node?.data])
    

        



        return (
            <div 
              {...elementProps}
                >
                    
                    <GoogleMapComponent lat={node?.data?.lat||23.5} lng={node?.data?.lng||120.5} zoom={node?.data?.zoom||12} apiKey={node?.data?.api_key}/>

            </div>)

};

GoogleMap.propTypes = {
};

export default GoogleMap;




