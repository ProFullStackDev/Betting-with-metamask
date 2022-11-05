import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { SET_WINNER } from "../../../store/action/constants";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "../../../styles/modal.css";
import toast from "react-hot-toast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(datas) {
  const setWinner = useSelector((state) => state.setWinner);
  const dispatch = useDispatch();
  let username = datas.username;
  let winner = "";
  let winnerValue = "";
  let loser = "";
  let loserValue = "";
  let price = "";
  let isWinner = false;
  let isSame = false;
  let roomFee = datas.roomFee;
  // let winner = (datas.data.winner.user === undefined) ? "winner" : datas.data.winner.user;
  if (datas.data.winner !== undefined) {
    winner = datas.data.winner.user;
    winnerValue = datas.data.winner.value;
    loser = datas.data.loser.user;
    loserValue = datas.data.loser.value;
    price = datas.data.realprice;
    isWinner = winner === username ? true : false;
    isSame = winnerValue === loserValue ? true : false;
  }
  const balance = useSelector((state) => state.getBalance);
  const winnerOldBalance = Math.round((balance - roomFee) * 100) / 100;
  const loserOldBalance = Math.round((balance + roomFee) * 100) / 100;

  const winnerBalanceDescription = " Balance : " + `${balance}` + "$" + " = " + `${winnerOldBalance}` + "$ + " + `${roomFee}` + "$";
  const loserBalanceDescription = " Balance : " + `${balance}` + "$" + " = " + `${loserOldBalance}` + "$ - " + `${roomFee}` + "$";

  const handleClose = () => {
    dispatch({ type: SET_WINNER, payload: false });
  };

  useEffect(() => {
    return () => {
      dispatch({ type: SET_WINNER, payload: false });
    };
  }, [dispatch]);

  return (
    <div>
      <Dialog
        open={setWinner}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          className={
            isSame
              ? "modal-header-content-draw"
              : isWinner
                ? "modal-header-content-winner"
                : "modal-header-content-loser"
          }
        >
          <div className="modal-header-text">
            {isSame
              ? "Draw"
              : username === winner
                ? "You win"
                : "You lost"}
          </div>
        </div>
        <DialogContent>
          <div className="dialog-content">
            <div className="dialog-logo" />
            <div className="dialog-content-text">
              <div className="dialog-label">price : {" " + price} </div>
              <div className="dialog-label">
                Your set value : {isWinner ? winnerValue : loserValue}{" "}
              </div>
              <div className="dialog-label">
                {" "}
                {isWinner
                  ? loser + " set value: " + loserValue
                  : winner + " set value: " + winnerValue}{" "}
              </div>
              <div className="dialog-balance">{isSame ? "" : isWinner ? winnerBalanceDescription : loserBalanceDescription}</div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
