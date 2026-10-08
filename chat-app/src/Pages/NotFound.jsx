
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='notFound vw100 vh100 flexColumn mgTop25'>

      <div className='return fontColorSec font'>
        <h2>Unfortunately, the page your're looking for doesn't exist</h2>
        <h2>Click <Link to="/" className='links fontColorThird'><i>here</i></Link> to return</h2>
      </div>
    </div>
  )
}
