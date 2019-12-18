export enum Unit {
    in,
    cm,
}

export interface Author {
    name: string;
    followers?: number;
    following?: number;
    totalArtCount?: number;
    soldArtCount?: number;
}

export interface Size {
    width: number;
    height: number;
    unit: Unit;
}

export interface Entry {
    imageBase64: string;
    material: string[];
    media: string[];
    subject: string[];
    style: string[];
    size: Size;
    title?: string;
    country?: string;
    price?: number;
    author?: Author;
}

export enum QueryParam {
    material,
    media,
    subject,
    style,
}

export interface Query {
    material?: string[];
    media?: string[];
    subject?: string[];
    style?: string[];
}
