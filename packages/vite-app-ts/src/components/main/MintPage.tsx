import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { parseEther } from '@ethersproject/units';
import { ethers } from 'ethers';
import { Modal, InputNumber } from 'antd';
import banner from '../../img/preview.png';
import NFT from '../../Rookies.json';

const StyleMintButton = styled.button`
  position: absolute;
  width: 300px;
  height: 50px;
  top: 50%;
  left: 0;
  line-height: 50px;
  background-color: #212121;
  border-radius: 8px;
  color: #fbc02d;
  font-family: 'Indie Flower', cursive;
  font-size: 22px;
  font-weight: normal;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transform: translateY(-6px);
  -ms-transform: translateY(-6px);
  transform: translateY(-6px);
  -webkit-animation-name: hover;
  animation-name: hover;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  &:before {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    content: '';
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 0;
    background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: -webkit-transform, opacity;
    transition-property: transform, opacity;
    opacity: 0.4;
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    -webkit-animation-name: hover-shadow;
    animation-name: hover-shadow;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }
  &:hover {
    color: #fff;
    background-color: #b71c1c;
  }

  @keyframes hover {
    50% {
      -webkit-transform: translateY(-3px);
      -ms-transform: translateY(-3px);
      transform: translateY(-3px);
    }

    100% {
      -webkit-transform: translateY(-6px);
      -ms-transform: translateY(-6px);
      transform: translateY(-6px);
    }
  }

  @-webkit-keyframes hover-shadow {
    0% {
      -webkit-transform: translateY(6px);
      transform: translateY(6px);
      opacity: 0.4;
    }

    50% {
      -webkit-transform: translateY(3px);
      transform: translateY(3px);
      opacity: 1;
    }

    100% {
      -webkit-transform: translateY(6px);
      transform: translateY(6px);
      opacity: 0.4;
    }
  }

  @keyframes hover-shadow {
    0% {
      -webkit-transform: translateY(6px);
      -ms-transform: translateY(6px);
      transform: translateY(6px);
      opacity: 0.4;
    }

    50% {
      -webkit-transform: translateY(3px);
      -ms-transform: translateY(3px);
      transform: translateY(3px);
      opacity: 1;
    }

    100% {
      -webkit-transform: translateY(6px);
      -ms-transform: translateY(6px);
      transform: translateY(6px);
      opacity: 0.4;
    }
  }

  @-webkit-keyframes hover {
    50% {
      -webkit-transform: translateY(-3px);
      transform: translateY(-3px);
    }

    100% {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
    }
  }

  @keyframes hover {
    50% {
      -webkit-transform: translateY(-3px);
      -ms-transform: translateY(-3px);
      transform: translateY(-3px);
    }

    100% {
      -webkit-transform: translateY(-6px);
      -ms-transform: translateY(-6px);
      transform: translateY(-6px);
    }
  }
`;

const StyleBanner = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-image: url(${banner});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .supply-amount {
    padding: 0 10px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    margin-top: -80px;
    color: #fff;
    font-family: 'Indie Flower', cursive;
    font-size: 40px;
    .amount-text {
      color: #fbc02d;
      font-size: bold;
      font-size: 24px;
    }
  }
`;

const StyleMintOk = styled.button`
  margin-left: 20px;
  color: #fff;
  border: none;
  background-position: 0 100%;
  background-size: auto 200%;
  background-image: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  height: 40px;
  padding: 6.4px 20px;
  font-size: 16px;
  border-radius: 40px;
`;

export function MintPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mintAmount, updateMintAmount] = useState(1);
  const [maxSupply, setMaxSupply] = useState('0');
  const [totalSupply, setTotalSupply] = useState('0');

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum as any);
  const signer = provider.getSigner();
  const contract = new ethers.Contract('0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06', NFT.abi, signer);

  useEffect(() => {
    const getApplyAmount = async () => {
      setMaxSupply(ethers.utils.formatUnits(await contract.MAX_SUPPLY(), 0));
      setTotalSupply(ethers.utils.formatUnits(await contract.totalSupply(), 0));
    };
    getApplyAmount();
  }, []);

  const handleMint = useCallback(async () => {
    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    // let contract = new ethers.Contract('0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06', NFT, signer);
    console.log('contract', contract);
    try {
      await contract.mint_public(mintAmount, { value: parseEther(`${0.01 * mintAmount}`) });
      setIsModalVisible(false);
      updateMintAmount(1);
    } catch (error) {
      alert('Something Wrong! Mint fail');
    }
  }, []);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const cancelModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  return (
    <StyleBanner>
      <h2 style={{ fontSize: '24px' }}>Mint Your First Rookie</h2>
      <StyleMintButton onClick={openModal}>Mint Egg</StyleMintButton>
      <div className="supply-amount">
        <span className="amount-text">MINTED: </span>
        <span>{parseInt(maxSupply) - parseInt(totalSupply)}</span>
        <span className="amount-text"> / </span>
        <span className="amount-text">TOTAL: </span>
        <span>{maxSupply}</span>
      </div>
      <Modal visible={isModalVisible} onCancel={cancelModal} footer={null}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span>Amount：</span>
          <InputNumber min={1} max={3} value={mintAmount} onChange={updateMintAmount} />
          <StyleMintOk onClick={handleMint}>Mint</StyleMintOk>
        </div>
      </Modal>
    </StyleBanner>
  );
}
