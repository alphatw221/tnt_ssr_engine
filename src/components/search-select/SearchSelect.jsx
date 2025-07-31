import { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";


import { useClickOutsideEvent } from "../../lib/utils/clickOutside";
import style from './SearchSelect.module.scss'






const SearchSelect = ({
    multiple, value, name_keys, value_key, searchRequest, onSelect

}) => {


    const dropDown = useRef(null)

    const [init, setInit] = useState(false)

    const [showDropDown, setShowDropDown] = useState(false)
    const [options, setOptions] = useState([])

    const [dataValue, setdataValue] = useState(value)

    const [page, setPage] = useState(1)
    const [gotNext, setGotNext] = useState(false)

    const [keyword, setKeyword] = useState('')


    useClickOutsideEvent(useEffect, dropDown,()=>{
        setShowDropDown(false)
    }, showDropDown)

    useEffect(()=>{
        if(showDropDown && !init){
            searchRequest(keyword, page).then(res=>{
                setInit(true)
                console.log(res.data)
                setOptions(res.data.results||[])
                if(res.data.next)setGotNext(true)
            })
        }
    },[showDropDown,init])

    const removeData = (dataIndex)=>{
        
        console.log((dataValue||[]).filter((data,index)=>index!=dataIndex))
        onSelect((dataValue||[]).filter((data,index)=>index!=dataIndex))
        setdataValue((dataValue||[]).filter((data,index)=>index!=dataIndex))
    }


    return (
        <Fragment>
            <div className={clsx(style['select-search'])}>
                <div onClick={()=>{setShowDropDown(true)}} className={clsx(style['display'])}>
                    { multiple ?
                            <Fragment >
                                {(dataValue||[]).map((data,dataIndex)=>(
                                <div key={dataIndex} className={style.selectData}>
                                        <span>
                                            {name_keys.map((name_key,key)=>(
                                                    data?.[name_key] 
                                                )).join('|')}
                                        </span>
                                        <i className="fa fa-times-circle"  onClick={()=>{removeData(dataIndex)}}></i>
                                    
                                </div>))}
                            </Fragment>
                        :

                        <span> 
                            {name_keys.map((name_key,key)=>(
                                dataValue?.[name_key] 
                            )).join('|')}
                        </span>
                
                    }
                </div>
                <div ref={dropDown} className={clsx(style['dropdown'], showDropDown?style['active']:'')}>
                    
                    <input type="text" placeholder="搜尋名稱/簡稱" onChange={(e)=>{
                        setKeyword(e.target.value)
                    }}
                    onKeyUp={(e)=>{
                        if(e.keyCode===13){
                            setPage(1)
                            searchRequest(keyword, 1).then(res=>{
    
                                console.log(res.data)
                                setOptions(res.data.results||[])
                                if(res.data.next)setGotNext(true)
                            })
                        }
                    }}
                    />
                    
                    <ul>
                        {options.map((option,optionIndex)=>(
                                <li key={optionIndex} onClick={(e)=>{

                                    const data = {}
                                    data[value_key] = option?.[value_key]
                                    name_keys.forEach(name_key => {
                                        data[name_key] = option?.[name_key]
                                    });

                                    if(multiple){
                                        onSelect([...(dataValue||[]),  data])
                                        setdataValue([...(dataValue||[]),  data])
                                    }else{
                                        onSelect(data)
                                        setdataValue( data)
                                    }
                                }}>
                                    {name_keys.map((name_key,key)=>(
                                        option?.[name_key] 
                                    )).join('|')}
                                </li>)
                        )}
                    </ul>
                </div>
            </div>
           
        </Fragment>
    );
};

SearchSelect.propTypes = {
    multiple:PropTypes.bool,

    value:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),

    name_keys:PropTypes.array,
    value_key:PropTypes.string,

    searchRequest:PropTypes.func,
    onSelect:PropTypes.func
};

export default SearchSelect;
