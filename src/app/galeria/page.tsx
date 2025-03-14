'use client'

import { Template, ImageCard } from '@/components'
import { Image } from '@/resources/image/image.resource'
import { useImageService } from '@/resources/image/image.service'
import { useState } from 'react'


export default function GaleriaPage() {

    const userService = useImageService();
    const [images, setImages] = useState<Image[]>([]);

     async function searchImages() {
        const result = await userService.buscar();
        setImages(result);
        console.table(result);
    }

    function cardImageRender(image:Image) {
        return (
            <ImageCard nome={image.name} src={image.url} tamanho={image.size} dataUpload={image.uploadDate}/>
        )
    }

     function cardImageRender_array() {
        return images.map(cardImageRender)
     }

    return(
        <Template>

            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <input type="text" className="border px-5 py-2 rounded-lg text-grey-900"/>
                    <select className='border px-4 py-2 rounded-lg text-grey-900'>
                        <option>All formats</option>
                    </select>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={searchImages}>Search</button>
                    <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg'>Add New</button>

                </div>
            </section>


            <section className='grid grid-cols-3 gap-8'>
              {
                cardImageRender_array()
              } 
            </section>
        </Template>
    )
}