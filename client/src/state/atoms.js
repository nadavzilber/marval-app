import { atom } from 'recoil';

export const userAtom = atom({
    key: 'userAtom',
    default: null,
});

export const alertAtom = atom({
    key: 'alertAtom',
    default: null,
});

export const comicsAtom = atom({
    key: 'comicsAtom',
    default: null,
})