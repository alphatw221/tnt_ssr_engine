export class RWDPropHandler{

  constructor(instance, key, unitKey, setter){
    this.instance=instance
    this.key=key
    this.unitKey=unitKey
    this.setter=setter
  }

  handle(windowWidth, sideMenuActive){

    let _windowWidth = windowWidth
    if(sideMenuActive){
      _windowWidth = parseInt(_windowWidth*0.8)
    }

    let _prop = ''
    if(typeof this.instance?.[this.key]!="string"){
      _prop = String(this.instance?.[this.key]||'')
    }else{
      _prop = (this.instance?.[this.key]||'').split(',')
    }
    // const _prop = (this.instance?.[this.key]||'').split(',')
    let prop = ''

    if(_windowWidth>=1536){
      prop = _prop?.[0]||''
    }else if(_windowWidth>=1280){
      prop = _prop?.[1]||_prop?.[0]||''
    }else if(_windowWidth>=1024){
      prop = _prop?.[2]||_prop?.[1]||_prop?.[0]||''
    }else if(_windowWidth>=768){
      prop = _prop?.[3]||_prop?.[2]||_prop?.[1]||_prop?.[0]||''
    }else if(_windowWidth>=640){
      prop = _prop?.[4]||_prop?.[3]||_prop?.[2]||_prop?.[1]||_prop?.[0]||''
    }else if(_windowWidth>=390){
      prop = _prop?.[5]||_prop?.[4]||_prop?.[3]||_prop?.[2]||_prop?.[1]||_prop?.[0]||''
    }else{
      prop = _prop?.[6]||_prop?.[5]||_prop?.[4]||_prop?.[3]||_prop?.[2]||_prop?.[1]||_prop?.[0]||''
    }


    let value=prop.replace(/[^0-9\-.]/g, "");
    let unit_key=prop.replace(/[0-9\-.]/g, '')
    
    if (value==""){
      this.setter('')
      return
    }

    if(sideMenuActive &&  (unit_key=='vw' ||  (unit_key=='' && this.instance?.[this.unitKey]=='vw') ||  (unit_key=='' && this.instance?.[this.unitKey]!='vw' && this.unitKey=='vw'))){
      value = (parseFloat(value)||0)*0.8
    }

    this.setter(`${value}${value?(unit_key||this.instance?.[this.unitKey]||this.unitKey):''}`)


  }
  
}


export class RWDHideHandler extends RWDPropHandler{


  handle(windowWidth, sideMenuActive){

    let _windowWidth = windowWidth
    if(sideMenuActive){
      _windowWidth = parseInt(_windowWidth*0.8)
    }

    if(_windowWidth>=1536){
      this.setter(this.instance?.hide_on_xxl==true)
    }else if(_windowWidth>=1280){
      this.setter(this.instance?.hide_on_xl==true)
    }else if(_windowWidth>=1024){
      this.setter(this.instance?.hide_on_lg==true)
    }else if(_windowWidth>=768){
      this.setter(this.instance?.hide_on_md==true)
    }else if(_windowWidth>=640){
      this.setter(this.instance?.hide_on_sm==true)
    }else if(_windowWidth>=390){
      this.setter(this.instance?.hide_on_xs==true)
    }else{
      this.setter(this.instance?.hide_on_xxs==true)
    }

  }
}


export function rwdHelper(windowWidth, sideMenuActive, handlers){

  (handlers||[]).forEach(handler => {
    handler?.handle(windowWidth, sideMenuActive)

  });

}

export const getRespectiveRWDProp = ()=>{

}


const transformToProperValue = ( prop, defaultUnit) => {

  let value=prop.replace(/[^0-9\-.]/g, "");
  let unit=prop.replace(/[0-9\-.]/g, '');



  return unit ? prop : value ? `${value}${defaultUnit||'px'}` : ''
}


export const getRWDStyles = (key, value, defaultUnit)=>{


  // let _windowWidth = windowWidth
  // if(sideMenuActive){
  //   _windowWidth = parseInt(_windowWidth*0.8)
  // }

  let props 
  if(typeof value!="string"){
    props = String(value||'')
  }else{
    props = (value||'').split(',')
  }

  const style = {};

  (['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']).forEach((size, index)=>{
    if(props?.[index]){
      style[`--${key}-${size}`] = transformToProperValue( props?.[index]||'', defaultUnit)
    }
  })

  // style[`--${key}-xxl`] = transformToProperValue( props?.[0]||'', defaultUnit)
  // style[`--${key}-xl`] = transformToProperValue( props?.[1]||props?.[0]||'', defaultUnit)
  // style[`--${key}-lg`] = transformToProperValue( props?.[2]||props?.[1]||props?.[0]||'', defaultUnit)
  // style[`--${key}-md`] = transformToProperValue( props?.[3]||props?.[2]||props?.[1]||props?.[0]||'', defaultUnit)
  // style[`--${key}-sm`] = transformToProperValue( props?.[4]||props?.[3]||props?.[2]||props?.[1]||props?.[0]||'', defaultUnit)
  // style[`--${key}-xs`] = transformToProperValue( props?.[5]||props?.[4]||props?.[3]||props?.[2]||props?.[1]||props?.[0]||'', defaultUnit)
  // style[`--${key}-xxs`] = transformToProperValue( props?.[6]||props?.[5]||props?.[4]||props?.[3]||props?.[2]||props?.[1]||props?.[0]||'', defaultUnit)

  return style
}