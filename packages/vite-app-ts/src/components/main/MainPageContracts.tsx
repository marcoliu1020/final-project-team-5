import React, { FC, useCallback, useContext } from 'react';
import { GenericContract } from 'eth-components/ant/generic-contract';
import { formatEther, parseEther } from '@ethersproject/units';
import { Contract, ethers } from 'ethers';
import NFT from '../../Rookies.json';
import { useGasPrice } from 'eth-hooks';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useEthersContext } from 'eth-hooks/context';

import { NETWORKS } from '~~/models/constants/networks';
import { useAppContracts } from '~~/config/contractContext';
export interface IMainPageContractsProps {
  scaffoldAppProviders: IScaffoldAppProviders;
}

/**
 * 🎛 this scaffolding is full of commonly used components
    this <GenericContract/> component will automatically parse your ABI
    and give you a form to interact with it locally
 * @param props 
 * @returns 
 */
export const MainPageContracts: FC<IMainPageContractsProps> = (props) => {
  const ethersContext = useEthersContext();
  const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);
  const yourContract = useAppContracts('YourContract', ethersContext.chainId);

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);

  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const handleMint = useCallback(async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract('0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06', NFT, provider);
    // let contract = new ethers.Contract('0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06', NFT, signer);
    await contract.mint_public(1, { value: ethers.utils.parseEther('0.01') });
  }, []);

  if (ethersContext.account == null) {
    return <></>;
  }

  return (
    <>
      <>
        {/* **********
          ❓ this scaffolding is full of commonly used components
          this <Contract/> component will automatically parse your ABI
          and give you a form to interact with it locally
        ********** */}
        <GenericContract
          contractName="YourContract"
          contract={yourContract}
          mainnetAdaptor={props.scaffoldAppProviders.mainnetAdaptor}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
        />
        <button onClick={handleMint}>Mint</button>

        {/* **********
         * ❓ uncomment for a second contract:
         ********** */}
        {/*
          <GenericContract
            contractName="SecondContract"
            contract={contract={contractList?.['SecondContract']}
            mainnetProvider={props.appProviders.mainnetProvider}
            blockExplorer={props.appProviders.targetNetwork.blockExplorer}
            contractConfig={props.contractConfig}
          />
        */}
      </>
    </>
  );
};
