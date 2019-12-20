import axios from 'axios';
// import util from '@/utils/api'

const api_base_url = 'https://happydelivery.io/webapi/V1/'

var openapi_server = axios.create({
    baseURL: api_base_url,
    headers: {
        'Content-Type': 'application/json'
    }
});

const getConfig = headerparams => { return { headers: { 'authorization': localStorage.getItem('lvlacc') || 'newnlp', ...headerparams } }; };

export const getToken = params => { return openapi_server.get(`/startweb.php?to=${params.t}&cs=${params.c}`) }
export const getAccount = headerparams => { return openapi_server.get(`/account.php?nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const getProducts = headerparams => { return openapi_server.get(`/productlist.php?nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const getShopingcart = headerparams => { return openapi_server.get(`/shoppingcart.php?f=get&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const updateShopingcart = (params, headerparams) => { return openapi_server.get(`/shoppingcart.php?f=update&pid=${params.productid}&qty=${params.qtyplusone}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const updatePayment = (params, headerparams) => { return openapi_server.get(`shoppingcart.php?f=setpayment&pmtid=${params.to_payment_type}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const shopingcartOrder = (params, headerparams) => {
    var myformData = new FormData();
    myformData.set('f', 'placeorder');
    myformData.set('long', params.longitude);
    myformData.set('lat', params.latitude);
    myformData.set('address', params.delivery_address_text);
    myformData.set('instructions', params.special_instructions_message);
     return openapi_server.post(
         `shoppingcart.php`,
         myformData,
         getConfig({'Content-Type': 'multipart/form-data',...headerparams})
     )
}
export const shopingcartAdd = (params, headerparams) => { return openapi_server.get(`shoppingcart.php?f=add&pid=${params.product_id}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const orderHistory = (params, headerparams) => {return openapi_server.get(`/orderhistory.php?f=get&limit=${params.limit}&orderid=${params.order_id}&nocache=${new Date().getTime()}`,getConfig(headerparams)) }
