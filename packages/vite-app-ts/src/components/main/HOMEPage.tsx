import React, { FC, useCallback, useContext } from 'react';

import { ethers } from 'ethers';
import StakingNFT from '../../TestStaking_abi.json';
import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useEthersContext } from 'eth-hooks/context';
import styled from 'styled-components';
import animation from '../../img/preview.gif';

export interface IMainPageProps {
  scaffoldAppProviders: IScaffoldAppProviders;
}

/**
 * 🎛 this scaffolding is full of commonly used components
    this <GenericContract/> component will automatically parse your ABI
    and give you a form to interact with it locally
 * @param props 
 * @returns 
 */
export const HOMEPage: FC<IMainPageProps> = (props) => {
  const ethersContext = useEthersContext();

  const handleStaking = useCallback(async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract('0xB67A2CF80468b55F9F48Bcb84Ba70a9148F4A1ee', StakingNFT, signer);
    // let contract = new ethers.Contract('0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06', NFT, signer);
    console.log('contract', contract);
    await contract.stakeNFT(2);
  }, []);

  const StyleBanner = styled.div`
    position: relative;
    width: 600px;
    height: 600px;
    background-image: url(${animation});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `;

  const StyleContent = styled.div`
    flex: 2 1 auto;
    text-align: center;
    padding-top: 100px;
    h4 {
      font-size: 36px;
    }
  `;

  return (
    <div style={{ display: 'flex' }}>
      <StyleBanner></StyleBanner>
      <StyleContent>
        <h4>Rookie Is An Fancy NFT！</h4>
      </StyleContent>
    </div>
  );
};
