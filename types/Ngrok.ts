class Ngrok {
    static urls: { [key: string]: string } = {
        httpx: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
        asynchttpx: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
        threadhttpx: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
        playwright: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
        playwrighthttpx: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
        selenium: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
        seleniumhttpx: "https://293e-2001-448a-1190-102a-b979-7d84-9c8c-f0be.ngrok-free.app",
      };
  
    static getUrl(key: string): string | undefined {
        return this.urls[key];
    }
  }
  
  export default Ngrok;