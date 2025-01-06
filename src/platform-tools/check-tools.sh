#!/bin/bash

# Check for xclip (Linux) or pbcopy (macOS)
if ! command -v xclip &> /dev/null && ! command -v pbcopy &> /dev/null; then
    echo "Installing xclip for Linux..."
    sudo apt-get install -y xclip
fi