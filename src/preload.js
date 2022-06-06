import { contextBridge, ipcRenderer } from "electron";
import { cpus, platform, totalmem, freemem } from "os";

const API = {
  hardware: {
    cpus: cpus(),
    platform: platform(),
    totalmem: totalmem(),
    freemem: freemem(),
  },
  sendMessage: (m) => ipcRenderer.send('message', m)
};

contextBridge.exposeInMainWorld("api", API);
