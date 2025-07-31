export function getCompnentDefault(type){

    switch(type){
        case 'fragment':
            return {}

        case 'header_footer':
            return {}
            
        case 'banner':
            return {
                "width": 10, 
                "height":  10, 
                "height_unit": "vh", 
                "full_width": false, 
                "margin_top": 0, 
                "width_unit": "vw",
                "margin_left": 0,
                "margin_unit": "%",
                "padding_top": 0,
                "margin_right": 0,
                "padding_left": 0,
                "padding_unit": "%",
                "margin_bottom": 0,
                "padding_right": 0,
                "padding_bottom": 0,
                "background_color": {"a": "0", "b": "0", "g": "0", "r": "0"}
            
            }

        default:
            return {}

    
    }
}
