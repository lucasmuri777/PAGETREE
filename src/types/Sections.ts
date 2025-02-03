export const DefaultSite = [
    {
        type: 'HEADER',
        logo: 'https://placehold.co/400',
        backgroundColor: '#ffffff',
        nav: {
            links: [
                {label: 'Home', href: '#Banner-Free'}, 
                {label: 'Quem somos', href: '#Quem-Somos-Free'},
                {label: 'Serviços', href: '#Servicos-Free'},
                {label: 'Contato', href: '#Footer-Free'},],
            color: '#000000'
        },
        idSection: 'Header'
    },
    {
        type: 'BANNER',
        title: 'Banner',
        description: 'Descrição chamativa pro banner',
        button: 'Venha criar seu site',
        titleColor: '#226ACF',
        descriptionColor: '#000000',
        buttonBackgroundColor: '#226ACF',
        buttonTextColor: '#ffffff',
        buttonLink: '#',
        slide: [
            {image: 'https://placehold.co/600x400', alt: 'slide 1'},
            {image: 'https://placehold.co/400', alt: 'slide 2'}
        ],
        idSection: 'Banner'
    },
    {
        type: 'QUEMSOMOS',
        title: 'Quem somos',
        description: 'A page tree cria seus sites de forma rápida e de graça',
        button: 'Fale conosco',
        image: 'https://placehold.co/400',
        titleColor: '#226ACF',
        descriptionColor: '#000000',
        buttonBackgroundColor: '#226ACF',
        buttonTextColor: '#ffffff',
        backgroundColor: '#ffffff',
        buttonLink: '#',
        idSection: 'Quem-Somos'
    },
    {
        type: 'SERVICOS',
        title: 'Serviços',
        description: 'Veja algum de nossos serviços',
        services:[
            { 
                img: 'https://placehold.co/400',
                alt: 'Serviço 1',
                title: 'Serviço 1',
                description: 'Lorem ipsum dolor sit amet, consectetur',
                backgroundColor: '#ffffff',
                descriptionColor: '#000000',
                titleColor: '#226ACF',
            },
            { 
                img: 'https://placehold.co/400',
                alt: 'Serviço 2',
                title: 'Serviço 2',
                description: 'Lorem ipsum dolor sit amet, consectetur',
                backgroundColor: '#ffffff',
                descriptionColor: '#000000',
                titleColor: '#226ACF',
            },
            { 
                img: 'https://placehold.co/400',
                alt: 'Serviço 3',
                title: 'Serviço 3',
                description: 'Lorem ipsum dolor sit amet, consectetur',
                backgroundColor: '#ffffff',
                descriptionColor: '#000000',
                titleColor: '#226ACF',
            }
        ],
        backgroundColor: '#ffffff',
        titleColor: '#226ACF',
        descriptionColor: '#000000',
        idSection: 'Servicos'
    },
    {
        type: 'FOOTER',
        logo: 'https://placehold.co/400',
        socialMedia: [
            {
                iconImg: '',
                iconSvg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>',
                href: '#Facebook',
                iconColor: '#226ACF',
            },
            {
                iconImg: '',
                iconSvg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>',
                href: '#Instagram',
                iconColor: '#226ACF',
            },
            {
                iconImg: '',
                iconSvg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>',
                href: '#Whatsapp',
                iconColor: '#226ACF',
            }
        ],
        backgroundColor:'#000000',
        textColor: '#ffffff',
        copyright: 'Todos os direitos reservados 2024',
        idSection: 'Footer'
    }] 

export type Section = {
    siteId: number;
    type: string;
    order: number;
    content: Header;
}

/*HEADER */
export type Header = {
    logo: string;
    backgroundColor: string;
    nav: Nav;
}

type Nav = {
    links: Link[];
    color: string;
}

type Link = {
    label: string;
    href: string;
}
/*HEADER */

type Banner = {
    title: string;
    description: string;
    button: string;
    titleColor: string;
    descriptionColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    buttonLink: string;
    slide: Slide[];
}
type Slide = {
    image: string;
    alt: string;
}

/*QUEM SOMOS */
type QuemSomos = {
    title: string;
    description: string;
    button: string;
    image: string;
    titleColor: string;
    descriptionColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    buttonLink: string;
    backgroundColor: string;
}

/* SERVICOS */

type Servicos = {
    title: string;
    description: string;
    services: Service[];
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
}
type Service = {
    img: string;
    alt: string;
    title: string;
    description: string;
    backgroundColor: string;
    descriptionColor: string;
    titleColor: string;
}

/* FOOTER */

type Footer = {
    logo: string;
    socialMedia: SocialMedia[];
    backgroundColor: string;
    textColor: string;
    copyright: string;
}

type SocialMedia = {
    iconImg: string;
    iconSvg: string;
    href: string;
    iconColor: string;
}
/*
    HEADER
    BANNER
    QUEM SOMOS
    SERVICOS
    FOOTER
*/





/* COMO DEVEM SER ENVIADOS */

/*
HEADER

siteId: number;
type: HEADER;
order: 0;
content: {
    logo: string;
    backgroundColor: string;
    nav: {
        links: [{label: link 1; href: 'redirect'}, {label: link 2; href: 'redirect'}]
    };
};

BANNER

siteId: number;
type: BANNER;
order: 1;
content: {
    title: string;
    description: string;
    button: string;
    titleColor: string;
    descriptionColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    slide: [{image: string, alt: string}];
}

Quem Somos

siteId: number;
type: QUEMSOMOS;
order: 2;
content: {
    title: string;
    description: string;
    button: string;
    image: string;
    titleColor: string;
    descriptionColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    backgroundColor: string;
}

SERVICOS

siteId: number;
type: SERVICOS;
order: 3;
content: {
    title: string;
    description: string;
    services:[{ 
        img: string;
        alt: string;
        title: string;
        description: string;
        backgroundColor: string;
        descriptionColor: string;
        titleColor: string; 
    }];
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
}

FOOTER

siteId: number;
type: FOOTER;
order: 4;
content: {
    logo: string;
    socialMedia: [{
        iconImg: string;
        iconSvg: string;
        href: string;
        iconColor: string;
    }];
    backgroundColor: string;
    textColor: string;
    copyright: string;
    
}

*/
