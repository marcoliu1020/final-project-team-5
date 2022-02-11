import { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { parseEther } from '@ethersproject/units';
import { ethers } from 'ethers';
import { Modal, InputNumber } from 'antd';
import banner from '../../img/preview.png';
import NFT from '../../Rookies.json';

export function StakingPage() {
  const [ownerNfts, setOwnerNfts] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum as any);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract('0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06', NFT.abi, signer);

  useEffect(() => {
    if (localStorage.getItem('callAddress') === 'true') {
      return;
    }
    (async () => {
      setUserAddress(await signer.getAddress());
      localStorage.setItem('callAddress', 'true');
    })();
    return () => {
      localStorage.removeItem('callAddress');
    };
  }, []);

  console.log('ownerNfts', ownerNfts, 'addressRef.current', userAddress);

  useEffect(() => {
    if (localStorage.getItem('callMFT') === 'true') {
      return;
    }
    if (userAddress) {
      const getTokenByOwner = async () => {
        const array = await nftContract.getTokenByOwner(userAddress);
        const nftIds = await array.map((item: string) => nftContract.tokenURI(ethers.utils.formatUnits(item, 0)));
        const nftData = Promise.all(nftIds)
          .then((result: any) => result.map((item: string) => `https://ipfs.io/ipfs/${item.replace('ipfs://', '')}`))
          .then((nftData) =>
            Promise.all(nftData.map((url: string) => fetch(url))).then(
              (res: any) => console.log('res new', res)
              // res.map((file: any) => console.log('new get', file.json()))
            )
          );

        localStorage.setItem('callNFT', 'true');
      };
      getTokenByOwner();
    }
    return () => {
      localStorage.removeItem('callNFT');
    };
  }, [userAddress]);

  return <div>StakingPage</div>;
}
