import ytdl from "ytdl-core";

async function getDuration(url) {
    try {
        const info = await ytdl.getInfo(url);
        return parseInt(info.videoDetails.lengthSeconds, 10);
    } catch (error) {
        throw new Error(`Erro ao obter informações do YouTube: ${error.message}`);
    }
}

(async () => {
    const ytLink = "https://www.youtube.com/watch?v=W7Bqrop3vFw"; // Substitua pelo link desejado
    try {
        const duration = await getDuration(ytLink);
        console.log(`Duração: ${duration} segundos`);
    } catch (error) {
        console.error(`Erro ao obter duração: ${error.message}`);
    }
})();
