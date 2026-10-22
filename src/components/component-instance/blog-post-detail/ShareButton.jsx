
import clsx from "clsx";
import style from "./ShareButton.module.scss"


const ShareButton = ({})=>{


    return (
    <div className={clsx('分享框',style['分享框'])}>
        <label className={clsx('分享-標題',style['分享-標題'])}>分享：</label>
        <i className={clsx('分享-按鈕',style['分享-按鈕'])} onClick={()=>{
            // console.log(window.location.href)
            if (navigator.share) {
                navigator.share({
                    title: document?.title,
                    url: window?.location?.href
                }).then(() => {
                    alert("分享成功");
                })
                .catch(err=>{});
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("已複製連結");

            }
            }}/>
    </div>)


}

export default ShareButton;
