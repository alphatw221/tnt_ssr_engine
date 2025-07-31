import style from './Section.module.scss'
import clsx from "clsx";
import SectionClient from './SectionClient'

import { getRWDStyles} from "@/lib/utils/rwdHelper"
import { convertStyleStringToObject } from "@/lib/utils/styleStringToObject"

const _Section = ({ 
    params, 
    searchParams, 
    template_nodes,
    hideNodeDict,
    node, 
    mode, 
    actions, 
    dropSectionRef, 
    sectionCanDrop, 
    isOverSection, 
    ChildrenComponent, 
    hierarchy,
    isSudoNode,
    ...props}) => {

    

    if(mode=='display'){
        return (<div ref={dragFragmentRef} >
            {node?.display_image && <img style={{ width:'100%', objectFit:'contain', borderRadius:'3px'}} src={node?.display_image}/>}
            {node?.name}
        </div>)
    }
   


    return (
        <div ref={dropSectionRef} 
        id={`node_${node?.uuid}`} 
        className={
            clsx('base-node', style['fragment'], (mode=='edit'&&sectionCanDrop)?style['can_drop']:'', (mode=='edit'&&isOverSection)?style['is_over']:'', `node_${node?.uuid}`, ...(node?.data?.init_class_name?.split(',')||[])    )} 
        style={{
            // height:(node?.data?.height||'') + (node?.data?.height? node?.data?.height_unit : ''),
            // width:props?.width?props.width: ((node?.data?.width||'') + (node?.data?.width? node?.data?.width_unit : '')),

            ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
            ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
            ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
    
            ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
            ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
            ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

            backgroundColor:node?.data?.background_color?`rgba(${node?.data?.background_color.r}, ${node?.data?.background_color.g}, ${node?.data?.background_color.b}, ${node?.data?.background_color.a})`:'',
            backgroundImage:node?.data?.background_image?`url(${node?.data?.background_image})`:null,
            // backgroundPosition: node?.data?.background_position||'',
            // backgroundSize:node?.data?.background_size||'',
            ...getRWDStyles('background-position', node?.data?.background_position),
            ...getRWDStyles('background-size', node?.data?.background_size),
            backgroundRepeat: node?.data?.background_repeat||'',
            // backgroundPositionX: node?.data?.bacdground_position_x||'',
            // backgroundPositionY: node?.data?.bacdground_position_y||'',


            position:node?.data?.position||'',
            // top:node?.data?.top||'',
            // bottom:node?.data?.bottom||'',
            // left:node?.data?.left||'',
            // right:node?.data?.right||'',

            ...getRWDStyles('top', node?.data?.rwd_top),
            ...getRWDStyles('bottom', node?.data?.rwd_left ),
            ...getRWDStyles('left', node?.data?.rwd_bottom),
            ...getRWDStyles('right', node?.data?.rwd_right),

            zIndex:node?.data?.z_index==0?(node?.data?.z_index):(node?.data?.z_index||''),
            opacity:node?.data?.opacity==0?(node?.data?.opacity):(node?.data?.opacity||''),
            translatX:node?.data?.translate_x||'',
            translateY:node?.data?.translate_y||'',

            '--display-xxl':node?.data?.hide_on_xxl?'none':'',
            '--display-xl':node?.data?.hide_on_xl?'none':'',
            '--display-lg':node?.data?.hide_on_lg?'none':'',
            '--display-md':node?.data?.hide_on_md?'none':'',
            '--display-sm':node?.data?.hide_on_sm?'none':'',
            '--display-xs':node?.data?.hide_on_xs?'none':'',
            '--display-xxs':node?.data?.hide_on_xxs?'none':'',

            ...getRWDStyles('flex-direction', node?.data?.rwd_flex_direction),
            ...getRWDStyles('flex-wrap', node?.data?.rwd_flex_wrap),
            ...getRWDStyles('justify-content', node?.data?.rwd_justify_content),
            ...getRWDStyles('justify-items', node?.data?.rwd_justify_items),
            ...getRWDStyles('align-content', node?.data?.rwd_align_content),
            ...getRWDStyles('align-items', node?.data?.rwd_align_items),
            
            ...(convertStyleStringToObject(node?.data?.init_style))

            ,


        }}>

            {/* COMPONENT_MATRIX */}

            <ChildrenComponent 
                        params={params} 
                        searchParams={searchParams}
                        template_nodes={template_nodes}
                        hideNodeDict={hideNodeDict}
                        parent_node={node} 
                        mode={mode} 
                        actions={actions}
                        hierarchy={hierarchy||[]}
                        isSudoNode={isSudoNode}
                        />



            {
                    //
                    // (node?.children||[]).map((childrenNode,childIndex)=>(    
                    //     <NodeComponent
                    //         key={childIndex}
                    //         params={params} 
                    //         searchParams={searchParams}
                    //         template_nodes={template_nodes}
                    //         parent_node= {node}
                    //         node={childrenNode}  
            
                    //         mode={mode} 
                    //         actions={actions}
                        
                    //     >

                    //     </NodeComponent> 
                    // ))
            }



            <SectionClient node_uuid={node?.uuid} listen_events={node?.data?.listen_events} init_css={node?.data?.init_css}/>

        </div>
    );
};

_Section.propTypes = {
};

export default _Section;
