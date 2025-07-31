import PropTypes from "prop-types";
import React, { Fragment } from "react";
import clsx from "clsx";
import style from './EmptyBox.module.scss'


// import { useAppSelector } from "@/redux/hooks";         
import { getRWDStyles} from "@/lib/utils/rwdHelper"

const EmptyBox = ({  
    // rowIndex, columnIndex, columnRowIndex, 
    node,  mode, actions, update, children, ...props}) => {
        

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
                id={props?.id}
                className={
                    clsx(
                        props?.className,
                        style['empty-box'],

                    )}
                style={{
                    ...props?.style||{},
                    ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                    ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                    ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
            
                    ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                    ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                    ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),
    
                }}
                
                >
                    {children}
                </div>)

};

EmptyBox.propTypes = {

};

export default EmptyBox;




