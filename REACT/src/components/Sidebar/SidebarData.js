import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Contact',
        path: 'mailto:charlielaver7@gmail.com',
        icon: <MdIcons.MdEmail />,
        cName: 'nav-text'
    },
    {
        title: 'GitHub',
        path: 'https://github.com/CharlieLaver',
        icon: <AiIcons.AiFillGithub />,
        cName: 'nav-text'
    },
    {
        title: 'YouTube',
        path: 'https://www.youtube.com/channel/UChTZdok5eWFUWohdEkRHcmg',
        icon: <AiIcons.AiFillYoutube />,
        cName: 'nav-text'
    },
    {
        title: 'PlayStore',
        path: 'https://play.google.com/store/apps/developer?id=Charlie+Laver',
        icon: <AiIcons.AiFillAndroid />,
        cName: 'nav-text'
    },
]