import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
import style from './KPLink.module.scss'

      
// import { useAppSelector } from "@/redux/hooks";
import {rgba2hex} from "../../lib/utils/rgba2hex"


import  Link  from 'next/link';
import {  getRWDStyles} from "../../lib/utils/rwdHelper"
import KPLinkClint from '@/components/component-instance/KPLinkClient'
const KPLink = ({  

    node,  mode, actions, update, children, ...props}) => {



    const innerLink = (<Fragment>
        { node?.data?.icon_name && <i className={node?.data?.icon_name||''}
            style={{          
                // '--font-color-1':rgba2hex(node?.data?.text_font_color?.r, node?.data?.text_font_color?.g, node?.data?.text_font_color?.b, node?.data?.text_font_color?.a),
                // '--font-color-2':rgba2hex(node?.data?.text_font_color2?.r, node?.data?.text_font_color2?.g, node?.data?.text_font_color2?.b, node?.data?.text_font_color2?.a),

        }}
        
        />}
        <span
             style={{      
                fontFamily:node?.data?.text_font_family||'',
                fontWeight:node?.data?.text_font_weight||'',

                // '--font-color-1':rgba2hex(node?.data?.text_font_color?.r, node?.data?.text_font_color?.g, node?.data?.text_font_color?.b, node?.data?.text_font_color?.a),
                // '--font-color-2':rgba2hex(node?.data?.text_font_color2?.r, node?.data?.text_font_color2?.g, node?.data?.text_font_color2?.b, node?.data?.text_font_color2?.a),

            }}
        >{node?.data?.text}</span>
    </Fragment>)

    const className =  clsx(
        props?.className,
        style['kp-link']
    )

    const _style = {
        ...props?.style||{},

        '--font-color-1':node?.data?.text_font_color?rgba2hex(node?.data?.text_font_color?.r, node?.data?.text_font_color?.g, node?.data?.text_font_color?.b, node?.data?.text_font_color?.a):'',
        '--font-color-2':node?.data?.text_font_color2?rgba2hex(node?.data?.text_font_color2?.r, node?.data?.text_font_color2?.g, node?.data?.text_font_color2?.b, node?.data?.text_font_color2?.a):'',


        ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
        ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
        ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),

        ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
        ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
        ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

        ...getRWDStyles('line-height', node?.data?.rwd_line_height, 'px'),
        ...getRWDStyles('font-size', node?.data?.text_rwd_font_size, 'px'),

        ...getRWDStyles('writing-mode', node?.data?.text_rwd_writing_mode),
        ...getRWDStyles('word-spacing', node?.data?.text_rwd_word_spacing),
        ...getRWDStyles('letter-spacing', node?.data?.text_rwd_letter_spacing),
        ...getRWDStyles('text-orientation', node?.data?.text_rwd_text_orientation),

        textAlign:node?.data?.text_align||'',

    }

    if(['previous_page', 'next_page', 'refresh', 'scroll_to'].includes(node?.data?.function)){
        return (<KPLinkClint 
            id={props?.id} className={className} style={_style}
            href={node?.data?.href} 
            func={node?.data?.function} 
            scroll_to={node?.data?.scroll_to} 
            scroll_into_view_block={node?.data?.scroll_into_view_block} 
            scroll_into_view_inline={node?.data?.scroll_into_view_inline}
            mode={mode}>
            {innerLink}
            {children}
        </KPLinkClint>)
    }

    if(mode=='edit'){
        return (  <a id={props?.id} className={className} style={_style} 
            // href={mode=='edit'?'javascript:void(0)':(node?.data?.href||null)} 
            role='button'
            // {...(mode=='edit'?{role:'button'}:{href:node?.data?.href||''})}
            >
                {innerLink}
                {children}
            </a>)
    }

    if(node?.data?.href?.[0]==='/'){
        return (  <Link id={props?.id} className={className} style={_style} 
        // href={mode=='edit'?'javascript:void(0)':(node?.data?.href||'')}  
        // {...(mode=='edit'?{role:'button'}:{href:node?.data?.href||''})}
        href={node?.data?.href||''}
        >
            {innerLink}
            {children}
        </Link>)
    }

    // javascript:void(0);
    return (  <a id={props?.id} className={className} style={_style} 
    // href={mode=='edit'?'javascript:void(0)':(node?.data?.href||null)} 
    // {...(mode=='edit'?{role:'button'}:{href:node?.data?.href||''})}
    href={node?.data?.href||''}
    >
        {innerLink}
        {children}
    </a>)

    return (<div

        id={props?.id}
        className={
            clsx(
                props?.className,
                style['kp-link']

            )}
        style={{
            ...props?.style||{},
   
            '--font-color-1':rgba2hex(node?.data?.text_font_color?.r, node?.data?.text_font_color?.g, node?.data?.text_font_color?.b, node?.data?.text_font_color?.a),
            '--font-color-2':rgba2hex(node?.data?.text_font_color2?.r, node?.data?.text_font_color2?.g, node?.data?.text_font_color2?.b, node?.data?.text_font_color2?.a),

   
            ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
            ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
            ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
    
            ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
            ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
            ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

            ...getRWDStyles('line-height', node?.data?.rwd_line_height, 'px'),
            ...getRWDStyles('font-size', node?.data?.text_rwd_font_size, 'px'),


            textAlign:node?.data?.text_align||'',

        }}
    >

        <KPLinkClint 
            href={node?.data?.href} 
            func={node?.data?.function} 
            scroll_to={node?.data?.scroll_to} 
            scroll_into_view_block={node?.data?.scroll_into_view_block} 
            scroll_into_view_inline={node?.data?.scroll_into_view_inline}
            mode={mode}
        />
        {
            ['previous_page', 'next_page', 'refresh', 'scroll_to'].includes(node?.data?.function)
            ?
            (<Fragment>{innerLink}</Fragment>)
            :
            node?.data?.href?.[0]==='/'
            ?
            <Link href={mode=='edit'?'#':(node?.data?.href||'')}>
                {innerLink}
            </Link>
            :
            <a href={mode=='edit'?'#':(node?.data?.href||'')}>
                {innerLink}
            </a>
        }

        {children}
    </div>)
    
};

KPLink.propTypes = {

};

export default KPLink;



