import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import markus from '../public/markus.jpg';
import gradient from '../public/gradient.png';


export default function NFT() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About Markus</title>
            </Head>

            <div className="justify-center sm:flex">
                <div className='relative flex p-6 rounded-3xl shadow-2xl'>
                    {/* img is originally 1080 * 1350 */}
                    <div className="max-w-xs min-w-fit">
                        <Image
                            src={markus}
                            fill='true'
                            alt='Headshot'
                            className="rounded-3xl"
                        />
                    </div>
                    <h1 className="max-w-md backdrop-blur-md absolute flex px-2 py-1 sm:p-3 md:px-2 md:py-5 lg:px-4 lg:py-7 rounded-xl sm:rounded-2xl whitespace-nowrap text-violet-100 text-[16px] sm:text-xs md:text-[18px] lg:text-[24px] font-extrabold leading-9 top-3/4 sm:top-2/3 left-1/2 -translate-x-1/2">
                        About Markus Osterlund
                    </h1>
                </div>
                <div className="place-self-center backdrop-blur-xs rounded-3xl mt-4 mx-4 sm:mx-4 sm:my-4 shadow-xl">
                    <p className="p-6 text-sm sm:text-xs lg:text-lg sm:place-self-center sm:ml-2 md:text-md sm:max-w-prose">
                        <a className="text-[16px] sm:text-sm lg:text-xl font-bold">
                            An orchestral musician
                        </a> by day and smart contract programmer by night, Markus Osterlund&apos;s two main professional foci are music and technology.
                        His work oscillates between weekly performances with the National Symphony Orchestra and late nights fiddling with his Solidity smart contracts or Javascript webapps like the one you&apos;re on now:
                        <a href="https://horn.technology" className="text-blue-500"> horn.technology</a>
                    </p>
                </div>
            </div>
            <div className="mt-8 text-sm">
                <p className='font-medium mb-2'>Need a Solidity/JS developer? Looking to integrate a Web3 token/NFT with your business?</p>
                <p className="">Contact me with inquiries!</p>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4">
                        <div className="flex rounded-lg h-full p-8 flex-col">
                            <h1 className='my-8 text-center text-xl font-bold'>Projects</h1>
                            <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 mb-3">
                                <Link href='/chatbot'>
                                    <a>
                                        <div className='h-48 rounded-xl border-2 border-indigo-300 p-2'>
                                            <p className="text-lg text-center font-bold mt-1">🤖 💬</p>
                                            <p className="text-base text-center font-bold mb-2">Smart AI Chatbot</p>
                                            <p className="text-[11px] hover:underline">Communicate with an Artificial Intelligence via chat app</p>
                                        </div>
                                    </a>
                                </Link>
                                <Link href='/stablediffusion'>
                                    <a>
                                        <div className="h-48 rounded-xl border-2 border-indigo-300 p-2">
                                            <p className="text-lg text-center font-bold mt-1">🤖 🖼️</p>
                                            <p className="text-base text-center font-bold mb-2">Image Generator</p>
                                            <p className="text-[11px] hover:underline">Generate images from text descriptions using AI</p>

                                        </div>
                                    </a>
                                </Link>
                                <Link href='/nft'>
                                    <a>
                                        <div className='h-48 rounded-xl border-2 border-indigo-300 p-2'>
                                            <p className="text-lg text-center font-bold">🦄 🐒</p>
                                            <p className="text-base text-center font-bold mb-2">NFT Generator</p>
                                            <p className="text-[11px] hover:underline">A tool to turn your pictures, videos, or audio into NFTs!</p>
                                        </div>
                                    </a>
                                </Link>
                                <Link href='https://huskycoin.vercel.app'>
                                    <a>
                                        <div className='h-48 rounded-xl border-2 border-indigo-300 p-2'>
                                            <p className="text-lg text-center font-extrabold text-orange-400">₿
                                                <a className="text-blue-600">&nbsp;Ξ</a>
                                            </p>
                                            <p className="text-base text-center font-bold mb-2">Web3 Tutorials</p>
                                            <p className="text-[11px] hover:underline">Learn crypto fundamentals by using a blockchain</p>
                                        </div>
                                    </a>
                                </Link>
                                <Link href='https://mirror.xyz/0x65b54a4646369d8ad83cb58a5a6b39f22fcd8cee'>
                                    <a>
                                        <div className='h-48 rounded-xl border-2 border-indigo-300 p-2'>
                                            <p className="text-lg text-center font-bold">⛓️ 📝</p>
                                            <p className="text-base text-center font-bold mb-2">On-Chain Blog</p>
                                            <p className="text-[11px] hover:underline">Blog entries on Solidity security exploits hosted on Ethereum!</p>
                                        </div>
                                    </a>
                                </Link>
                                <Link href='https://github.com/robriks/ethernaut-solutions'>
                                    <a>
                                        <div className='h-48 rounded-xl border-2 border-indigo-300 p-2'>
                                            <p className="text-lg text-center font-bold">🧑🏻‍💻 💻</p>
                                            <p className="text-base text-center font-bold mb-2">Ethical Hacking</p>
                                            <p className="text-[11px] hover:underline">My solutions to Ethernaut, a CTF for learning Solidity by hacking</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>



            {/* 
                -portrait NFTs
                -blockchain dev cert
                -cryptocurrency forensics
                -dapp development
                -governance smart contracts
                -tokens: ERC20, ERC721 nfts
                -AI art
                -portraits
                -music
                -performing, teaching */}
        </div>
    )
}