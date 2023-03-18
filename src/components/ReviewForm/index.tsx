import {
  useEffect,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { z } from 'zod';

import { addReview } from '@dokkan/api/reviewSlice';
import { Icons } from '@dokkan/assets/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import { errorHandling } from '@dokkan/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

function ReviewForm({productId}: {productId: number}) {
  const [rate, setRate] = useState(0)
  const schema = z.object({
    review: z.string()
  })
  const {control, handleSubmit, setError } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.review)
   const onSubmit = (data:any) => dispatch(addReview({...data, productId, rate}))  ;

  useEffect(() => {
    if (error?.errors) {
      errorHandling({error, setError})
    }
  }, [error])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Send a review</h2>
      <FormGroup control={control} type='textarea' name='review' placeholder='your review text'/>
      <div className='my-2'>
      {/* @ts-ignore */}
        <Rating initialRating={rate}
                onChange={setRate}  
                emptySymbol={<Icons.EmptyStar/>}
                fullSymbol={<Icons.FullStar/>} 
        />  
      </div>      
      <Button loading={loading} variant='primary'>Submit</Button>
    </form>
  )
}

export default ReviewForm