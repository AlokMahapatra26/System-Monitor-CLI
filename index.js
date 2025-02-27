
import os from 'node:os';
import chalk from 'chalk';
import disk from 'diskusage'


function monitor() {


    // System Root Drive Detect (for Windows or Linux/macOS)
const drivePath = process.platform === 'win32' ? 'D:\\' : '/';

try {
    const { free, total } = disk.checkSync(drivePath);

    
    console.log(`Total Storage: ${(total / 1e9).toFixed(2)} GB`);
    console.log(`Free Space: ${(free / 1e9).toFixed(2)} GB`);
    console.log(`Used Space: ${((total - free) / 1e9).toFixed(2)} GB`);
} catch (err) {
    console.error("Error fetching disk info:", err);
}

    const oldCpus = os.cpus();
    
    let usedMemory = ((os.totalmem() - os.freemem()) / (1024 * 1024 * 1024)).toFixed(2);
    const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
    
    
    console.log(`Uptime: ${formatUptime(os.uptime())}`);
   

    usedMemory = usedMemory > totalMemory - 2 ? chalk.red(usedMemory + ' ' + 'GB') : chalk.green(usedMemory + ' ' + 'GB');
    console.log(`RAM usage:  ${usedMemory} / ${totalMemory} GB`)
    console.log("Current Date & Time:", new Date().toLocaleString());
    console.log(`User : ${os.userInfo().username}`)
    
    console.log("---------------------------------");
    console.log(chalk.green.bold('CPU Info'));
    console.log(`CPU Model : ${os.cpus()[1].model}`)
    console.log(`System Architecture : ${os.arch()}`)
    console.log("---------------------------------");
   

    
    console.log(chalk.green.bold('OS Info'));
    console.log(`OS Name : ${os.platform()}`);
    console.log(`OS Version : ${os.version()}`)
    console.log("---------------------------------");
console.log(chalk.green.bold('Network Info'))
    const interfaces = os.networkInterfaces();

Object.keys(interfaces).forEach((name) => {
    interfaces[name].forEach((net) => {
        if (net.family === 'IPv4' && !net.internal) {  // Only external IPv4 addresses
            console.log("Host Name:", os.hostname());
            console.log(`Interface: ${name}`);
            console.log(`IPv4 Address: ${net.address}`);
            console.log(`MAC Address: ${net.mac}`);
            console.log(`Netmask: ${net.netmask}`);
            console.log(`CIDR: ${net.cidr}`);
            
        }
    });
});



    setTimeout(() => {
        const newCpus = os.cpus();
        const usage = newCpus.map((cpu, i) => ({
            core: i+1,
            usage: calculateCPU(oldCpus[i], newCpus[i]) + '%'
        }));
    
        console.clear();
        console.log(chalk.bold('==========SYSTEM STATS=========='));
        console.log(chalk.green.bold('All cpus usage'))
        console.table(usage);
    }, 1000);
    
}


function calculateCPU(oldCpu, newCpu) {
    const oldTimes = oldCpu.times;
    const newTimes = newCpu.times;

    const oldIdle = oldTimes.idle;
    const newIdle = newTimes.idle;

    const oldTotal = Object.values(oldTimes).reduce((a, b) => a + b, 0);
    const newTotal = Object.values(newTimes).reduce((a, b) => a + b, 0);

    const totalDiff = newTotal - oldTotal;
    const idleDiff = newIdle - oldIdle;
    
    const usage = ((totalDiff - idleDiff) / totalDiff) * 100;

    return usage.toFixed(1);
}

function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

monitor();
setInterval(monitor, 1000);
