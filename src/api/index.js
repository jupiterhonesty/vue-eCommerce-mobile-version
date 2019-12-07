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

export const getAppToken = params => { return { ...params, t: 'VS7pUqD2MCog34t0BpL5riewpmh9TvHQgK00f665Xpr89XkS6Yfe33ovoqA6uXbX', c: 'ef64d5b2bb72' } }
export const getAccount = params => { return openapi_server.get(`/startweb.php?to=${params.t}&cs=${params.c}`) }
export const getAccountNoCache = headerparams => { return openapi_server.get(`/account.php?nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const getProducts = headerparams => { return openapi_server.get(`/productlist.php?nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const getShopingcart = headerparams => { return openapi_server.get(`/shoppingcart.php?f=get&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const updateShopingcart = (params, headerparams) => { return openapi_server.get(`/shoppingcart.php?f=update&pid=${params.productid}&qty=${params.qtyplusone}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const updatePayment = (params, headerparams) => { return openapi_server.get(`shoppingcart.php?f=setpayment&pmtid=${params.to_payment_type}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const shopingcartOrder = (params, headerparams) => { return openapi_server.get(`shoppingcart.php?f=placeorder&long=${params.longitude}&lat=${params.latitude}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
export const shopingcartAdd = (params, headerparams) => { return openapi_server.get(`shoppingcart.php?f=add&pid=${params.product_id}&nocache=${new Date().getTime()}`, getConfig(headerparams)) }
