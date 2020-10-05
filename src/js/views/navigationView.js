import { elements, elementStrings } from './base';

export const toggleNavigation = () => elements.navigation.classList.toggle('active');

export const removeNavigation = () => elements.navigation.classList.remove('active');

export const getTrendingState = () => elements.trendingButton.id;

export const getRandomState = () => elements.randomButton.id;

export const getCurrentStateFromNavigation = navigation => document.getElementById(`${navigation}`).id;