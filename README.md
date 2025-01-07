# Node Clip It

**Node Clip It** is a Node.js library for clipboard operations with support for **text** and **buffers**. It provides both **synchronous** and **asynchronous** methods for reading from and writing to the clipboard. The library works on **Windows**, **Linux**, and **macOS**.

## Features
- **Cross-platform**: Works on Windows, Linux, and macOS.
- **Text and Buffer Support**: Copy and paste text or binary data (buffers).
- **Synchronous and Asynchronous Methods**: Choose between `writeSync`/`readSync` and `writeAsync`/`readAsync`.
- **Easy to Use**: Simple API for clipboard operations.

---

## Supported File Types
Clip It supports copying and pasting **all file types** as buffers, including:
- **Text files** (`.txt`, `.json`, etc.)
- **PDFs** (`.pdf`)
- **Images** (`.png`, `.jpg`, etc.)
- **Videos** (`.mp4`, `.mov`, etc.)
- **Audio files** (`.mp3`, `.wav`, etc.)
- **Binary files** (`.bin`, `.exe`, etc.)

### Example: Copying and Pasting a PDF
```javascript
import ClipIt from 'node-clip-it';
import fs from 'fs';

const clip = new ClipIt();

// Read a PDF file as a buffer
const pdfBuffer = fs.readFileSync('example.pdf');

// Write the PDF buffer to the clipboard
clip.writeSync(pdfBuffer);

// Read the PDF buffer from the clipboard
const clipboardContent = clip.readSync();
fs.writeFileSync('output.pdf', clipboardContent); // Save the buffer to a file

---

## Requirements
- **Node.js**: Version 12 or higher.
- **Platform-Specific Tools**:
  - **Windows**: `clip` and `powershell` (pre-installed).
  - **Linux**: `xclip` (install with `sudo apt-get install xclip`).
  - **macOS**: `pbcopy` and `pbpaste` (pre-installed).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ferencz/clip-it.git
   cd node-clip-it
   
Install the package using npm:

```bash
npm install node-node-clip-it
```

---

## Usage

### Import the Library
```javascript
// Using ES Modules
import ClipIt from 'node-clip-it';

// Using CommonJS
const ClipIt = require('node-clip-it');
```

### Create an Instance
```javascript
const clip = new ClipIt();
```

---

### Methods

#### 1. **Synchronous Methods**
- **`writeSync(content: string | Buffer)`**: Writes text or buffer content to the clipboard synchronously.
- **`readSync(): string | Buffer`**: Reads text or buffer content from the clipboard synchronously.

#### Example: Synchronous Usage
```javascript
// Write text to the clipboard
clip.writeSync('Hello, Clip It!');

// Read text from the clipboard
const textContent = clip.readSync();
console.log(textContent); // Output: Hello, Clip It!

// Write buffer to the clipboard
const buffer = Buffer.from('Hello, Buffer!');
clip.writeSync(buffer);

// Read buffer from the clipboard
const bufferContent = clip.readSync();
console.log(bufferContent.toString()); // Output: Hello, Buffer!
```

---

#### 2. **Asynchronous Methods**
- **`writeAsync(content: string | Buffer): Promise<void>`**: Writes text or buffer content to the clipboard asynchronously.
- **`readAsync(): Promise<string | Buffer>`**: Reads text or buffer content from the clipboard asynchronously.

#### Example: Asynchronous Usage
```javascript
// Write text to the clipboard
await clip.writeAsync('Hello, Clip It Async!');

// Read text from the clipboard
const textContent = await clip.readAsync();
console.log(textContent); // Output: Hello, Clip It Async!

// Write buffer to the clipboard
const buffer = Buffer.from('Hello, Buffer Async!');
await clip.writeAsync(buffer);

// Read buffer from the clipboard
const bufferContent = await clip.readAsync();
console.log(bufferContent.toString()); // Output: Hello, Buffer Async!
```

---

#### 3. **File Handling**
You can also copy and paste file contents as buffers.

#### Example: File Handling
```javascript
import fs from 'fs';

// Read a file as a buffer
const fileBuffer = fs.readFileSync('example.txt');

// Write the file buffer to the clipboard
clip.writeSync(fileBuffer);

// Read the file buffer from the clipboard
const clipboardContent = clip.readSync();
fs.writeFileSync('output.txt', clipboardContent); // Save the buffer to a file
```

---

### Preload Clipboard Content
You can check if the clipboard already contains content before performing operations.

#### Example: Preload Clipboard Content
```javascript
// Read preloaded content from the clipboard
const preloadedContent = clip.readSync();
if (preloadedContent) {
    console.log('Preloaded clipboard content:', preloadedContent);
} else {
    console.log('Clipboard is empty.');
}

// Overwrite preloaded content
clip.writeSync('New clipboard content');
const updatedContent = clip.readSync();
console.log('Updated clipboard content:', updatedContent);
```

---

## API Reference

### `ClipIt` Class

#### Methods
| Method               | Description                                      |
|----------------------|--------------------------------------------------|
| `writeSync(content)` | Writes text or buffer content to the clipboard.  |
| `readSync()`         | Reads text or buffer content from the clipboard. |
| `writeAsync(content)`| Writes text or buffer content to the clipboard.  |
| `readAsync()`        | Reads text or buffer content from the clipboard. |

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request.

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Support
If you encounter any issues or have questions, please [open an issue](https://github.com/Ferencz/clip-it/issues).


Enjoy using **Clip It**! 🎉
