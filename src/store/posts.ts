import { atom } from 'jotai';
import { Post } from '@/types/post';

export const searchQueryAtom = atom('');
export const filteredPostsAtom = atom<Post[]>([]);
export const currentPageAtom = atom(1);
export const postsPerPageAtom = atom(12);