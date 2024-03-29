import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import gm from "../public/marsterlund.gif";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Markus&apos;s Personal Page</title>
      </Head>
      <section>
        <div className="mx-auto max-w-screen-xl lg:flex">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-900 bg-clip-text text-xl font-semibold text-transparent mb-3 sm:text-3xl">
              From Classical Music To Blockchain:
            </h1>
            <h2 className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-900 bg-clip-text text-[39px] font-extrabold text-transparent sm:text-6xl">
              Horn
            </h2>
            <h2 className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-900 bg-clip-text text-[30px] font-extrabold text-transparent sm:text-5xl">
              and
            </h2>
            <h2 className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-900 bg-clip-text text-[39px] font-extrabold text-transparent sm:text-6xl">
              Technology
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4 px-8">
              <Link
                href="/about"
                className="hover:underline block w-auto rounded-full whitespace-nowrap border border-indigo-400 px-12 py-3 text-sm font-semibold text-white hover:bg-indigo-700 bg-indigo-400 hover:text-white focus:outline-none focus:ring active:text-opacity-75 shadow-xl"
              >
                About Me
              </Link>
              <Link
                href="/chatbot"
                className="hover:underline block w-auto max-w-xs rounded-full border border-indigo-400 px-12 py-3 text-sm font-semibold text-white hover:bg-indigo-700 bg-indigo-400 focus:outline-none focus:ring active:bg-blue-500 shadow-xl"
              >
                Explore!
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center mt-8 gap-2">
        <div className="hover:scale-110 sm:p-12 max-w-sm drop-shadow-2xl">
          <a
            href="https://twitter.com/marsterlund"
            className="rounded-full drop-shadow-2xl"
          >
            <Image
              src={gm}
              alt="gif of KweenBirb saying gm"
              height="512"
              width="512"
              className="flex rounded-3xl"
            />
          </a>
        </div>
        <div className="hover:scale-110 max-w-sm max-h-sm p-6 py-2 rounded-3xl shadow-2xl bg-gradient-to-r from-sky-300 via-indigo-400 to-violet-500 dark:bg-gradient-to-r dark:from-slate-700 dark:via-indigo-600 dark:to-violet-700 border-4 border-indigo-300">
          <Link href="/about" className="rounded-full">
            <h2 className="text-sm text-center italic font-bold leading-normal mb-2 mt-2">
              ~ GM! ~
            </h2>
            <h2 className="text-[11px] sm:text-sm text-center italic leading-normal">
              Welcome to my personal page, where you&apos;ll find my metaversal
              footprint in its entirety: from blockchain and AI to orchestral
              music!
            </h2>
            <p className="text-center pt-2 text-sm text-white font-bold">
              - Markus Osterlund{" "}
            </p>
            <p className="text-center text-sm font-extrabold"> 📯📯 </p>
          </Link>
        </div>
      </div>
      <div className="place-self-center backdrop-blur-xs rounded-3xl mt-4 mx-4 sm:mx-4 sm:my-4 md:mx-12 lg:mx-48 shadow-xl">
        <div className="justify-center mt-12 p-6 sm:p-8">
          <div className="mx-auto sm:whitespace-nowrap text-center text[19px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
            While you&apos;re here,
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            &nbsp;have a look around! Check out
            <Link href="/about" className="text-blue-500 hover:underline">
              &nbsp;my most recent projects,
            </Link>
            &nbsp;play around with my
            <Link href="/image-gen" className="text-blue-500 hover:underline">
              {" "}
              text to image AI tool
            </Link>
            &nbsp;or communicate with
            <Link href="/chatbot" className="text-blue-500 hover:underline">
              an Artificial Intelligence using my AI chatapp!
            </Link>
            &nbsp;I&apos;m an open-source autodidact as you can see from
            <Link
              href="https://github.com/robriks/nouns-prop-lot"
              className="text-blue-500 hover:underline"
            >
              &nbsp;my GitHub where you&apos;ll find my projects like an onchain
              protocol extending Nouns governance called PropLot
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
