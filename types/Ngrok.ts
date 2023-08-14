class Ngrok {
    static urls: { [key: string]: string } = {
        httpx: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
        asynchttpx: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
        threadhttpx: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
        playwright: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
        playwrighthttpx: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
        seleniumh: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
        seleniumhttpx: "https://02b7-2001-448a-1190-396-9c33-e84a-78c2-d649.ngrok-free.app",
      };
  
    static getUrl(key: string): string | undefined {
        return this.urls[key];
    }
  }
  
  export default Ngrok;