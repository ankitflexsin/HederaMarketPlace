import './App.css';
import React, { useState } from 'react';

import {createMarketSale,updateListinPrice,approval,createMarketItem,approvalForAll,pairHashpack, startAuction, placeBidInAuction, claimFundsFromEnglishAuction, mint,claimNftFromEnglishAuction,nftSmartContract, cancelAuction, withdrawAuctionBalance, withdrawContractBalance} from './hashconnect'

function App() {
  const [pairingString, setPairingString] = useState('')
    return(
<div>
    Auction and NFT Smart Contract 
<br></br>
<p id='accountid'></p>
        {
          pairingString &&
          <>
            <h1>Pairing string</h1>
            <p>{pairingString}</p>
          </>}
<br></br>
<button onClick={async () => {
          const saveData = await pairHashpack()
          setPairingString(saveData.pairingString)
        }}>Pair wallet</button>    
        <br></br>
        {/* <button onClick={readGetFn}>readGetFn</button>  */}
<br></br>
<button onClick={createMarketSale}>createMarketSale</button> 
<br></br>
<button onClick={updateListinPrice}>updateListinPrice</button> 
<br></br>
<button onClick={approvalForAll}>approve the nft contract</button>
<br></br>
<button onClick={approval}>approve </button>
<br></br>
<button onClick={createMarketItem}>createMarketItem</button>
<br></br>
<button onClick={nftSmartContract}>nftSmartContract</button>
<br></br>
<button onClick={mint}>mint</button>
<br></br>
<button onClick={startAuction}>Start the auction</button>
<br></br>
<button onClick={placeBidInAuction}>place bid in auction </button>
<br></br>
<button onClick={claimFundsFromEnglishAuction}>claimFundsFromEnglishAuction </button>
<br></br>
<button onClick={claimNftFromEnglishAuction}>claimNftFromEnglishAuction </button>
<br></br>
<button onClick={cancelAuction}>cancelAuction </button>

<br></br>
<button onClick={withdrawAuctionBalance}>withdrawAuctionBalance</button>
<br></br>
<button onClick={withdrawContractBalance}>withdrawContractBalance</button>
<br></br>
</div>
    )
}

export default App;
