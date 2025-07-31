import PropTypes from "prop-types";
import React, { Fragment, useRef } from "react";
import clsx from "clsx";
import style from './CKEditor.module.scss'

// import {dragItems, dragItemTypes} from '../../lib/dragItems'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars, faTrash } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux";    
// import { useAppSelector } from "@/redux/hooks";        
// import { setSideMenuActive, setComponentMenuActive} from '../../redux/slices/website-editor-slice'

import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-customize';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import Cookies from "js-cookie";
// import { getRWDStyles } from "../../lib/utils/rwdHelper"

// import {user_update_node} from '@/api/node.js'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";   



const KPCKEditor = ({  

    // pageIndex, fragmentIndex, rowIndex, columnIndex, columnRowIndex, 
    // node,  mode, actions, children, ...props,


    element, 
    elementProps,
    mode,
    ...props

}) => {
    const dispatch = useAppDispatch()
    const {showElementOutline} = useAppSelector((state) => state.editor_memory);



    // const [isHover, setIsHover] = useState(false)
    // const [isFocuse, setIsFocuse] = useState(false)


    // const [width, setWidth] = useState('')

    // useEffect(()=>{

    //     rwdHelper(
    //         websiteEditorState.windowWidth, 
    //         websiteEditorState.sideMenuActive, 
    //         [
    //             new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
    //         ]
    //     )

           

    // },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setWidth, node?.data])
    // console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ))


    //['Essentials', 'CKFinderUploadAdapter', 'Autoformat', 
    // 'Bold', 'Italic', 'BlockQuote', 'CKBox', 'CKFinder', 
    // 'CloudServices', 'EasyImage', 'Heading', 'Image', 'ImageCaption', 
    // 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'Indent', 'Link', 'List', 
    // 'MediaEmbed', 'Paragraph', 'PasteFromOffice', 'PictureEditing', 'Table', 
    // 'TableToolbar', 'TextTransformation']




    // ['selectAll', 'undo', 'redo', 'bold', 'italic', 'blockQuote', 'link', 'ckfinder',
    //  'uploadImage', 'imageUpload', 'heading', 
    // 'imageTextAlternative', 
    //  'toggleImageCaption', 'imageStyle:inline', 'imageStyle:alignLeft', 
    //  'imageStyle:alignRight', 'imageStyle:alignCenter', 'imageStyle:alignBlockLeft',
    //   'imageStyle:alignBlockRight', 'imageStyle:block', 'imageStyle:side',
    //    'imageStyle:wrapText', 'imageStyle:breakText',
    //  'indent', 'outdent',
    //     'numberedList', 'bulletedList', 'mediaEmbed', 'insertTable', 'tableColumn',
    //      'tableRow', 'mergeTableCells']

    // let editorReference
    const editorRef = useRef(null)
    // console.log('123')

    if(mode==='dev' && showElementOutline){
        return (
        
            
            
                <CKEditor
                {...elementProps}
                editor={ ClassicEditor }
                config={ {
                    // plugins: [ Paragraph, Bold, Italic, Essentials ],
                    // toolbar: [ 'bold', 'italic' ]
                    // toolbar: {
                    //     items: [
                    //         'undo', 'redo',
                    //         '|', 'heading',
                    //         '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                    //         '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                    //         '-', // break point
                    //         '|', 'alignment',
                    //         'link', 'uploadImage', 'blockQuote', 'codeBlock',
                    //         '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                    //     ],
                    //     shouldNotGroupWhenFull: true
                    // }
                    simpleUpload: {
                        // The URL that the images are uploaded to.
                        uploadUrl: `${process.env.NEXT_PUBLIC_API_PROTOCAL}://${location.hostname}${process.env.NEXT_PUBLIC_API_PORT?':'+process.env.NEXT_PUBLIC_API_PORT:''}/api/v1/store/image/ckeditor/upload/`,
            
                        // Enable the XMLHttpRequest.withCredentials property.
                        withCredentials: false,
            
                        // Headers sent along with the XMLHttpRequest to the upload server.
                        headers: {
                            'HTTP_X_CSRFTOKEN': Cookies.get('csrftoken'),
                            Authorization: `Bearer ${Cookies.get('user_access_token')}`
                        }
                    },
                    mediaEmbed:{
                        previewsInData: "true"
                    }
    
                } }
                
                data={element?.data?.context||''}
                onReady={ editor => {
                    editorRef.current = editor
                    // You can store the "editor" and use when it is needed.
                    // console.log( 'Editor is ready to use!', editor );
    
    
                } }
                onChange={ ( event, editor ) => {
                    // const data = editor.getData();
                    // component.context = data
                    // update(component)
    
    
                } }
                onBlur={ ( event, editor ) => {
                    const data = editor.getData();

                    // actions?.globleUpdateNode({...node, data:{...node?.data||{}, context:data}})
                    // user_update_node(node?.uuid, {...node, data:{...node?.data||{}, context:data}}, true).then(res=>{
                    //     console.log(res.data)
    
                    //   }).catch(err=>{
                    //     console.log(err)
                    //   })

                    // TODO


                } }
                onFocus={ ( event, editor ) => {
                    // setIsFocuse(true)
    
                } }
            />
            )
    }


    return ( <p 
        {...elementProps}
        dangerouslySetInnerHTML={{ __html: element?.data?.context }}
    ></p>)

   
};

KPCKEditor.propTypes = {
};

export default KPCKEditor;




