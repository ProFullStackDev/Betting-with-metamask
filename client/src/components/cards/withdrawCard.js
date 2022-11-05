import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/card.css';
import { withdraw } from '../../api/UserApi';
import { getBalance, getExchangeRate } from '../../api/balanceApi';
import { toast } from 'react-hot-toast';

const WithdrawCard = () => {
    const dispatch = useDispatch();
    const balance = useSelector(state => state.getBalance);
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        const { value } = e.target;
        setAmount(value);
    }

    const handleClick = async () => {
        if (amount > balance || amount === 0)
            toast.error('Insufficient Amount');
        else {
            try {
                const rate = await getExchangeRate();
                const amount_ = Math.round(amount / rate * 1000000) / 1000000
                const btn = document.querySelector(".withdraw-submit-button")
                btn.classList.add("button--loading");
                btn.classList.add("disabled");
                const message = await withdraw(amount_);
                if (message.status === 200)
                    toast.success(message.data)
                else
                    toast.error(message.data);
                btn.classList.remove("button--loading");
                btn.classList.remove("disabled")
                getBalance(dispatch);
            } catch (error) {
                toast.error(error);
            }
        }
    }

    return (
        <div className="card-info">
            <div className="deposit-card-content">
                <div className="input-form">
                    <input type='number' placeholder='Amount in USD' className='card-input-field' onChange={handleChange} step='0.1' required />
                    <button className="withdraw-submit-button" onClick={handleClick}>
                        <div className='button-text'>Withdraw</div>
                    </button>
                </div>
            </div>
            <div className="img-box">
                <div className="card-info-img">
                    <div className='withdraw-img' />
                </div>
            </div>
        </div>
    )
}

export default WithdrawCard;