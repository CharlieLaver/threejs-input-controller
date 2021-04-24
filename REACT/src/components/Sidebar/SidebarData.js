import React from 'react'
import { AiFillAndroid } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { FaTwitter } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';


export const SidebarData = [
    {
        title: 'Contact',
        path: 'mailto:charlielaver7@gmail.com',
        icon: <MdEmail />,
        cName: 'nav-text'
    },
    {
        title: 'GitHub',
        path: 'https://github.com/CharlieLaver',
        icon: <SiGithub />,
        cName: 'nav-text'
    },
    {
        title: 'Twitter',
        path: 'https://twitter.com/charlie_laver',
        icon: <FaTwitter />,
        cName: 'nav-text'
    },
    {
        title: 'PlayStore',
        path: 'https://play.google.com/store/apps/developer?id=Charlie+Laver',
        icon: <AiFillAndroid />,
        cName: 'nav-text'
    },
]