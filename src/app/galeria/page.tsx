'use client'

import { Template, ImageCard } from '@/components'
import { useState } from 'react'


export default function GaleriaPage() {

    const image1 = 'https://th.bing.com/th/id/R.7249f1aa6b3a60581e4a3561f5539df0?rik=db9VuMTjbn2stg&pid=ImgRaw&r=0';
    const image2 = 'https://elviajerofeliz.com/wp-content/uploads/2015/09/paisajes-de-Canada.jpg';

    const nome2 = "Canada Lake's";
    const nome1 = 'Saara desert';


    const [codImage, setCodImage] = useState<number>(2);
    const[urlImage, setUrlImage] = useState<string>(image2);
    const[nomeImage, setNomeImage] = useState<string>(nome1);


     function mudarImagem() {
        if(codImage == 1) {
            setCodImage(2)
            setUrlImage (image2);
            setNomeImage(nome2)
        }else {
            setCodImage(1);
            setUrlImage(image1)
            setNomeImage(nome1);
        }
    }

  
    return(
        <Template>
            <button className='bg-amber-200' onClick={mudarImagem}>Clique para mudar</button>
            <section className='grid grid-cols-3 gap-8'>
             <ImageCard nome={nomeImage} dataUpload='13/03/2025' tamanho='10MB' src={urlImage}/>
             <ImageCard nome={nomeImage} dataUpload='13/03/2025' tamanho='10MB' src={urlImage}/>
             <ImageCard nome={nomeImage} dataUpload='13/03/2025' tamanho='10MB' src={urlImage}/>
            </section>
        </Template>
    )
}