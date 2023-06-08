import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { create } from "ipfs-http-client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoadPortraitNFTs from "../components/portrait-nfts.js";

import { nftGeneratorAddress } from "../config";
import NFTGenerator from "../src/Generator.json";
import { useNetwork, useContractWrite, usePrepareContractWrite } from "wagmi";

const projectId = process.env.INFURA_IPFS_ID;
const projectSecret = process.env.INFURA_IPFS_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default function GenerateNFT() {
  const [fileUrl, setFileUrl] = useState("");
  const [toChain, setToChain] = useState("");

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(prog),
      });
      const imgUrl = "https://horn.infura-ipfs.io/ipfs/" + added.path;
      setFileUrl(imgUrl);
      let json = JSON.parse(
        `{
                    "name": "Generated by Osterlund Dapp Solutions at https://horn.technology",
                    "description": "Generic NFT created for educational and entertainment purposes only",
                    "image": "ipfs://${added.path}",
                    "attributes": [
                        {
                            "trait_type": "Coded by",
                            "value": "Markus / 👦🏻👦🏻.eth"
                        }
                    ]
                }`
      );
      const nft = await client.add(Buffer.from(JSON.stringify(json)), {
        progress: (pr) => console.log(pr),
      });
      const parameter = "ipfs://" + nft.path;
      setToChain(parameter);
    } catch (err) {
      console.log(err);
    }
  }

  const { chain } = useNetwork();
  let contract;
  chain?.id == 137
    ? (contract = nftGeneratorAddress.polygon)
    : chain?.id == 42161
    ? (contract = nftGeneratorAddress.arbitrum)
    : chain?.id == 5
    ? (contract = nftGeneratorAddress.goerli)
    : "";

  const { config } = usePrepareContractWrite({
    address: contract,
    abi: NFTGenerator.abi,
    functionName: "mint",
    args: [toChain],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function LinkToExplorer() {
    let explorer;
    chain?.id == 137
      ? (explorer = "https://polygonscan.com")
      : chain?.id == 42161
      ? (explorer = "https://arbiscan.io")
      : chain?.id == 5
      ? (explorer = "https://goerli.etherscan.io")
      : "";
    const link = explorer + "/tx/" + data.hash;
    return (
      <a href={link} className="text-blue-600 hover:underline">
        {link}
      </a>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Generator</title>
      </Head>

      <div className="divide-y-2 divide-dotted divide-gray-300 space-y-8">
        <section>
          <div className="mx-auto max-w-screen-xl lg:flex">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="place-content-center mb-14 sm:mb-20 text-center text-3xl sm:text-5xl font-bold mt-2 mb-5 bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-800 bg-clip-text text-transparent">
                Generate Your Own NFTs
              </h1>
              <div className="flex items-center place-self-center w-full backdrop-blur-xs rounded-3xl mt-8 sm:my-4 shadow-2xl">
                <div className="text-[10px] font-medium text-gray-800 dark:text-white leading-snug whitespace-normal sm:text-base lg:text-lg">
                  <div className="object-contain flex-wrap m-3 sm:m-5">
                    <a className="text-[13px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
                      Mint custom content as NFTs&nbsp;
                    </a>
                    on Ethereum&apos;s&nbsp;
                    <Link href="https://polygon.technology/">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Polygon&nbsp;
                      </a>
                    </Link>
                    or&nbsp;
                    <Link href="https://arbitrum.io/">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Arbitrum&nbsp;
                      </a>
                    </Link>
                    blockchains in three steps:
                    <ul className="list-disc my-1 sm:my-4 sm:text-sm text-gray-800 dark:text-white font-normal">
                      <p>
                        <a className="text-base text-violet-500">★&nbsp;</a>
                        Upload picture, video, or music
                      </p>
                      <p>
                        <a className="text-base text-violet-500">★&nbsp;</a>
                        Connect Web3 wallet
                      </p>
                      <p>
                        <a className="text-base text-violet-500">★&nbsp;</a>
                        Submit mint transaction
                      </p>
                    </ul>
                    Protocol gas fees cost less than 10 cents!
                    <p className="mt-2 shrink font-normal text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                      These NFTs are&nbsp;
                      <Link href="https://polygon.technology/">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          hosted on IPFS
                        </a>
                      </Link>
                      &nbsp;and minted as a unique tokenId by a generic smart
                      contract I&apos;ve already coded and deployed.
                      <br className="mb-1 sm:mb-2" />
                      ** For personalized NFT projects or deployments to other
                      chains such as mainnet Ethereum, contact me.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-center mb-3">
          <div className="mt-8 mb-3 w-96 text-center">
            <p className="mb-5 text-[18px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              <a className="text-[18px] text-gray-800 dark:text-white">
                1.&nbsp;&nbsp;
              </a>
              Upload a file (&nbsp;to IPFS&nbsp;)
            </p>
            <input
              className="form-control block w-full px-2 py-1.5 mb-8 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-4 border-indigo-300 rounded-2xl transition focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="formFileLg"
              type="file"
              name="Metadata"
              onChange={onChange}
            />
            {fileUrl && (
              <Image
                className="rounded-md"
                width={350}
                height={350}
                alt="Uploaded IPFS Image"
                src={fileUrl}
              />
            )}
          </div>
        </section>
        <section className="items-center">
          <div className="mt-8 text-center">
            <p className="mb-6 text-[18px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              <a className="text-[18px] text-gray-800 dark:text-white">
                2.&nbsp;&nbsp;
              </a>
              Connect Web3 wallet
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
            <div className="mt-4 md:mt-6 text-sm text-gray-600 dark:text-gray-300">
              Any Web3 wallet will do, such as&nbsp;
              <Link href="https://metamask.io">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Metamask
                </a>
              </Link>
              &nbsp;or&nbsp;
              <Link href="https://www.coinbase.com/wallet">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Coinbase Wallet
                </a>
              </Link>
            </div>
            <div className="mt-10 text-xs text-gray-500 dark:text-gray-300">
              Confused?
              <p>
                Complete my&nbsp;
                <Link href="https://www.coinbase.com/wallet">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Web3 tutorial: HuskyCoin
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="items-center">
          <div className="mt-8 mb-3 text-center">
            <p className="mb-6 text-[18px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              <a className="text-[18px] text-gray-800 dark:text-white">
                3.&nbsp;&nbsp;
              </a>
              Submit mint transaction
            </p>
            <div>
              <button
                disabled={!write}
                onClick={() => write?.()}
                className="mb-4 px-4 rounded-full font-medium bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-700 shadow-xl text-white p-2 border-2 border-violet-300 hover:outline hover:outline-4 hover:outline-violet-300 hover:animate-bounce hover:from-sky-500 hover:via-indigo-600 hover:to-purple-900"
                type="submit"
              >
                Mint NFT
              </button>
              {isLoading && (
                <div className="text-sm text-gray-700">Check wallet popup!</div>
              )}
              {isSuccess && (
                <div className="text-sm text-gray-700">
                  Transaction: {LinkToExplorer()}
                  <p
                    href="https://opensea.io/"
                    className="mt-3 cursor-pointer text-xs text-blue-600 hover:underline"
                  >
                    Check out your NFT with OpenSea!
                  </p>
                </div>
              )}
              <p className="mx-6 mt-4 md:mt-6 text-xs text-gray-500 dark:text-gray-300">
                To pay the protocol&apos;s gas fee, ensure you have at least
                $0.10 worth of either $MATIC (on Polygon) or $ETH (on Arbitrum)
              </p>
            </div>
          </div>
        </section>
        <section className="font-medium text-center text-xs sm:text-base md:text-lg text-gray-800 dark:text-gray-300">
          <div className="md:mx-20 lg:mx-48">
            <p className="mx-4 mt-5">
              Check out these AI-generated portraits 👦🏻👦🏻 hosted on the Arweave
              blockchain that we turned into Polygon NFTs! 😍😍
            </p>
            {<LoadPortraitNFTs />}
          </div>
        </section>
      </div>
    </div>
  );
}
