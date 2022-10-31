import { useContext, useEffect } from "react";
import { dataContext } from "../../data/context";
import "../../public/css/partials/_notification.css"

function Notification({data})
{
    const {dataNotification, setDataNotification} = useContext(dataContext)

    useEffect(() => 
    {
        if(dataNotification.status)
        {
            document.body.classList.add("Active_notification")

            setTimeout(()=>{
                document.body.classList.remove("Active_notification")
                setDataNotification({status: false})
            }, 10000)
        }
    }, [dataNotification])

    const component =
    <div id="Notification">
        <div className={dataNotification.success ? "success" : "failed"}>
            <span>{dataNotification.message}</span>
        </div>
    </div>

    return component
}

export default Notification