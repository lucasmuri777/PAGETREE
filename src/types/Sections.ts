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
    link: string;
    slide: Slide[];
}
type Slide = {
    image: string;
    alt: string;
}
/*
    HEADER
    BANNER
    QUEM SOMOS
    SERVICOS
    FOOTER
*/