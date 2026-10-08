import {PagesNoSideBar} from '../Layout/PagesNoSideBar'
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const navigate = useNavigate()
  
  return <PagesNoSideBar>
    <div className="page">
      <div className='home homeMd'>
        <div className='heroTexts'>
          <h1 className='fontColorMain biggerFont font'>NKATA</h1>
          <p className='fontColorMain hugerFont font'>Connecting people around the world</p>
          <button className='noBorder pad10 mgTop10 font largeFont bold700 fontColorSec pointer radius10 transition' onClick={()=>{navigate('/login')}}>START CHATTING</button>
        </div>
      </div>
      
    </div>
    
  </PagesNoSideBar>;
};
