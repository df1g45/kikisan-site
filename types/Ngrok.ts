class Ngrok {
    static urls: { [key: string]: string } = {
        httpx: "https://b797-34-126-65-220.ngrok-free.app",
        asynchttpx: "https://b797-34-126-65-220.ngrok-free.app",
        threadhttpx: "https://b797-34-126-65-220.ngrok-free.app",
        playwright: "https://b797-34-126-65-220.ngrok-free.app",
        playwrighthttpx: "https://b797-34-126-65-220.ngrok-free.app",
        selenium: "http://localhost:8000",
        seleniumhttpx: "http://localhost:8000",
      };
  
    static getUrl(key: string): string | undefined {
        return this.urls[key];
    }
  }
  
  export default Ngrok;