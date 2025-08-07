import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, lazy, useRef } from "react";
import style from './ParameterizeFormItem.module.scss'
import react_color from 'react-color'
import SelectFileModal from "../select-file-modal/SelectFileModal";
import SelectIconModal from "../select-icon-modal/SelectIconModal"
import Select from "react-select";
import SearchSelect from '../search-select/SearchSelect'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import DateTimePicker from 'react-datetime-picker';
import Editor from "@monaco-editor/react";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import clsx from "clsx";


const { SketchPicker } = react_color
const ParameterizeFormItem = ({ identifier, item, data, setData, actions }) => {
    const updateData = (value)=>{
        const d = {...data}
        d[item.key] = value

        setData(d)
    }
    const removeDataKey = ()=>{
       console.log('remove data key')
        const d = {...data}
        delete d?.[item.key]
        setData(d)
    }

    const [showSelectFileModal, setShowSelectFileModal] = useState(false)
    const [showSelectIconModal, setShowSelectIconModal] = useState(false)
    const [_cache, setCache] = useState(data?.[item.key]==0?data?.[item.key]:data?.[item.key]||'')


    // const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const decoratedOnClick = useAccordionButton('0', () =>{
        updateData(!(data?.[item?.key]||false))
    });
    

    const [openAccordionDict, setOpenAccordionDict] = useState({});
    // 在客戶端渲染時從 localStorage 中加載狀態
    useEffect(() => {
        setOpenAccordionDict(JSON?.parse(localStorage?.getItem(`openAccordionDict_${item?.key}`)||"{}")||{});
    }, []);
    const openAccordionDictToggle = ()=>{

        console.log(identifier)
        console.log(item?.key)
        const _openAccordionDict = JSON.parse(JSON.stringify(openAccordionDict))
        if(_openAccordionDict[identifier]){
            delete _openAccordionDict[identifier]
        }else{
            _openAccordionDict[identifier] = true
        }
        console.log(_openAccordionDict)
        localStorage.setItem(`openAccordionDict_${item?.key}`, JSON.stringify(_openAccordionDict))
        setOpenAccordionDict(_openAccordionDict)
    }





    switch(item.type){
        case 'images':
            return null
        case 'image':
            return(

            <Fragment>
                <label className={style.label}>{item.name}</label>
    
                {data?.[item.key] && 
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <img style={{maxWidth:'200px'}} src={data?.[item.key]}/>
                    </div>
                }
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly' ,marginTop:'10px', marginBottom:'10px'}}>
                    <Button variant="secondary" onClick={()=>{setShowSelectFileModal(true)}}>選擇圖片</Button>
                    <Button variant="secondary" onClick={()=>{removeDataKey()}}>取消圖片</Button>
                </div>

                <SelectFileModal show={showSelectFileModal} onHide={()=>{setShowSelectFileModal(false)}} acceptType={[item?.accept||'image/*']} filterType={item?.filter_type||'image'} setSelectFile={(image)=>{updateData(image)}} />

            </Fragment>)

        case 'video':
            return(

            <Fragment>
                <label className={style.label}>{item.name}</label>
                {data?.[item.key] && 
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <video
                            autoplay
                            loop
                            muted
                            style={{maxWidth:'200px'}}
                        >
                            <source src={data?.[item.key]} type="video/mp4"></source>
                        </video>
                    </div>
                }
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly' ,marginTop:'10px', marginBottom:'10px'}}>
                    <Button variant="secondary" onClick={()=>{setShowSelectFileModal(true)}}>選擇影片</Button>
                    <Button variant="secondary" onClick={()=>{removeDataKey()}}>取消影片</Button>
                </div>

                <SelectFileModal show={showSelectFileModal} onHide={()=>{setShowSelectFileModal(false)}} acceptType={item?.accept||'video/*'} filterType={item?.filter_type||'video'} setSelectFile={(file)=>{updateData(file)}} />

            </Fragment>)

        case 'file':
            return(

            <Fragment>
                <label className={style.label}>{item.name}</label>
                {data?.[item.key] && 
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <p>{data?.[item.key]?.split('/')?.[(data?.[item.key]?.split('/').length-1)]}</p>
                    </div>
                }
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly' ,marginTop:'10px', marginBottom:'10px'}}>
                    <Button variant="secondary" onClick={()=>{setShowSelectFileModal(true)}}>選擇檔案</Button>
                    <Button variant="secondary" onClick={()=>{removeDataKey()}}>取消檔案</Button>
                </div>

                <SelectFileModal show={showSelectFileModal} onHide={()=>{setShowSelectFileModal(false)}} acceptType={item?.accept} filterType={item?.filter_type} setSelectFile={(file)=>{updateData(file)}} />

            </Fragment>)
            
        case 'icon':
            return(

            <Fragment>
                <label className={style.label}>{item.name}</label>
                {/* <div>
                    <button className={style.selectButton} onClick={()=>{setShowSelectIconModal(true)}}>選擇圖標</button>
                </div> */}
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly' ,marginTop:'10px'}}>
                    <Button variant="secondary" onClick={()=>{setShowSelectIconModal(true)}}>選擇圖標</Button>
                    <Button variant="secondary" onClick={()=>{removeDataKey()}}>取消圖標</Button>

                </div>

                <SelectIconModal show={showSelectIconModal} onHide={()=>{setShowSelectIconModal(false)}} 
                    setHoverIconName={(icon_name)=>{
                        updateData(icon_name)
                    }} 
                    setSelectIconName={(icon_name)=>{
                        updateData(icon_name)
                    }} />

            </Fragment>)
        case 'input':

            return ( 
            <Fragment>
                <div>

                    <div>
                    <label className={style.label}>{item.name}</label>
                    </div>
                    {
                        item.inputType=='range' &&
                        <div>
                        <input
                            className={style.input}
                            type='number'
                            max={item?.max}
                            min={item?.min}
                            value={_cache}
                            onBlur={(e)=>{updateData(_cache)}}
                            onChange={(e)=>{setCache(parseInt(e.target.value))}}
    
                        />
                        </div>
                    }
                    <div>
                        <input
                            className={style.input}
                            type={item.inputType}
                            max={item?.max}
                            min={item?.min}
                            value={_cache}
                            onBlur={(e)=>{

                                if((_cache===''||_cache===null) && !item?.allow_blank){
                                    removeDataKey()
                                }else{

                                    console.log('blur')
                                    updateData(_cache)
                                }
                                
                            }}
                            onChange={(e)=>{
                                // if((e.target.value==''||e.target.value==null) && !item?.allow_blank){
                                //     setCache(null)
                                //     console.log('set null')
                                // }
                                // else 
                                if(item.inputType=='number' && item.dataType=='float'){
                                    setCache(parseFloat(e.target.value))

                                }else if(item.inputType=='number'){

                                    setCache(parseInt(e.target.value))
                                }else{

                                    setCache(e.target.value)
                                }
                            }}

                        />
                    </div>
                </div>

            </Fragment>)
        case 'checkbox':
            return ( 
            <Fragment>
                <div>

                    <div>

                        <label className={style.label}>{item.name}</label>
                    </div>
                    <div>
                        <input
                            className={style['checkbox']}
                            type='checkbox'
                            checked={data?.[item.key]||item?.default||false}
                            value={item.key}
                            onChange={(e)=>{
                                if(e.target.checked){
                                    updateData(e.target.checked)
                                }else{
                                    removeDataKey()
                                }
                                // console.log(e.target.checked);
                                // updateData(e.target.checked)
                            }}
                        />
                    </div>
                </div>

            </Fragment>)
        case 'text':
            return ( 
            <Fragment>
                <label className={style.label}>{item.name}</label>
                <p className={style.p}>{data[item.key]}</p>
            </Fragment>)
        case 'tags':
            return null
        case 'select':
            return ( 
            <Fragment>
                <div>
                    <div>
                        <label className={style.label}>{item.name}</label>
                    </div>
                    <div>
                        <select className={style.select} value={data?.[item.key]||''} 
                            onChange={(e)=>{
                                console.log(e.target.value)
                                if(e.target.value==''|| e.target.value==null){
                                    removeDataKey()
                                }
                                else if(item?.valueType=='integer'){
                                    updateData(parseInt(e.target.value))
                                }else{
                                    updateData(e.target.value)
                                }
                                
                                
                                
                                }}>
                            <option className={style.option} value={null}></option>
                            {item.options.map((option,optionIndex)=>(<option key={optionIndex} className={style.option} value={option[item.value_key]}>{option[item.name_key]}</option>))}
                        </select>

                    </div>
                </div>
            </Fragment>)

    case 'input_or_select':
        return ( 
        <Fragment>
            <div>
                <div>
                    <label className={style.label}>{item.name}</label>
                </div>
                <div>
                    {
                        data?.[`select_${item.key}`]?
                        <select className={style.select} value={data?.[item.key]||''} 
                            onChange={(e)=>{
                                if(e.target.value==''|| e.target.value==null){
                                    removeDataKey()
                                }
                                else if(item?.valueType=='integer'){
                                    updateData(parseInt(e.target.value))
                                    setCache(parseInt(e.target.value))
                                }else{
                                    updateData(e.target.value)
                                    setCache(e.target.value)
                                }
                                
                                
                                
                                }}>
                            <option className={style.option} value={null}></option>
                            {item.options.map((option,optionIndex)=>(<option key={optionIndex} className={style.option} value={option[item.value_key]}>{option[item.name_key]}</option>))}
                        </select>
                        :
                        <input
                            className={style.input}
                            type={'text'}
                            value={_cache}
                            onBlur={(e)=>{
                                if(_cache==null){
                                    removeDataKey()
                                }else{
                                    updateData(_cache)
                                }
                                
                            }}
                            onChange={(e)=>{
                                if(e.target.value==''|| e.target.value==null){
                                    setCache(null)
                                }else{
                                    setCache(e.target.value)
                                }
                            }}

                        />
                    }
                    <div style={{textAlign:'center' ,marginTop:'10px'}}>
                        <Button variant="secondary" onClick={()=>{

                            if(data?.[`select_${item.key}`]){
                                const d = {...data}
                                delete d?.[`select_${item.key}`]
                                setData(d)
                            }else{
                                const d = {...data}
                                d[`select_${item.key}`] = true
                                setData(d)
                            }
                        }}>切換選項/輸入</Button>
                    </div>


                    
                </div>
            </div>
        </Fragment>)

        case 'multiple_select':
            

            return ( 
            <Fragment>
                <label className={style.label}>{item.name}</label>
                <Select
                    isMulti
                    value={item.options.filter(option => data[item.key].includes(option[item.value_key]))}
                    onChange={(selectedObjects)=>{
                        updateData(selectedObjects.map(object=>object[item.value_key]))
                    }}
                    options={item.options}
                    getOptionLabel={(option)=>{
                        return option[item.name_key]
                    }}
                    getOptionValue={(option)=>{
                        return option[item.value_key]
                    }}
                />
            </Fragment>)
        case 'search_select':

            return ( 
            <Fragment>
                <label className={style.label}>{item.name}</label>
                <SearchSelect 
                    multiple={item.multiple} 
                    value={data[item.key]}
                    name_keys={item.name_keys} 
                    value_key={item.value_key}
                    searchRequest={item.search_request}
                    onSelect={(value)=>{
                        updateData(value)
                    
                    }}
                />
            </Fragment>)

        case 'nested_select':
            return null
        case 'date':
            return null
        case 'datetime':
            return (
                <Fragment>
                    <label className={style.label}>{item.name}</label>
                    <br/>
                    <DateTimePicker onChange={(value)=>{ updateData(value?.toISOString());}} value={data?.[item.key]} />
                </Fragment>
            )
        case 'toggle':
            return null
        case 'ckeditor_classic':
            return null
        case 'textarea':
            return ( 
            <Fragment>
                <label className={style.label}>{item.name}</label>
                <textarea className={style.textarea}  

                 onBlur={(e)=>{updateData(_cache)}}
                 onChange={(e)=>{setCache(e.target.value)}}
                 value={_cache}
                >

                </textarea>
            </Fragment>)
        case 'monaco_editor':
            const dataRef = useRef(data);
            useEffect(() => {
                dataRef.current = data;
            }, [data]);
            const [language, setLanguage] = useState(data?.data?.inner_lang||"javascript");

            const handleEditorDidMount = (editor, monaco)=> {

                editor.onDidBlurEditorText(() => {
                    // updateData(editor.getValue())
                    const d = {...dataRef.current};
                    d[item.key] = editor.getValue();
                    setData(d)
                    // updateData(editor.getValue())
                });
            }


            return ( 
            <Fragment>
                <label className={style.label}>{item.name}</label>
                <br />
                <label className={style.label}>語言:</label>
                <select onChange={(e) => {setData({...data, data:{...data?.data||{}, inner_lang:e.target.value}});setLanguage(e.target.value);}} value={language}>
                    <option value="javascript">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                </select>
                <Editor
                            height={item.height||'50vh'}
                            language={language}
                            fontSize={18}
                            defaultValue=""
                            theme={item.theme||'vs-light'}
                            value={_cache}
                            options={item?.options||{}}
                            onChange={(e)=>{setCache(e)}}
                            onMount={handleEditorDidMount}
                            onBlur={(editor)=>{console.log('editor on blur')}}

                        />



            </Fragment>
           )
        case 'json':


            const [jsonString, setJsonString] = useState(JSON.stringify(data?.[item.key], null, 2));
            const [error, setError] = useState(null);
            
            useEffect(()=>{
                setJsonString(JSON.stringify(data?.[item.key], null, 2))
            },[data])

            const handleChange = (e) => {
                setJsonString(e.target.value);
                try {
                JSON.parse(e.target.value); // 測試是否為合法 JSON
                setError(null);
                } catch (err) {
                setError('JSON 格式錯誤');
                }
            };

            return ( 
            <Fragment>
                <label className={style.label}>{item.name}</label>
                {/* <textarea className={style.textarea}  
                 onBlur={(e)=>{updateData(_cache)}}
                 onChange={(e)=>{
                    setCache(e.target.value)
                }}
                 value={JSON.stringify(_cache)}
                >

                </textarea> */}

                <textarea
                    rows={item?.rows||10}
                    className={style.textarea}  
                    value={jsonString}
                    onChange={handleChange}
                    onBlur={(e)=>{
                        if(!error){
                            updateData(JSON.parse(e.target.value))
                        }
                    }}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}


            </Fragment>)
        case 'slot':
            return ( 
                <item.slot {...item?.props||{}}/>
            )
        case 'button':
            return ( 
                    <button style={item?.style||{}}  onClick={()=>{item.action()}}>{item.name}</button>
                )
        case 'buttons':
            return ( 
            <Fragment>
                <div className={style.buttons}>
                    {item.buttons.map((button, key)=>(<button key={key} onClick={()=>{actions[item.action]()}}>{item.name}</button>))}
                </div>
            </Fragment>)
        case 'hex_color':
            return ( 
            <Fragment>
                {item.inline_items.map((_item,key)=>{})}
            </Fragment>)

        case 'rgba_color':

            return (
            <Fragment >
                <label className={style.label}>{item.name}</label>
                    {/* <div style={ {} } onClick={ setDisplayColorPicker(true) }>
                        <div style={ {} } />
                        <button onClick={ ()=>{setDisplayColorPicker(false)} }/>
                    </div>
                    { displayColorPicker && 
                    <div style={ {} }>
                        <SketchPicker color={ data[item.key] } onChange={ (color)=>{updateData(color.rgb)} } />
                    </div> 
                    } */}
                <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                    <SketchPicker className='sketch_picker' color={ data?.[item.key]||{r:0,g:0,b:0,a:0} } onChange={ (color)=>{updateData(color.rgb)} } />
                </div>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'center', marginTop:'10px'}}>
                    <Button variant="secondary" onClick={()=>{removeDataKey()}}>取消顏色</Button>
                </div>
            </Fragment>)
            
                

        case 'inline':

            
            

            return ( 
            <div style={{
                marginTop:'10px',
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                flexWrap:'wrap'
            }}>
                
                {item.inline_items.map((_item,key)=>(<ParameterizeFormItem key={key} identifier={identifier} item={_item} data={data} setData={setData} actions={actions}/>))}
            </div>)
        case 'accordion':

            return(<div className={style['accordion']}>
                <div className={clsx(style['accordion-item'], openAccordionDict?.[identifier]?style['open']:'')}>
                    <button className={style['accordion-header']} onClick={()=>{openAccordionDictToggle()}}>
                        {item.name}
                        <span className={style['icon']}>+</span>
                    </button>
                    <div className={style['accordion-content']}>
                        {item.accordion_items.map((_item,key)=>(<ParameterizeFormItem key={key} identifier={identifier} item={_item} data={data} setData={setData} actions={actions}/>))}
                    </div>
                    
                </div>
            </div>)
            return (
                <Accordion style={{marginTop:'10px'}} defaultActiveKey={data?.[item?.key]?'0':''} >


                <Accordion.Item eventKey="0">
                    <Accordion.Header onClick={decoratedOnClick}>{item.name}</Accordion.Header>
                        <Accordion.Body>

                            {item.accordion_items.map((_item,key)=>(<ParameterizeFormItem key={key} identifier={identifier} item={_item} data={data} setData={setData} actions={actions}/>))}

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        default:
            return null
    }
};

ParameterizeFormItem.propTypes = {
    // item: PropTypes.object,
    // data: PropTypes.any,
    // setData: PropTypes.func,
    // actions: PropTypes.object
};

export default ParameterizeFormItem;
