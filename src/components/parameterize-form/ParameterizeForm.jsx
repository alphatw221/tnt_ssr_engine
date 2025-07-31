import PropTypes from "prop-types";
// import Form from 'react-bootstrap/Form';
import React, { Fragment, useState, useEffect } from "react";
import ParameterizeFormItem from './ParameterizeFormItem'

const ParameterizeForm = ({ identifier, settings, items, data, setData }) => {


    // Object.entries(settings).map(([key, setting], settingIndex)=>{
    //     console.log(key)
    //     console.log(setting)
    //     console.log(settingIndex)
    // })
     


    return (
        <Fragment>

            {settings.map((setting, settingIndex)=>(
                <ParameterizeFormItem key={settingIndex} item={setting} data={data} setData={setData} identifier={identifier}/>
            ))}
            {(items||[]).map((item, itemIndex)=>(<ParameterizeFormItem key={itemIndex} item={item} data={data} setData={setData} identifier={identifier}/>))}
        </Fragment>
    );
};

ParameterizeForm.propTypes = {
    // settings: PropTypes.array,
    // items: PropTypes.array,
    // data: PropTypes.object,
    // setData: PropTypes.func
};

export default ParameterizeForm;
