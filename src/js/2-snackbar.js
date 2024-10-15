
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')

form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(event){
event.preventDefault()

const promiseDelay = form.elements.delay.value;
const radioState = form.elements.state.value

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(radioState === 'fulfilled'){
            resolve (`✅ Fulfilled promise in ${promiseDelay}ms`)
        } else {
            reject (`❌ Rejected promise in ${promiseDelay}ms`)
        }
    }, promiseDelay)
})

promise
.then((value) =>{
    iziToast.success({
        
        message: value,
    });
})
.catch((value) => {
    iziToast.error({
        title: 'Error',
        message: value,
    });
})

}



