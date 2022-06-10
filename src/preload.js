import { contextBridge, ipcRenderer } from "electron";
import { cpus, platform, totalmem, freemem } from "os";

export const API = {
  hardware: {
    cpus: cpus(),
    platform: platform(),
    totalmem: totalmem(),
    freemem: freemem(),
  },
  sendMessage: (...args) => ipcRenderer.send('message', ...args),
  invokeMessage: (...args) => ipcRenderer.invoke('message', ...args)
};

contextBridge.exposeInMainWorld("api", API);
