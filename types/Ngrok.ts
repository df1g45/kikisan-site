class Ngrok {
    static urls: { [key: string]: string } = {
        httpx: "https://f2f3-116-206-30-39.ngrok-free.app",
        asynchttpx: "https://f2f3-116-206-30-39.ngrok-free.app",
        threadhttpx: "https://f2f3-116-206-30-39.ngrok-free.app",
        playwright: "https://f2f3-116-206-30-39.ngrok-free.app",
        playwrighthttpx: "https://f2f3-116-206-30-39.ngrok-free.app",
        selenium: "https://f2f3-116-206-30-39.ngrok-free.app",
        seleniumhttpx: "https://f2f3-116-206-30-39.ngrok-free.app",
      };
  
    static getUrl(key: string): string | undefined {
        return this.urls[key];
    }
  }
  
  export default Ngrok;