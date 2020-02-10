import { writable } from 'svelte/store';

export const name = writable();
export const messages = writable([]);
export const activeUsers = writable([]);