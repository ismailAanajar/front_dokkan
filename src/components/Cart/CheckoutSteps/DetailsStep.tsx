import classNames from 'classnames';

import { setAddressAsPrimary } from '@dokkan/api/addressSlice';
import { openModal } from '@dokkan/api/modalSlice';
import { Address } from '@dokkan/api/types';
import { Icons } from '@dokkan/assets/icons';
import Button from '@dokkan/components/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

import StepLayout from './stepLayout';

function DetailsStep({setStep}: {setStep:(step:'payment') => void}) {
  const {addresses} = useAppSelector(state => state.user.userInfo)
  
  const dispatch = useAppDispatch();
  

  const addNewAddress = (type: 'shipping' | 'belling') => {
    dispatch(openModal({comp: 'address', props:{type: type === 'shipping' ? 0 : 1}}))
  }

  return (
    <StepLayout>
      <StepLayout.Right className=''>
        <AddressCard type='shipping' addresses={addresses.shipping}  addNewAddress={addNewAddress}/>
        <AddressCard type='belling' addresses={addresses.belling}  addNewAddress={addNewAddress}/>
      </StepLayout.Right>
      <StepLayout.Left>
        <div className='flex justify-between gap-2 items-center'>
          <span className='text-gray'>Total: </span>
          <strong>$9888</strong>
        </div>
        <Button variant='primary' onClick={() => setStep('payment')} className='w-full'>proceed to payment</Button>
      </StepLayout.Left>
    </StepLayout>
  )
}

const AddressCard = ({type,addresses,  addNewAddress}: {type:'shipping' | 'belling' ,addresses:Address[],  addNewAddress: (type: 'shipping' | 'belling') => void}) =>{
  const dispatch = useAppDispatch();
  return (
      <div className="last:my-5 bg-white p-4">
        <h2 className=' capitalize text-lg mb-2'>{type} address</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          {
            addresses.map((item:Address) => {
              return (
                <div onClick={() => !item.isPrimary && dispatch(setAddressAsPrimary(item.id))} key={item.id} className={classNames('bg-secondary  hover:bg-gray_light justify-between  gap-2 p-2 rounded-sm cursor-pointer',{
                  '!bg-primary_light border border-primary': item.isPrimary
                })}>
                  <span className='inline-block mx-2'>{item.first_name}  {item.last_name}</span>|
                  <span className='inline-block mx-2'>{item.email}</span>|
                  <span className='inline-block mx-2'>{item.phone}</span>|
                  <span className='inline-block mx-2'>{item.country}</span>|
                  <span className='inline-block mx-2'>{item.city}</span>|
                  <span className='inline-block mx-2'>{item.postal_code}</span>
                </div>
              )
            } )
          }
          <Button onClick={() => addNewAddress(type)}  className='border border-primary hover:bg-primary  shadow-none flex justify-center items-center min-h-[136px] group'><Icons.Plus className='fill-primary w-8 group-hover:fill-white'/></Button>
        </div>
      </div>
  )
}

export default DetailsStep