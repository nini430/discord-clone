'use client';

import Image from 'next/image'
import {X} from 'lucide-react'
import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css'

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: 'serverImage' | 'messageFile';
}

const FileUpload = ({ value, onChange, endpoint }: FileUploadProps) => {
    const fileType=value?.split('.')[1];

    if(value && fileType!=='pdf') {
        return (
            <div className='relative w-20 h-20'>
       <Image src={value} alt='Upload' fill className='rounded-full' />
       <button onClick={()=>onChange('')} className='rounded-full p-1 bg-rose-500 text-white absolute top-0 right-0'>
        <X className='h-4 w-4'/>
       </button>
            </div>
           
        )
    }
  return (
    <UploadDropzone
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        console.log(err);
      }}
      endpoint={endpoint}
    />
  );
};

export default FileUpload;
