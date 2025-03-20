import { fileURLToPath } from 'url';
import * as Yup from 'yup'


export interface FormProps{
    name: string;
    tags: string;
    file: string | Blob;
}

export const formScheme: FormProps = {name: '', tags: '', file: ''}

export const formValidationScheme = Yup.object().shape({
     name: Yup.string().trim().required('Name is required!')
              .max(50,'Name has the limit of 50 characteres!'),
     tags: Yup.string().trim().required('Tags is required!')
              .max(50,'Name has the limit of 50 characteres!'),
     file: Yup.mixed<Blob>().required("select an image to upload")
                        .test('size', 'File size cannot be higher than 4MB', (file) => {
                            return file.size < 4000000;
                        } )
                        .test('type', 'accepted formsts:  jpeg, gif, or png', (file) => {
                            return file.type === 'image/jpeg' ||  file.type === 'image/png' || file.type === 'image/gif';
                        })
    
})