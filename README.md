# CrytpoCamp 期末專案

---

## 四份合約

1. mint 蛋蛋 + 盲盒
    - 大再
1. 戰鬥場
    - Kyle
1. 配對生育場
    - 英宗
1. 產蛋場
    - Marco

---

## 前端頁面

1. mint
    - 喬瑟夫
1. 戰鬥場
    - 喬瑟夫
1. 配對生育場
    - 喬瑟夫
1. 產蛋場
    - 喬瑟夫

---

## scaffold (腳手架)

喬瑟夫

## 專案架構

```bash
packages/vite-app-ts/ 前端專案
packages/hardhat-ts/ solidity 專案
```

## 開始專案

1. 先到 hardhat-ts 專案下,建立一個 .env 檔
   放置以下資訊

```env
REACT_APP_PROVIDER=96d856dd85f34d76a3c4ab39fccafe9a
ACCOUNT_PRIVATE_KEY= <錢包地址>
```

2. install your dependencies

    ```bash
    yarn install or npm install
    ```

3. start a hardhat node

    ```bash
    yarn chain or npm run chain
    ```

4. run the app, `open a new command prompt`

    ```bash
    # build hardhat & external contracts types
    yarn contracts:build or npm run contracts:build
    # deploy your hardhat contracts
    yarn deploy or npm run deploy
    # start vite
    yarn start or npm run start
    ```


