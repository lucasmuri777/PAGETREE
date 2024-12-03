export const DefaultSite = [
    {
        type: 'HEADER',
        logo: 'https://placehold.co/400',
        backgroundColor: 'white',
        nav: {
            links: [
                {label: 'Home', href: '#Banner-Free'}, 
                {label: 'Quem somos', href: '#Quem-Somos-Free'},
                {label: 'Serviços', href: '#Servicos-Free'},
                {label: 'Contato', href: '#Footer-Free'},],
            color: 'black'
        }
    },
    {
        type: 'BANNER',
        title: 'Banner',
        description: 'Descrição chamativa pro banner',
        button: 'Venha criar seu site',
        titleColor: '#226ACF',
        descriptionColor: 'black',
        buttonBackgroundColor: '#226ACF',
        buttonTextColor: 'white',
        slide: [
            {image: 'https://placehold.co/600x400', alt: 'slide 1'},
            {image: 'https://placehold.co/400', alt: 'slide 2'}
        ],
    },
    {
        type: 'QUEMSOMOS',
        title: 'Quem somos',
        description: 'A page tree cria seus sites de forma rápida e de graça',
        button: 'Fale conosco',
        image: 'https://placehold.co/400',
        titleColor: '#226ACF',
        descriptionColor: 'black',
        buttonBackgroundColor: '#226ACF',
        buttonTextColor: 'white',
        backgroundColor: 'white',
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
                backgroundColor: 'white',
                descriptionColor: 'black',
                titleColor: '#226ACF',
            },
            { 
                img: 'https://placehold.co/400',
                alt: 'Serviço 2',
                title: 'Serviço 2',
                description: 'Lorem ipsum dolor sit amet, consectetur',
                backgroundColor: 'white',
                descriptionColor: 'black',
                titleColor: '#226ACF',
            },
            { 
                img: 'https://placehold.co/400',
                alt: 'Serviço 3',
                title: 'Serviço 3',
                description: 'Lorem ipsum dolor sit amet, consectetur',
                backgroundColor: 'white',
                descriptionColor: 'black',
                titleColor: '#226ACF',
            }
        ],
        backgroundColor: 'white',
        titleColor: '#226ACF',
        descriptionColor: 'black',
    },
    {
        type: 'FOOTER',
        logo: 'https://placehold.co/400',
        socialMedia: [
            {
                iconImg: '',
                iconSvg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>',
                href: '#',
                iconColor: '#226ACF',
            },
            {
                iconImg: '',
                iconSvg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>',
                href: '#',
                iconColor: '#226ACF',
            }
        ],
        backgroundColor:'black',
        textColor: 'white',
        copyright: 'Todos os direitos reservados 2024',
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
