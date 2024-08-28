/* eslint-disable @typescript-eslint/no-explicit-any */

import { Loader } from "google-maps";



const KEY: any = "";
let googleMap: any = null;
export let GOOGLE_MAP_ELEMENT: any;
export let MAP_ACTIVATION_KEY = '';
export const getGoogleMap = async function () {
  if (!googleMap) {
    const loader = new Loader( MAP_ACTIVATION_KEY , {
      libraries: ["drawing", "marker", "visualization"],
    });
    googleMap = await loader.load();
  }
  GOOGLE_MAP_ELEMENT = googleMap;
  return googleMap;
};

export const GOOGLE_MAP = {
  KEY,
};

export const setMapActivationKey = (key: string) => {
  MAP_ACTIVATION_KEY = key;
};

export const GOOGLE_MAP_OPTIONS = {
  center: { lat: 0, lng: 0 },
  zoom: 1,
  minZoom: 1,
  mapTypeId: "satellite",
  disableDefaultUI: false,
  gestureHandling: "greedy",
};
export const GENERAL_MAP_ICONS = {
  ICON_POINTER_BLUE: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyOCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMi42NDQgMjQuMTc3NUMxMS4xMjE3IDIyLjMyNTUgOS44MjY1NSAyMC43NzczIDguNzI1MTcgMTkuNDYwOE0xMi42NDQgMjQuMTc3NUMxMi42NDQyIDI0LjE3NzcgMTIuNjQ0NCAyNC4xNzc5IDEyLjY0NDUgMjQuMTc4MUwxMi4yNTgzIDI0LjQ5NTZMMTIuNjQ0IDI0LjE3NzRDMTIuNjQ0IDI0LjE3NzUgMTIuNjQ0IDI0LjE3NzUgMTIuNjQ0IDI0LjE3NzVaTTEyLjY0NCAyNC4xNzc1TDguNzI1MTcgMTkuNDYwOE04LjcyNTE3IDE5LjQ2MDhDNi43NTQyMiAxNy4xMDQ3IDUuNDAzNzkgMTUuNDkwNCA0LjQ4MjI3IDE0LjIwNDZDMy43NzEwNiAxMy4yMTIyIDMuMzQwMyAxMi40NDgxIDMuMDgzMTkgMTEuNzE5NUMyLjgyODIyIDEwLjk5NyAyLjczNDM4IDEwLjI4MjIgMi43MzQzOCA5LjM3NUMyLjczNDM4IDQuNTUyMDIgNy40MjY2NyAwLjUgMTMuNDA2NCAwLjVDMTkuMzg2MiAwLjUgMjQuMDc4NSA0LjU1MjAyIDI0LjA3ODUgOS4zNzVDMjQuMDc4NSAxMC4yODIyIDIzLjk4NDcgMTAuOTk3IDIzLjcyOTcgMTEuNzE5NUMyMy40NzI2IDEyLjQ0ODEgMjMuMDQxOCAxMy4yMTIyIDIyLjMzMDYgMTQuMjA0NkMyMS40MDkxIDE1LjQ5MDQgMjAuMDU4NyAxNy4xMDQ3IDE4LjA4NzcgMTkuNDYwOEMxNi45ODYzIDIwLjc3NzMgMTUuNjkxMiAyMi4zMjU1IDE0LjE2ODggMjQuMTc3NU04LjcyNTE3IDE5LjQ2MDhMMTQuMTY4OCAyNC4xNzc1TTE0LjE2ODggMjQuMTc3NUMxNC4xNjg5IDI0LjE3NzUgMTQuMTY4OSAyNC4xNzc1IDE0LjE2ODkgMjQuMTc3NEwxNC41NTQ2IDI0LjQ5NTZMMTQuMTY4NCAyNC4xNzgxQzE0LjE2ODUgMjQuMTc3OSAxNC4xNjg3IDI0LjE3NzcgMTQuMTY4OCAyNC4xNzc1WiIgZmlsbD0iIzNGODREMyIgc3Ryb2tlPSJ3aGl0ZSIvPg0KPHBhdGggZD0iTTIwLjcyNjggMTBDMjAuNzI2OCAxMy41MzkyIDE3LjUwMjkgMTYuNSAxMy40MDY0IDE2LjVDOS4zMDk4NiAxNi41IDYuMDg1OTQgMTMuNTM5MiA2LjA4NTk0IDEwQzYuMDg1OTQgNi40NjA4MiA5LjMwOTg2IDMuNSAxMy40MDY0IDMuNUMxNy41MDI5IDMuNSAyMC43MjY4IDYuNDYwODIgMjAuNzI2OCAxMFoiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNGOUY5RjkiLz4NCjwvc3ZnPg==',

};




export const MAP_CENTER = { lat: 24.157969105630173, lng: 79.12741830605147 };

export const MAP_OPTIONS = [
  {
    label: 'Satellite',
    value: 'satellite'
  },
  {
    label: 'Roadmap',
    value: 'roadmap'
  },
  {
    label: 'Hybrid',
    value: 'hybrid'
  },
  {
    label: 'Terrain',
    value: 'terrain'
  }
];
