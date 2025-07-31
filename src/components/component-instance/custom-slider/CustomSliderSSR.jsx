import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
// import style from './CustomSlider.module.scss'
// import { useSelector, useDispatch } from "react-redux";    



import CustomSliderClient from "./CustomSliderClient";
import Element from "@/components/element/Element"

import style from './CustomSlider.module.scss'

const CustomSliderSSR = ({  
    element, ...props}) => {


    return (<Fragment>
        <CustomSliderClient element_uuid={element?.parent_relation_uuid} element_data={element?.data} {...props}/>
        <div  
            id={`html_data_${element?.parent_relation_uuid}`}
            className={clsx('html-data', style['visually-hidden'])}
            >
            {
                (element?.children||[]).map((e, i)=><Element key={i} element={e} {...props}/>)
            }
        </div>
    </Fragment>)
};

CustomSliderSSR.propTypes = {
};

export default CustomSliderSSR;







