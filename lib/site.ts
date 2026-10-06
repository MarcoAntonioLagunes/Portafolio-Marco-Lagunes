/** Única URL pública del sitio. Si algún día se compra un dominio propio, se cambia aquí y nada más. */
export const SITE_URL = "https://portafoliomarcolagunes.netlify.app";

/** URL de producción sin protocolo, para mostrar como texto. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const LINKEDIN_URL = "https://linkedin.com/in/marco-lagunes";
export const GITHUB_USER = "MarcoAntonioLagunes";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

export const CV_PATH = "/Marco_Lagunes_CV.pdf";
export const RESUME_EN_PATH = "/Marco_Lagunes_Resume.pdf";

/** Sonido opcional del intro. Solo se usa si el archivo existe en public/ al hacer build. */
export const BOOT_SOUND_PATH = "/sounds/boot.mp3";
