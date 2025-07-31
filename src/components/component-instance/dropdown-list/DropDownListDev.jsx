"use client"
import PropTypes from "prop-types";
import React, {  useEffect, Fragment } from "react";
import clsx from "clsx";
import style from './DropDownList.module.scss'

import {dragItems, dragItemTypes} from '@/lib/dragItems'
import {  useDrop } from 'react-dnd'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux";         
import { useAppSelector, useAppDispatch } from "@/redux/hooks";   
// import { setSideMenuActive, setComponentMenuActive} from '../../redux/slices/website-editor-slice'




// import {useClickOutsideEvent} from '../../lib/utils/clickOutside.js'

// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"
// import { rgba2hex } from "@/lib/utils/rgba2hex";



import { containerNodeHandleDropNodeHelper } from "@/lib/utils/dragDropHelper.js"

const DropDownListDev = ({  

    node,  mode, actions}) => {

    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const dispatch = useAppDispatch()
    // const editorMemoryState = useAppSelector((state) => state.editor_memory);

    // const [showDropDown, setShowDropDown] = useState(false)



    // const updateHook = (rowIndex, data)=>{
    //     const _children_matrix_3d = JSON.parse(JSON.stringify(node?.children_matrix_3d))
    //     update({...node, children_matrix_3d:_children_matrix_3d.map((_row, _rowIndex)=>_rowIndex==rowIndex?data:_row)})
    // }

    // const updateSiblingsHook = (data)=>{
    //     update( {...node, children_matrix_3d:data})
    //   }

    // const updateMatrixHook = (matrix)=>{
    //     update({...node, children_matrix_3d:matrix})

        
    // }


    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
          accept: [dragItemTypes.NODE],
          drop: (item, monitor) => {
            if(monitor.didDrop()) return
            if(mode!='edit')return
            if(item?.node?.uuid==node?.uuid)return
            containerNodeHandleDropNodeHelper(item, node, actions)
            return

        
          },
          collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          }),
        }),
        [dragItemTypes, node, actions],
    )
    
    useEffect(()=>{
        drop(document.getElementById(`dropdown_list_dropdown_${node?.uuid}`))
    },[drop])
    // setTimeout(()=>{drop(document.getElementById(`dropdown_list_dropdown_${node?.uuid}`))},10)


    //handle resize dropdown  //deplicate
//     const mouseMove = (e)=>{
//         const rect = document?.getElementById(`dropdown_list_dropdown_${node?.uuid}`)?.getBoundingClientRect()
//         let _width = e.clientX-rect.x
//         let _height = e.clientY-rect.y

//         let leftAlign=false;
//         let rightAlign=false;

        

//         let dropdown_rwd_width = String(node?.data?.dropdown_rwd_width||'').split(',')
//         let dropdown_rwd_height = String(node?.data?.dropdown_rwd_height||'').split(',')

//         let _windowWidth = window.innerWidth
        
//         let rwd_index 
//         if(_windowWidth>=1536){rwd_index = 0}
//         else if(_windowWidth>=1280){rwd_index = 1}
//         else if(_windowWidth>=1024){rwd_index = 2}
//         else if(_windowWidth>=768){rwd_index = 3}
//         else if(_windowWidth>=640){rwd_index = 4}
//         else if(_windowWidth>=390){rwd_index = 5}
//         else{rwd_index = 6}

//         const dropdown_width_index = dropdown_rwd_width.findLastIndex((element, index) => index <= rwd_index)
//         const dropdown_height_index = dropdown_rwd_height.findLastIndex((element, index) => index <= rwd_index)
        
//         const dropdown_width = dropdown_rwd_width?.[dropdown_width_index]||''
//         const dropdown_height = dropdown_rwd_height?.[dropdown_height_index]||''

//         let dropdown_width_unit=dropdown_width.replace(/[0-9\-.]/g, '')
//         let dropdown_height_unit=dropdown_height.replace(/[0-9\-.]/g, '')

//         let _dropdown_width_unit = 'px'
//         let _dropdown_height_unit = 'px'
//         if(dropdown_width_unit=='px'){

//         }
//         else if((dropdown_width_unit && dropdown_width_unit=='vw')  || (!dropdown_width_unit && node?.data?.dropdown_width_unit=='vw') ){
            
//             _width = (100 * _width/window.innerWidth)
//             _dropdown_width_unit = 'vw'
//         }
//         else if(dropdown_height_unit=='px'){

//         }
//         else if((dropdown_height_unit && dropdown_height_unit=='vh')  || (!dropdown_height_unit && node?.data?.dropdown_height_unit=='vh')){
//             _height = (100 * _height/window.innerHeight)
//             _dropdown_height_unit = 'vh'
//         }

//         dropdown_rwd_width[rwd_index] = _width + _dropdown_width_unit
//         dropdown_rwd_height[rwd_index] = _height + _dropdown_height_unit


//         update({...node, data:{...(node?.data||{}), dropdown_rwd_width:dropdown_rwd_width.join(','), dropdown_rwd_height:dropdown_rwd_height.join(',')}})
//         node = {...node, data:{...(node?.data||{}), dropdown_rwd_width:dropdown_rwd_width.join(','), dropdown_rwd_height:dropdown_rwd_height.join(',')}}
   
// }
    //handle resize dropdown
    // const mouseUp = (e)=>{
    //     window.removeEventListener("mousemove", mouseMove);
    //     window.removeEventListener("mouseup", mouseUp);

    //     user_update_node(node?.uuid, node, true).then(res=>{
    //         console.log(res.data)

    //     }).catch(err=>{
    //         console.log(err)
    //     })

    // }

    // const mouseDown = (e)=>{
    //     window.addEventListener("mousemove", mouseMove);
    //     window.addEventListener("mouseup", mouseUp);
    // }


    useEffect(()=>{
        //update css
        if(canDrop){
          document.getElementById(`dropdown_list_dropdown_${node?.uuid}`).classList.add(style['can-drop'])
      }else{
          document.getElementById(`dropdown_list_dropdown_${node?.uuid}`).classList.remove(style['can-drop'])
      }
      },[canDrop])

      useEffect(()=>{
        //update css
        if(isOver){
          document.getElementById(`dropdown_list_dropdown_${node?.uuid}`).classList.add(style['is-over'])
      }else{
          document.getElementById(`dropdown_list_dropdown_${node?.uuid}`).classList.remove(style['is-over'])
      }
      },[isOver])
    
    return null

    // return (<Fragment>
    //         {
    //             mode==='edit' && 

    //             websiteEditorState.showComponentSettings &&
            
    //             <div 
    //                 className={style['dropdown-resize-pin']} 
    //                 onMouseDown={mouseDown} 
    //             >
                    
    //             </div>
    //         } 
    //     </Fragment>)

};

DropDownListDev.propTypes = {
};

export default DropDownListDev;




