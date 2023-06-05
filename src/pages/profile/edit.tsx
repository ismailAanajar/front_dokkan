import React, {
  ChangeEvent,
  useRef,
  useState,
} from 'react';

import {
  useController,
  useForm,
} from 'react-hook-form';

import { Field } from '@dokkan/api/types';
import { Section } from '@dokkan/components';
import Button from '@dokkan/components/Button';
import FormGroup from '@dokkan/components/Inputs/FormGroup';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import withAuth from '@dokkan/utils/withAuth';

function EditProfile() {
  const {name, email, image, first_name, last_name} = useAppSelector(state => state.user.userInfo)

  const user = [
    {
      name:"first_name",
      type:"text",
      label:"first name",
      require:true
    },
    {
      name:"last_name",
      type:"text",
      label:"last name",
      require:true
    },
    {
      name:"email",
      type:"email",
      label:"Email",
      require:true
    },
  ];
   const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const schema = z.object(rules(forms?.[type]));
 

  const {control, handleSubmit, setError, reset } = useForm({
    defaultValues:{
      first_name: first_name,
      last_name: last_name,
      email: email,
      photo: image
    }
  })

  const {field, fieldState} = useController({
    name: 'photo' || '', control: control
  })
  const dispatch = useAppDispatch();



  
  // @ts-ignore
 const onSubmit = (data:any) => {
  if(!selectedImage) return;
  const formData = new FormData();
  formData.append('photo', selectedImage);
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('email', data.email);
  
 }  ;
  

  // useEffect(() => {
  //   if (error?.errors) {
      
  //     errorHandling({error, setError})
  //   }
  // }, [error])


  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <Section>
       <ProfileLayout page='account'>
        <ProfileLayout.header>
        <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>Edit Profile</h2>
        <Button variant='link' href='/profile' className='shadow-none text-primary bg-primary_light px-3 py-2'>Back to profile</Button>
      </ProfileLayout.header>
        <div className='bg-white shadow-sm p-3 rounded-md'>
            <div className='relative w-fit'>
               <button title='upload an image' onClick={handleButtonClick} className='absolute bottom-2 right-0 bg-gray_light rounded-full'>
                <svg  width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6114 7.26087H18.3071C19.3845 7.26087 20.25 8.12636 20.25 9.2038V16.0571C20.25 17.1345 19.3845 18 18.3071 18H5.94294C4.86549 18 4 17.1345 4 16.0571V9.2038C4 8.12636 4.86549 7.26087 5.94294 7.26087H7.63859L8.57473 5.84783C8.92799 5.31793 9.5462 5 10.1821 5H14.0679C14.7038 5 15.322 5.31793 15.6753 5.84783L16.6114 7.26087ZM7.74457 12.0299C7.74457 14.4497 9.70516 16.4103 12.125 16.4103C14.5448 16.4103 16.5054 14.4497 16.5054 12.0476C16.5054 9.62772 14.5448 7.66712 12.125 7.66712C9.70516 7.66712 7.74457 9.61005 7.74457 12.0299ZM17.9891 9.99864H18.0598C18.3777 9.98098 18.6073 9.71603 18.5897 9.3981C18.572 9.08016 18.3071 8.83288 17.9891 8.85054H17.2826C16.9823 8.86821 16.7527 9.09783 16.7351 9.3981C16.7174 9.71603 16.9647 9.98098 17.2826 9.99864H17.9891ZM9.6875 12.0473C9.6875 10.7049 10.7826 9.60976 12.125 9.60976C13.4674 9.60976 14.5625 10.6872 14.5625 12.0296C14.5625 13.372 13.4674 14.4671 12.125 14.4671C10.7826 14.4671 9.6875 13.3897 9.6875 12.0473Z" fill="#0F3460"></path>
                </svg>
                </button>
                <input
                  type="file"
                  className='hidden'
                  
                  placeholder=''
                  title='image'
                  name='photo'
                  onChange={handleImageChange}
                  ref={fileInputRef}

                />
                {<img src={previewUrl || image} alt="Preview" className='w-[100px] h-[100px] rounded-full'/>}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
              {
                user.map(({id, ...field}: Field) => {
                  return <FormGroup key={id} control={control} {...field}  placeholder={field.label} />
                })
              }
            </div>

            <Button  variant='primary' onClick={handleSubmit(onSubmit)}>save</Button>
        </div>
       </ProfileLayout>
    </Section>
  )
}

export default withAuth(EditProfile)