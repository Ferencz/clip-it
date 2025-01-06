// src/ClipIt.ts
import { execSync, exec } from 'child_process';
import os from 'os';
import fs from 'fs';

export default class ClipIt {
    private platform: NodeJS.Platform;

    constructor() {
        this.platform = os.platform();
        this.checkPlatformTools();
    }

    // Check if platform-specific tools are installed
    private checkPlatformTools(): void {
        if (this.platform === 'linux' || this.platform === 'darwin') {
            try {
                execSync('which xclip || which pbcopy');
            } catch (error) {
                console.error('Required tools (xclip or pbcopy) are not installed.');
                console.log('Run the following command to install them:');
                console.log('bash ./src/platform-tools/check-tools.sh');
                process.exit(1);
            }
        } else if (this.platform === 'win32') {
            try {
                execSync('powershell -Command "Get-Command clip"');
            } catch (error) {
                console.error('Required tools (clip) are not installed.');
                console.log('Run the following command to install them:');
                console.log('powershell ./src/platform-tools/check-tools.ps1');
                process.exit(1);
            }
        } else {
            throw new Error('Unsupported operating system.');
        }
    }

    /**
     * Write text or buffer to the clipboard.
     * @param content - The content to write (string or buffer).
     */
    public writeSync(content: string | Buffer): void {
        try {
            let command: string;

            if (Buffer.isBuffer(content)) {
                // Handle buffer (binary data)
                const base64Content = content.toString('base64'); // Encode buffer as Base64
                if (this.platform === 'win32') {
                    command = `echo ${base64Content} | clip`;
                } else if (this.platform === 'linux') {
                    command = `echo ${base64Content} | xclip -selection clipboard`;
                } else if (this.platform === 'darwin') {
                    command = `echo ${base64Content} | pbcopy`;
                } else {
                    throw new Error('Unsupported operating system.');
                }
            } else if (typeof content === 'string') {
                // Handle text
                if (this.platform === 'win32') {
                    command = `echo ${content} | clip`;
                } else if (this.platform === 'linux') {
                    command = `echo ${content} | xclip -selection clipboard`;
                } else if (this.platform === 'darwin') {
                    command = `echo ${content} | pbcopy`;
                } else {
                    throw new Error('Unsupported operating system.');
                }
            } else {
                throw new Error('Unsupported content type. Only strings and buffers are supported.');
            }

            execSync(command);
            console.log('Content copied to clipboard synchronously.');
        } catch (error) {
            console.error('Failed to write to clipboard synchronously:', error);
        }
    }

    /**
     * Read text or buffer from the clipboard.
     * @returns The clipboard content as a string or buffer.
     */
    public readSync(): string | Buffer {
        try {
            let command: string;
            if (this.platform === 'win32') {
                command = 'powershell Get-Clipboard';
            } else if (this.platform === 'linux') {
                command = 'xclip -selection clipboard -o';
            } else if (this.platform === 'darwin') {
                command = 'pbpaste';
            } else {
                throw new Error('Unsupported operating system.');
            }

            const content = execSync(command).toString().trim();

            // Check if the content is Base64 encoded (binary data)
            if (/^[A-Za-z0-9+/=]+$/.test(content)) {
                console.log('Buffer content read from clipboard synchronously.');
                return Buffer.from(content, 'base64'); // Decode Base64 to buffer
            } else {
                console.log('Text content read from clipboard synchronously:', content);
                return content; // Return text
            }
        } catch (error) {
            console.error('Failed to read from clipboard synchronously:', error);
            throw error;
        }
    }

    /**
     * Write a file to the clipboard.
     * @param filePath - The path to the file.
     */
    public writeFileSync(filePath: string): void {
        try {
            const fileBuffer = fs.readFileSync(filePath); // Read the file as a buffer
            this.writeSync(fileBuffer); // Write the buffer to the clipboard
            console.log(`File copied to clipboard: ${filePath}`);
        } catch (error) {
            console.error(`Failed to write file to clipboard: ${error}`);
        }
    }

    // Asynchronously write text or buffer to clipboard
    public async writeAsync(content: string | Buffer): Promise<void> {
        try {
            let command: string;
    
            if (Buffer.isBuffer(content)) {
                // Handle buffer (binary data)
                const base64Content = content.toString('base64');
                if (this.platform === 'win32') {
                    command = `echo ${base64Content} | clip`;
                } else if (this.platform === 'linux') {
                    command = `echo ${base64Content} | xclip -selection clipboard`;
                } else if (this.platform === 'darwin') {
                    command = `echo ${base64Content} | pbcopy`;
                } else {
                    throw new Error('Unsupported operating system.');
                }
            } else if (typeof content === 'string') {
                // Handle text
                if (this.platform === 'win32') {
                    command = `echo ${content} | clip`;
                } else if (this.platform === 'linux') {
                    command = `echo ${content} | xclip -selection clipboard`;
                } else if (this.platform === 'darwin') {
                    command = `echo ${content} | pbcopy`;
                } else {
                    throw new Error('Unsupported operating system.');
                }
            } else {
                throw new Error('Unsupported content type. Only strings and buffers are supported.');
            }
    
            await new Promise<void>((resolve, reject) => {
                exec(command, (error) => {
                    if (error) {
                        reject(`Failed to write to clipboard asynchronously: ${error}`);
                    } else {
                        console.log('Content copied to clipboard asynchronously.');
                        resolve();
                    }
                });
            });
        } catch (error) {
            console.error('Failed to write to clipboard asynchronously:', error);
            throw error;
        }
    }

    // Asynchronously read text or buffer from clipboard
    public async readAsync(): Promise<string | Buffer> {
        try {
            let command: string;
    
            if (this.platform === 'win32') {
                command = 'powershell Get-Clipboard';
            } else if (this.platform === 'linux') {
                command = 'xclip -selection clipboard -o';
            } else if (this.platform === 'darwin') {
                command = 'pbpaste';
            } else {
                throw new Error('Unsupported operating system.');
            }
    
            const content = await new Promise<string>((resolve, reject) => {
                exec(command, (error, stdout) => {
                    if (error) {
                        reject(`Failed to read from clipboard asynchronously: ${error}`);
                    } else {
                        resolve(stdout.trim());
                    }
                });
            });
    
            // Check if the content is Base64 encoded (binary data)
            if (/^[A-Za-z0-9+/=]+$/.test(content)) {
                console.log('Buffer content read from clipboard asynchronously.');
                return Buffer.from(content, 'base64');
            } else {
                console.log('Text content read from clipboard asynchronously:', content);
                return content;
            }
        } catch (error) {
            console.error('Failed to read from clipboard asynchronously:', error);
            throw error;
        }
    }
}