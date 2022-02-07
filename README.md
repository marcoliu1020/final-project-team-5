# KrytpoCamp 期末專案

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
    
 ## How to mint (Rookies.sol)
 * add to whitelist ```function addToAllowList(address[] calldata addresses)```
 * check mint status ```_isPreSaleActive, _isPublicSaleActive```
 * mint ```function mint_presale(uint8 NUM_TOKENS_MINT), function mint_public(uint8 NUM_TOKENS_MINT)```

 ## Why ERC721A
 * 節省mint gas fee

## How to stake
* fisrtly, approve NFT to "TestStaking" contract
* secondly, stake NFT, then "TestStaking" contract will be the owner of this NFT
* thirdly, reward points increase automaticly
* finally, unstake NFT, NFT will be return to staker, and get reward


## License

MIT License

Copyright (c) 2022 ROXY

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
Copy license text to clipboard
Suggest this license
Make a pull request to suggest this license for a project that is not licensed. Please be polite: see if a license has already been suggested, try to suggest a license fitting for the project’s community, and keep your communication with project maintainers friendly.

Enter GitHub repository URL
How to apply this license
Create a text file (typically named LICENSE or LICENSE.txt) in the root of your source code and copy the text of the license into the file. Replace [year] with the current year and [fullname] with the name (or names) of the copyright holders.

Optional steps
Add MIT to your project’s package description, if applicable (e.g., Node.js, Ruby, and Rust). This will ensure the license is displayed in package directories.

 Source
Who’s using this license?
Babel
.NET Core
Rails
About Terms of Service Help improve this page


