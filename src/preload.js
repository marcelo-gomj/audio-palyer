import { contextBridge, ipcRenderer } from 'electron';

const sendMessage = (message) =>  {
  ipcRenderer.send('message', message)
}

contextBridge.exposeInMainWorld('sender', { sendMessage })