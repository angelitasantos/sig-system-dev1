const http = require('http');
const app = require('./app');
const os = require('os');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Função para obter IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const localIP = getLocalIP();

server.listen(PORT, () => {
    console.log(`🚀 Servidor disponível na porta ${PORT}:`);
    console.log(`• IP local:     http://${localIP}:${PORT}`);
});
