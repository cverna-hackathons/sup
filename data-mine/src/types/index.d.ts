import { Unit } from './index';

export interface Author {
    name: string;
    foreignId?: string;
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
    imagePublicUrl: string;
    materials: string[];
    medias: string[];
    subjects: string[];
    styles: string[];
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
    resolutions: number[];
    materials?: string[];
    medias?: string[];
    subjects?: string[];
    styles?: string[];
}

export interface AWSCredentials {
    key: string;
    secret: string;
    bucket: string;
}
