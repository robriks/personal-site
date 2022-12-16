import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { portraitsAddress } from '../config';
// import NFTGenerator from '../artifacts/contracts/NFTGenerator.sol/NFTGenerator.json';

const projectId = process.env.INFURA_IPFS_ID;
const projectSecret = process.env.INFURA_IPFS_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');



export default function loadPortraitNFTs() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/e365267f08f0496abe0b04e071a4bc1f')
        const marketContract = new ethers.Contract(hornmarketplaceaddress, HornMarketplace.abi, provider)
        const data = await marketContract.getCurrentlyListedHorns()
        let nonZeroData = data.filter(horn => horn.tokenId != 0)

        const items = await Promise.all(nonZeroData.map(async i => {
            const tokenUri = await marketContract.tokenURI(i.tokenId)
            const metadata = await axios.get(tokenUri)
            const price = ethers.utils.formatUnits(i.listPrice.toString(), "ether")
            let item = {
                tokenId: i.tokenId.toNumber(),
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    return (
        <div className="page">
            <h2>Horns For Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                {
                    nfts.map((nft, i) => (
                        <div key={i} className="card">
                            <div className="p-3">
                                <p style={{ height: '50px' }} className="flex justify-center text-3xl font-semibold p-4">{nft.make}</p>
                                <div style={{ height: "30px", overflow: 'hidden' }}>
                                    <p className="flex justify-center text-gray-400 p-1">Model: {nft.model}</p>
                                </div>
                            </div>
                            <img src={nft.image} />
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}