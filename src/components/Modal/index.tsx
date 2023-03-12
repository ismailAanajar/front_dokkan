import { ComponentType } from 'react';

import {
  AnimatePresence,
  m,
} from 'framer-motion';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { closeModal } from '@dokkan/api/modalSlice';
import { Icons } from '@dokkan/assets/icons';
import { RootState } from '@dokkan/store';

import {
  Login,
  Register,
  ResetPassword,
} from '../Auth';
import ForgetPassword from '../Auth/ForgetPassword';

type ModalProps = {
  open: boolean;
  close: () => void
}

const backdrop = {
  hidden: {opacity:0,transition: {delay: 0.2}},
  visible: {opacity: 1}
}

const modal: any = {
  hidden: {
    opacity: 0,
    y: '-100vh',
    x: '-50%'
  },
  visible: {
    opacity: 1,
    y: '-50%',
    transition: {delay: 0.3 }
  }
}
 export const components = {
    'login': Login,
    'register': Register,
    'forget': ForgetPassword,
    'reset': ResetPassword
  } 

function Modal() {
  const {isOpen, content} = useSelector((state:RootState) => state.modal)
  const dispatch = useDispatch()
 
  let Component: ComponentType | undefined
  if (content?.comp) {
    const SelectedComponent  = components[content.comp];
    if (SelectedComponent) {
      Component =  SelectedComponent
    }
  }
  return (
    <AnimatePresence mode='wait'>
      {isOpen && <m.div variants={backdrop} initial='hidden' animate='visible' exit='hidden' className="overlay z-10 backdrop-blur-lg bg-[rgba(0,0,0,.2)] fixed top-0 left-0 w-full h-full">
        <button title='close' onClick={() => dispatch(closeModal())} className='text-primary fixed top-4 right-4 bg-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
          <Icons.CloseMenu/>
        </button>
        <m.div variants={modal} className="wrapper  w-[95%] md:w-[50%] max-w-[450px] rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh]  bg-white  scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray overflow-y-scroll">
          <div className="content pt-12  p-8 flex justify-center [&>*]:w-full">
            {Component ? <Component/> : content?.text}
          </div>
        </m.div>
      </m.div>}
    </AnimatePresence>
  )
}

export default Modal