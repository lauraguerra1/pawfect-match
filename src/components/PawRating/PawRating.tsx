import paw from '../../images/paw-print.png'

const PawRating = ({ rating, type, pet }: { rating: number, type: string, pet: string }) => {
  const pawEls = [];
 
  for(let i =0; i < rating; i++) {
    pawEls.push(<img key={`${i}${type}${pet}`} className='paw-rating' src={paw} alt='paw print representing a rating point'/>)
  }
  
  return (
    <>
      {pawEls}
    </>
  )
}

export default PawRating