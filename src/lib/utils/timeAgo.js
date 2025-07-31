export function timeAgo(date) {


    const minute = 60
    const hour = 7200
    const day = 172800
    const week = 1209600
    const month = 4838400
    const year = 58060800
    const century = 58060800000

    var seconds = parseInt((new Date().getTime() - date?.getTime() )/ 1000)

    if(seconds>=0){
        if(seconds<minute){
            return '剛剛'
        }else if(seconds<hour){
            return `${parseInt(seconds/minute)} 分鐘前`
        }else if(seconds<day){
            return `${parseInt(seconds/hour)} 小時前`
        }else if(seconds<week){
            return `${parseInt(seconds/day)} 天前`
        }else if(seconds<month){
            return `${parseInt(seconds/week)} 週前`
        }else if(seconds<year){
            return `${parseInt(seconds/month)} 月前`
        }else if(seconds<century){
            return `${parseInt(seconds/year)} 年前`
        }else {
            return `${parseInt(seconds/century)} 世紀前`
        }
    }else{

    }

  }