import { useState } from "react";
import { useForm } from 'react-hook-form';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import caseyinput from "../public/caseyinput.jpg";
import markusinput from "../public/markusinput.jpg";
import casey from "../public/casey.png";
import mage from "../public/mage.png";
import cleric from "../public/cleric.png";
import warrior from "../public/warrior.png";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function StableDiffusion() {

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    // make the post request
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
            }),
        });
        e.target.reset();
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Text To Image AI</title>
            </Head>

            <h1 className="flex place-content-center text-center text-3xl sm:text-5xl font-bold mt-2 mb-5 bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-800 bg-clip-text text-transparent">
                Generate images from text using AI
            </h1>
            <div className="flex place-content-center text-center pr-6 pl-6 mb-4">
                <p className="text-[10px] ml-6 mr-6 text-gray-500">
                    Credit for this Stable Diffusion + MidJourney v4 model goes to
                    <a className="text-blue-400" href="https://replicate.com/prompthero/openjourney">&nbsp;prompthero/openjourney</a>
                </p>
            </div>
            <form className="flex justify-center" onSubmit={onSubmit}>
                <div className="flex justify-center">
                    <input
                        className="px-3 rounded-full text-right border-2 border-violet-200 focus:border-none focus:outline-none focus:outline-[5px] focus:outline-violet-400 focus:animate-pulse hover:outline hover:outline-4 hover:outline-violet-200 shadow-xl"
                        type="text"
                        name="prompt"
                        placeholder="Describe an image to the AI!" />
                    <button
                        className="ml-4 rounded-full bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-700 shadow-xl text-white p-2 border-2 border-violet-300 hover:outline hover:outline-4 hover:outline-violet-200 hover:animate-bounce hover:from-sky-500 hover:via-indigo-600 hover:to-purple-900"
                        type="submit">
                        Create!
                    </button>
                </div>
            </form>
            <p className="flex justify-center mt-4 whitespace-nowrap text-gray-400 text-xs">{prediction ? '( ' + prediction.status + ' )' : ''}</p>
            <p className="flex justify-center p-2 text-gray-700 text-[18px] font-medium">{prediction && prediction.status == 'succeeded' ? prediction.input.prompt : ''}</p>

            {prediction && (
                <div className="flex justify-center">
                    {prediction.output && (
                        <Image
                            src={prediction.output[prediction.output.length - 1]}
                            alt="output"
                            width={500}
                            height={500}
                        />
                    )}
                </div>
            )}

            {error && <div>{error}</div>}

            <p className="flex justify-center m-1 text-xs text-black">
                For example:
            </p>
            <p className="flex place-content-center text-[10px] text-gray-600">&quot;Portrait of faerie queen, intricate, elegant, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, 8k&quot;</p>
            <div className="justify-center text-center p-6">
                <h2 className="text-sm font-bold mb-2">
                    Coming Soon:
                </h2>
                <p className="text-xs mb-4">Want some AI-generated portraits of yourself like the ones below? Contact me for inquiries!</p>
                <div className="flex place-content-center mb-4">
                    <Image
                        src={markusinput}
                        alt="Portrait input image"
                        width={150}
                        height={150}
                    />
                    <p className="place-self-center whitespace-nowrap">&nbsp;--&gt;&nbsp;</p>
                    <Image
                        src={cleric}
                        alt="Portrait input image"
                        width={150}
                        height={150}
                    />
                    <Image
                        src={warrior}
                        alt="Portrait input image"
                        width={150}
                        height={150}
                    />
                </div>
                <div className="flex place-content-center">
                    <Image
                        src={caseyinput}
                        alt="Portrait input image"
                        width={150}
                        height={150}
                    />
                    <p className="place-self-center whitespace-nowrap">&nbsp;--&gt;&nbsp;</p>
                    <Image
                        src={mage}
                        alt="Portrait input image"
                        width={150}
                        height={150}
                    />
                    <Image
                        src={casey}
                        alt="Portrait input image"
                        width={150}
                        height={150}
                    />
                </div>
            </div>
        </div>
    );
}