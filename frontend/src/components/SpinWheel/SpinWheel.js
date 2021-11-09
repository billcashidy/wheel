import React, { useState, useEffect } from "react";
import { useContext } from "../../contexts/metamask/use-context";
import { MetaMaskButton } from "rimble-ui";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import wheel from '../../images/wheel.png';
import arrow from '../../images/arrow_down.png';
import { Flex, Button, Text } from 'rimble-ui';
import styled, { keyframes, css } from 'styled-components';
import { UnicornRainbowAddress } from "../../constants/addresses";
import { getERC20Balance, weiToEth, burnUnicornToken } from "../../apis/blockchain";
import a from "./assets/1.png";
import b from "./assets/2.png";
import c from "./assets/3.png";
import d from "./assets/4.png";
import e from "./assets/5.png";
import f from "./assets/6.png";
import g from "./assets/7.png";
import h from "./assets/8.png";
import i from "./assets/9.png";
import j from "./assets/10.png";
import k from "./assets/11.png";
import l from "./assets/12.png";
import m from "./assets/13.png";
import n from "./assets/14.png";
import o from "./assets/15.png";
import p from "./assets/16.png";
import q from "./assets/17.png";

function SpinWheel() {
  const [spin, setSpin] = useState(false);
  const [tx, setTx] = useState(false);
  const [spinTimer, setSpinTimer] = useState(0);
  const [balance, setBalance] = useState(0);

  const {
    initialized,
    metamaskInstalled,
    metamaskConnected,
    currentAccountAddress,
    connectToMetamask,
    contracts,
    web3Provider,
  } = useContext();
  const notify = (imgNum) => {
    const images = {
      "a": a,
      "b": b,
      "c": c,
      "d": d,
      "e": e,
      "f": f,
      "g": g,
      "h": h,
      "i": i,
      "j": j,
      "k": k,
      "l": l,
      "m": m,
      "n": n,
      "o": o,
      "p": p,
      "q": q,
    };
    toast(<img src={images[String.fromCharCode(imgNum + 96)]} style={{ width: "300px", height: "300px" }} />, {position: "top-center", autoClose: false})
  };

  const setupStates = async () => {
    const { UnicornRainbowContract } = contracts;
    try {
      let myBalance = await getERC20Balance(
        UnicornRainbowContract,
        currentAccountAddress,
        UnicornRainbowAddress
      );
      setBalance(weiToEth(myBalance));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    if (!metamaskInstalled) {
      window.alert("install metamask!");
      return;
    }
    if (!metamaskConnected) {
      connectToMetamask(web3Provider, true);
    } else {
      window.alert("backend auth!");
    }
  };

  const handleSpin = () => {
    setTx(true);
    burnUnicornToken(contracts.UnicornRainbowContract, () => {
      setSpin(true);
      setupStates();
      const timer = Math.random() * (5000 - 2000) + 2000;
      setSpinTimer(timer);
      setTimeout(() => {
        setSpin(false);
        setTx(false);
        notify(Math.floor(Math.random() * 17) + 1);
      }, timer);
    }, (err) => console.error(err));
  };

  useEffect(() => {
    if (connectToMetamask && initialized) {
      setupStates();
    }
  }, [connectToMetamask]);
  return (
    <div>
      <ToastContainer style={{ width: "360px" }}  />
      {!metamaskConnected ? (
          <MetaMaskButton.Outline onClick={() => onClickHandler()}>
            Connect with MetaMask
          </MetaMaskButton.Outline>
        ) : (
          <StyledContainer flexDirection="column" alignItems="center" justifyContent="center">
            <img src={arrow} alt="wheel arrow" style={{width: '32px', height: '32px'}} />
            <StyledSpinWheel src={wheel} alt="spin wheel" spin={spin} spinTimer={spinTimer} />
            <Button disabled={tx} mt="12px" onClick={() => handleSpin()}>SPIN</Button>
            <Text mt="12px">{`Balance: ${balance}`}</Text>
          </StyledContainer>
        )
    }
    </div>
  );
}

const StyledContainer = styled(Flex)`
  
`
const rotate = (timer) => keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(${timer}deg);
  }
`

const StyledSpinWheel = styled.img`
  width: 50%;
  height: 50%;
  ${(props) => props.spin ? (css`
    animation: ${() => rotate(props.spinTimer)} ${props.spinTimer}ms ease-in-out infinite;
  `) : `transform: rotate(${props.spinTimer}deg);`}
`

export default SpinWheel;
