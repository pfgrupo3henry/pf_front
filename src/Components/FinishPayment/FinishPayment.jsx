import React from "react";
import { StatusPayment } from "./statusPayment";
import "./FinishPayment.css"

function FinishPayment (){
    return(
        <div className="finishPayment-component">
            <div className="statusPayment">
            <StatusPayment/>
            </div>


        </div>

    )
}

export {FinishPayment}