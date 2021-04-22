import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './sidebar.css';
import { IconContext } from 'react-icons';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className='navbar'>
                <div to='#' className='menu-bars'>
                  <FaIcons.FaBars  onClick={showSidebar} />
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <div to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </div>
                    </li>
                     {SidebarData.map((item, index) => {
                         return (
                             <li key={index} className={item.cName}>
                                 <a href={item.path}>
                                     {item.icon}
                                     <span>{item.title}</span>
                                 </a>
                             </li>
                         )
                     })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
