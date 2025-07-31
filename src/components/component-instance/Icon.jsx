import PropTypes from "prop-types";
import React, { Fragment } from "react";
import clsx from "clsx";
import style from './Icon.module.scss'


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars, faTrash } from '@fortawesome/free-solid-svg-icons'
    
// import { useAppSelector } from "@/redux/hooks";



// import SelectIconModal from '../select-icon-modal/SelectIconModal'
import { getRWDStyles} from "@/lib/utils/rwdHelper"


const Icon = ({  

    node,  mode, actions, update, children, ...props}) => {
    

    // const websiteEditorState = useAppSelector((state) => state.website_editor);


    // const [isHover, setIsHover] = useState(false)
    // const [showSelectIconModal, setShowSelectIconModal] = useState(false)

    
    // const removeIconName = ()=>{
    //     console.log('remove')
    //     update({...node, data:{...node.data, icon_name:null} })
    // }

    // const selectIconName = iconName=>{

    //     update({...node, data:{ ...node.data, icon_name:iconName}})
    // }


    // const [fontSize, setFontSize] = useState('12px')

    
    // useEffect(()=>{

    //     rwdHelper(
    //         websiteEditorState.windowWidth, 
    //         websiteEditorState.sideMenuActive, 
    //         [
    //             new RWDPropHandler(node?.data, 'rwd_font_size', 'px', setFontSize),
    //         ]
    //     )




    // },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setFontSize, node?.data])

    return (
      

            <i 
            id={props?.id}
            className={
                clsx(
                    props?.className,
                    style['icon'],
                    node?.data.icon_name

            )}
            style={{
                ...props?.style||{},
                // lineHeight:node?.data?.icon_name?'0':'',
                // ...getRWDStyles('font-size', node?.data?.rwd_font_size, 'px'),



                ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
        
                ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

                ...getRWDStyles('line-height', node?.data?.rwd_line_height, 'px'),
                ...getRWDStyles('font-size', node?.data?.rwd_font_size, 'px'),



                color:
                    node?.data?.font_color?`rgba(${node?.data?.font_color.r}, ${node?.data?.font_color.g}, ${node?.data?.font_color.b}, ${node?.data?.font_color.a})`:'',
                // backgroundColor:
                //     node?.data?.background_color?`rgba(${node?.data?.background_color.r}, ${node?.data?.background_color.g}, ${node?.data?.background_color.b}, ${node?.data?.background_color.a})`:'',

                // borderColor:node?.data?.icon_border_color?`rgba(${node?.data?.icon_border_color.r}, ${node?.data?.icon_border_color.g}, ${node?.data?.icon_border_color.b}, ${node?.data?.icon_border_color.a})`:'',
                // borderRadius:(node?.data?.icon_border_radius||'')+(node?.data?.icon_border_radius_unit||''),
                // borderWidth:(node?.data?.icon_border_width||'')+(node?.data?.icon_border_width_unit||''),
                // borderStyle:(node?.data?.icon_border_style||'')
                
                textAlign:node?.data?.text_align||''
            
            }}
                
                >
                    {children}
            </i>

        
    )
   
   
};

Icon.propTypes = {

};

export default Icon;




