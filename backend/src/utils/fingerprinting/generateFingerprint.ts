export const collectFingerprintData = (): Record<string, any> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let canvasFingerprint = "";
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = "#f60";
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = "#069";
      ctx.fillText("!@#$%^&*()_+~", 2, 2);
      canvasFingerprint = canvas.toDataURL();
    }
  
    return {
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      cpuCores: navigator.hardwareConcurrency || null,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      cookiesEnabled: navigator.cookieEnabled,
      canvasFingerprint,
    };
  };
  
  export const generateUniqueId = async (data: Record<string, any>): Promise<string> => {
    const encoder = new TextEncoder();
    const dataString = JSON.stringify(data);
    const dataBuffer = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };