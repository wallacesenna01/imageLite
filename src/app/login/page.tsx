'use client'

import { use, useState } from 'react';
import { Template, RenderIf, InputText, Button, FieldError, useNotification } from '@/components';
import { LoginForm, formScheme, validationScheme} from './formScheme'
import {useFormik} from 'formik'
import {useAuth} from '@/resources'
import {useRouter} from 'next/navigation'
import { AccessToken, Credentials, User } from '@/resources/user/user.resource';


export default function LoginPage() {


  const [loading, setLoading] = useState<boolean>(false);
  const [newUseState, setNewUserState] = useState<boolean>(false)

  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();


  const {values, handleChange, handleSubmit, errors, resetForm} = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: validationScheme,
    onSubmit: onSubmit
  })

  async function onSubmit(values: LoginForm) {
      if(!newUseState) {
        const credentials: Credentials = {email: values.email, password: values.password}
        try {
             const acessToken: AccessToken = await auth.authenticate(credentials);
             auth.initSession(acessToken);
             console.log("sessão exta valida ?", auth.isSessionValid());
             router.push("/galeria")

        } catch (error: any) {
           const message = error?.message;
           notification.notify(message, "error")
        }
      }else {
        const user: User = {email: values.email, name: values.name, password: values.password }
        try {
             await auth.save(user)
             notification.notify("Sucesso ao salvar o usuario", "success")
             resetForm();
             setNewUserState(false);
        }catch(error: any) {

          const message = error?.message;
          notification.notify(message, "error")
        }
      }
  }

  return (
    <Template loading={loading}>
      <div className='flex min-h-full flex-1 flex-col justify-center px-2 py-12 lg:px-8'>

        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900'>
            {
              newUseState ? 'Register new user' : 'Login to your account'
            } 
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <RenderIf condition={newUseState}>
                 <div >
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Name: </label>                  
                 </div>
                 <div className='mt-2'>
                     <InputText style='w-full'
                                id='name'
                                value={values.name}
                                onChange={handleChange}/> 
                      <FieldError error={errors.name}/>                  
                 </div>             
            </RenderIf>
            <div >
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Email: </label>                  
                 </div>
                 <div className='mt-2'>
                     <InputText style='w-full'
                                id='email'
                                value={values.email}
                                onChange={handleChange}/>
                    <FieldError error={errors.email} />  
                </div>

                <div >
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Password: </label>                  
                 </div>
                 <div className='mt-2'>
                     <InputText style='w-full'
                                type='password'
                                id='password'
                                value={values.password}
                                onChange={handleChange}/>
                    <FieldError error={errors.password}/> 
                </div>

                <RenderIf condition={newUseState}>
                <div >
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Confirm Password: </label>                  
                 </div>
                 <div className='mt-2'>
                     <InputText style='w-full'
                                type='password'
                                id='passwordMatch'
                                value={values.passwordMatch}
                                onChange={handleChange}/>
                      <FieldError error={errors.passwordMatch}/>  
                </div>
                </RenderIf>

                <div>

                  <RenderIf condition={newUseState}>
                     <Button type='submit' style='bg-indigo-950 hover:bg-indigo-700' label='Save'/>

                     <Button type='button' style='bg-red-600 hover:bg-red-400 mx-2'
                      label='Cancel'
                       onClick={event => setNewUserState(false)}/>
                  </RenderIf>

                  <RenderIf condition={!newUseState}>
                    <Button type='submit'
                     style='bg-indigo-950 hover:bg-indigo-700'
                     label='Login'/>
                    <Button type='button'
                     style='bg-red-600 hover:bg-red-400 mx-2'
                      label='Sign Up' onClick={event => setNewUserState(true)}/>
                  </RenderIf>
                </div>
           
          </form>

        </div>

      </div>
    </Template>
  );
}
