import axios from "../utils/axios";
import { HEADER } from "../constants";
import { SET_BALANCE } from "../store/action/constants";

const getExchangeRate = async () =>{
  try{
    const rate = await axios.get('api/balance/conversion');
    return rate.data;
  }
  catch(error){
    return 1000
  }
}

const getAvailability = async (name) => {
  try {
    const res = await axios.get(`api/balance/getavailability?name=${name}`, HEADER());
    return res.data.availability;
  } catch (error) {
    console.log(error)
  }
}

const payFee = async (name) => {
  try {
    const res = await axios.post('api/balance/payGameFee', { name: name }, HEADER());
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

const getBalance = async (dispatch) => {
  try {
    const res = await axios.get('api/balance/getBalance', HEADER());
    dispatch({ type: SET_BALANCE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
}

export {
  getAvailability,
  payFee,
  getBalance,
  getExchangeRate,
}
