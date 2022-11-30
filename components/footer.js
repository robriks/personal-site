import Image from 'next/image';
import githubLogo from '../public/github-logo.png';
import twitterLogo from '../public/twitter-logo.png';
import instagramLogo from '../public/instagram-logo.png';

export default function Footer() {
    return (
        <div className='justify-center h-auto w-auto'>
            <div className='justify-center text-xs'>
                <h2 className='text-center mb-2'>Copyright © 2022 Osterlund Dapp Solutions</h2>
                <h2 className='text-center font-bold'>Contact:</h2>
            </div>

            <div className='flex justify-center'>
                <div className='p-4'> 
                    <a
                        href='https://github.com/robriks/HuskyCoin'>
                        <Image
                            src={githubLogo}
                        />
                    </a>
                </div>
                <div className='p-4'>
                    <a
                        href='https://twitter.com/marsterlund'>
                        <Image
                            src={twitterLogo}
                        />
                    </a>
                </div>
                <div className='p-4'>
                    <a
                        href='https://instagram.com/marsterlund'>
                        <Image
                            src={instagramLogo}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}