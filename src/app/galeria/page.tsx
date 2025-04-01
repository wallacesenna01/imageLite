'use client'
import { Template, ImageCard, InputText, useNotification, AuthenticatedPage} from '@/components'
import { Image } from '@/resources/image/image.resource'
import { useImageService } from '@/resources'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/button/Button'


export default function GaleriaPage() {

    const notification = useNotification();
    const userService = useImageService();
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState<string>('')
    const [extension, setExtension] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

     async function searchImages() {
        setLoading(true)
        const result = await userService.buscar(query, extension);
        setImages(result);
        setLoading(false)

        if(!result.length) {
            notification.notify("no result found", "warning")
        }
    }

    function cardImageRender(image:Image) {
        return (
            <ImageCard key={image.url} nome={image.name} src={image.url} tamanho={image.size} extension={image.extension} dataUpload={image.uploadDate}/>
        )
    }



     function renderImageCards() {
        return images.map(cardImageRender)
     }

    return(
        <AuthenticatedPage>
        <Template loading={loading}>

            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <InputText placeholder='type name or tag' onChange={event => setQuery(event.target.value)} />
                         <select aria-label='selecione uma opção' onChange={event =>setExtension(event.target.value)} className='border px-4 py-2 rounded-lg text-grey-900'>
                         <option value="">All formats</option>
                         <option value="PNG">PNG</option>
                         <option value="JPEG">JPEG</option>
                         <option value="GIF">GIF</option>
                          </select>
                         <Button style='bg-blue-500 hover:bg-blue-300' label='Search' onClick={searchImages}/>
                    <Link href="/formulario">
                        <Button style='bg-blue-500 hover:bg-blue-300' label='Add New'/>
                    </Link>
                    

                </div>
            </section>


            <section className='grid grid-cols-3 gap-8'>
              {
                 renderImageCards()
              } 
            </section>
        </Template>
        </AuthenticatedPage>
    )
}