import nextConfig from "../../next.config.mjs";

export const BOT_TOKEN = {
    dev: "5726185691:AAH84b6CYTZRE8KuT7oAnxDtkjYI5fhtbNs",
    test: "7411782210:AAHe89edD-6bxxzEilQhQwzv-2SJqi20nNM",
    pro: "7467070275:AAGBRjyK7fBxK05Upv9rNkrUJinmhiTvfeQ",
}[nextConfig.publicRuntimeConfig.env.API];
