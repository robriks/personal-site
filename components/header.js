import Link from 'next/link';
import Image from 'next/image';
import BirbBanner from '../public/birb-banner.jpg';

export default function Header() {
    return (
        <div className='justify-center h-auto w-auto'>
            <header className='bg-header'>
                <nav className='p-6 mx-auto justify-between max-w-screen-x1'>
                    <div className='flow-root ml-4 mt-2'>
                        <div className='flex justify-center'>
                            <Link href='/'>
                                <a className='max-w-lg'>
                                    <Image src={BirbBanner} className='rounded-full' alt=''></Image>
                                </a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}