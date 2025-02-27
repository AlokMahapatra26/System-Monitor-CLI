# System Monitor Script

This script provides a real-time system monitoring tool using Node.js. It displays details about CPU usage, memory usage, network information, disk storage, and system uptime.

## Features
- **CPU Usage**: Monitors and displays individual CPU core usage.
- **Memory Usage**: Shows total and used RAM with color indicators.
- **Disk Storage**: Displays total, free, and used space of the system's secondary storage.
- **OS Information**: Displays OS version, architecture, and platform.
- **Network Information**: Lists network interfaces and IP addresses.
- **Live Updates**: Refreshes the system stats every second.

## Installation
### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Install Dependencies
Run the following command to install required packages:
```sh
npm install chalk diskusage
```

## Usage
Run the script using:
```sh
node monitor.js
```

## Code Explanation
### `monitor()` Function
- Fetches system information using the `os` and `diskusage` modules.
- Displays CPU, memory, storage, and network details.
- Uses `setTimeout()` to update CPU usage dynamically.

### `calculateCPU()` Function
- Computes CPU usage by comparing old and new CPU times.

### `formatUptime()` Function
- Converts system uptime from seconds to `hh:mm:ss` format.


## License
This project is open-source and free to use.

## Contribution
Feel free to fork and improve the script. Pull requests are welcome!

